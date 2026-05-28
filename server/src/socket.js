import { Server } from 'socket.io'
import prisma from './db.js'
import OpenAI from "openai";

const groqClient = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

const SYSTEM_PROMPT = `You are a helpful, expert customer support executive for "MoolTrue Foods".
You sell premium organic products:
- A2 Gir Cow Ghee (Bilona method)
- Wild Forest Honey & Handmade Sugarcane Jaggery
- Cold Pressed Oils (Kachi Ghani Mustard Oil, etc.)
- Himalayan Pink Salt
- Premium Basmati Rice
- Kashmiri Almonds & Chia Seeds

Delivery:
- Bangalore/local Karnataka: 24 hours.
- Other Metros: 2-4 business days.
- Free shipping on orders above ₹1,000 (otherwise ₹60).

Tone: Friendly, professional, concise, and organic-focused. Use emojis.
If the user asks to speak to a human, reply with exactly "handoff".
Do not invent policies or products that aren't listed above.

GUARDRAILS (CRITICAL):
You are strictly an organic food customer support agent. If the user asks you to write code (like C++, Python, etc.), solve math problems, write essays, or talk about topics completely unrelated to MoolTrue Foods, you MUST politely refuse and redirect them to asking about MoolTrue Foods products. Never write code for the user.`;

// Standalone local NLP processor (powered by Groq)
const processLocalNLP = async (messageText, sessionId) => {
  const text = messageText.toLowerCase().trim()

  // 1. Check if user is asking to track an order (matches MTF-123456 format)
  const orderRegex = /mtf-\d{6}/i
  const match = text.match(orderRegex)
  if (match) {
    const orderNo = match[0].toUpperCase()
    try {
      const order = await prisma.order.findUnique({
        where: { orderNumber: orderNo },
        include: { orderItems: { include: { product: true } } }
      })

      if (!order) {
        return `🔍 Sorry, I couldn't find an order matching **${orderNo}** in our system. Please double-check your order number.`
      }

      const itemsList = order.orderItems.map(item => `- ${item.product.name} (Qty: ${item.quantity})`).join('\n')
      return `📦 **Order Details: ${orderNo}**\n\n👤 **Customer**: ${order.customerName}\n🌿 **Order Status**: \`${order.orderStatus.toUpperCase()}\`\n💰 **Grand Total**: ₹${order.grandTotal}\n💳 **Payment Status**: \`${order.paymentStatus.toUpperCase()}\` (${order.paymentMethod.toUpperCase()})\n🏠 **Ship To**: ${order.deliveryAddress}, ${order.city}\n\n🛒 **Items Purchased**:\n${itemsList}`
    } catch (e) {
      console.error('NLP database query failed:', e)
      return `⚠️ I had a temporary issue connecting to the database. Please try tracking again shortly.`
    }
  }

  // 2. Check for manual hand-off requests
  if (text.includes('human') || text.includes('executive') || text.includes('agent') || text.includes('speak to') || text.includes('live support')) {
    return 'handoff'
  }

  // 3. Fallback to Groq LLM API
  try {
    // Fetch last 5 messages from DB for conversational context
    const previousMessages = await prisma.chatMessage.findMany({
      where: { sessionId: sessionId },
      orderBy: { createdAt: 'desc' },
      take: 6 // Up to 6 messages to provide history
    })

    const history = previousMessages.reverse().map(msg => ({
      role: msg.sender === 'customer' ? 'user' : 'assistant',
      content: msg.text
    }))

    const response = await groqClient.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...history
      ],
      temperature: 0.3,
      max_tokens: 300
    })

    return response.choices[0].message.content
  } catch (error) {
    console.error("Groq LLM Error:", error)
    return "🤔 I'm having a little trouble connecting to my brain right now. You can try again, or type **human** to speak to a real person!"
  }
}

export const setupSockets = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*', // Dynamic bridge network mapping allows wildcard locally
      methods: ['GET', 'POST']
    }
  })

  console.log('⚡ Socket.io Gateway initialized.')

  io.on('connection', (socket) => {
    console.log('[Socket] 🔗 New client connected:', socket.id)
    // ─── Customer: Join or Initialize Chat Session ───────────────────────────
    socket.on('join_session', async ({ sessionToken }) => {
      console.log('[Socket] join_session received from', socket.id, 'token:', sessionToken)
      if (!sessionToken) return

      try {
        // Find or create session
        let session = await prisma.chatSession.findUnique({
          where: { sessionToken },
          include: { messages: { orderBy: { createdAt: 'asc' } } }
        })

        if (!session) {
          session = await prisma.chatSession.create({
            data: {
              sessionToken,
              status: 'bot',
              messages: {
                create: {
                  sender: 'bot',
                  text: '👋 Welcome to MoolTrue Foods Support! I am your organic assistant. How can I help you choose healthy or track your order today?'
                }
              }
            },
            include: { messages: { orderBy: { createdAt: 'asc' } } }
          })
        }

        socket.join(`session_${session.id}`)
        console.log('[Socket] Emitting session_ready for session ID:', session.id, 'status:', session.status)
        socket.emit('session_ready', session)

        // If session was already escalated, alert active admins
        if (session.status === 'human') {
          io.emit('new_escalation', session)
        }
      } catch (e) {
        console.error('Join session socket error:', e)
      }
    })

    // ─── Customer: Sending a message ─────────────────────────────────────────
    socket.on('send_message', async ({ sessionToken, text }) => {
      console.log('[Socket] send_message received:', { sessionToken, text })
      if (!sessionToken || !text) return

      try {
        const session = await prisma.chatSession.findUnique({
          where: { sessionToken }
        })

        if (!session) return

        // 1. Save user message to database
        const userMsg = await prisma.chatMessage.create({
          data: {
            sessionId: session.id,
            sender: 'customer',
            text
          }
        })

        // Broadcast to customer session room
        io.to(`session_${session.id}`).emit('message_received', userMsg)

        // 2. Route message depending on Bot vs Human status
        if (session.status === 'bot') {
          // Send typing indicator
          socket.emit('bot_typing', true)

          const reply = await processLocalNLP(text, session.id)

          setTimeout(async () => {
            socket.emit('bot_typing', false)

            if (reply === 'handoff') {
              // Escalation trigger
              const updatedSession = await prisma.chatSession.update({
                where: { id: session.id },
                data: { status: 'human' }
              })

              const escalationMsg = await prisma.chatMessage.create({
                data: {
                  sessionId: session.id,
                  sender: 'bot',
                  text: '🤝 Sourcing live agent... I am notifying our support executives now. Please hold, they will chat with you directly in this window! 🌿'
                }
              })

              io.to(`session_${session.id}`).emit('message_received', escalationMsg)
              io.to(`session_${session.id}`).emit('session_status_changed', { status: 'human' })

              // Alert all admins about a new ticket in the support queue
              io.emit('new_escalation', { ...updatedSession, messages: [escalationMsg] })
            } else {
              // Standard Bot auto-reply
              const botMsg = await prisma.chatMessage.create({
                data: {
                  sessionId: session.id,
                  sender: 'bot',
                  text: reply
                }
              })
              io.to(`session_${session.id}`).emit('message_received', botMsg)
            }
          }, 600) // Small visual delay to simulate thinking
        } else {
          // If human state: broadcast message to admins watching this room
          io.to(`session_${session.id}`).emit('admin_message_sync', userMsg)
        }
      } catch (e) {
        console.error('Socket message route error:', e)
      }
    })

    // ─── Admin: Fetch support list ──────────────────────────────────────────
    socket.on('admin_get_sessions', async () => {
      try {
        const activeSessions = await prisma.chatSession.findMany({
          where: { status: 'human' },
          include: { messages: { orderBy: { createdAt: 'asc' } } },
          orderBy: { updatedAt: 'desc' }
        })
        socket.emit('admin_sessions_list', activeSessions)
      } catch (e) {
        console.error('Admin sessions fetch error:', e)
      }
    })

    // ─── Admin: Join chat room ────────────────────────────────────────────────
    socket.on('admin_join_session', async ({ sessionId, adminName }) => {
      if (!sessionId) return
      
      socket.join(`session_${sessionId}`)
      
      const welcomeMsg = await prisma.chatMessage.create({
        data: {
          sessionId: parseInt(sessionId),
          sender: 'admin',
          text: `🌿 Support executive **${adminName || 'Admin'}** has connected. How can I help you today?`
        }
      })

      io.to(`session_${sessionId}`).emit('message_received', welcomeMsg)
    })

    // ─── Admin: Send response message ─────────────────────────────────────────
    socket.on('admin_send_message', async ({ sessionId, text }) => {
      if (!sessionId || !text) return

      try {
        const adminMsg = await prisma.chatMessage.create({
          data: {
            sessionId: parseInt(sessionId),
            sender: 'admin',
            text
          }
        })

        // Broadcast to customer and admin inside this session room
        io.to(`session_${sessionId}`).emit('message_received', adminMsg)
      } catch (e) {
        console.error('Admin message error:', e)
      }
    })

    // ─── Admin: Close chat room ───────────────────────────────────────────────
    socket.on('admin_close_session', async ({ sessionId }) => {
      if (!sessionId) return

      try {
        await prisma.chatSession.update({
          where: { id: parseInt(sessionId) },
          data: { status: 'closed' }
        })

        const closeMsg = await prisma.chatMessage.create({
          data: {
            sessionId: parseInt(sessionId),
            sender: 'bot',
            text: '🔒 This live chat session has been closed by the support executive. If you have more questions, simply send another message to restart! Thank you for choosing organic. 🌿'
          }
        })

        io.to(`session_${sessionId}`).emit('message_received', closeMsg)
        io.to(`session_${sessionId}`).emit('session_status_changed', { status: 'closed' })
        
        // Refresh active queues for admins
        io.emit('session_closed_sync', { sessionId: parseInt(sessionId) })
      } catch (e) {
        console.error('Close chat room error:', e)
      }
    })

    socket.on('disconnect', (reason) => {
      console.log('[Socket] 🔌 Client disconnected:', socket.id, 'reason:', reason)
    })
  })
}

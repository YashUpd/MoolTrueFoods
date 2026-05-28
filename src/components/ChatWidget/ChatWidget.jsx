import { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { FaComments, FaTimes, FaPaperPlane, FaUserCircle, FaRobot, FaHeadset, FaRedo, FaHistory, FaTrash } from 'react-icons/fa'
import './ChatWidget.css'

// Connect to socket server (undefined = same origin, proxied through Vite in Docker)
const socketUrl = import.meta.env.VITE_API_URL || undefined

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [session, setSession] = useState(null)
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [badgeCount, setBadgeCount] = useState(0)
  const [chatKey, setChatKey] = useState(0)
  const [isConfirmingReset, setIsConfirmingReset] = useState(false)
  const [viewingHistory, setViewingHistory] = useState(false)
  const [chatHistoryList, setChatHistoryList] = useState([])
  const [deletingHistoryToken, setDeletingHistoryToken] = useState(null)
  const [isConfirmingClearAll, setIsConfirmingClearAll] = useState(false)

  const messagesEndRef = useRef(null)
  const isOpenRef = useRef(isOpen)
  const socketRef = useRef(null)
  const sessionRef = useRef(null)

  // Keep refs in sync with state
  useEffect(() => { isOpenRef.current = isOpen }, [isOpen])
  useEffect(() => { sessionRef.current = session }, [session])

  // ─── Initialize WebSocket Connection (runs once on mount) ──────────────────
  useEffect(() => {
    // Generate or fetch a persistent session token
    let token = localStorage.getItem('mtf_chat_token')
    
    // Load local history list
    let currentHistory = []
    try {
      currentHistory = JSON.parse(localStorage.getItem('mtf_chat_history') || '[]')
    } catch (e) {
      currentHistory = []
    }

    if (!token) {
      token = `sess_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`
      localStorage.setItem('mtf_chat_token', token)
      
      // Save new session to history list
      if (!currentHistory.some(h => h.token === token)) {
        currentHistory.unshift({ token, date: new Date().toISOString() })
        localStorage.setItem('mtf_chat_history', JSON.stringify(currentHistory))
      }
    }
    setChatHistoryList(currentHistory)

    console.log('[ChatWidget] Creating socket connection to:', socketUrl || 'window.location')

    const s = io(socketUrl)

    socketRef.current = s

    s.on('connect', () => {
      console.log('[ChatWidget] ✅ Socket connected! ID:', s.id)
      console.log('[ChatWidget] Emitting join_session with token:', token)
      s.emit('join_session', { sessionToken: token })
    })

    s.on('connect_error', (err) => {
      console.error('[ChatWidget] ❌ Socket connection error:', err.message)
    })

    s.on('disconnect', (reason) => {
      console.log('[ChatWidget] ⚠️ Socket disconnected:', reason)
    })

    s.on('session_ready', (activeSession) => {
      console.log('[ChatWidget] ✅ session_ready received:', activeSession)
      setSession(activeSession)
      sessionRef.current = activeSession
      setMessages(activeSession.messages || [])
    })

    s.on('message_received', (msg) => {
      console.log('[ChatWidget] 📨 message_received:', msg)
      setMessages((prev) => [...prev, msg])
      if (!isOpenRef.current && msg.sender !== 'customer') {
        setBadgeCount((c) => c + 1)
      }
    })

    s.on('bot_typing', (typing) => {
      console.log('[ChatWidget] 🤖 bot_typing:', typing)
      setIsTyping(typing)
    })

    s.on('session_status_changed', ({ status }) => {
      console.log('[ChatWidget] 🔄 session_status_changed:', status)
      setSession((prev) => (prev ? { ...prev, status } : null))
    })

    return () => {
      console.log('[ChatWidget] 🔌 Disconnecting socket')
      s.disconnect()
      socketRef.current = null
    }
  }, [chatKey])

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Reset unread count when opening
  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) setBadgeCount(0)
  }

  const handleResetChat = () => {
    setIsConfirmingReset(true)
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const confirmReset = () => {
    localStorage.removeItem('mtf_chat_token');
    setSession(null);
    setMessages([]);
    setIsConfirmingReset(false);
    setChatKey(prev => prev + 1);
  }

  const cancelReset = () => {
    setIsConfirmingReset(false)
  }

  const loadHistorySession = (oldToken) => {
    localStorage.setItem('mtf_chat_token', oldToken);
    setSession(null);
    setMessages([]);
    setViewingHistory(false);
    setChatKey(prev => prev + 1);
  }

  const initiateDeleteHistory = (e, targetToken) => {
    e.stopPropagation();
    setDeletingHistoryToken(targetToken);
  }

  const confirmDeleteHistory = (e, targetToken) => {
    e.stopPropagation();
    const updatedHistory = chatHistoryList.filter(h => h.token !== targetToken);
    localStorage.setItem('mtf_chat_history', JSON.stringify(updatedHistory));
    setChatHistoryList(updatedHistory);
    
    if (localStorage.getItem('mtf_chat_token') === targetToken) {
      localStorage.removeItem('mtf_chat_token');
      setSession(null);
      setMessages([]);
      setChatKey(prev => prev + 1);
    }
    setDeletingHistoryToken(null);
  }

  const cancelDeleteHistory = (e) => {
    e.stopPropagation();
    setDeletingHistoryToken(null);
  }

  // ─── Action Handlers ──────────────────────────────────────────────────────
  const handleSendMessage = (textToSend) => {
    const rawText = typeof textToSend === 'string' ? textToSend : inputText;
    const text = rawText.trim();
    const s = socketRef.current
    const sess = sessionRef.current

    console.log('[ChatWidget] handleSendMessage called:', { text, hasSocket: !!s, connected: s?.connected, hasSession: !!sess })

    if (!text) { console.log('[ChatWidget] ⛔ Empty text, skipping'); return }
    if (!s || !s.connected) { console.log('[ChatWidget] ⛔ No socket or not connected'); alert('Chat is disconnected. Please refresh the page.'); return }
    if (!sess) { console.log('[ChatWidget] ⛔ No session yet'); alert('Chat session not ready. Please wait a moment.'); return }

    console.log('[ChatWidget] 📤 Emitting send_message:', { sessionToken: sess.sessionToken, text })
    s.emit('send_message', {
      sessionToken: sess.sessionToken,
      text
    })

    setInputText('')
  }

  // Self-service Quick Options
  const handleQuickOption = (optionText) => {
    handleSendMessage(optionText)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <div className="mtf-chat-widget">
      {/* ─── Floating Chat Button Launcher ───────────────────────────────────── */}
      <motion.button
        className={`mtf-chat-launcher ${isOpen ? 'active' : ''}`}
        onClick={toggleChat}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open support chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaTimes size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="comments"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ position: 'relative' }}
            >
              <FaComments size={24} />
              {badgeCount > 0 && (
                <span className="mtf-chat-badge">{badgeCount}</span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ─── Chat Dialogue Window Panel ──────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mtf-chat-panel"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="mtf-chat-header">
              <div className="mtf-chat-header-info">
                <div className="mtf-chat-avatar-ring">
                  {session?.status === 'human' ? (
                    <FaHeadset className="icon-human" />
                  ) : (
                    <FaRobot className="icon-bot" />
                  )}
                </div>
                <div>
                  <h3 className="mtf-chat-header-title">
                    {session?.status === 'human' ? 'Live Support' : 'Organic Assistant'}
                  </h3>
                  <p className="mtf-chat-header-status">
                    {session?.status === 'human' ? 'Connected to Executive' : 'Bot Online • 24/7 Sourcing'}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <button 
                  className="mtf-chat-reset-btn" 
                  onClick={() => setViewingHistory(!viewingHistory)}
                  title="View previous chats"
                  aria-label="View previous chats"
                  style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center' }}
                >
                  <FaHistory />
                </button>
                <button 
                  className="mtf-chat-reset-btn" 
                  onClick={handleResetChat}
                  title="Start new chat"
                  aria-label="Start new chat"
                  style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center' }}
                >
                  <FaRedo />
                </button>
              </div>
            </div>

            {/* Previous Chats View */}
            {viewingHistory ? (
              <div className="mtf-chat-history history-view" style={{ backgroundColor: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0.5rem 0 1rem 0' }}>
                  <h4 style={{ margin: '0', padding: '0', color: '#1f2937' }}>Previous Chat Sessions</h4>
                  {chatHistoryList.length > 0 && !isConfirmingClearAll && (
                    <button 
                      onClick={() => setIsConfirmingClearAll(true)}
                      style={{ fontSize: '0.75rem', padding: '4px 8px', background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Clear All
                    </button>
                  )}
                </div>
                {isConfirmingClearAll ? (
                  <div style={{ background: '#fef2f2', padding: '1rem', borderRadius: '8px', border: '1px solid #fecaca', textAlign: 'center' }}>
                    <p style={{ color: '#991b1b', fontWeight: 'bold', fontSize: '0.875rem', marginBottom: '1rem' }}>Are you sure you want to permanently delete all chat history?</p>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                      <button 
                        onClick={() => {
                          localStorage.removeItem('mtf_chat_history');
                          localStorage.removeItem('mtf_chat_token');
                          setChatHistoryList([]);
                          setSession(null);
                          setMessages([]);
                          setChatKey(prev => prev + 1);
                          setIsConfirmingClearAll(false);
                        }}
                        style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}
                      >
                        Yes, Delete All
                      </button>
                      <button 
                        onClick={() => setIsConfirmingClearAll(false)}
                        style={{ background: 'transparent', color: '#991b1b', border: '1px solid #fca5a5', padding: '6px 16px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : chatHistoryList.length === 0 ? (
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>No previous chats found on this device.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {chatHistoryList.map(hist => (
                      <div 
                        key={hist.token} 
                        onClick={() => deletingHistoryToken !== hist.token && loadHistorySession(hist.token)}
                        className={`mtf-history-item ${hist.token === localStorage.getItem('mtf_chat_token') ? 'active-history' : ''}`}
                        style={{
                          textAlign: 'left',
                          padding: '0.75rem 1rem',
                          borderRadius: '8px',
                          border: `1px solid ${hist.token === localStorage.getItem('mtf_chat_token') ? '#15803d' : '#e5e7eb'}`,
                          backgroundColor: hist.token === localStorage.getItem('mtf_chat_token') ? '#f0fdf4' : '#f9fafb',
                          cursor: deletingHistoryToken === hist.token ? 'default' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.2s'
                        }}
                      >
                        {deletingHistoryToken === hist.token ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                            <div style={{ color: '#991b1b', fontSize: '0.875rem', fontWeight: '600' }}>Permanently delete this chat?</div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button 
                                onClick={(e) => confirmDeleteHistory(e, hist.token)}
                                style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', flex: 1 }}
                              >
                                Delete
                              </button>
                              <button 
                                onClick={cancelDeleteHistory}
                                style={{ background: 'transparent', color: '#991b1b', border: '1px solid #fca5a5', padding: '6px 12px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer', flex: 1 }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              <div style={{ fontWeight: '600', fontSize: '0.875rem', color: '#111827' }}>
                                Chat started {new Date(hist.date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                                ID: {hist.token.substring(0, 14)}...
                              </div>
                            </div>
                            <button 
                              onClick={(e) => initiateDeleteHistory(e, hist.token)}
                              title="Delete Chat"
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#ef4444',
                                cursor: 'pointer',
                                padding: '0.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '4px',
                                transition: 'background 0.2s'
                              }}
                              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'}
                              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                              <FaTrash size={14} />
                            </button>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="mtf-chat-history">
                {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mtf-chat-bubble-wrap ${
                    msg.sender === 'customer' ? 'msg-customer' : 'msg-partner'
                  }`}
                >
                  <div className="mtf-chat-bubble-avatar">
                    {msg.sender === 'customer' ? (
                      <FaUserCircle className="avatar-customer" />
                    ) : msg.sender === 'bot' ? (
                      <FaRobot className="avatar-bot" />
                    ) : (
                      <FaHeadset className="avatar-admin" />
                    )}
                  </div>
                  <div className="mtf-chat-bubble-content">
                    <div className="mtf-chat-bubble-text"><ReactMarkdown>{msg.text}</ReactMarkdown></div>
                    <span className="mtf-chat-bubble-time">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Bot typing status loader */}
              {isTyping && (
                <div className="mtf-chat-bubble-wrap msg-partner">
                  <div className="mtf-chat-bubble-avatar">
                    <FaRobot className="avatar-bot" />
                  </div>
                  <div className="mtf-chat-bubble-content typing">
                    <div className="mtf-typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}

              {/* In-Chat Reset Confirmation */}
              {isConfirmingReset && (
                <div className="mtf-chat-bubble-wrap msg-partner">
                  <div className="mtf-chat-bubble-avatar">
                    <FaRobot className="avatar-bot" />
                  </div>
                  <div className="mtf-chat-bubble-content" style={{ border: '1px solid #f59e0b', backgroundColor: '#fffbeb' }}>
                    <div className="mtf-chat-bubble-text" style={{ color: '#92400e', marginBottom: '8px' }}>
                      Are you sure you want to start a completely new chat session?
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={confirmReset}
                        style={{ background: '#f59e0b', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}
                      >
                        Yes, Start New
                      </button>
                      <button 
                        onClick={cancelReset}
                        style={{ background: 'transparent', color: '#92400e', border: '1px solid #fcd34d', padding: '6px 12px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer' }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
            )}

            {/* Quick replies selections (Shown ONLY when Bot is active) */}
            {!viewingHistory && session?.status === 'bot' && (
              <div className="mtf-chat-quick-replies">
                <button onClick={() => handleQuickOption('Check my order status')}>
                  📦 Order Status
                </button>
                <button onClick={() => handleQuickOption('Tell me about A2 Gir Ghee')}>
                  🌿 Gir Cow Ghee
                </button>
                <button onClick={() => handleQuickOption('How fast is delivery?')}>
                  🚚 Delivery Times
                </button>
                <button onClick={() => handleQuickOption('human')}>
                  🤝 Live Support Agent
                </button>
              </div>
            )}

            {/* Chat Input form */}
            {!viewingHistory && (
            <div className="mtf-chat-footer">
              <input
                type="text"
                placeholder={
                  session?.status === 'closed'
                    ? 'Type a message to reopen support...'
                    : 'Type a message...'
                }
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                className="mtf-chat-input"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim()}
                className="mtf-chat-send-btn"
                aria-label="Send message"
              >
                <FaPaperPlane size={14} />
              </button>
            </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ChatWidget


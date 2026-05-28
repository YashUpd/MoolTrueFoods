import { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'
import ReactMarkdown from 'react-markdown'
import { FaHeadset, FaPaperPlane, FaUserCircle, FaRobot, FaCheckCircle, FaInbox, FaDoorOpen } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import './AdminSupport.css'

const socketUrl = import.meta.env.VITE_API_URL || undefined

function AdminSupport() {
  const { user } = useAuth()
  const [socket, setSocket] = useState(null)
  const [sessions, setSessions] = useState([])
  const [selectedSession, setSelectedSession] = useState(null)
  const [inputText, setInputText] = useState('')

  const messagesEndRef = useRef(null)

  // ─── Initialize Admin Sockets ──────────────────────────────────────────────
  useEffect(() => {
    const s = io(socketUrl, {
      transports: ['websocket', 'polling']
    })
    setSocket(s)

    // Alert server we are an admin and pull active queues
    s.emit('admin_get_sessions')

    s.on('admin_sessions_list', (list) => {
      setSessions(list)
    })

    // Listen for new escalations in real-time
    s.on('new_escalation', (newSession) => {
      setSessions((prev) => {
        // Prevent duplicate updates
        if (prev.some((item) => item.id === newSession.id)) return prev
        return [newSession, ...prev]
      })
    })

    // Sync incoming customer messages inside rooms
    s.on('message_received', (msg) => {
      // Sync in active queues list
      setSessions((prev) =>
        prev.map((sess) =>
          sess.id === msg.sessionId
            ? { ...sess, messages: [...(sess.messages || []), msg] }
            : sess
        )
      )

      // Sync in current active chat window
      setSelectedSession((prev) => {
        if (!prev || prev.id !== msg.sessionId) return prev
        // Prevent duplicates
        if (prev.messages.some((m) => m.id === msg.id)) return prev
        return { ...prev, messages: [...prev.messages, msg] }
      })
    })

    // Sync ticket close actions
    s.on('session_closed_sync', ({ sessionId }) => {
      setSessions((prev) => prev.filter((sess) => sess.id !== sessionId))
      setSelectedSession((prev) => (prev && prev.id === sessionId ? null : prev))
    })

    return () => {
      s.disconnect()
    }
  }, [])

  // Auto-scroll chat history window
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [selectedSession?.messages])

  // ─── Command Handlers ──────────────────────────────────────────────────────
  const handleSelectSession = (session) => {
    setSelectedSession(session)
    if (socket) {
      socket.emit('admin_join_session', {
        sessionId: session.id,
        adminName: user ? user.name : 'Support Executive'
      })
    }
  }

  const handleSendMessage = () => {
    const text = inputText.trim()
    if (!text || !socket || !selectedSession) return

    socket.emit('admin_send_message', {
      sessionId: selectedSession.id,
      text
    })

    setInputText('')
  }

  const handleCloseSession = () => {
    if (!socket || !selectedSession) return

    const confirmClose = window.confirm('Are you sure you want to close this ticket?')
    if (confirmClose) {
      socket.emit('admin_close_session', {
        sessionId: selectedSession.id
      })
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <div className="admin-support-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Live Chat Support</h1>
          <p className="admin-page-subtitle">Help escalated customers in real-time</p>
        </div>
      </div>

      <div className="admin-support-container">
        {/* ─── LEFT PANEL: Active Escalated Queue ────────────────────────────── */}
        <div className="admin-support-sidebar">
          <h3 className="admin-support-sidebar-title">
            <FaInbox /> Active Queue ({sessions.length})
          </h3>
          {sessions.length === 0 ? (
            <div className="admin-support-sidebar-empty">
              <FaCheckCircle className="icon-check" />
              <p>Support queue is empty!</p>
              <span>No customers are currently escalated for help.</span>
            </div>
          ) : (
            <div className="admin-support-list">
              {sessions.map((sess) => {
                const lastMsg = sess.messages?.[sess.messages.length - 1]
                return (
                  <button
                    key={sess.id}
                    onClick={() => handleSelectSession(sess)}
                    className={`admin-support-item ${
                      selectedSession?.id === sess.id ? 'active' : ''
                    }`}
                  >
                    <div className="admin-support-item-header">
                      <span className="item-token">Session #{sess.id}</span>
                      <span className="item-time">
                        {new Date(sess.updatedAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className="item-last-msg">
                      {lastMsg ? lastMsg.text : 'Escalated chat session'}
                    </p>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* ─── RIGHT PANEL: Dialogue Window Interface ───────────────────────── */}
        <div className="admin-support-main">
          {selectedSession ? (
            <div className="admin-chat-window">
              {/* Header */}
              <div className="admin-chat-header">
                <div className="admin-chat-header-user">
                  <div className="admin-chat-header-avatar">
                    <FaUserCircle size={28} />
                  </div>
                  <div>
                    <h4>Session Customer #{selectedSession.id}</h4>
                    <p>escalated status: Waiting on live agent</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseSession}
                  className="admin-chat-close-btn"
                  title="Close support ticket"
                >
                  Close Session
                </button>
              </div>

              {/* Message scroll thread list */}
              <div className="admin-chat-history">
                {selectedSession.messages?.map((msg) => (
                  <div
                    key={msg.id}
                    className={`admin-chat-bubble-wrap ${
                      msg.sender === 'admin' ? 'msg-admin' : 'msg-partner'
                    }`}
                  >
                    <div className="admin-chat-bubble-avatar">
                      {msg.sender === 'admin' ? (
                        <FaHeadset className="avatar-admin" />
                      ) : msg.sender === 'bot' ? (
                        <FaRobot className="avatar-bot" />
                      ) : (
                        <FaUserCircle className="avatar-customer" />
                      )}
                    </div>
                    <div className="admin-chat-bubble-content">
                      <span className="admin-chat-bubble-sender">
                        {msg.sender.toUpperCase()}
                      </span>
                      <div className="admin-chat-bubble-text"><ReactMarkdown>{msg.text}</ReactMarkdown></div>
                      <span className="admin-chat-bubble-time">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Footer text boxes */}
              <div className="admin-chat-footer">
                <input
                  type="text"
                  placeholder="Type your response to the customer..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="admin-chat-input"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="admin-chat-send-btn"
                >
                  <FaPaperPlane size={14} /> Send
                </button>
              </div>
            </div>
          ) : (
            <div className="admin-chat-empty-state">
              <FaDoorOpen size={48} className="icon-empty" />
              <h3>Inbox Panel</h3>
              <p>Select an escalated session from the active queue sidebar to begin helping your clients in real-time.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminSupport

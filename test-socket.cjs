const io = require('socket.io-client');
const s = io('http://localhost:5173', {
  transports: ['websocket', 'polling'],
  withCredentials: false,
});

s.on('connect', () => {
  console.log('Connected! ID:', s.id);
  const token = 'sess_test123';
  s.emit('join_session', { sessionToken: token });
});

s.on('session_ready', (session) => {
  console.log('Session ready!', session);
  s.emit('send_message', { sessionToken: session.sessionToken, text: 'Hello bot' });
});

s.on('message_received', (msg) => {
  console.log('Message received:', msg);
});

setTimeout(() => {
  s.disconnect();
  process.exit(0);
}, 5000);

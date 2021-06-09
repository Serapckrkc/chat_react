import React, { useState, useEffect, useRef } from 'react'
import io from 'socket.io-client'

const App = () => {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])


  const socketRef = useRef()

  useEffect(() => {
    const out = document.getElementById('output')
    out.scrollIntoView(0, out.scrollHeight)
    
    socketRef.current = io.connect("http://localhost:4000")
    socketRef.current.on("chat", ({ name, message }) => {
      setChat([...chat, { name, message }])
    })
    return () => socketRef.current.disconnect()
  }, [chat])

  const onMessageSubmit = (e) => {
    e.preventDefault()
    if (name.length > 2 && message.length > 0) {
      socketRef.current.emit('chat', { name, message })
      setMessage('')
    } else {
      alert('Adınız min: 2, Message: 1 karakterden oluşmalıdır!')
    }
  }

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <p key={index}>
        <strong>{name}:</strong> {message}
      </p>
    ))
  }


  return (
    <div className="chat-wrap">
      <h2>Chat</h2>
      <div className="chat-window">
        <div id="output">
          {
            renderChat()
          }
        </div>
      </div>
      <form onSubmit={onMessageSubmit}>
        <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Ad" />
        <input type="text" onChange={(e) => setMessage(e.target.value)} value={message} placeholder="Mesaj" />
        <button>Gönder</button>
      </form>
    </div>
  );
}

export default App;

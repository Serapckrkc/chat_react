const app = require('express')
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  cors: {
    methods: ["GET", "POST"]
  }
})

io.on('connection', socket => {
  socket.on('chat', ({ name, message }) => {
    io.emit('chat', { name, message })
  })
})

http.listen(4000)
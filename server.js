const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

let connectedUsers = [];

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('register_user', (userData) => {
    socket.data = userData;
    connectedUsers.push({ id: socket.id, ...userData });
    io.emit('presence_update', connectedUsers);
  });

  socket.on('send_chat', (data) => {
    socket.broadcast.emit('receive_chat', data);
  });

  socket.on('send_heart', (data) => {
    socket.broadcast.emit('receive_heart', data);
  });

  socket.on('send_poke', (data) => {
    socket.broadcast.emit('receive_poke', data);
  });

  socket.on('disconnect', () => {
    connectedUsers = connectedUsers.filter(u => u.id !== socket.id);
    io.emit('presence_update', connectedUsers);
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Dudu server running on port ${PORT}`);
});
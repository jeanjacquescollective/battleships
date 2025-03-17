import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
import cors from 'cors';
const app = express();
const server = createServer(app);
const io = new Server(server);

// OR, specify allowed origins
app.use(cors({
  origin: 'http://localhost:5174/', // Change this to match your frontend
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('sendMessage', (msg) => {
    console.log(msg)
    io.emit('receiveMessage', msg);
  });
});



server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
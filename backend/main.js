import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
import cors from 'cors';
const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(cors());

// OR, specify allowed origins
app.use(cors({
  origin: 'http://localhost:5174/', // Change this to match your frontend
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
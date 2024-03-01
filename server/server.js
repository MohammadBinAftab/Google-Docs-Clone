import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();
app.use(cors()); // Add this line to enable CORS for all routes

const server = http.createServer(app);
const io = new Server(server);

// Your Socket.IO server logic here

const PORT = process.env.PORT || 9000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

io.on('connection', socket => {
    socket.on('get-document', async documentId => {
        const document = await getDocument(documentId);
        socket.join(documentId);
        socket.emit('load-document', document.data);

        socket.on('send-changes', delta => {
            socket.broadcast.to(documentId).emit('receive-changes', delta);
        })

        socket.on('save-document', async data => {
            await updateDocument(documentId, data);
        })
    })
});
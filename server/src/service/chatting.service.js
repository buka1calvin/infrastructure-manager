import { Server } from "socket.io";

function initializeChat(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      credentials: true,
    },
  });

  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    console.log("A user connected");
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
      console.log('userId===',userId)
      io.emit("user-online");
    });
    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
      onlineUsers.forEach((value, key) => {
        if (value === socket.id) {
          onlineUsers.delete(key);
          io.emit("user-offline");
        }
      });
    });
    socket.on("check-chat-user-online", (chatUserId) => {
      if (onlineUsers.has(chatUserId)) {
        socket.emit("chat-user-online");
      } else {
        socket.emit("chat-user-offline");
      }
    });
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.receiver);
      if (sendUserSocket) {
        console.log('Message received:', data.message);
        socket.to(sendUserSocket).emit("msg-received", data.message);
      }
    });
  });
}
export { initializeChat };

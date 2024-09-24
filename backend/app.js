const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const temperatureRouter = require("./controllers/temperature");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use("/temperature", temperatureRouter(io)); // Pasa `io` como argumento


module.exports = { app, server };

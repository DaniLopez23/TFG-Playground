const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const MqttHandler = require("./utils/MqttHandler");

const app = express();

app.use(cors()); // Configura el middleware de CORS

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Asegúrate de que esta URL sea la correcta
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const mqttClient = new MqttHandler();
mqttClient.connect();
mqttClient.subscribe("farm-01/6_dof_imu");
// Variable para almacenar el último mensaje del tópico específico
let lastTemperatureMessage = null;

// Establece el manejador para los mensajes entrantes
mqttClient.onMessage((topic, message) => {
  if (topic === "farm-01/6_dof_imu") {
    lastTemperatureMessage = { topic, message };
    console.log("Message received", topic);
    io.emit("tank_temperature_probes", lastTemperatureMessage); // Emitir a todos los clientes
  }
});

// Desconectar el cliente MQTT cuando el servidor se cierra
process.on("SIGINT", () => {
  mqttClient.disconnect();
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

module.exports = { app, server };

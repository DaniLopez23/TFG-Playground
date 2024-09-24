const temperatureRouter = require("express").Router();
const MqttHandler = require("../utils/MqttHandler");
const io = require("../app").io;
const mqttClient = new MqttHandler();
mqttClient.connect();

// Variable para almacenar el último mensaje del tópico específico
let lastTemperatureMessage = null;

// Establece el manejador para los mensajes entrantes
mqttClient.onMessage((topic, message) => {
  if (topic === "farm-01/tank_temperature_probes") {
    lastTemperatureMessage = { topic, message };
    io.emit("tank_temperature_probes", lastTemperatureMessage);  // Emitir a todos los clientes
  }
});

module.exports = temperatureRouter;

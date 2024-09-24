const express = require('express');
const MqttHandler = require('../utils/MqttHandler');

const temperatureRouter = express.Router();

module.exports = (io) => {
  const mqttClient = new MqttHandler();
  mqttClient.connect();

  // Variable para almacenar el último mensaje del tópico específico
  let lastTemperatureMessage = null;

  // Establece el manejador para los mensajes entrantes
  mqttClient.onMessage((topic, message) => {
    if (topic === 'farm-01/tank_temperature_probes') {
      lastTemperatureMessage = { topic, message };
      console.log('New message from:', topic);
      io.broadcast.emit('tank_temperature_probes', lastTemperatureMessage); // Emitir a todos los clientes
    }
  });

  return temperatureRouter;
};
const mqtt = require("mqtt");
const config = require("./config");

const url = `mqtts://${config.MQTT_HOST}:${config.MQTT_PORT}`;
console.log(url);

class MqttHandler {
  constructor() {
    this.mqttClient = null;
    this.host = url;
    this.username = config.MQTT_USERNAME; // mqtt credentials if these are needed to connect
    this.password = config.MQTT_PASSWORD;
    this.messageHandler = null; // Callback to handle received messages
  }

  connect() {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    this.mqttClient = mqtt.connect(this.host, {
      username: this.username,
      password: this.password,
    });

    // Mqtt error callback
    this.mqttClient.on("error", (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on("connect", () => {
      console.log(`mqtt client connected`);
    });

    // mqtt subscriptions
    this.mqttClient.subscribe("farm-01/6_dof_imu", (err) => {
      if (err) {
        console.log("Subscription error: ", err);
      }
    });

    // mqtt subscriptions
    this.mqttClient.subscribe("farm-01/board_temperature", (err) => {
      if (err) {
        console.log("Subscription error: ", err);
      }
    });

    // mqtt subscriptions
    this.mqttClient.subscribe("farm-01/tank_temperature_probes", (err) => {
      if (err) {
        console.log("Subscription error: ", err);
      }
    });

    // mqtt subscriptions
    this.mqttClient.subscribe("farm-01/board_status", (err) => {
      if (err) {
        console.log("Subscription error: ", err);
      }
    });

    // When a message is received
    this.mqttClient.on("message", (topic, message) => {
      console.log(`Received message: from topic: ${topic}`);
      if (this.messageHandler) {
        this.messageHandler(topic, message.toString()); // Call the handler with the topic and message
      }
    });

    this.mqttClient.on("close", () => {
      console.log(`mqtt client disconnected`);
    });
  }

  // Method to set the message handler callback
  onMessage(handler) {
    this.messageHandler = handler;
  }
}

module.exports = MqttHandler;
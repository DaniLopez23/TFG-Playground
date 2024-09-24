const mqtt = require('mqtt');
const config = require('./config');

class MqttHandler {
  constructor() {
    this.host = `mqtts://${config.MQTT_HOST}:${config.MQTT_PORT}`;
    this.username = config.MQTT_USERNAME;
    this.password = config.MQTT_PASSWORD;
    this.mqttClient = null;
  }

  connect() {
    this.mqttClient = mqtt.connect(this.host, {
      username: this.username,
      password: this.password,
    });

    this.mqttClient.on('error', (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    this.mqttClient.on('connect', () => {
      console.log('mqtt client connected');
    });
  }

  onMessage(callback) {
    this.mqttClient.on('message', (topic, message) => {
      callback(topic, message.toString());
    });
  }

  subscribe(topic) {
    this.mqttClient.subscribe(topic, (err) => {
      if (err) {
        console.error('Subscription error:', err);
      } else {
        console.log(`Subscribed to topic: ${topic}`);
      }
    });
  }

  disconnect() {
    if (this.mqttClient) {
      this.mqttClient.end(() => {
        console.log('mqtt client disconnected');
      });
    }
  }
}

module.exports = MqttHandler;
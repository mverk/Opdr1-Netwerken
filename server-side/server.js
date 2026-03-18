const mqtt = require("mqtt");
const WebSocket = require("ws");
const https = require('https');
const fs = require('fs');

const serverConfig = {
    cert: fs.readFileSync('/etc/ssl/certs/opd1-netwerken.crt'),
    key: fs.readFileSync('/etc/ssl/certs/opd1-netwerken.key')
};

const httpsServer = https.createServer(serverConfig);
const wss = new WebSocket.Server({server: httpsServer});

const client = mqtt.connect("mqtt://mosquitto:1883", {
  username: 'admin',
  password: 'admin1234'
});

client.on("connect", () => {
  client.subscribe("opd1/chat", (err) => {
    if(!err) {
      
    }
  });
});

client.on("message", (topic, message) => {
  console.log(message.toString());
  wss.clients.forEach((wsClient) => {
    if(wsClient.readyState === WebSocket.OPEN) {
      wsClient.send(message.toString());
    }
  })
})

wss.on('connection', (ws) => {
  console.log("[OPD1 Netwerken] Browser has been connected via Websocket");
  ws.on('message', (message) => {
    console.log("[OPD1 Netwerken] Received message: " + message.toString());
    client.publish('opd1/chat', message.toString());
  });

  client.on('message', (messageFromMqtt) => {
    ws.send(messageFromMqtt.toString());
  })
})
httpsServer.listen(1883, () => {
  console.log("[OPD1 Netwerken] Websocket running on port 1883");
})

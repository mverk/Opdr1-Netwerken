const mqtt = require("mqtt");
const WebSocket = require("ws");
const https = require('https');
const fs = require('fs');

// SSL certificaten
const serverConfig = {
    cert: fs.readFileSync('/etc/ssl/certs/opd1-netwerken.crt'),
    key: fs.readFileSync('/etc/ssl/certs/opd1-netwerken.key')
};

const httpsServer = https.createServer(serverConfig);
const wss = new WebSocket.Server({ server: httpsServer });

// verbinding met MQTT
const client = mqtt.connect("mqtt://mosquitto:1883", {
    username: 'student',
    password: 'welkom01'
});

client.on("connect", () => {
    console.log("[MQTT] Verbonden met broker");
    client.subscribe("chat/message");
});

client.on("message", (topic, message) => {
    const msg = message.toString();
    console.log("[MQTT -> WS]: " + msg);
    wss.clients.forEach((wsClient) => {
        if (wsClient.readyState === WebSocket.OPEN) {
            wsClient.send(msg);
        }
    });
});

wss.on('connection', (ws) => {
    console.log("[WS] Nieuwe browser verbinding");
    
    ws.on('message', (message) => {
        const msg = message.toString();
        console.log("[WS -> MQTT]: " + msg);
        client.publish('chat/message', msg);
    });
});


httpsServer.listen(8884, () => {
    console.log("[SERVER] Secure WebSocket bridge draait op https://localhost:8884");
});
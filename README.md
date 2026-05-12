## Opdracht 1 - Netwerken en Security vervolg

<b>Stap 1</b> Zorg dat docker is geinstalleerd op het apparaat waar het programma uitgevoerd moet worden. Ook is het handig om git geinstalleerd te hebben.

<b>Stap 2</b> Clone de respository:
`git clone https://github.com/mverk/Opdr1-Netwerken.git`

<b>Stap 3</b> Start de container.
- Linux/macOS: `sudo docker compose up -d --build`
- Windows: `docker compose up -d --build`

<b>Stap 4</b> Controleer of de container draait
- Linux/macOS: `sudo docker ps`
- Windows: `docker ps`

<b>Stap 5</b>
Voordat de applicatie bekeken kan worden, moet je in je browser eerst `127.0.0.1:1883` openen, en hier accepteren de 'risicos' te accepteren. Dit is wat alle browsers doen, anders werken de websockets namelijk niet

<b>Stap 6</b>
Het programma is nu te bezoeken via `127.0.0.1`

------------
Het wachtwoord van MQTT/Mosquitto is te vinden onder de mqtt folder in het .md bestand

------------
LET OP! Op de eerste poging van deze opdracht kreeg ik de feedback dat poort 1883 onveilig geopend zou worden. Echter is dit niet zo. 

In de server.js van de backend (server-side/server.js) wordt de poort geconfigureerd met het certificaat en key bestand, en zo beveiligd geopend:

```
const serverConfig = {
    cert: fs.readFileSync('/etc/ssl/certs/opd1-netwerken.crt'),
    key: fs.readFileSync('/etc/ssl/certs/opd1-netwerken.key')
};

const httpsServer = https.createServer(serverConfig);
const wss = new WebSocket.Server({server: httpsServer});
```

Ook in de client side server.js (html/server.js) wordt er verbonden met deze beveiligde poort:

```
const ws = new WebSocket('wss://127.0.0.1:1883/', null, null, null, {rejectUnauthorized: false});
```
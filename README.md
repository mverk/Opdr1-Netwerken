## Opdracht 1 - Netwerken en Security vervolg

**Stap 1** Zorg dat docker is geinstalleerd op het apparaat waar het programma uitgevoerd moet worden. Ook is het handig om git geinstalleerd te hebben.

**Stap 2** Clone de respository:`git clone https://github.com/mverk/Opdr1-Netwerken.git`

**Stap 3** Start de container.

-   Linux/macOS: `sudo docker compose up -d --build`
-   Windows: `docker compose up -d --build`

**Stap 4** Controleer of de container draait

-   Linux/macOS: `sudo docker ps`
-   Windows: `docker ps`

<<<<<<< HEAD
**Stap 5**Voordat de applicatie bekeken kan worden, moet je in je browser eerst `127.0.0.1:1883` openen, en hier accepteren de 'risicos' te accepteren. Dit is wat alle browsers doen, anders werken de websockets namelijk niet

**Stap 6**Het programma is nu te bezoeken via `127.0.0.1`

---

Het wachtwoord van MQTT/Mosquitto is te vinden onder de mqtt folder in het .md bestand

---

Te gebruiken commandos:
- BOT-1091369 led:aan
- BOT-1091369 led:uit
- BOT-1091369 ldr

---

Bij de eerste poging stonden er nog een aantal configs van de MQTT server verkeerd (allow_anonymous true), deze zijn nu aangepast.
=======
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

const client = mqtt.connect("mqtt://mosquitto:1883", {
  username: 'admin',
  password: 'admin1234'
});
```

Ook in de client side server.js (html/server.js) wordt er verbonden met deze beveiligde poort:

```
const ws = new WebSocket('wss://127.0.0.1:1883/', null, null, null, {rejectUnauthorized: false});
```

Dit kan allemaal verwarrend overkomen omdat ik in eerste instantie de opdracht niet helemaal goed heb begrepen, en dus een "externe" container gebruik voor de websockets (de server-side). Hierdoor is er ook een deel interne routing in docker.
>>>>>>> 866b1d46a05a8c41d236a9904c7dbab8f5da2fb2

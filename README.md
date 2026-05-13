## Opdracht 1 - Netwerken en Security vervolg

**Stap 1** Zorg dat docker is geinstalleerd op het apparaat waar het programma uitgevoerd moet worden. Ook is het handig om git geinstalleerd te hebben.

**Stap 2** Clone de respository:`git clone https://github.com/mverk/Opdr1-Netwerken.git`

**Stap 3** Start de container.

-   Linux/macOS: `sudo docker compose up -d --build`
-   Windows: `docker compose up -d --build`

**Stap 4** Controleer of de container draait

-   Linux/macOS: `sudo docker ps`
-   Windows: `docker ps`

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
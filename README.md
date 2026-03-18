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
#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include "secret.h"

const char* bot_id = "BOT-1091369";
const char* chat_topic = "chat/message";

#define LDR_PIN 34
#define LED_PIN 2

WiFiClientSecure espClient;
PubSubClient client(espClient);

void setup_wifi() {
  Serial.print("\nVerbinden met WiFi...");
  WiFi.begin(ssid, pass); 
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi verbonden!");


  configTime(0, 0, "pool.ntp.org");
  while (time(nullptr) < 1000) { delay(500); }
}

void callback(char* topic, byte* payload, unsigned int length) {
  String message = "";
  for (int i = 0; i < length; i++) { message += (char)payload[i]; }
  
  Serial.println("Bericht: " + message);

  // bot reageert alleen als het bericht BOT-1091369 <commando> luid
  if (message.indexOf(bot_id) >= 0) {
    
    if (message.indexOf("ldr") >= 0) {
      int rawValue = analogRead(LDR_PIN);
      int luxPercent = map(rawValue, 0, 4095, 0, 100);
      
      String response = String(bot_id) + ": Lichtwaarde is " + String(luxPercent) + "%";
      client.publish(chat_topic, response.c_str());
    } 
    
    else if (message.indexOf("led:aan") >= 0) {
      digitalWrite(LED_PIN, HIGH);
      client.publish(chat_topic, (String(bot_id) + ": LED staat nu AAN").c_str());
    }
    
    else if (message.indexOf("led:uit") >= 0) {
      digitalWrite(LED_PIN, LOW);
      client.publish(chat_topic, (String(bot_id) + ": LED staat nu UIT").c_str());
    }
  }
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("MQTT verbinden...");
    if (client.connect(bot_id, MQTT_USER, MQTT_PASS)) { 
      Serial.println("Verbonden!");
      client.subscribe(chat_topic);
    } else {
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  
  setup_wifi();
  espClient.setInsecure();
  client.setServer(MQTT_HOST, MQTT_PORT);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}
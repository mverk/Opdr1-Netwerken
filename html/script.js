const ws = new WebSocket('wss://192.168.2.58:1883/', null, null, null, {rejectUnauthorized: false});
const messagesContainer = document.getElementById('messages');
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const usernameInput = document.getElementById('username');

ws.onopen = () => {
    console.log("[OPD1 Netwerken] Websocket has been connected");
}

ws.onclose = () => {
    console.log('[OPD1 Netwerken] Websocket has been disconnected');
};

ws.onmessage = (event) => {
    const data = event.data;

    if (!data.includes('|')) {
        console.log("Ignoring system/topic message:", data);
        return; 
    }

    const currentUser = usernameInput.value.trim() || "Gebruiker";
    
    const messageSplit = data.indexOf('|');
    const sender = data.substring(0, messageSplit).trim();

    if (sender !== currentUser) {
        showMessageOnScreen(data, false);
    }

};


document.getElementById('send').addEventListener('click', () => {
    const input = document.getElementById('message');
    ws.send(input.value);
    input.value = '';
})

function showMessageOnScreen(data, isClient) {
    const messageDiv = document.createElement('div');

    // data wordt verstuurd in het format "username | bericht", dus dit moet nog gefiltert worden, dat gebeurd hieronder
    const messageSplit = data.indexOf('|');
    const user = messageSplit > -1 ? data.substring(0, messageSplit) : "Unknown User";
    const messageText = messageSplit > -1 ? data.substring(messageSplit + 1) : data;

    // isClient wordt hier gebruikt om tekst van de gebruiker zelf een andere positie te geven
    messageDiv.className = `flex flex-col ${isClient ? 'items-end' : 'items-start'}`;
    messageDiv.innerHTML = `
        <span class="text-[10px] text-gray-500 mb-1 ml-1 mr-1">${user}</span>
        <div class="max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
            isClient 
            ? 'bg-green-600 text-white rounded-tr-none' 
            : 'bg-gray-800 text-gray-200 rounded-tl-none border border-gray-700'
        }">
            ${messageText}
        </div>
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

chatForm.addEventListener('submit', (e) => {


    const user = usernameInput.value.trim() || "Gebruiker";
    const message = messageInput.value;

    if (message.trim() !== "" && ws.readyState === WebSocket.OPEN) {
        const completeMessage = `${user} | ${message}`;
        
        ws.send(completeMessage);

        showMessageOnScreen(completeMessage, true);

        messageInput.value = '';
        messageInput.focus(); 
    } else if (ws.readyState !== WebSocket.OPEN) {
        console.error("[OPD1 Netwerken] WebSocket could not connect/is not connected. Try refreshing your browser...");
    }
    e.preventDefault();

});

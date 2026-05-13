<<<<<<< HEAD
const ws = new WebSocket('wss://127.0.0.1:8884/', null, null, null, { rejectUnauthorized: false });

=======
const ws = new WebSocket('wss://127.0.0.1:1883/', null, null, null
);
>>>>>>> 866b1d46a05a8c41d236a9904c7dbab8f5da2fb2
const messagesContainer = document.getElementById('messages');
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const usernameInput = document.getElementById('username');

ws.onopen = () => {
    console.log("[WS] Verbonden met de server");
};

ws.onmessage = (event) => {
    const data = event.data;
    const currentUser = usernameInput.value.trim() || "User";

    if (data.startsWith(currentUser + ":")) {
        return; 
    }

    // inkomende berichten van de user of van de bot
    showMessageOnScreen(data, false);
};

ws.onclose = () => {
    console.log('[WS] Verbinding verbroken');
};

// bericht versturen
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = usernameInput.value.trim() || "User";
    const message = messageInput.value.trim();

    if (message !== "" && ws.readyState === WebSocket.OPEN) {
        // formatteren van bericht
        const completeMessage = `${user}: ${message}`;
        
        ws.send(completeMessage);

        showMessageOnScreen(completeMessage, true);

        messageInput.value = '';
        messageInput.focus(); 
    }
});

function showMessageOnScreen(data, isClient) {
    const messageDiv = document.createElement('div');

    // naam splitsen voor op de UI
    const separatorIdx = data.indexOf(':');
    const sender = separatorIdx > -1 ? data.substring(0, separatorIdx).trim() : "Systeem";
    const text = separatorIdx > -1 ? data.substring(separatorIdx + 1).trim() : data;

    messageDiv.className = `flex flex-col ${isClient ? 'items-end' : 'items-start'}`;
    messageDiv.innerHTML = `
        <span class="text-[10px] text-gray-500 mb-1 px-2">${sender}</span>
        <div class="max-w-[85%] px-4 py-2 rounded-2xl text-sm shadow-sm ${
            isClient 
            ? 'bg-blue-600 text-white rounded-tr-none' 
            : 'bg-gray-800 text-gray-200 rounded-tl-none border border-gray-700'
        }">
            ${text}
        </div>
    `;

    messagesContainer.appendChild(messageDiv);
    // automatisch scrollen
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
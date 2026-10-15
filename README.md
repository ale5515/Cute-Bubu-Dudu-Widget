A cross-platform, real-time desktop widget system built with Electron, Tailwind CSS, and Socket.io, enabling live, interactive syncing (chat messages, floating heart animations, and character pokes) between two desktop users across different networks.

The application is structured around a real-time client-server architecture to handle low-latency communication over the internet:

Backend Server (Cloud Node.js & Socket.io)

Host: Render (https://cute-bubu-dudu-server.onrender.com)

Core Technologies: Node.js, Express, Socket.io (v4.7.5)

Mechanism: Maintains an active WebSocket pool. When a client emits an event (send_chat, send_heart, send_poke), the server instantly broadcasts the payload via socket.broadcast.emit() to all connected peers while tracking active session presence via presence_update arrays.

Frontend Desktop Clients (Electron Wrappers)

Framework: Electron (v30+)

UI Layer: HTML5, Tailwind CSS (via CDN), custom CSS retro pixel-art animations.

Window Properties: Transparent background, frameless frame-drag region (-webkit-app-region: drag), and alwaysOnTop: true to behave like a native floating desktop pet.

Client Communication: Uses socket.io-client loaded via CDN to bind network events directly to DOM manipulation and particle spawners.




!!!!Setup & Installation Instructions!!!!

Step 1: Clone the Repository

Open your terminal (Command Prompt/PowerShell on Windows, Terminal on Mac) and clone the repository:

git clone https://github.com/ale5515/Cute-Bubu-Dudu-Widget.git
cd Cute-Bubu-Dudu-Widget


Step 2: Install Dependencies

npm install


💻 Configuration & Usage Guide

Depending on whether you are setting this up for Dudu (Windows) or Bubu (Mac), follow the respective configuration steps below.

👤 For Dudu (Windows)

Ensure your main.js file loads your default interface:

mainWindow.loadFile('index.html');


Start the desktop widget:

npm start


🌸 For Bubu (Mac / Partner)

Open main.js in a text editor and update the window loader to target the partner file:

mainWindow.loadFile('bubu.html');


Start the partner desktop widget:

npm start


✨ Features & Controls

Cloud Presence Indicator: The status dot at the top of the speech bubble automatically turns Green when your partner connects to the server and Red when offline.

Interactive Chat: Click the speech bubble or chat toggle button (💬) to open the retro input tray, type a message, and press Enter or click Send.

Floating Hearts: Click the heart button (♥) to spawn animated pixel hearts that float up across the widget window.

Pokes: Click directly on the character avatar to send a "poke" event that triggers a bouncy animation shake on both ends.

Draggable Frame: Click and drag the top title bar (:: DRAG DUDU/BUBU ::) to reposition your widget anywhere 

let socket = null;

function connectWebSocket() {
  if (!socket) {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const host = window.location.host;
    const url = `${protocol}://192.168.1.109:3000`;
    socket = new WebSocket(url);
  }

  return socket;
}

function getSocket() {
    return socket;
}

function closeSocket() {
    if (socket) {
        socket.close();
        socket = null;
    }
}

export { connectWebSocket, getSocket, closeSocket };
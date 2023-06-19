const Client = require("./Online/client.js");
const UUID = require("uuid");
const { Server } = require("socket.io");

class ChatServer {
  constructor(server, port) {
    this.clients = new Set();
    this.io = new Server(server);

    server.listen(process.env.PORT || port, () => {
      console.log(`Server started on port ${server.address().port} :)`);
    });
  }

  attachCallbacks() {
    this.io.on("connection", (socket) => {
      console.log(`Client connected with id: ${socket.id}`);
    });
  }

  handleConnection(server, connection) {
    let client = server.login(server, connection);
  }

  login(srv, connection) {}

  handleMessage(client, msg) {
    console.log("Received message from: " + client + " message: " + msg);
  }

  handleClose(client) {
    console.log("Client disconnected");
  }
}

module.exports = ChatServer;

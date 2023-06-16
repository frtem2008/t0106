const WebSocket = require("ws");

class Server {
  constructor(server, port) {
    this.wss = new WebSocket.Server({ server });
    this.attachCallbacks();

    server.listen(process.env.PORT || port, () => {
      console.log(`Server started on port ${server.address().port} :)`);
    });
  }

  attachCallbacks() {
    this.wss.on("connection", (client) => {
      this.handleConnect(this, client);
    });
  }

  handleConnect(srv, client) {
    client.send("Hi there, I am a WebSocket server");

    client.on("message", (msg) => {
      srv.handleMessage(client, msg);
    });

    client.on("close", () => {
      this.handleClose(client);
    });
  }

  handleMessage = (client, msg) => {
    console.log("Received message from: " + client + " message: " + msg);
  };

  handleClose(client) {
    console.log("Client disconnected");
  }
}

module.exports = Server;

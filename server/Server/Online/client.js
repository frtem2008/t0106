class ClientState {
  static UNAUTHORIZED = new ClientState("UNAUTHORIZED");
  static LOGGED_IN = new ClientState("LOGGED_IN");

  constructor(name) {
    this.name = name;
  }

  toString() {
    return `ClientState.${this.name}`;
  }
}

class Client {
  constructor(socket) {
    this.socket = socket;
    this.state = ClientState.UNAUTHORIZED;

    console.log("Client created!");
  }

  send(data) {
    this.socket.send(data);
  }

  toString() {
    let add = this.socket._socket.address();
    return `Client:  ${this.socket._socket.address().address}; ${this.state}`;
  }
}

module.exports = { Client: Client, ClientState: ClientState };

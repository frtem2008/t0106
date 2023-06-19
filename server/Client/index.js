export function connectToServer(port) {
  let socket = new WebSocket("ws://localhost:" + port);

  socket.onopen = function (e) {
    console.log("[open] Connection established to localhost:" + port);
    console.log("Sending to server");
    socket.send("My name is John");
  };

  socket.onmessage = function (event) {
    console.log(`[message] Data received from server: ${event.data}`);
  };

  socket.onclose = function (event) {
    if (event.wasClean) {
      console.log(
        `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
      );
    } else {
      console.log("[close] Connection died");
    }
  };

  socket.onerror = function (error) {
    console.log(`[error]`);
  };
}

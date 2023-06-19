import { io } from "socket.io-client";

let socket;

async function main() {
  socket = io();

  // client-side
  socket.on("connect", () => {
    console.log("Connected to server: " + socket.id);
  });

  socket.on("EchoToClient", function (msg) {
    console.log("Received echo: " + msg);
  });

  socket.on("disconnect", () => {
    console.log(socket.id); // undefined
  });
}
function addEventListeners() {
  const body = document.body;

  document.getElementById("echo button").onkeyup = (ev) => {
    if (ev.code === "Enter") {
      const value = document.getElementById("echo button").value;
      console.log("Sending: " + value);
      socket.emit("EchoToServer", document.getElementById("echo button").value);
      document.getElementById("echo button").value = "";
    }
  };
}

window.addEventListener("load", (event) => {
  addEventListeners();
  main();
});

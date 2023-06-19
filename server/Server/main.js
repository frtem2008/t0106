"use strict";

const http = require("http");
const express = require("express");
const morgan = require("morgan");
const WebSocket = require("ws");

const Server = require("./Server");

const app = express();
app.use(morgan("combined"));
app.use(express.static("./Client"));

const server = http.createServer(app);
const chatServer = new Server(server, 26780);

const express = require('express');
const app = express();
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

// Set the view engine to EJS
app.set("view engine", "ejs");

// Correctly serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Handle socket connections
io.on("connection", function (socket) {
  socket.on("send-location",function(data){
    io.emit("recieve-location",{id:socket.id, ...data});
  });
  socket.on("disconnect",function(){
    io.emit("user-disconnected",socket.id);
  });
  console.log("connected");
});

// Render the index page
app.get("/", function (req, res) {
  res.render("index");
});

// Start the server
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

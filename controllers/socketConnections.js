const io = require( "socket.io" )();
const socketapi = {
    io: io
};

const express = require(“express”);


const { ExpressPeerServer } = require(“peer”);
const peerServer = ExpressPeerServer(server, {
debug: true,
});
app.use(“/peerjs”, peerServer);

io.on('connection', function(socket){
  userID = request.user._json.email;
  socket.on('join-room', function(roomID, userID){
    console.log("roomid: " + roomID)
      socket.join(roomID);
      socket.to(roomID).broadcast.emit(“user-connected”, userId);
    });
});

io.on('connection', function(socket){

    socket.on('announcement', function(data) {
      console.log('announcement:', data);
      io.emit('announcement', {
        userFirstName: data.userFirstName,
        message: data.message
      });
    });

    socket.on('connectionEvent', function(data) {
      console.log('connection:', data.userFirstName);
      io.emit('connectionEvent', {
          userFirstName:data.userFirstName,
          numClients: io.engine.clientsCount,
          message: 'connected'
      });
    });
});

module.exports = socketapi;


io.on(“connection”, (socket) => {
socket.on(“join-room”, (roomId, userId) => {
socket.join(roomId);
socket.to(roomId).broadcast.emit(“user-connected”, userId);
});
});


const app = express();
app.set(“view engine”, “ejs”);

app.use(express.static(“public”));
app.get(“/”, (req, res) => {



server.listen(3030);

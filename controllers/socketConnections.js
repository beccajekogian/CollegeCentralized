const io = require( "socket.io" )();
const socketapi = {
    io: io
};

io.on('connection', function(socket){

    socket.on('announcement', function(data) {
      console.log('announcement:', data);
      io.emit('announcement', {
        email: data.email,
        message: data.message
      });
    });

    socket.on('connectionEvent', function(data) {
      console.log('connection:', data.email);
      io.emit('connectionEvent', {
          email: data.email,
          numClients: io.engine.clientsCount,
          message: 'connected'
      });
    });

});

module.exports = socketapi;

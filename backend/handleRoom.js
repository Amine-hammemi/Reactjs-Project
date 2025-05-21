

module.exports = (io) => {
  // Socket.io connection event
  io.on('connection', (socket) => {

    socket.on('test', (roomId, callback) => {
      const room = io.sockets.adapter.rooms.get(roomId); // Get room details
      
      console.log('Room ID:', roomId);
      if (! room) {
        callback({ success: false, message: 'Room does not exist' });
        return; // Exit the function after handling this case
      }

      const roomSize = room.size; // The number of sockets in the room
      console.log("Room Size:", roomSize);

    
      if (roomSize === 1) { // Room should allow joining if it's not full
        callback({ success: true, message: 'first player joined the room ' , playerSymbol: 'X' });
      } else if (roomSize === 2 ) {

        callback({ success: true, message: 'second player joined the room' , playerSymbol: 'O' });
      }
      else {
        callback({ success: false, message: 'Room is full ' });
      }
    });

    socket.on('create-room', (callback) => {
      const roomId = generateRoomId(); // Generate unique room ID
      socket.join(roomId); // Join the room as the first player

      console.log(`user created the room ${socket.id} as 'X' and joined the room : ${roomId}`);

      callback({ roomId, success: true , playerSymbol :'X', message: 'Room created successfully' });
    });
    
    
    
    socket.on('join-room', (roomId, callback) => {
      let room = io.sockets.adapter.rooms.get(roomId); // Get room details
      console.log('room :',room.size);
      if ( room && room.size === 1) { // Room should have exactly 2 players before joining
        socket.join(roomId); // Join the room
        console.log(`Player joined room ${roomId} as 'O'`);
        callback({ success: true, playerSymbol: 'O' , message:'second player joined the room'});
      }else {
      // Room is full or does not exist
        callback({ success: false, message: 'Room is full or does not exist' });
      }
    });

    socket.on('move', (data) => {
      const { board, roomId, nextTurn } = data;
      console.log("move");
      console.log("Socket rooms:", socket.rooms);
      console.log(board , roomId , nextTurn);
      io.to(roomId).emit('update-board', { board, nextTurn });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });

    
    

  });

  // Helper function to generate a random room ID
  const generateRoomId = () => {
    return Math.random().toString(36).substring(2, 8); // Generate a 6-character room ID
  };
};
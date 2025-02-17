const Trip = require("../models/Trip");
const User = require("../models/User");
const { decode } = require("../middlewares/authMiddleware");


const { Server } = require('socket.io');

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000', // Adjust based on your frontend
      methods: ['GET', 'POST'],
    },
  });

  //'connection', 'disconnect', 'error' ye built in event listener hai
  //'joinRoom', 'chatMessage' ye client side me define karna padega event listener
  /*frontend:
  socket.emit('chatMessage', {
  tripId: '63f1234567890abcdef12345', // ID of the trip
  userId: '63f543210fedcba987654321', // ID of the user
  message: 'Hello, everyone!',
});

  */ 


  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Handle chat messages
    socket.on('chatMessage', async (data) => {
      try {
        const { tripId, cookie, message } = data;
        //console.log("cookie:",cookie);
        const userObj = await decode(cookie);
        const userId  = userObj._id;

        // Validate input
        if (!tripId || !userId || !message) {
          //console.log(data);
          console.error('Invalid message data');
          return;
        }

        // Find the trip and add the message
        const trip = await Trip.findById(tripId);
        if (!trip) {
          console.error('Trip not found');
          return;
        }

        const newMessage = {
          user: userId,
          message: message,
          timestamp: new Date(),
        };

        trip.messages.push(newMessage);
        await trip.save();

        // Emit the message to all users in the room
        io.to(tripId).emit('newMessage', {
          user: userId,
          message: message,
          timestamp: newMessage.timestamp,
        });
      } catch (error) {
        console.error('Error handling chatMessage:', error);
      }
    });

    // Handle joining rooms
    socket.on('joinRoom', async (room) => {
      try {
        socket.join(room);
        console.log(`User joined room: ${room}`);

        // Retrieve previous messages for the room (trip)
        const trip = await Trip.findById(room).populate('messages.user', 'name');
        if (!trip) {
          console.error('Trip not found');
          return;
        }

        // Emit previous messages to the user who joined
        socket.emit('previousMessages', trip.messages);
      } catch (error) {
        console.error('Error handling joinRoom:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    })
  });
};
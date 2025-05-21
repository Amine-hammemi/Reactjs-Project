/*const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config'); // Import config
const http = require('http'); // Import http
const { Server } = require('socket.io');
const roomHandler = require('./handleRoom');



// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(config.dbURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Example test route
app.get('/', (req, res) => {
  res.json({ message: 'Hello, Aminos!' });
});

// Create the HTTP server
const server = http.createServer(app);

// Initialize Socket.IO on the HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", // Allow CORS for all origins (adjust as necessary)
  },
});

// Pass the Socket.IO instance to the room handler
roomHandler(io);

// Example route to create a new player
const Player = require('./models/player'); // Import Player model
app.post('/api/player', async (req, res) => {
  const { nickName } = req.body;

  try {
    // Check if the nickname already exists
    const existingPlayer = await Player.findOne({ nickName });

    if (existingPlayer) {
      // If nickname exists, send an error response
      return res.status(400).json({ error: 'Nickname already exists!' });
    }

    const newPlayer = new Player({ nickName });
    await newPlayer.save();
    res.status(201).json({ message: 'Player created successfully!', newPlayer });
  } catch (error) {
    res.status(500).json({ error: 'Error creating player', error });
  }
});

// Start the server
server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
*/

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config'); // Import config
const http = require('http'); // Import http
const { Server } = require('socket.io');
const roomHandler = require('./handleRoom');

const authRoutes = require('./authentification'); // Import authRoutes

// Initialize app
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',  // frontend URL
  credentials: true  // Allow credentials (cookies, session headers)
}));

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(config.dbURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Use the authentication routes
app.use('/api', authRoutes); // All auth routes will start with /api


// Create the HTTP server
const server = http.createServer(app);

// Initialize Socket.IO on the HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow CORS for all origins (adjust as necessary)
  },
});

// Pass the Socket.IO instance to the room handler
roomHandler(io);

// Start the server
server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

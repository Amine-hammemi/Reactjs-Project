const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Player = require('./models/player'); // Player model
const router = express.Router();

const JWT_SECRET = 'your-secret-key'; // Store this in an environment variable

// POST /player - Login or signup route
router.post('/player', async (req, res) => {
  const { nickName, password } = req.body;

  if (!nickName || !password) {
    return res.status(400).json({error : 'You must fill the fields !'})
  }

  try {
    const existingPlayer = await Player.findOne({ nickName });
    console.log("existingPlayer : ", existingPlayer);
    
    if (existingPlayer) {
      const isPasswordCorrect = await bcrypt.compare(password, existingPlayer.password);

      if (!isPasswordCorrect) {
        return res.status(400).json({ error: 'Incorrect password or nickName exists already !' });
      }

      // Generate JWT token
      const token = jwt.sign({ playerId: existingPlayer._id, nickName: existingPlayer.nickName }, JWT_SECRET, { expiresIn: '1d' });
      return res.status(200).json({ message: 'Player logged in!', token ,player:existingPlayer });
    }

    // If player doesn't exist, create a new one
    const hashedPassword = await bcrypt.hash(password, 10);
    const newPlayer = new Player({ nickName, password: hashedPassword });
    await newPlayer.save();

    // Generate JWT token
    const token = jwt.sign({ playerId: newPlayer._id, nickName: newPlayer.nickName }, JWT_SECRET, { expiresIn: '1d' });

    return res.status(201).json({ message: 'Player created and logged in!', token  , player:newPlayer});
  } catch (error) {
    return res.status(500).json({ error: 'Error handling login/signup', error });
  }
});

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Authorization header is case-insensitive
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token after 'Bearer'

  if (!token) {
    return res.status(403).json({ error: 'Access denied. No token provided.' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token.' });
    }
    req.player = decoded; // Attach player info to request
    next();
  });
};


// GET /check-auth - Protected route to check authentication status
router.get('/check-auth', verifyToken, (req, res) => {
  res.status(200).json({ loggedIn: true, player: req.player });
});

// POST /logout - Simply remove the token on the frontend
router.post('/logout', (req, res) => {
  return res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;

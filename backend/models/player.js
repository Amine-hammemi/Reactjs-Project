const mongoose = require('mongoose');

const playerInfoSchema = new mongoose.Schema({
  nickName: { type: String, required: true ,unique:true},
  rankPoints: { type: Number, default: 1500 }, // Add rank points
  gamesPlayed: { type: Number, default: 0 }, // Track number of games played
  gamesWon: { type: Number, default: 0 }, // Track number of games won
  password: { type: String, required: true},
});


const Player = mongoose.model('Player', playerInfoSchema);

module.exports = Player;

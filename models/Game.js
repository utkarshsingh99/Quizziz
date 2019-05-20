const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    },
    leaderboard: [{
        user: {
            type: String
        },
        score: {
            type: Number
        }
    }]
})

const Game = mongoose.model('Game', GameSchema)

module.exports = Game
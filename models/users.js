const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    date_of_birth: String,
    occupation: String,
    email: String,
    password: String,
    username: String,
    quizPlayed: [{
        quizId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Quiz'
        },
        score: Number
    }]
})

const User = mongoose.model('User', UserSchema)

module.exports = User
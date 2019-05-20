const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    date_of_birth: String,
    occupation: String,
    email: String,
    password: String,
    username: String
})

const User = mongoose.model('User', UserSchema)

module.exports = User
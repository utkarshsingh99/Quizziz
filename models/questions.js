const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    question: String,
    option1: String,
    option2: String,
    option3: String,
    option4: String,
    correct: Number
})

const Questions = mongoose.model('Questions', QuestionSchema)

module.exports = Questions
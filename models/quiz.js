const mongoose = require('mongoose')

const QuizSchema = new mongoose.Schema({
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Questions'
    }]
})

const Quiz = mongoose.model('Quiz', QuizSchema)

module.exports = Quiz
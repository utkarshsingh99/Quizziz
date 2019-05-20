const router = require('express').Router()

const Quiz = require('./../models/quiz')
const Questions = require('./../models/questions')
const Game = require('./../models/Game')
const User = require('./../models/users')
const auth = require('../middleware/auth')

router.get('/', (req, res) => {
    Quiz.find({}).then(quizzes => res.send(quizzes))
})

router.get('/:id', auth, (req, res) => {
    Quiz.findById(req.params.id)
        .then(quiz => {
            let questions = quiz.questions, counter = 0
            questions.forEach((question, index) => {
                Questions.findById(question)
                    .then(realQuestion => {
                        questions[index] = {question: realQuestion.question,
                            questionId: realQuestion._id,
                            option1: realQuestion.option1,
                            option2: realQuestion.option2,
                            option3: realQuestion.option3,
                            option4: realQuestion.option4}
                        counter++;
                        if (counter == questions.length) {
                            res.send(questions)
                        }
                    })
                
            })
        })
})

router.post('/answer', auth, (req, res) => {
    let quizId = req.body.quizId, questionId = req.body.questionId, answer = req.body.answer, userId = req.headers.token
    console.log(quizId, questionId, answer, userId)
    Questions.findById(questionId)
        .then(question => {
            if(question.correct == answer) {
                User.findById(userId)
                    .then(user => {
                        Game.findOneAndUpdate({ quiz: quizId, 'leaderboard.user': userId }, { $inc: { "leaderboard.$.score": 1 } })
                            .then(game => {                 // Finding if the user already is in leaderboard of the game, to increment his score
                                if(!game) {
                                    Game.findOneAndUpdate({ quiz: quizId }, { $push: { leaderboard: { user: user.username, score: 1 } } })
                                        .then(() => {       // If user is not present, a new entry into the game leaderboard
                                            User.findByIdAndUpdate(userId, { $push: { quizPlayed: { quizId, score: 1 } } })
                                                .then(() => {
                                                    res.send(200)
                                                })
                                        })
                                }
                                User.findOneAndUpdate({ _id: userId, 'quizPlayed.quizId': quizId }, { $inc: { "quizPlayed.$.score": 1 } })
                                    .then(() => res.send(200))
                            })
                    })
            }
        })
})

var quizfinder = (quizId) => quizId

module.exports = router
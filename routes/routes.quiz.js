const router = require('express').Router()

const Quiz = require('./../models/quiz')
const Questions = require('./../models/questions')
const Game = require('./../models/Game')
const User = require('./../models/users')

router.get('/', (req, res) => {
    Quiz.find({}).then(quizzes => res.send(quizzes))
})

router.get('/c', (req, res) => {
    const quiz = new Questions({})

    quiz.save().then(() => res.send('Done'))
})

router.get('/:id', (req, res) => {
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

router.post('/quiz/answer', (req, res) => {
    let quizId = req.body.quizId, questionId = req.body.questionId, answer = req.body.answer, userId = req.header.token
    Questions.findById(questionId)
        .then(question => {
            if(question.correct == answer) {
                User.findById(userId)
                    .then(user => {
                        // If User has not played game, then:
                        Game.findByIdAndUpdate(quizId, {$push: {leaderboard: {user: user.username, score: 1}}})
                        // If User has started playing the game, then update the score
                        // ...
                    })
            }
        })
})

module.exports = router
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const userRoutes = require('./routes/routes.user')
const quizRoutes = require('./routes/routes.quiz')

mongoose.connect('mongodb://localhost:27017/Quizziz', {useNewUrlParser: true}, () => console.log('DB Connected'));

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/user', userRoutes)
app.use('/quiz', quizRoutes)

app.get('/', (req, res) => {
    res.send('API is Working!')
})

app.listen(3000, () => console.log('Port Up'))
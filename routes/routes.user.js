const router = require('express').Router()

const User = require('../models/users')

router.post('/signup', (req, res) => {
    const user = new User({
        name: req.body.name,
        date_of_birth: req.body.dob,
        occupation: req.body.occupation,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username
    })

    user.save().then(user => res.send(user))
        .catch(e => res.send(e))
})

router.post('/login', (req, res) => {
    const username = req.body.username, password = req.body.password
    User.findOne({ username })
        .then(user => {
            if (user.password == password) {
                res.send(user._id)              // This ID should be used as a header token for all further user operations
            }
        })
})

module.exports = router
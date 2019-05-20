const mongoose = require('mongoose');

const User = require('../models/users')

var auth = (req, res, next) => {
    let userId = req.headers.token;
    User.findById(userId)
        .then(user => {
            if(user) {
                req.user = user
                next();
            } else {
               res.send(401) 
            }
        })
}

module.exports = auth
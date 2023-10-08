const mongoose = require('mongoose')

const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
    status: String,
    type: String,
    date: Date,
    area: String,
})

module.exports = User

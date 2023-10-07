/* Imports */
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

/*Config JSON response */
app.use(express.json())

/* Public Route - Open Route */
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem vindo ao Sebo Online!' })
})

/* Register User */
app.post('/auth/register', async (req, res) => {

    const {name, email, password, confirmpassword } = req.body

    /* Validations */
    if (!name) {
        return res.status(422).json({ msg: 'Obrigatório inserir um nome!' })
    }
})

/* Credentials */
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose
    .connect(
        `mongodb+srv://${dbUser}:${dbPassword}@cluster1.z6j4ded.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
        app.listen(3000)
        console.log('Conectado ao banco!')
    })
    .catch((err) => console.log(err))


/* Imports */
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

/*Config JSON response */
app.use(express.json())

/* Model */
const User = require('./models/User')

/* Public Route - Open Route */
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem vindo ao Sebo Online!' })
})

/* Private Route */
app.get('/user/:id', checkToken, async (req, res) => {

    const id = req.params.id

    /* Check User Exists */
    const user = await User.findById(id, '-password')

    if (!user) {
        return res.status(404).json({ msg: 'Usuário não encontrado!' })
    }

    res.status(200).json({user})
})

function checkToken(req, res, next) {

    const autHeader = req.headers['authorization']
    const token = autHeader && autHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({ msg: 'Acesso negado!' })
    }

    try {

        const secret = process.env.SECRET

        jwt.verify(token, secret)

        next()

    } catch(error) {
        res.status(400).json({ msg: 'Token inválido!' })
    }

}


/* Register User */
app.post('/auth/register', async (req, res) => {

    const { name, email, password, confirmpassword } = req.body

    /* Validations */
    if (!name) {
        return res.status(422).json({ msg: 'Obrigatório inserir o nome!' })
    }

    if (!email) {
        return res.status(422).json({ msg: 'Obrigatório inserir o email!' })
    }

    if (!password) {
        return res.status(422).json({ msg: 'Obrigatório inserir a senha!' })
    }

    if (password !== confirmpassword) {
        return res.status(422).json({ msg: 'As senhas são diferentes!' })
    }

    /* Check user exists */
    const userExists = await User.findOne({ email: email })

    if (userExists) {
        return res.status(422).json({ msg: 'E-mail já cadastrado, por favor utilize outro e-mail!' })
    }

    /* Create password */
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    /* Create user */
    const user = new User({
        name,
        email,
        password: passwordHash,
    })

    try {

        await user.save()

        res.status(201).json({ msg: 'Usuário criado com sucesso!' })

    } catch (error) {
        console.log(error)

        res.status(500).json({ msg: 'Erro no servidor, tente novamente mais tarde!' })

    }
})

/* Login User */
app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body

    /* validations */
    if (!email) {
        return res.status(422).json({ msg: 'Obrigatório inserir o email!' })
    }

    if (!password) {
        return res.status(422).json({ msg: 'Obrigatório inserir a senha!' })
    }

    /* Check user exists */
    const user = await User.findOne({ email: email })

    if (!user) {
        return res.status(404).json({ msg: 'Usuário não encontrado!' })
    }

    /* Check password match */
    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
        return res.status(422).json({ msg: 'Senha inválida!' })
    }

    try {

        const secret = process.env.SECRET

        const token = jwt.sign(
            {
                id: user._id,
            },
            secret,
        )

        res.status(200).json({ msg: 'Autenticação realizada com sucesso!', token })

    } catch (err) {
        console.log(error)

        res.status(500).json({ msg: 'Erro no servidor, tente novamente mais tarde!' })

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


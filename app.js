require('dotenv').config()
const express = require('express')
const path = require('path')
const fs = require('fs')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

const options = {
    origin: ['http://localhost:3000', 'http://localhost:3001', 'https://zepto-clone-frontend.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
}

app.use(cors(options))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'assets')))

const Admin = require('./routes/Admin')
const User = require('./routes/User')
const { METHODS } = require('http')

app.use(Admin)
app.use(User)

app.use((err, req, res, next) => {
    return res.status(err.code).json({
        success: false,
        code: err.code,
        message: err.message
    })
})

// app.listen(4000, ()=> {
//     console.log("server start 4000")
// })


// const person = {
//     name: 'Max',
//     age: 50
// }

// const copiydPerson = person
// person.name = 'BOB'

// console.log(person.name);
// console.log(copiydPerson.name)

// for (var i = 0; i < 5; i++) {
//     setTimeout(() => {
//         console.log(i)
//     }, 1000)
// }

//4000,5000,8080
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//         console.log("Database Connected!");

//         app.listen(4000, () => {
//             console.log("Server was running 4000")
//         })
//     }).catch((error) => {
//         console.log(error.message)
//     })

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database Connected!");
    app.listen(4000, () => console.log("Server running on 4000"));
  })
  .catch((err) => console.log(err.message));

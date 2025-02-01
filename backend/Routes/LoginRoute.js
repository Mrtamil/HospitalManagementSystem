const express = require('express')
const Middle_Route = express.Router()
const {CreateTable, Login, GetPerson } = require('../Controler/AuthControl')
const Auth = require('../Middleware/AuthMiddle')


Middle_Route.post("/register", CreateTable)
Middle_Route.post("/login", Login)
Middle_Route.get("/user", Auth,GetPerson)

module.exports = Middle_Route
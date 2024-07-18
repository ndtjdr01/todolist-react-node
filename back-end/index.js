const express = require('express')
const app = express()
const todoRouter = require('./model/router')

require('./database')

app.use(express.json())

app.use('/api/todo/',todoRouter)

app.listen(5000,()=> console.log('listening on port...5000'))
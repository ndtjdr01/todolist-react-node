
const express = require('express')
const todoRouter = express.Router()

const {fetchTodoList, createTodoList, updateTodoList, deleteTodoList} = require('./controller')

todoRouter.get('/', fetchTodoList)
todoRouter.post('/add-todo', createTodoList)
todoRouter.delete('/delete-todo/:id', deleteTodoList)
todoRouter.put('/update-todo/:id', updateTodoList)

module.exports = todoRouter
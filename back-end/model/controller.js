

const Todolist = require('./todolist')
const mongoose = require('mongoose')


const fetchTodoList = async (req, res) => {
    try {
        const todos = await Todolist.find()
        res.status(200).json(todos)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const createTodoList = async (req, res) => {
    const { text } = req.body
    const currentDate = new Date()
    const todos = new Todolist({
        text,
        date: currentDate,
    })
    try {
        const session = await mongoose.startSession()
        session.startTransaction()
        await todos.save(session)
        await session.commitTransaction()
        session.endSession()
        res.status(200).json({todos})
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteTodoList = async (req, res) => {
    try {
        const todos = await Todolist.findByIdAndDelete(req.params.id)
        if (!todos) return res.status(404).json({ message: 'Todo not found' })
        res.status(200).json(todos)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateTodoList = async (req, res) => {
    try {
        const { text,completed} = req.body
        const todos = await Todolist.findByIdAndUpdate(req.params.id, { text,completed },{new:true})
        return res.status(200).json(todos)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = { fetchTodoList, createTodoList, updateTodoList, deleteTodoList }

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todolistSchema = new Schema({
    id:{
        type: Number
    },
    text: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Todolist', todolistSchema)
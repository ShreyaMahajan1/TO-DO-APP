// todoModel.js

const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    ToDoTitle: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ToDo', todoSchema);

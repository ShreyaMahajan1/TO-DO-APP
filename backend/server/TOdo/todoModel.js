const mongoose = require("mongoose")

const ToDoSchema = new mongoose.Schema({
    ToDoTitle: { type: String, default: null },
   
    
    status: { type: Boolean},
    createdAt: { type: Date, default: Date.now() },
})

module.exports = new mongoose.model("todos",ToDoSchema)
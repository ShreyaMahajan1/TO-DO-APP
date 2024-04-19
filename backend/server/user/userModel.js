const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: { type: String, default: null },
    email: { type: String, default: null },
    password: { type: String, default: null },
    userType: { type: Number, default: null }, //1-admin,2-customer
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },
})

module.exports = new mongoose.model("users",userSchema)
const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true, required: true },
    password: String,
});

const billschema = new mongoose.Schema({
    units : Number,
    value : Number,
    userid : String
})

const User = mongoose.model("User" , userschema);
const Bill = mongoose.model("Bill" , billschema);
module.exports = {  User , Bill };
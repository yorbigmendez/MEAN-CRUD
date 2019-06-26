const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var employeeSchema = new Schema({
    employeeId: Number,
    name: String,
    picture: String, // base64
    phoneNumber: String,
    email: String,
    hireDate: String,
    managerId: String
})

module.exports = mongoose.model('Employee', employeeSchema);
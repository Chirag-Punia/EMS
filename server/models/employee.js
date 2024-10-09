const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    uniqueId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobileNo: { type: String, required: true },
    designation: { type: String, required: true },
    gender: { type: String, required: true },
    course: { type: String, required: true },
    createDate: { type: Date, required: true },
    image: { type: String }, 
});

module.exports = mongoose.model('Employee', employeeSchema);

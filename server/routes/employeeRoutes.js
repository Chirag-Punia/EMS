const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const employee = new Employee(req.body);
    try {
        const savedEmployee = await employee.save();
        res.status(201).json(savedEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.put('/', async (req, res) => {
    console.log("PUT request received");
    console.log("Body:", req.body);

    const { _id, ...updateData } = req.body;

    if (!_id) {
        return res.status(400).json({ message: 'Employee ID is required' });
    }

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(_id, updateData, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        console.log("Updated employee:", updatedEmployee);
        res.json(updatedEmployee);
    } catch (err) {
        console.error("Error updating employee:", err);
        res.status(400).json({ message: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: 'Deleted employee' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

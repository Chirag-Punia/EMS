const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});
const upload = multer({ storage });


router.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));


router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


async function checkDuplicateEntry(req, res, next) {
    const { uniqueId, email } = req.body;
    const existingEmployee = await Employee.findOne({ $or: [{ uniqueId }, { email }] });

    if (existingEmployee) {
        return res.status(409).json({
            message: "Duplicate entry: Employee with the same Unique ID or Email already exists.",
        });
    }
    next();
}


router.post('/', upload.single('image'), checkDuplicateEntry, async (req, res) => {
    const employeeData = req.body;
    if (req.file) {
        employeeData.image = `http://localhost:5002/uploads/${req.file.filename}`;
    }
    const employee = new Employee(employeeData);
    try {
        const savedEmployee = await employee.save();
        res.status(201).json(savedEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.put('/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;


    const duplicate = await Employee.findOne({
        $and: [
            { _id: { $ne: id } },
            { $or: [{ uniqueId: updateData.uniqueId }, { email: updateData.email }] },
        ],
    });

    if (duplicate) {
        return res.status(409).json({
            message: "Duplicate entry: Employee with the same Unique ID or Email already exists.",
        });
    }

    if (req.file) {
        updateData.image = `http://localhost:5002/uploads/${req.file.filename}`;
    }

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(updatedEmployee);
    } catch (err) {
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

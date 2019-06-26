var express = require('express');
var router = express.Router();
require('../schemas/Employee.js');
var EmployeeModel = require('mongoose').model('Employee');
// Get employee
router.get('', (req, res) => {
    EmployeeModel.find({}, function (error, documents) {
        res.json(documents)
    })
})
// Update
router.put('', (req, res) => {
    EmployeeModel.findOne({ employeeId: req.body.employeeId }, function (err, doc) {
        if (err) {
            console.log('Error');
        }
        if (doc) {
            doc.employeeId = req.body.employeeId;
            doc.name = req.body.name;
            doc.picture = req.body.picture;
            doc.phoneNumber = req.body.phoneNumber;
            doc.email = req.body.email;
            doc.hireDate = req.body.hireDate;
            doc.managerId = req.body.managerId;
            doc.save();
            res.json(doc);
        }
    })
})

// Create an employee
router.post('', (req, res) => {
    let savedata = new EmployeeModel({
        'employeeId': req.body.employeeId,
        'name': req.body.name,
        'picture': req.body.picture,
        'phoneNumber': req.body.phoneNumber,
        'email': req.body.email,
        'hireDate': req.body.hireDate,
        'managerId': req.body.managerId
    }).save(function (err, result) {
        if (err) throw err;
        if (result) {
            res.json(result)
        }
    })
})

// Delete an employee
router.post('/delete', (req, res) => {
    EmployeeModel.deleteOne({ employeeId: req.body.employeeId }, (err, result) => {
        if (err) throw err;
        if (result) {
            res.json(result)
        }
    })
})
module.exports = router;
const express = require("express");
const router = express.Router();
const studentService = require("../services/student_management_system.service");
const validateRequest = require("../_middleware/validate-request");
const joi = require("joi");

module.exports = router;

router.post("/login",authenticateStudent)
router.get("/", getAll);
router.get("/:id", getById);
router.post("/create", crateSchema, crateStudent);
router.put("/update", updateSchema, updateStudent);
router.delete("/delete", deleteStudent)
router.post("/filters", filters);

function authenticateStudent(req, res,next) {
    studentService
        .studentAuth(req.body)
        .then((student) => res.json({
            message: "Login successfull...!",
            student
        }))
        .catch(next)
}

function getAll(req, res, next) {
    studentService
        .getAllStudents()
        .then((students) => res.json(students))
        .catch(next)
}

function getById(req, res, next) {
    studentService
        .getStudentById(req.params.id)
        .then((student) => res.json(student))
        .catch(next)
}

function crateStudent(req, res, next) {
    studentService
        .crateStudent(req.body)
        .then(() => res.json({ message: "Student Crated Successfully...!" }))
        .catch(next)
}

function updateStudent(req, res, next) {
    studentService
        .updateStudent(req.body)
        .then(() => res.json({ message: "Student update successfully...!" }))
        .catch(next)
}

function deleteStudent(req, res, next) {
    studentService
        .deleteStudent(req.query)
        .then(() => res.json({ message: "Student delete successfully...!" }))
        .catch(next)
}

function filters(req, res, next) {
    studentService
        .studentFilters(req.body)
        .then((filter) => res.json(filter))
        .catch(next)
}




//schemas

function crateSchema(req, res, next) {
    const schema = joi.object({
        studentName: joi.string().required(),
        studentAge: joi.number().required(),
        studentContact: joi.string().min(10).max(10).required(),
        studentPRN: joi.string().required(),
        studentEmail: joi.string().email().required(),
        studentRollNumber: joi.number().required(),
        studentDOB: joi.date().required(),
        studentAddress: joi.string().required(),
        studentPassword: joi.string().min(8).required(),
        studentCurrentYear: joi.string().required(),
        studentCourse: joi.string().required(),
        studentAdmissionDate: joi.date().required(),
        confirmPassword:joi.string().min(8).required()
    });

    validateRequest(req, next, schema);
}
function updateSchema(req, res, next) {
    const schema = joi.object({
        studentName: joi.string(),
        studentAge: joi.number(),
        studentContact: joi.string().min(10).max(10),
        studentPRN: joi.string(),
        studentEmail: joi.string().email(),
        studentRollNumber: joi.number(),
        studentDOB: joi.date(),
        studentAddress: joi.string(),
        studentPassword: joi.string().min(8),
        studentCurrentYear: joi.string(),
        studentCourse: joi.string(),
        studentAdmissionDate: joi.date(),
        confirmPassword:joi.string().min(8).required()
    });

    validateRequest(req, next, schema);
}
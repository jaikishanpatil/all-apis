const { Op } = require("sequelize");
const db = require("../db/db");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

module.exports = {
    getAllStudents,
    getStudentById,
    crateStudent,
    updateStudent,
    deleteStudent,
    studentFilters,
    studentAuth
}

async function studentAuth(params) {
    const student = await studetLoginByPrnOrEmailAndPAssword(params)
    const token = jwt.sign({ sub: student.studentPRN }, config.secret, {
        expiresIn: '1800s'
    });
    return {
        ...student,
        token
    }
}

async function getAllStudents() {
    const users= await db.student_system.findAll();
    const students=[]
    users.forEach(x => {
        x=omitPassword(x.dataValues)
        students.push(x)
    });
    return students
}

async function getStudentById(id) {
    const student = await getById(id);
    return {
        ...omitPassword(student.dataValues)
    };
}

async function crateStudent(params) {
    if (await db.student_system.findOne({ where: { studentEmail: params.studentEmail } })) {
        throw `Email '${params.studentEmail}' is alredy registred`;
    }
    if (await db.student_system.findOne({ where: { studentPRN: params.studentPRN } })) {
        throw `PRN '${params.studentPRN}' is alredy registred`;
    }

    if (params.studentPassword && params.studentPassword === params.confirmPassword) {
        const student = new db.student_system(params);
        student.studentPassword = await bcrypt.hash(params.studentPassword, 10);
        await student.save();
    } else {
        throw `Password dosen't match with confirm password`;
    }
}

async function updateStudent(params) {
    const student = await getByPrnOREmail(params);

    const emailChanged = params.studentEmail && params.studentEmail !== student.studentEmail;
    if (emailChanged && (await db.student_system.findOne({ where: { studentEmail: params.studentEmail } }))) {
        throw `Email '${params.studentEmail}' is alredy registred`
    }

    if (params.studentPassword) {
        params.studentPassword = await bcrypt.hash(params.studentPassword, 10);
    }
    Object.assign(student, params);
    await student.save();
}

async function deleteStudent(params) {
    const student = await getByPrnOREmail(params);
    await student.destroy();
}

async function studentFilters(params) {
    const filters = {};

    const {
        search,
        createdAtStart,
        createdAtEnd,
        updatedAtStart,
        updatedAtEnd,
        sortBy,
        sortOrder,
        studentCurrentYearstart,
        studentCurrentYearEnd,
        studentCourse,
        studentAdmissionDateStart,
        studentAdmissionDateEnd,
        studentAgeStart,
        studentAgeEnd
    } = params

    if (createdAtStart) {
        filters.createdAt = {
            [Op.gte]: new Date(createdAtStart)
        }
    }
    if (createdAtEnd) {
        filters.createdAt = {
            [Op.lte]: new Date(createdAtEnd)
        }
    }
    if (updatedAtStart) {
        filters.updatedAt = {
            [Op.gte]: new Date(updatedAtStart)
        }
    }
    if (updatedAtEnd) {
        filters.updatedAt = {
            [Op.lte]: new Date(updatedAtEnd)
        }
    }
    if (studentCourse) {
        filters.studentCourse = studentCourse;
    }
    if (studentAdmissionDateStart) {
        filters.studentAdmissionDate = {
            [Op.gte]: new Date(studentAdmissionDateStart)
        }
    }
    if (studentAdmissionDateEnd) {
        filters.studentAdmissionDate = {
            [Op.lte]: new Date(studentAdmissionDateEnd)
        }
    }
    if (studentAgeStart) {
        filters.studentAge = {
            [Op.gte]: studentAgeStart
        }
    }
    if (studentAgeEnd) {
        filters.studentAge = {
            [Op.lte]: studentAgeEnd
        }
    }

    const sorting = [];
    if (sortBy && sortOrder) {
        const order = sortOrder.toLowerCase() === 'asc' ? "ASC" : "DESC";
        sorting.push([sortBy, order]);
    }

    const result = await db.student_system.findAll({
        where: {
            [Op.or]: [
                { studentName: { [Op.like]: `%${search || ""}%` } },
                { studentContact: { [Op.like]: `%${search || ""}%` } },
                { studentPRN: { [Op.like]: `%${search || ""}%` } },
                { studentEmail: { [Op.like]: `%${search || ""}%` } },
                { studentCourse: { [Op.like]: `%${search || ""}%` } }
            ],
            ...filters
        },
        order: sorting
    });
    return result;
}






// helper functions
async function studetLoginByPrnOrEmailAndPAssword(params) {
    const user = await db.student_system.findOne({
        where: {
            [Op.or]: [{ studentEmail: params.studentEmail || null }, { studentPRN: params.studentPRN || null }]
        }
    });

    if (!user) throw "Student not found...!";

    const passwordMatched = await bcrypt.compare(params.studentPassword, user.studentPassword);
    if (!passwordMatched) throw "Username or password dose not match";

    return {
        ...omitPassword(user.dataValues)
    }
}

async function getById(id) {
    const student = await db.student_system.findByPk(id);
    if (!student) throw "Student not found....!"

    return student;
}

async function getByPrnOREmail(params) {
    const student = await db.student_system.findOne({
        where: {
            [Op.and]: [{ studentEmail: params.studentEmail }, { studentPRN: params.studentPRN }]
        }
    });
    if (!student) throw "Email or PRN dosent match with database";

    return student;
}

function omitPassword(student) {
    const { studentPassword, ...studentWithoutPass } = student;
    return studentWithoutPass;
}
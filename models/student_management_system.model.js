const { DataTypes, Sequelize } = require("sequelize");

module.exports = student_management;

function student_management(sequelize) {
    const attributes = {
        studentName: { type: DataTypes.STRING, allowNull: false },
        studentAge: { type: DataTypes.INTEGER, allowNull: false },
        studentContact: { type: DataTypes.STRING, allowNull: false },
        studentPRN: { type: DataTypes.STRING, allowNull: false, unique: "studentPRN" },
        studentEmail: { type: DataTypes.STRING, allowNull: false },
        studentRollNumber: { type: DataTypes.INTEGER, allowNull: true },
        studentDOB: { type: DataTypes.DATEONLY, allowNull: false },
        studentAddress: { type: DataTypes.STRING, allowNull: false },
        studentPassword: { type: DataTypes.STRING, allowNull: false },
        studentCurrentYear: { type: DataTypes.STRING, allowNull: false },
        studentCourse: { type: DataTypes.STRING, allowNull: false },
        studentAdmissionDate: { type: DataTypes.DATE, allowNull: false },
        studentImage: { type: DataTypes.BLOB, allowNull: true },
    }
    const options = {
        defaultScope: {

        },
        scopes: {
            withHash: { attributes: {} }
        }
    }

    return sequelize.define("student_system", attributes, options);
}
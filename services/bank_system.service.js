const { Op } = require("sequelize");
const db = require("../db/db");

module.exports = {
    getAllUsers,
    getUserById,
    crateUser,
    updateUser,
    deleteUser,
    filters
}

async function getAllUsers() {
    return await db.bank_system.findAll();
}

async function getUserById(id) {
    const user = await getById(id);
    return user.dataValues;
}

async function crateUser(params) {
    if (await db.bank_system.findOne({ where: { accountEmail: params.accountEmail } })) {
        throw `Email '${params.accountEmail}' is alredy registred`;
    }
    if (await db.bank_system.findOne({ where: { accountAdhar: params.accountAdhar } })) {
        throw `Adhar Card number '${params.accountAdhar}' is alredy registred`;
    }
    if (await db.bank_system.findOne({ where: { accountPanCard: params.accountPanCard } })) {
        throw `Pan card number '${params.accountPanCard}' is alredy registred`;
    }
    if (await db.bank_system.findOne({ where: { accountNumber: params.accountNumber } })) {
        throw `Account number is alredy exist`;
    }

    const user = new db.bank_system(params);
    await user.save();
}

async function updateUser(params) {
    const user = await getUserByEmailAndAccountNumber(params);
    const emailChanged = params.accountEmail && params.accountEmail !== user.accountEmail;
    if (emailChanged && (await db.bank_system.findOne({ where: { accountEmail: params.accountEmail } }))) {
        throw `Email ${params.accountEmail} is alredy registred`;
    }
    const accountNumberChanged = params.accountNumber && params.accountNumber !== user.accountNumber;
    if (accountNumberChanged && (await db.bank_system.findOne({ where: { accountNumber: params.accountNumber } }))) {
        throw `Account number ${params.accountNumber} is alredy exiest`;
    }
    const adharCardChanged = params.accountAdhar && params.accountAdhar !== user.accountAdhar;
    if (adharCardChanged && (await db.bank_system.findOne({ where: { accountAdhar: params.accountAdhar } }))) {
        throw `Adhar Card number '${params.accountAdhar}' is alredy registred`;
    }
    const panCardChanged = params.accountPanCard && params.accountPanCard !== user.accountPanCard;
    if (panCardChanged && (await db.bank_system.findOne({ where: { accountPanCard: params.accountPanCard } }))) {
        throw `Pan card '${params.accountPanCard}' is alredy registred`;
    }

    Object.assign(user, params);
    await user.save();

}

async function deleteUser(params) {
    const user = await getUserByEmailAndAccountNumber(params)
    await user.destroy();
}

async function filters(params) {
    const filters = {};
    const {
        search,
        accountType,
        isVerified,
        isClosed,
        accountOpenDate,
        accountCloseDate,
        branchCode,
        branchName,
        minBalance,
        maxBalance,
        sortBy,
        sortOrder,
        accountEmail
    } = params

    if (accountType && Array.isArray(accountType)) {
        filters.accountType = {
            [Op.in]: accountType
        }
    }
    if (isVerified) {
        filters.isVerified = isVerified
    }
    if (isClosed) {
        filters.isClosed = isClosed
    }
    if (accountOpenDate) {
        filters.accountOpenDate = {
            [Op.gte]: new Date(accountOpenDate)
        }
    }
    if (accountCloseDate) {
        filters.accountCloseDate = {
            [Op.lte]: new Date(accountCloseDate)
        }
    }
    if (branchCode) {
        filters.branchCode = branchCode
    }
    if (branchName) {
        filters.branchName = {
            [Op.like]: `%${branchName}%`
        }
    }
    if (accountEmail) {
        filters.accountEmail = {
            [Op.like]: `%${accountEmail}%`
        }
    }
    if (minBalance) {
        filters.balance = {
            [Op.gte]: parseFloat(minBalance)
        }
    }
    if (maxBalance) {
        filters.balance = {
            [Op.lte]: parseFloat(maxBalance)
        }
    }

    const sorting = [];
    if (sortBy && sortOrder) {
        const order = sortOrder.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
        sorting.push([sortBy, order])
    }

    const result = await db.bank_system.findAll({
        where:{
            [Op.or]:[
                {accountNumber:{[Op.like]:`%${search || ""}%`}},
                {accountEmail:{[Op.like]:`%${search || ""}%`}},
                {accountOwnerName:{[Op.like]:`%${search || ""}%`}},
                {address:{[Op.like]:`%${search || ""}%`}}
            ],
            ...filters,
        },
        order:sorting,
    })
    return result;
}





//helper function 

async function getById(id) {
    const user = await db.bank_system.findByPk(id);
    if (!user) throw "User not found...!"

    return user
}

async function getUserByEmailAndAccountNumber(params) {
    const user = await db.bank_system.findOne({
        where: {
            [Op.or]: [{ accountEmail: params.accountEmail }, { accountNumber: params.accountNumber }]
        }
    })
    if (!user) throw "Account number or account email dosen't match";

    return user;
}
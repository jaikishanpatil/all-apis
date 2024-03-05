const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const db = require("../db/db");
const config = require("../config/config");

module.exports = {
    getAllProducts,
    getProductById,
    crateProduct,
    updateProduct,
    deleteProduct,
    filterData,
    fileUpload,
    fileUploadMultiple
}


async function getAllProducts() {
    return db.Product.findAll();
}

async function getProductById(id) {
    const product = await getProduct(id);
    return product.dataValues;
}

async function crateProduct(params) {
    // if(await db.Product.findOne({where:{}})){

    // }
    const product = new db.Product(params);
    await product.save();
}

async function updateProduct(id, params) {
    const product = await getProduct(id);
    Object.assign(product, params);
    await product.save();
}

async function deleteProduct(id) {
    const product = await getProduct(id);
    await product.destroy();
}

async function filterData(params) {
    const filters = {};
    const { 
        search,
        productName,
        productCategory,
        minPrice,
        maxPrice,
        createdAfter,
        createdBefore,
        updatedAfter,
        updatedBefore,
        sortBy,
        sortOrder } = params      // new add can be {brand, color, size , rating}
    if (productName) {
        filters.productName = {
            [Op.like]: `%${productName}%`
        }
    }
    // if (productCategory) {    this is for single category 
    //     filters.productCategory ={
    //         [Op.like]: `%${productCategory}%`
    //     }
    // }
    if (productCategory && Array.isArray(productCategory)) {  // this is for multiple category array
        filters.productCategory = {
            [Op.in]: productCategory
        };
    }
    if (minPrice) {
        filters.productPrice = {
            [Op.gte]: minPrice
        }
    }
    if (maxPrice) {
        filters.productPrice = {
            [Op.lte]: maxPrice
        }
    }
    if (createdAfter) {
        filters.createdAt = {
            [Op.gte]: new Date(createdAfter)
        }
    }
    if (createdBefore) {
        filters.createdAt = {
            ...filters.createdAt,
            [Op.lte]: new Date(createdBefore)
        }
    }
    if (updatedAfter) {
        filters.updatedAt = {
            [Op.gte]: new Date(updatedAfter)
        }
    }
    if (updatedBefore) {
        filters.updatedAt = {
            ...filters.updatedAt,
            [Op.lte]: new Date(updatedBefore)
        }
    }

    // Filters for Array things 
    // if (gender && Array.isArray(gender)) {
    //     filter.gender = {
    //         [Op.in]: gender
    //     };
    // }
    // if (category && Array.isArray(category)) {
    //     filter.category = {
    //         [Op.in]: category
    //     };
    // }
    // if (brand) {
    //     filters.brand = {
    //         [Op.like]: brand
    //     }
    // }
    // if (color && Array.isArray(color)) {
    //     filters.color = {
    //         [Op.in]: color
    //     }
    // }
    // if (size && Array.isArray(size)) {
    //     filters.size = {
    //         [Op.in]: size
    //     }
    // }
    // if (rating) {
    //     filters.rating = {
    //         [Op.gte] : rating
    //     }
    // }
    const sorting = [];
    if (sortBy && sortOrder) {
        const order = sortOrder.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
        sorting.push([sortBy, order])
    }
    const result = await db.Product.findAll({
        where: {
            [Op.or]: [
                { productName: { [Op.like]: `%${search || ""}%` } },
                { productCategory: { [Op.like]: `%${search || ""}%` } },
            ],
            ...filters
        },
        order: sorting
    });
    return result;
}

//helper function
async function getProduct(id) {
    const product = await db.Product.findByPk(id);
    if (!product) throw "Product not found";

    return product;
}


// file upload
async function fileUpload(req,res) {
    const file = req.file
    console.log(file ," file")
    if(!file){
        return new Error("Please select the file");
    }
    await res.send(file);
}
async function fileUploadMultiple(req,res) {
    const files = req.files
    console.log(files ," files")
    if(!files){
        return new Error("Please select the file");
    }
    await res.send(files);
}
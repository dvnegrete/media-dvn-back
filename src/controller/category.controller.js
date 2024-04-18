const { request, response } = require('express');
const Category = require('../models/Category');

const getCategory = async (req = request, res = response) => {
    try {
        const findCategory = await Category.find();
        if (!findCategory) {
            res.status(400).json({
                msg: 'Category already exists'
            });
        }

        res.json({
            findCategory
        });
    } catch (error) {
        console.error(error);
    }
}

const createCategory = async (req, res = response) => {
    const { name } = req.body;
    try {
        const findCategory = await Category.findOne({ name });
        if (findCategory) {
            res.status(400).json({
                msg: 'Category already exists'
            });
        }
        const category = new Category(req.body);
        await category.save();
        res.json({
            category,
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getCategory,
    createCategory,
    // updateUsers, 
    // deleteUsers
}
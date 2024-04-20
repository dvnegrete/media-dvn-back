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
        res.json(findCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error Server" })
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
        res.json(
            category,
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Internal Error Server",
            info: error.message
        })
    }
}

const updatedCategory = async (req, res = response) => {
    // const { name } = req.body;
    // try {
    //     const category = await Category.findOne({ name });
    //     if (!category) {
    //         res.status(404).json({
    //             msg: 'Not Found'
    //         });
    //     }
    //     await Category.findByIdAndDelete(category);
    //     res.json({
    //         msg: `Category ${name} deleted`
    //     });
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ msg: "Internal Error Server" })
    // }
}

const deleteCategory = async (req, res = response) => {
    const { name } = req.body;
    try {
        const category = await Category.findOne({ name });
        if (!category) {
            res.status(404).json({
                msg: 'Not Found'
            });
        }
        await Category.findByIdAndDelete(category);
        res.json({
            msg: `Category ${name} deleted`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error Server" })
    }
}

module.exports = {
    getCategory,
    createCategory,
    updatedCategory,
    deleteCategory
}
const { request, response } = require('express');
const Theme = require('../models/Theme');
const Category = require('../models/Category');

const getTheme = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const findTheme = await Theme.findById( id ).populate('categories');
        if (!findTheme) {
            res.status(400).json({
                msg: 'Not found'
            });
        }
        else {
            res.json(findTheme);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error Server" })
    }
}
const getThemeAll = async (req = request, res = response) => {
    try {
        const findTheme = await Theme.find().populate('categories');
        if (!findTheme) {
            res.status(400).json({
                msg: 'Not found'
            });
        }
        else {
            res.json(findTheme);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error Server" })
    }
}

const createTheme = async (req = request, res = response) => {

    const { name, description, categories } = req.body;
    try {
        const findTheme = await Theme.findOne({ name });
        if (findTheme) {
            res.status(409).json({
                msg: 'the theme already exists'
            });
        } else {
            const theme = new Theme({ name, description });
            for (const categoryName of categories) {
                const category = await Category.findOne({ name: categoryName });
                if (!category) {
                    return res.status(400).json({
                        msg: `${categoryName} not found`
                    });
                }
                theme.categories.push(category._id);
            }
            await theme.save();
            res.json(theme);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error Server" })
    }
}

const updateTheme = async (req = request, res = response) => {
    const { name } = req.body;
    try {
        const updated = { ...req.body, categories: [...req.body.categories] }
        console.log("!!>>>>>>>CORREGIR", updated);
        const theme = await Theme.findOneAndUpdate({ name }, updated, { new: true });
        if (!theme) {
            res.status(404).json({
                msg: 'Not Found'
            });
        }
        res.json({ theme });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error Server" })
    }
}

const deleteTheme = async (req, res = response) => {
    const { name } = req.body;
    try {
        const theme = await Theme.findOne({ name });
        if (!theme) {
            res.status(404).json({
                msg: 'Not Found'
            });
        }
        await Theme.findByIdAndDelete(theme);
        res.json({
            msg: `Theme ${name} deleted`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error Server" })
    }
}

module.exports = {
    getTheme,
    getThemeAll,
    createTheme,
    updateTheme,
    deleteTheme
}
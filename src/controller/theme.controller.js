const { request, response } = require('express');
const Theme = require('../models/Theme');
const Category = require('../models/Category');

const createTheme = async (req = request, res = response) => {
    const { name, description, categories } = req.body;
    try {
        const findName = await Theme.findOne({ name });
        if (findName) {
            res.status(400).json({
                msg: 'the theme already exists '
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
            res.json({
                theme,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

module.exports = {
    createTheme,
    // updateUsers, 
    // deleteUsers
}
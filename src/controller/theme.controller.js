const { request, response } = require('express');
const Theme = require('../models/Theme');

const createTheme = async (req, res = response) => {
    const { name, description } = req.body;
    try {
        const findName = await Theme.findOne({ name });
        if (findName) {
            res.status(400).json({
                msg: 'the theme already exists '
            });
        }
        const theme = new Theme(req.body);
        await theme.save();
        res.json({
            user: theme,
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    createTheme,
    // updateUsers, 
    // deleteUsers
}
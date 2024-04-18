const { request, response } = require('express');
const Category = require('../models/Category');

const getCategory = async (req = request, res = response) => {

    // const category = await Category.find();
    // res.json({
    //     category,
    // });

    console.log("CONTROLLER category");
     res.json({
       msg: "ahi vamos..."
    });
}

const createCategory = async (req, res = response) => {
    const { email } = req.body;
    try {
        const findEmail = await Category.findOne({ email });
        if (findEmail) {
            res.status(400).json({
                msg: 'Usuario ya registrado....'
            });
        }
        const user = new Category(req.body);
        await user.save();
        res.json({
            user,
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
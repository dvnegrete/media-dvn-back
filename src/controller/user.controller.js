const { request, response } = require('express');
const User = require('../models/User');

const getUsers = async (req = request, res = response) => {

    const users = await User.find();
    res.json({
        users,
    });
}

const createUsers = async (req = request, res = response) => {
    const { email } = req.body;
    try {
        const findEmail = await User.findOne({ email });
        if (findEmail) {
            res.status(400).json({
                msg: 'User already exists'
            });
        }
        const user = new User(req.body);
        await user.save();
        res.status(200).json({
            user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: error.message
        })
    }
}

const deleteUsers = async (req = request, res = response) => {
    const { email, username } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({
                msg: 'Not Found'
            });
        }
        await User.findByIdAndDelete(user);
        res.json({
            msg: `${username} deleted`
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getUsers,
    createUsers,
    // updateUsers, 
    deleteUsers
}
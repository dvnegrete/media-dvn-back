const { request, response } = require('express');
const User = require('../models/User');

const getUsers = async (req = request, res = response) => {
    try {
        const users = await User.find();
        res.json(users);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error Server" })
    }
}

const createUsers = async (req = request, res = response) => {
    const { username } = req.body;
    try {
        const findUsername = await User.findOne({ username });
        if (findUsername) {
            res.status(400).json({ msg: "Username not available" });
        } else {
            const user = new User(req.body);
            await user.save();
            res.status(200).json(user);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error Server" })
    }
}

const updateUsers = async (req = request, res = response) => {
    const { email } = req.body;
    try {
        const user = await User.findOneAndUpdate({ email }, req.body, { new: true });
        if (!user) {
            res.status(404).json({
                msg: 'Not Found'
            });
        }
        res.json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error Server" })
    }
}

const deleteUsers = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.json({ msg: `remove user ${id}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error Server" })
    }
}

module.exports = {
    getUsers,
    createUsers,
    updateUsers,
    deleteUsers
}
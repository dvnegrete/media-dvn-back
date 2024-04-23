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

const getUsersID = async (req = request, res = response) => {
    const { email } = req.query;
    try {
        const userFind = await User.findOne({email});
        console.log(userFind);
        if (userFind) {
            res.status(200).json(userFind);
        } else {
            res.status(404).json({msg:"Not found"})
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error Server" })
    }
}

const createUsers = async (req = request, res = response) => {
    const { username, email } = req.body;
    try {
        const findEmail = await User.findOne({ email });
        const findUsername = await User.findOne({ username });
        if (findEmail) {
            res.status(400).json({ msg: "User already exists" });
        }
        else if (findUsername) {
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
    const { user, username, email } = req.body;
    try {
        if (username !== undefined && username.trim() === '') {
            delete req.body.username;
        }
        if (email !== undefined && email.trim() === '') {
            delete req.body.email
        }
        const userUpdate = await User.findByIdAndUpdate({ _id:user }, req.body, { new: true });
        if (!userUpdate) {
            res.status(404).json({
                msg: 'Not Found'
            });
        } else {
            res.json(userUpdate);
        }
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
    getUsersID,
    createUsers,
    updateUsers,
    deleteUsers
}
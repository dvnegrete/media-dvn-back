const { request, response } = require('express');
const User = require('../models/User');

const checkRole = async (req = request, res = response, next) => {
    try {
        const { username } = req.headers;
        const [userDB] = await User.find({ username });
        if (!userDB) {
            return res.status(400).json({
                msg: 'Invalid Login'
            })
        }
        if (userDB.role === 'READ_ROLE') {
            return res.status(403).json({
                msg: 'No privileges'
            })
        }

        next();

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Server Error'
        })
    }
};

const checkRoleAdmin = async (req = request, res = response, next) => {
    try {
        const { username } = req.headers;
        const [userDB] = await User.find({ username });
        if (!userDB) {
            return res.status(400).json({
                msg: 'Invalid Login'
            })
        }
        if (userDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                msg: 'No privileges'
            })
        }

        next();

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Server Error'
        })
    }
};

module.exports = { checkRole, checkRoleAdmin }
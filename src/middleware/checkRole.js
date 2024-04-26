const { request, response } = require('express');
const User = require('../models/User');
const { userExistsAPP } = require('../helpers/findUserApp');

const checkUserDB = async  (req = request, res = response, next) => {
    try {
        const { user } = req.headers;
        const { userID } = req.body;
        const userDB = await userExistsAPP(userID, user);
        if (!userDB) {
            return res.status(400).json({
                msg: 'Invalid Login'
            })
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error Server" });
    }
}

const checkRoleCreator = async (req = request, res = response, next) => {
    try {
        const { user } = req.headers;
        const { userID } = req.body;
        const userDB = await userExistsAPP(userID, user);
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
        console.error(error);
        res.status(500).json({ msg: "Internal Error Server" });
    }
};

const checkRoleAdmin = async (req = request, res = response, next) => {
    try {
        const { user } = req.headers;
        const { userID } = req.body;
        const userDB = await userExistsAPP(userID, user);
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
        console.error(error);
        res.status(500).json({ msg: "Internal Error Server" });
    }
};

module.exports = { checkRoleCreator, checkRoleAdmin, checkUserDB }
const { request, response } = require("express");
const User = require("../models/User");

const checkEmail = async (req = request, res = response, next) => {
    const { email } = req.body;
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ msg: "Format mail invalid" });
        }

        const findEmail = await User.findOne({ email });
        if (findEmail) {
            res.status(400).json({ msg: "User already exists" });
        } else {
            
            next();

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error Server" })
    }
}

module.exports = { checkEmail }
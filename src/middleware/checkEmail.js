const { request, response } = require("express");

const checkEmail = async (req = request, res = response, next) => {
    let email;
    if (req.body && req.body.email) {
        email = req.body.email;
    }
    if (req.query && req.query.email) {
        email = req.query.email;
    }
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ msg: "Format mail invalid" });
        } else {

            next();

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error Server" })
    }
}

module.exports = { checkEmail }
const User = require("../models/User");

const userExistsAPP = async (userBody, userHeaders) => {
    try {
        const _id = userHeaders === undefined ? userBody : userHeaders;
        const userDB = await User.findById({ _id });
        return !!userDB;        
    } catch (error) {
        return false;
    }
}

module.exports = {
    userExistsAPP
}

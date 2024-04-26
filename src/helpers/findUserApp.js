const User = require("../models/User");

const userExistsAPP = async (userBody, userHeaders) => {
    try {
        const _id = userHeaders === undefined ? userBody : userHeaders;
        const userDB = await User.findById({ _id });
        if (!!userDB) {
            return userDB;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

module.exports = {
    userExistsAPP
}

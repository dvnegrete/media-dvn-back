const Category = require("../models/Category");

const transformMediaFiles = (media) => {
    return media.map(file => {
        return {
            url: file.url
        }
    })
}

module.exports = {
    transformMediaFiles
}
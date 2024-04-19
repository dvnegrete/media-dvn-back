const { request, response } = require("express");
const Category = require("../models/Category");
const PostContent = require("../models/PostContent");

const contentPermissions = async (req = request, res = response, next) => {
    const { category, media } = req.body;
    try {
        const categoryID = await Category.findOne({ name: category });
        if (!categoryID) {
            return res.status(400).json({
                msg: `${categoryID} not found. Category`
            });
        }
        const typesArray = media.some(file => {
            return categoryID.allowedFileTypes.includes(file.allowedFileTypes)
        })
        if (!typesArray) {
            return res.status(403).json({
                msg: `Format media not allowed`
            });
        } else {
            next();
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error Server" })
    }
}

module.exports = { contentPermissions }
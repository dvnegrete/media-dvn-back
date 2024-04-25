const { request, response } = require("express");
const path = require('path');
const Theme = require("../models/Theme");
const { uploadBlobStorage } = require("../helpers/AzureBlob");

const typesAllowForTheme = async (req = request, res = response, next) => {
    const { thematicID } = req.body;
    const media = req.files;
    try {
        const theme = await Theme.findById(thematicID).populate('categories');
        if (!theme) {
            return res.status(400).json({
                msg: `${theme} not found. Theme`
            });
        }
        const typesArray = media.every(file => {
            const typesAllowOnTheme = theme.categories.map(category => category.allowedFileTypes).flat();
            return typesAllowOnTheme.includes(file.mimetype)
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

const upload = async (file) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const fileBlob = {
        file: file,
        name: file.fieldname + '-' + uniqueSuffix + ext,
        container: "media-dvn",
        contentType: file.mimetype
    };
    const url = await uploadBlobStorage(fileBlob);
    return url;
}

const loadAndGenerateURLs = async (req = request, res = response, next) => {
    const files = req.files;
    const saveURLs = await Promise.all(files.map(async file => {
        const url = await upload(file);
        return url;
    }))
    req.body.media = [...saveURLs];
    next();
}



module.exports = { typesAllowForTheme, loadAndGenerateURLs }
const { request, response } = require('express');
const PostContent = require('../models/PostContent');
const Category = require('../models/Category');
const { transformMediaFiles } = require('../helpers/updatesDocuments');

const getPost = async (req = request, res = response) => {
    try {
        const postContent = await PostContent.find().populate("category");
        if (!postContent) {
            res.status(400).json({
                msg: 'Post already exists'
            });
        }

        res.json({
            postContent
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error Server" })
    }
}

const createPost = async (req, res = response) => {
    const { title, content, category, media } = req.body;
    try {
        const postContent = await PostContent.findOne({ title });
        if (postContent) {
            res.status(400).json({
                msg: 'Post already exists'
            });
        } else {
            const categoryID = await Category.findOne({ name: category });
            if (!categoryID) {
                return res.status(400).json({
                    msg: `${categoryID} not found. Category`
                });
            }
            const fileDBSave = transformMediaFiles(media);
            const post = new PostContent({ title, content, category: categoryID, media: fileDBSave });
            await post.save();
            res.json({
                post,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error Server" })
    }
}

const deletePost = async (req, res = response) => {
    const { title } = req.body;
    try {
        const post = await PostContent.findOne({ title });
        if (!post) {
            res.status(404).json({
                msg: 'Not Found'
            });
        }
        await PostContent.findByIdAndDelete(post);
        res.json({
            msg: `Post ${title} deleted`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error Server" })
    }
}

module.exports = {
    getPost,
    createPost,
    deletePost
}
const { request, response } = require('express');
const Content = require('../models/Content');

const getContent = async (req = request, res = response) => {
    try {
        const content = await Content.find().populate("category");
        if (!content) {
            res.status(400).json({
                msg: 'Post already exists'
            });
        }

        res.json(content);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error Server" })
    }
}

const createContent = async (req, res = response) => {
    const { title } = req.body;
    try {
        const searchingContent = await Content.findOne({ title });
        if (searchingContent) {
            res.status(400).json({
                msg: 'Post already exists'
            });
        } else {
            const newContent = new Content(req.body);
            await newContent.save();
            res.status(200).json(newContent);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error Server" })
    }
}

const deleteContent = async (req, res = response) => {
    const { title } = req.body;
    try {
        const post = await Content.findOne({ title });
        if (!post) {
            res.status(404).json({
                msg: 'Not Found'
            });
        }
        await Content.findByIdAndDelete(post);
        res.json({
            msg: `Post ${title} deleted`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error Server" })
    }
}

module.exports = {
    getContent,
    createContent,
    deleteContent
}
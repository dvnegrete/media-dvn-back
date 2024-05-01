const { request, response } = require('express');
const Content = require('../models/Content');
const { listBlobs } = require('../helpers/AzureBlob');
const { userExistsAPP } = require('../helpers/findUserApp');

const getContent = async (req = request, res = response) => {
    const { search } = req.query;
    try {
        const contents = await Content.find().populate("thematicID").populate("userID");
        if (!contents) {
            res.status(400).json({
                msg: 'Post already exists'
            });
        } else {
            const contentsFilter = contents.map(content => {
                return {
                    _id: content._id,
                    title: content.title,
                    content: content.content,
                    userID: content.userID
                };
            })

            if (search !== undefined) {
                const contentsSearch = contentsFilter.filter(item => {
                    return item.title.toLowerCase().trim().includes(search.toLowerCase().trim())
                        || item.userID.username.toLowerCase().trim().includes(search.toLowerCase().trim())
                        || item.content.toLowerCase().trim().includes(search.toLowerCase().trim());
                });
                res.status(200).json(contentsSearch);
            } else {
                res.status(200).json(contentsFilter);
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error Server" })
    }
}

const getContentForID = async (req = request, res = response) => {
    try {

        const { _id } = req.params;
        const [content] = await Content.find({ _id }).populate("userID");
        if (!content) {
            res.status(400).json({
                msg: 'Post already exists'
            });
        }

        //authenticate
        const { user } = req.headers;
        const { userID } = req.body;
        const userDB = await userExistsAPP(userID, user);
        if (userDB) {
            res.status(200).json(content);
        } else {
            res.status(200).json({
                _id: content._id,
                title: content.title,
                content: content.content,
                userID: content.userID
            });
        }
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
    const { _id } = req.params;
    try {
        const post = await Content.findOne({ _id });
        if (!post) {
            res.status(404).json({
                msg: 'Not Found'
            });
        } else {
            await Content.findByIdAndDelete(post);
            res.json({
                msg: `Content deleted`
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error Server" })
    }
}

const getCountMediaFiles = async (req, res = response) => {
    try {
        const blobs = await listBlobs();
        if (!blobs) {
            res.status(404).json({
                msg: 'Not Found'
            });
        } else {
            res.json(blobs);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error Server" })
    }
}

module.exports = {
    getContent,
    getContentForID,
    createContent,
    deleteContent,
    getCountMediaFiles
}
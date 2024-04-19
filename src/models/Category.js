const { Schema, model } = require('mongoose');

const categorySchema = Schema({
    name: {
        type: String,
        unique: true
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    allowedFileTypes : [String],
    //allowedExtensions: [String]
});

const Category = model('Category', categorySchema);

module.exports = Category;
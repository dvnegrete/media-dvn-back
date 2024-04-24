const { Schema, model } = require('mongoose');

const categorySchema = Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    allowedFileTypes: {
        type: [String],
        validate: {
            validator: (array) => array.length > 0
        }
    }
});

const Category = model('Category', categorySchema);

module.exports = Category;
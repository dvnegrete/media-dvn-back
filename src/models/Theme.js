const { Schema, model } = require('mongoose');

const themeSchema = Schema({
    name: {
        type: String,
        unique: true
    },
    description: {
        type: String,
    },
});

const Theme = model('Theme', themeSchema);

module.exports = Theme;
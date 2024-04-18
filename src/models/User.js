const { Schema, model } = require('mongoose');

const userSchema = Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    role: {
        type: String,
        enum: ['ADMIN_ROLE', 'READ_ROLE', 'CREATOR_ROLE'],
        default: 'READ_ROLE'
    },
});

const User = model('User', userSchema);

module.exports = User;
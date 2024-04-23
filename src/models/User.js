const { Schema, model } = require('mongoose');

const userSchema = Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        enum: ['ADMIN_ROLE', 'READ_ROLE', 'CREATOR_ROLE'],
        default: 'READ_ROLE'
    },
});

userSchema.pre('save', function(next) {
    if (this.email === '') {
      return next(new Error('Email empty'));
    }
    if (this.username === '') {
      return next(new Error('Username empty'));
    }
    next();
  });

const User = model('User', userSchema);

module.exports = User;
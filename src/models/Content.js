const { Schema, model } = require('mongoose');

const ContentSchema = Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  userID: { type: Schema.Types.ObjectId, ref: 'User' },
  thematicID: { type: Schema.Types.ObjectId, ref: 'Theme' },
  media: [{
    type: String,
  }]

});

const Content = model('Content', ContentSchema);

module.exports = Content;
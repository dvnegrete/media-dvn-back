const { Schema, model } = require('mongoose');

const PostContentSchema = Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    media: [{
        type: {
          type: String,
        },
        url: String,
      }]
   
});

const PostContent = model('PostContent', PostContentSchema);

module.exports = PostContent;
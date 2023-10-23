const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    authorId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    },

    tags: {
        type: Array,
        required: false,
    },
    likes: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        enum:  ['Technology', 'Travel', 'Food', 'Health', 'Science', 'Other'],
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Blog', BlogSchema);

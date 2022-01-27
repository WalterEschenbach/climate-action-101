const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    issue: {type: mongoose.Schema.Types.ObjectId, ref: 'issues'},
    message: {type: String},
}, {
    timestamps: true
})

const Comment = mongoose.model('comments', commentSchema);

module.exports = Comment;
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema({
    title: {type: String},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    description: {type: String},
    imgURL: {type: String},
    upvotes: [{type: mongoose.Schema.Types.ObjectId, ref: 'votes'}],
    downvotes: [{type: mongoose.Schema.Types.ObjectId, ref: 'votes'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'comments'}]
}, {
    timestamps: true
})

const Issue = mongoose.model('issues', issueSchema);

module.exports = Issue;
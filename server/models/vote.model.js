const mongoose = require('mongoose')
const Schema = mongoose.Schema

const voteSchema = new Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    issue: {type: mongoose.Schema.Types.ObjectId, ref: 'issues'},
    direction: {type: Boolean},
    
}, {
    timestamps: true
})

const Vote = mongoose.model('votes', voteSchema);

module.exports = Vote;
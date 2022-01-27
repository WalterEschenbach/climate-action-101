const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {type: String},
    password: {type: String},
    name: {type: String},
    issues: [{type: mongoose.Schema.Types.ObjectId, ref: 'issues'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'comments'}],
    votes: [{type: mongoose.Schema.Types.ObjectId, ref: 'issues'}],
    
}, {
    timestamps: true
})

const User = mongoose.model('users', userSchema);

module.exports = User;
const {Schema, model} = require('mongoose')

const schema = new Schema({
    text: {type: String, required: true},
    priority: {type: Number, default: 0 },
    date: {type: String, default:  new Date},
    desk: {type: String, required: true, default: 'default', ref: 'Desk'},
    completed: {type:Boolean, default: false},
    author: {type: String, required: true, ref: 'User'}
})

module.exports = model('Task', schema)
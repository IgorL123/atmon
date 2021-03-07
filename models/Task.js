const {Schema, model} = require('mongoose')

const schema = new Schema({
    text: {type: String, required: true},
    priority: {type: String, unique: true},
    date: {type: String, default: Date.now},
    desk: {type: String, required: true, default: 'StartDesk'},
    owner: {type: String, required: true, unique: true, ref: 'User'}
})

module.exports = model('Task', schema)
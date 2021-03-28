const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: 'String', required: true },
    content: { type: 'String', required: true },
    image: { type: 'String', required: true },
    userID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'},
    dateAdded: { type: 'Date', default: Date.now, required: true },
});


module.exports = mongoose.model("Post",postSchema);
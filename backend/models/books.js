const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title : {type: String, default: 'No title found'},
    isbn : {type: String, default: 'No data found'},
    author: {type: String, default: 'Unknown'},
    description: {type: String, default: 'No info available'},
    publish_date: {type: Date},
    publisher: {type: String, default: 'Unknown'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
})

const Books = mongoose.model("books",bookSchema);
module.exports = Books;
const mongoose = require('mongoose');

const petSchema = mongoose.Schema({
    name: String,
    description: String,
    funfact: String,
    birth: String,
    death: String,
    status: String,
    image: String,
});

module.exports = mongoose.model('Pet', petSchema);
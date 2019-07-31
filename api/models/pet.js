const mongoose = require('mongoose');

const petSchema = mongoose.Schema({
    name: String,
    description: String,
    brith: Date,
    death: Date,
    status: String,
    image: String,
});

module.exports = mongoose.model('Pet', petSchema);
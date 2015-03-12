var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: String,
    link: String,
    sku: String
});

module.exports = mongoose.model('product', productSchema);

var mongoose = require('mongoose');

var companySchema = new mongoose.Schema({
    name: String,
    website: String,
    email: String,
    description: String,
    phone: String,
    address: String,
    logo: String
});

module.exports = mongoose.model('company', companySchema);

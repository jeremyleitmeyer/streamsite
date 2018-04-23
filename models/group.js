var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var groupSchema = mongoose.Schema({
    admin: String,
    officers: Array,
    password: String,
    members: Array,
    watchHistory: Array
});


// generating a hash
groupSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports = mongoose.model('Group', groupSchema);

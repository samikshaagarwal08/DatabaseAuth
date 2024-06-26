const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');

const userSchema = mongoose.Schema({
    username:String,
    password:String,
    name:String,
});

module.exports = mongoose.model('User', userSchema);

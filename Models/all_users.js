const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test').then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB', err));;

const userSchema = mongoose.Schema({
    username:String,
    password:String,
    name:String,
});

module.exports = mongoose.model('User', userSchema);


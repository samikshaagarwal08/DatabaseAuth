const express = require('express');
const jwt= require('jsonwebtoken');
const mongoose = require('mongoose');
const userModel=require('./Models/all_users');
const jwtPassword="123456";

const app = express();
 
app.use(express.json());

// const User=[
//     {username:"samiksha@gmail.com",password:"1234",name:"samiksha",},
//     {username:"gourav@gmail.com",password:"1212",name:"gourav",},
//     {username:"sam@gmail.com",password:"1231",name:"sam",},
// ];

// function userExists(username,password) {
//     let userExists=false;
//     for (let i=0;i<User.length;i++) {
//         if(User[i].username==username && User[i].password==password) {
//             userExists=true;
//         }                           
//     }
//     return  userExists;
// }

app.post("/signin",async function(req,res){
    const { username, password } = req.body;
    const user = await userModel.findOne({ username, password });
    if(!user){
        return res.status(403).json({
            msg:"User does not exist"
        });
    }

    var token=jwt.sign({username}, jwtPassword);
    return res.json({
        token,
    });
});


app.post("/adduser", async function (req, res) {
    const { username, password, name } = req.body;

    try {
        const existingUser = await userModel.findOne({ username });

        if (existingUser) {
            return res.status(400).json({
                msg: "User already exists"
            });
        }

        const newUser = new userModel({ username, password, name });
        await newUser.save();

        res.status(201).json({
            msg: "User added successfully",
            user: newUser
        });
    } catch (err) {
        return res.status(500).json({
            msg: "Internal server error"
        });
    }
});

app.get("/users/:abc", async function (req,res){
    const token=req.headers.authorization;
    const decoded=jwt.verify(token,jwtPassword);
    const username=decoded.username;
    const users = await userModel.find({ username: { $ne: username } }).select('-password');
    res.json({
        users
    })
    
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
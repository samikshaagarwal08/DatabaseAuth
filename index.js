const userModel=require('./Models/all_users');
const express = require('express');
const jwt= require('jsonwebtoken');
const jwtPassword="123456";

const {default:mongoose} = require('mongoose');

const app = express();

app.use(express.json());

// const User=[
//     {username:"samiksha@gmail.com",password:"1234",name:"samiksha",},
//     {username:"gourav@gmail.com",password:"1212",name:"gourav",},
//     {username:"sam@gmail.com",password:"1231",name:"sam",},
// ];

function userExists(username,password) {
    let userExists=false;
    for (let i=0;i<User.length;i++) {
        if(User[i].username==username && User[i].password==password) {
            userExists=true;
        }                           
    }
    return  userExists;
}

app.post("/signin",function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    if(!userExists(username,password)){
        return res.status(403).json({
            msg:"User does not exist"
        });
    }

    var token=jwt.sign({username:username}, jwtPassword);
    return res.json({
        token,
    });
});

app.get("/users", function (req,res){
    const token=req.headers.authorization;
    const decoded=jwt.verify(token,jwtPassword);
    const username=decoded.username;
    res.json({
        users: User.filter(function(value){
            if(value.username==username){
                return false;
            }
            else{
                return true;
            }
        })
    })
    
})

app.listen(3000);
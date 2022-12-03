const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = "ANAND";

router.post('/register',(req,res)=>{
    try {
        console.log(req.body);
        const {username, password} = req.body;
        bcrypt.hash(password,10,async(err,hash)=>{
            if(err){
                return res.status(500).json({
                    status : "failed",
                    message : err.message
                })
            }else{
                const uName = await User.findOne({userName : username})
                if(uName){
                    res.status(500).json({
                        status : "failed",
                        message : "UserName already exists",
                    })
                }else{
                    const data = await User.create({
                        userName : username,
                        password : hash,
                    })
                    res.status(200).json({
                        status : "success",
                        data,
                    })
                }
            }
        })
    } catch (error) {
        res.status(500).json({
            status : "failed",
            message : error.message
        })
    }
})

router.post('/login',async(req,res)=>{
    try {
        const {username, password} = req.body;
        console.log(username);
        const data = await User.findOne({username})
        if(!data){
            return res.status(500).json({
                status : "failed",
                message: "User is not registered"
            })
        }
        bcrypt.compare(password, data.password,(err,result)=>{
            if(err){
                res.status(500).json({
                    status: "failed",
                    message : err.message
                })
            }
            if(result){
                const token = jwt.sign({
                    exp : Math.floor(Date.now()/1000)+(60*60),
                    data: data._id
                },secret);
                res.status(200).json({
                    status : "Success",
                    token
                })
            }
        })
    } catch (error) {
        res.status(500).json({
            status : "failed",
            message : error.message
        })
    }
})
module.exports = router;
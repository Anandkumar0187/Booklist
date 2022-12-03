const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const loginRoutes = require("./routes/login");
const bookRoutes = require("./routes/book");
const cors = require('cors');
const User = require("./models/users")
const jwt = require("jsonwebtoken")
const port = 8080;
const secret = "ANAND"

mongoose.connect('mongodb://localhost/Books',()=>{
    console.log("database connected");
})

app.use(bodyparser.json());
app.use(cors());

app.use("/books", async(req,res,next)=>{
    if(req.headers.authorization){
        const token = req.headers.authorization;
        jwt.verify(token, secret,async(err,decoded)=>{
            if(err){
                res.status(500).json({
                    status: "failed",
                    message: "User not authenticated"
                })
            }
            const user = await User.findOne({_id: decoded.data});
            req.user = user._id;
            next();
        })
    }else{
        return res.status(500).json({
            status : "failed",
            message: "Invalid token"
        })
    }
})

app.use("/",loginRoutes);
app.use("/books",bookRoutes);

app.listen(port, ()=>{
    console.log(`app listen at ${port}`);
})
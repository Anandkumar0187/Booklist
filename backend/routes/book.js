const express = require('express');
const router = express.Router();

const Books = require('../models/books');

router.post("/", async (req,res)=>{
    const {title,isbn,author,description,publish_date,publisher} = req.body;
    const books = await Books.create({
        title : title,
        isbn : isbn,
        author: author,
        description: description,
        publish_date: publish_date,
        publisher: publisher,
        user: req.user,
    })
    res.status(200).json({
        status : "success",
        books,
    })
})
router.get('/', async(req,res)=>{
    const data = await Books.find();
    res.status(200).json({
        status : "success",
        data
    })
})
router.put("/:id", async(req,res)=>{
    const {title,isbn,author,description,publish_date,publisher} = req.body;
    const data = await Books.updateOne({_id: req.params.id},
        {
            title : title,
            isbn : isbn,
            author: author,
            description: description,
            publish_date: publish_date,
            publisher: publisher
        });
    res.status(200).json({
        status : "success",
        data
    })
})
router.delete("/:id",async (req,res)=>{
    const data = await Books.deleteOne({_id: req.params.id});
    res.status(200).json({
        status : "success",
        data
    })
})
module.exports = router;
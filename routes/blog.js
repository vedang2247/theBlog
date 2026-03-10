const express=require("express");
const blog=require("../models/blog");
const path=require("path");
const multer=require("multer");
const { checkforAuthentcation } = require("../middleware/auth");
const mongoose = require("mongoose");
const router=express.Router();
const comment=require("../models/comment")

const storage=multer.diskStorage({
    destination: function(req,file, cb){
        return cb(null,path.resolve("./public/Uploads/"));
    },
    filename: function(req,file,cb){
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
})
const upload = multer({ storage: storage })

router.get('/add-new', checkforAuthentcation("token"), (req,res) => {
    return res.render("addBlog",{
        user: req.user
    });
})

router.post('/add-new', checkforAuthentcation("token"), upload.single("coverImage"),async (req,res) => {
    console.log('User from auth:', req.user);
    const {title,body}=req.body;
    const blog1=await blog.create({
        title,
        body,
        coverPicURL: `/uploads/${req.file.filename}`,
        createdBy: req.user.id
    })
    console.log('Blog created with createdBy:', blog1.createdBy);
    return res.redirect(`/blog/${blog1._id}`);
})

router.get('/:id', async (req,res) => {
    const id=req.params.id;
    const foundBlog= await blog.findById(id).populate('createdBy');
    const comm= await comment.find({ blogID: req.params.id }).populate('createdBy');
    console.log(comm);
    if(!foundBlog){
        return res.redirect('/');
    }
    return res.render("blog",{
        user: req.user,
        blog: foundBlog,
        comments: comm,
    })
})

router.post('/comment/:id', checkforAuthentcation("token"), async (req, res) => {
    const com=await comment.create({
        content: req.body.content,
        blogID: req.params.id,
        createdBy: req.user.id
    });
    return res.redirect(`/blog/${req.params.id}`)
})

module.exports=router;
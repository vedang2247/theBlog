const express=require("express");
const { createHmac }=require("crypto");
const user=require("../models/user")
const router=express.Router();

router.get("/signin", (req,res) => {
    return res.render("signin");
})

router.get("/signup", (req,res) => {
    return res.render("signup");
})

router.post("/signin", async (req,res) => {
    const { email, password }=req.body;
    try{
        const token = await user.matchPasswordAndCreateToken(email, password);
        return res.cookie("token",token).redirect("/");
    }
    catch(err){
        return res.render("signin",{
            err: "Incorrect Username or Password!"
        });
    }
    
})

router.post("/signup", async (req,res) => {
    const {FullName,email,password} = req.body;
    await user.create({
        FullName,
        email,
        password,
        ProfilePicUrl: `/images/Profile.jpg`
    });
    return res.redirect("/");
})

router.get('/logout', (req, res) => {
    return res.clearCookie("token").redirect('/');
})

module.exports=router;
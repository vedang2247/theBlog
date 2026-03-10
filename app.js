require("dotenv").config();

const express=require("express");
const path=require("path");
const mongoose=require("mongoose");
const cookieParser=require("cookie-parser");
const { checkforAuthentcation } = require("./middleware/auth");

const userRouter=require("./routes/user");
const blogRouter=require("./routes/blog");

const blog=require("./models/blog");

const PORT=process.env.PORT || 8000;
const app=express();

mongoose.connect(process.env.MONGO_URL).then((e) => console.log("MongoDB Connected!!"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended:false }));
app.use(express.json());
app.use(cookieParser());
app.use(checkforAuthentcation("token"))
app.use(express.static((path.resolve('./public'))));

app.get('/', async (req,res) => {
    const blogs=await blog.find({});
    return res.render("home",{
        user: req.user,
        blogs
    });
})

app.use("/user", userRouter);

app.use("/blog",blogRouter);

app.listen(PORT, () => console.log(`Server Started at Port ${PORT}`));

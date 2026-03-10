const { createHmac,randomBytes }=require("crypto");
const {model, Schema}=require("mongoose");
const { createToken } = require("../services/authentication");

const UserSchema=new Schema({
    FullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    ProfilePicUrl: {
        type: String,
        default: "/images/Profile.jpg"
    }
},{ timestamps: true });

UserSchema.pre('save', function(next){
    const user=this;
    if(!user.isModified("password")) return;
  
    const salt=randomBytes(16).toString();
    const hashedPassword=createHmac('sha256', salt)
    .update(user.password)
    .digest("hex");

    this.salt=salt;
    this.password=hashedPassword;

})

UserSchema.static("matchPasswordAndCreateToken",async function(email,password){
    const foundUser=await this.findOne({ email });
    if(!foundUser) throw new Error("User Not Found");
    const hashPassword=foundUser.password;
    const userSalt=foundUser.salt;   
    const enteredHash=createHmac('sha256', userSalt)
    .update(password)
    .digest("hex");

    if(hashPassword !== enteredHash) throw new Error("Incorrect Password!");
    const token=createToken(foundUser);
    return token;
})

const User=model("user", UserSchema);

module.exports=User;
const {model, Schema}=require("mongoose");

const commentModel=new Schema({
    content: {
        type: String,
        required: true,
    },
    blogID: {
        type: Schema.Types.ObjectId,
        ref: "blog"
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
},{ timestamps: true });

const comment=model("comment",commentModel);

module.exports=comment


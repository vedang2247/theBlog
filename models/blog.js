const {model, Schema}=require("mongoose");

const blogSchema=new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    coverPicURL: {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
},{ timestamps: true });

const blog=model("blog",blogSchema);

module.exports= blog
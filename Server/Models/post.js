import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    title: { type: String, required: true },
    message: { type: String, required: true },
    status: {type: String, required: true},
    imageUrls: [{ type: String, required: true }],
    dateAdded: {type: Date, required: true},
});

const PostModel = mongoose.model('Post', postSchema)

export default PostModel
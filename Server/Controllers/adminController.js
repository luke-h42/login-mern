import cloudinary from "cloudinary"
import Post from '../Models/post.js'
export const test = (req,res) => {
    res.json('test is working')
}

export const uploadPost =  async (req,res) => {
    try {
        const imageFiles = req.files
        const newPost = req.body

        const uploadPromises = imageFiles.map(async(image) => {
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI="data:" +  image.mimetype + ";base64," + b64;
            const res = await cloudinary.v2.uploader.upload(dataURI);
            return res.url;
        });

        const imageURLS = await Promise.all(uploadPromises);
        newPost.imageUrls = imageURLS;
        newPost.dateAdded = new Date();
        newPost.userId = req.userId;
        const post = new Post(newPost)
        await post.save();
        res.status(201).send(post)
    } catch (e) {
        console.log("Error creating post: ", e)
        res.status(500).json({message: "Something went wrong"})
    }
}

export const getPosts = async (req,res) => {
    
    try {
        const posts = await Post.find({status: "active"})
        res.json(posts);
    } catch (error) {
        res.status(500).json({message: "Error fetching posts"})
        
    }
}
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import Router from './Routes/authRoutes.js'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';


//database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database connected'))
.catch((err) => console.log('Database not connected', err))

//server definitions and middlewares
const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

//using routes
app.use('/', Router)

//server connection
app.listen(5000, () => {
    console.log("server running on localhost:5000")
})
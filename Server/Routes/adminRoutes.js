import express from 'express';
import cors from 'cors'
import { test, uploadPost, getPosts} from '../Controllers/adminController.js'
import { upload } from '../helpers/multer.js'
import { body } from 'express-validator';
import { roleCheck } from '../helpers/roleCheck.js'

const router = express.Router();
router.use(
    cors({
        credentials: true,
        // origin: 'http://localhost:5173'
        origin: 'https://login-mern-seven.vercel.app'
    })
)


router.get('/', test)
router.post('/upload-post', roleCheck('admin'),[
    body("title").notEmpty().withMessage('Title is required'),
    body("message").notEmpty().withMessage('Message is required'),
    body("status").notEmpty().withMessage('Active status is required'),
] , upload.array("imageFiles", 1), uploadPost)
router.get('/get-posts', getPosts)


export default router;
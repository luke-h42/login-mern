import express from 'express';
import cors from 'cors'
import {test, registerUser, loginUser, getProfile, logoutUser, checkAuthenticated, adminRoute} from '../Controllers/authController.js'
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
router.post('/register', registerUser)
router.get('/authentication', checkAuthenticated)
router.get('/admin', roleCheck('admin'), adminRoute)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.post('/logout', logoutUser)
export default router;
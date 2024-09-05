import User from '../Models/user.js'
import { hashPassword, comparePassword } from '../helpers/auth.js'
import jwt from 'jsonwebtoken'

export const test = (req,res) => {
    res.json('test is working')
}


//Register Endpoint
export const registerUser = async (req, res) => {
    try {
        const{name, email, password} = req.body;
        // Check if name entered
        if(!name) {
            return res.json({
                error: 'Name is required'
            })
        };
        // Check if password valid
        if(!password || password.length < 6){
            return res.json({
                error: 'Password is required and should be at least 6 characters long'
            })
        };
        // Check if unique email
        if(!email) {
            return res.json({
                error: 'Email is required'
            })
        }
        const exist = await User.findOne({email})
        if(exist) {
            return res.json({
                error: 'Email already in use'
            })
        }
        const hashedPassword = await hashPassword(password)
        // Create user in dB
        const user = await User.create({
            name, email, password : hashedPassword
        })

        return res.json(User)
    } catch (error) {
        console.log(error)
    }
}

//Login Endpoint
export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        // Check if email entered
        if(!email) {
            return res.json({
                error: 'Email is required'
            })
        };
        // Check if user exists
        const user = await User.findOne({email});
        if(!user) {
            return res.json({
                error: 'No user found'
            })
        }

        // Check if password matches
        const match = await comparePassword(password, user.password)
        if(match) {
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token, {httpOnly: false, sameSite: 'None', secure: true, path: "/"}).json(user);
            })

        }
        if(!match) {
            res.json({error: 'Password incorrect'})
        }
    } catch (error) {
        console.log(error)
    }
}

export const checkAuthenticated = (req, res) => {
    const { token } = req.cookies;
    if(!token) return res.status(401).json({message: 'Unauthorised'})
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err,user) => {
            if(err) throw err;
            res.json(user)
        })
    } else {
        res.json(null)
    }

}

export const getProfile = (req,res) => {
    const {token} = req.cookies;
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err,user) => {
            if(err) throw err;
            res.json(user)
        })
    } else {
        res.json(null)
    }
}

export const logoutUser = (req, res) => {
    res.clearCookie('token', {httpOnly: false, sameSite: 'None', secure: true,  path: "/"})
    res.status(200).json({message: 'Logged out successfully'})
}

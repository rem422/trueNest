import User from '../models/user.model.js';
import { errorHandler2 } from '../middlewares/errorHandler.js';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res, next) => {
    const { username, email, password } = req.body;

    try{
        if(!username || !email || !password) {
            return res.status(400).json({message: 'Please fill all the fields'});
        }

        const userExists = await User.findOne({email});
        if(userExists) {
            return res.status(400).json({message: 'User already exists'})
        }

        const newUser = await User({
            username, 
            email, 
            password
        });

        await newUser.save();
        
        res.status(201).json({
            success: true,
            message: 'User created successfully!',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });
    
    } catch(err){
        next(err);
    }
}

// Sign in
export const signIn = async (req, res, next) => {
    const {email, password} = req.body;

    try{
        const validUser = await User.findOne({ email });
        if(!validUser) return next(errorHandler2(404, 'User not found!'));
        if(!validUser || !(await validUser.matchPassword(password)))
            return next(errorHandler2(401, 'Wrong credentials!'));
        
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECTET)
        // object destructuring with renaming + rest operator.
        const { password: pass, ...rest} = validUser._doc;
        res
            .cookie('access_token', token, { httpOnly: true})
            .status(200)
            .json(rest);
        
    } catch(err) {
        next(err);
    }
}
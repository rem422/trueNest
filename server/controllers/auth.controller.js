import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { errorHandler2 } from '../middlewares/errorHandler.js';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hashSync(password, 12);
    const newUser = await User({ username, email, password: hashPassword });

    try{
        await newUser.save();
        res.status(201).json('User created successfully!');
    } catch(err) {
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
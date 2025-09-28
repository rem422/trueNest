import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signUp = async (req, res) => {
    const { username, email, password } = req.body;

    try{
        if(!username || !email || !password) {
            return res.status(400).json({
                message: "Please fill all the fields"
            });
        };

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = new User({username, email, password: hashedPassword});
        await newUser.save();
        res.status(201).json({message: 'User created successfully!'});
    
    } catch(err){
        res.status(500).json(err.message);
    }
}
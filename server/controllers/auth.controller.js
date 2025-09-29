import User from '../models/user.model.js';

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
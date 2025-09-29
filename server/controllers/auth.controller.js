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

export const signIn = async (req, res, next) => {
    const {email, password} = req.body;

    try{
        const user = await User.findOne({ email });

        if(!user || !(await user.matchPassword(password))) {
            return res.status(401).json({
                status: false,
                message: 'Invalid credentials'
            });
        }

        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            message: 'Login successful!'
        });
    } catch(err) {
        next(err);
    }
}
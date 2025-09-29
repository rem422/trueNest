import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter  from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use(errorHandler);

const DB = process.env.MONGODB_CONN.replace('<PASSWORD>', process.env.DB_PASSWORD);

const connectDB = async() => {
    try {
        await mongoose.connect(DB);
        console.log('DB connected successful!');
    } catch(err) {
        console.log('Server Error', err);
    }
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();
});
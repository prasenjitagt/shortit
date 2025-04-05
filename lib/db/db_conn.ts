import mongoose from "mongoose";


export const connectDB = async () => {
    const MONGO_URI: string = process.env.MONGO_URI as string;


    try {
        await mongoose.connect(MONGO_URI);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }



}



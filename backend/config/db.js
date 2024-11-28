import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to MongoDB ${connection.connection.host}`);
    } catch (error) {
        console.log(error.message);
        process.exit(1); // Exit the process with failure status code

    }   
};
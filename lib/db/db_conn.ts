import mongoose from "mongoose";

// Cache the connection to avoid multiple connections in serverless environments
let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectDB = async () => {
    // If a connection exists, return it
    if (cached.conn) {
        return cached.conn;
    }

    // If there is no existing connection, create one
    if (!cached.promise) {
        const MONGO_URI: string = process.env.MONGO_URI as string;
        if (!MONGO_URI) {
            throw new Error("MONGO_URI is missing");
        }

        cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
};

import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface DBUserModelType extends Document {
    name: string;
    email: string;
    password?: string;
    _id: Types.ObjectId; // <-- Add this explicitly
}

const UserSchema: Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: [true, "Email already exists"],
        },
        password: {
            type: String,
            // not required for Google OAuth
        },
    },
    { timestamps: true }
);

const UserModel: Model<DBUserModelType> = mongoose.models.User || mongoose.model<DBUserModelType>("User", UserSchema);

export default UserModel;

import mongoose, { Schema, Document, Model } from "mongoose";
import { ILink } from "@/lib/types/link_type"; // ad

// Extend ILink with Document for full Mongoose typing
type LinkDocument = ILink & Document;

//Link Schema :

const LinkSchema: Schema<LinkDocument> = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    originalLink: {
        type: String,
        required: true,
    },
    shortenedLink: {
        type: String,
        required: true,
        unique: true,
    },
});


// Model
const LinkModel: Model<LinkDocument> = mongoose.models.Link || mongoose.model<LinkDocument>("Link", LinkSchema);

export default LinkModel;
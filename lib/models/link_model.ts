import mongoose, { Schema, Document, Model } from "mongoose";



export interface DBLinkModelType {
    userEmail: string;
    originalLink: string;
    alias: string;
    clicks: number;
}
// Extend ILink with Document for full Mongoose typing
type LinkDocument = DBLinkModelType & Document;

//Link Schema :

const LinkSchema: Schema<LinkDocument> = new mongoose.Schema({
    userEmail: {
        type: String,
        required: [true, "Please provide a user email"],
    },
    originalLink: {
        type: String,
        required: [true, "Please provide a link"],
    },
    alias: {
        type: String,
        required: [true, "Please provide an alias"],
        unique: [true, "Alias must be unique"],
    },
    clicks: {
        type: Number,
        default: 0,
    },

}, {
    timestamps: true, // <- adds createdAt and updatedAt automatically
});


// Model
const LinkModel: Model<LinkDocument> = mongoose.models.Link || mongoose.model<LinkDocument>("Link", LinkSchema);

export default LinkModel;
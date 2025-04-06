import mongoose, { Schema, Document, Model } from "mongoose";



export interface DBLinkModelType {
    userEmail: string;
    originalLink: string;
    alias: string;
}
// Extend ILink with Document for full Mongoose typing
type LinkDocument = DBLinkModelType & Document;

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
    alias: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true, // <- adds createdAt and updatedAt automatically
});


// Model
const LinkModel: Model<LinkDocument> = mongoose.models.Link || mongoose.model<LinkDocument>("Link", LinkSchema);

export default LinkModel;
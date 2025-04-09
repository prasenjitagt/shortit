import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db_conn"; // updated to your correct connection function
import LinkModel from "@/lib/models/link_model"; // updated to your correct model name

export async function POST(req: NextRequest) {
    try {
        const { alias, originalUrl, email } = await req.json();

        if (!alias || !originalUrl || !email) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        await connectDB();

        // Check if alias already exists
        const existingLink = await LinkModel.findOne({ alias });
        if (existingLink) {
            return NextResponse.json({ error: "Alias already taken" }, { status: 409 });
        }

        // Create a new link
        const newLink = new LinkModel({
            alias, originalLink: originalUrl, userEmail: email,
            clicks: 0, // default clicks to 0
        });
        await newLink.save();

        return NextResponse.json({ message: "Alias registered successfully ✅" });
    } catch (error) {
        console.error("Error registering alias:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

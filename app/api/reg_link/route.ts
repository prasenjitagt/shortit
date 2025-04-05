import connectDB from "@/lib/db/db_conn";
import LinkModel from "@/lib/models/link_model";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();

        // Empty body Fields :
        if (!body) {
            return NextResponse.json({ error: "Invalid Fields" }, { status: 400 });
        }

        const original_link = await LinkModel.findOne({ original_link: body.original_link });

        if (original_link) {
            console.log("Link already exists: ", original_link);

            return NextResponse.json({ error: "Link already exists" }, { status: 400 });
        }

        const short_link = uuidv4().slice(0, 8);

        const newLink = new LinkModel({
            userEmail: body.email,
            originalLink: body.original_link,
            shortenedLink: short_link,
        });

        const newLinkInstance = await newLink.save();

        if (!newLinkInstance) {
            return NextResponse.json({ error: "Error creating link" }, { status: 500 });
        }

        return NextResponse.json({
            message: "Link created successfully",
            short_link: `http://localhost:3000/${short_link}`,
            original_link: body.original_link,
        }, { status: 201 });








    } catch (error) {
        return NextResponse.json({ error: "Internal Server issue" + error }, { status: 500 });
    }
}
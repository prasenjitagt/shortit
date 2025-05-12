//api/get-urls/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options"; // adjust path if needed
import LinkModel from "@/lib/models/link_model"; // adjust path if needed
import connectDB from "@/lib/db/db_conn"; // your DB connection helper

export async function GET(req: NextRequest) {
    await connectDB(); // Connect to DB
    const session = await getServerSession(authOptions);

    // Get query params
    const { searchParams } = new URL(req.url);
    const currentPage = parseInt(searchParams.get("currentPage") || "0");
    const linksPerPage = parseInt(searchParams.get("linksPerPage") || "8");

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const totalCount = await LinkModel.countDocuments({ userEmail: session.user.email });

        const links = await LinkModel.find({ userEmail: session.user.email })
            .select("-__v")
            .skip(currentPage * linksPerPage)
            .limit(linksPerPage);

        return NextResponse.json({
            urls: links,
            totalCount // <-- Send back total count
        }, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch links:", error);
        return NextResponse.json({ error: "Failed to fetch links" }, { status: 500 });
    }

}


// DELETE method implementation
export async function DELETE(req: NextRequest) {
    await connectDB("api/get-urls/route.ts"); // Connect to DB


    const session = await getServerSession(authOptions);
    if (!session) {
        console.log("Unauthorized");
        throw new Error("Unauthorized");
    }

    // Get the URL ID from the request
    const { searchParams } = new URL(req.url);
    const URLId = searchParams.get("URLId");


    if (!URLId) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    try {
        // Find the link and check if it belongs to the current user
        const link = await LinkModel.findOne({ _id: URLId, userEmail: session.user.email });

        if (!link) {
            return NextResponse.json({ error: "Link not found or does not belong to you" }, { status: 404 });
        }

        // Delete the link
        await LinkModel.deleteOne({ _id: URLId });

        return NextResponse.json({ message: "Link deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Failed to delete link:", error);
        return NextResponse.json({ error: "Failed to delete link" }, { status: 500 });
    }
}
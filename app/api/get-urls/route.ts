import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options"; // adjust path if needed
import LinkModel from "@/lib/models/link_model"; // adjust path if needed
import { connectDB } from "@/lib/db/db_conn"; // your DB connection helper

export async function GET(req: NextRequest) {
    await connectDB(); // Make sure DB is connected

    const session = await getServerSession(authOptions);


    // No Session Saved
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }



    // Getting Links
    try {
        const links = await LinkModel.find({ userEmail: session.user.email }).select("-__v"); // no __v field
        return NextResponse.json({ urls: links }, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch links:", error);
        return NextResponse.json({ error: "Failed to fetch links" }, { status: 500 });
    }



}

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options"; // adjust path if needed
import LinkModel from "@/lib/models/link_model"; // adjust path if needed
import { connectDB } from "@/lib/db/db_conn"; // your DB connection helper

export async function GET(req: NextRequest) {
    await connectDB(); // Connect to DB
    const session = await getServerSession(authOptions);

    // Get query params
    const { searchParams } = new URL(req.url);
    const currentPage = parseInt(searchParams.get("currentPage") || "0");
    const linksPerPage = 8; // fixed 8 links per page

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

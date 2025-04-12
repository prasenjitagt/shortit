import { connectDB } from "@/lib/db/db_conn";
import LinkModel from "@/lib/models/link_model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const alias = searchParams.get('alias'); // ✅ Get from query string like ?alias=abc123

    await connectDB();

    if (!alias) {
        return NextResponse.json({ error: "alias parameter is required" }, { status: 400 });
    }

    const existingAlias = await LinkModel.findOne({ alias });

    if (!existingAlias) {
        return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    // ✨ Increment the click count
    existingAlias.clicks += 1;
    await existingAlias.save();

    return NextResponse.json({ originalLink: existingAlias.originalLink }, { status: 200 });
}

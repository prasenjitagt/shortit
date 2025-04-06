import { connectDB } from "@/lib/db/db_conn";
import LinkModel from "@/lib/models/link_model";
// import { ShortenedLinkResponse } from "@/lib/types/next_response";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    params: { shortenedLink: string };
}
export async function GET(
    req: NextRequest,
    { params }: Params
) {
    const { shortenedLink } = params;
    await connectDB();

    if (!shortenedLink) {
        return NextResponse.json({ error: "Link parameter is required" }, { status: 400 });
    }

    const existingShortenedLink = await LinkModel.findOne({ shortenedLink });

    if (!existingShortenedLink) {
        return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    return NextResponse.json({ originalLink: existingShortenedLink.originalLink }, { status: 200 });
}

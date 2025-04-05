import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db_conn";
import LinkModel from "@/lib/models/link_model";


export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const alias = searchParams.get("alias");

        if (!alias) {
            return NextResponse.json({ error: "Alias is required" }, { status: 400 });
        }

        const existingLink = await LinkModel.findOne({ alias });

        return NextResponse.json({ available: !existingLink });
    } catch (error) {
        console.error("Error checking alias:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


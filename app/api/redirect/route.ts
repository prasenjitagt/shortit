import { connectDB } from "@/lib/db/db_conn";
import LinkModel from "@/lib/models/link_model";
import { NextRequest, NextResponse } from "next/server";
import { headers } from 'next/headers';
import { getDeviceInfo } from "@/lib/get-device-info";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const alias = searchParams.get('alias'); // ✅ Get from query string like ?alias=abc123

    const headersList = await headers(); // ❌ no await needed, it's synchronous

    const userAgent = headersList.get('user-agent') || "";
    const forwardedFor = headersList.get('x-forwarded-for') || ""; // IP address
    const referer = headersList.get('referer') || ""; // Referring page
    const acceptLanguage = headersList.get('accept-language') || ""; // Language preferences

    const deviceInfo = getDeviceInfo(userAgent);

    const visitorInfo = {
        ip: forwardedFor.split(",")[0] || "Unknown",  // If multiple IPs, take the first one
        referer: referer || "Unknown",
        language: acceptLanguage || "Unknown",
        ...deviceInfo
    };

    console.log(visitorInfo); // 🔥 Console full visitor info

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

    return NextResponse.json({
        originalLink: existingAlias.originalLink,
        visitorInfo
    }, { status: 200 });
}

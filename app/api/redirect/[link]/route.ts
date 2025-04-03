import { redirect } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    params: { link: string };
}

export async function GET(req: NextRequest, { params }: Params) {
    const { link } = await params;


    // Return a proper JSON response
    return NextResponse.json({ redirectLink: `https://www.google.com/search?q=${link}` }, { status: 200 });
}

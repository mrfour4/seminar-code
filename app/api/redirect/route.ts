import { NextResponse } from "next/server";

export async function GET() {
    const redirectUrl = process.env.NEXT_PUBLIC_APP_URL || "/";

    const isAuthenticated = await fakeAuth();

    if (!isAuthenticated) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.redirect(redirectUrl);
}

async function fakeAuth(): Promise<boolean> {
    return true;
}

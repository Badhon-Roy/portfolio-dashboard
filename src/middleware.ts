import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/auth";


export const middleware = async (request: NextRequest) => {
    const userInfo = await getCurrentUser();
    if (!userInfo && userInfo?.email !== process.env.PERSONAL_EMAIL) {
        return NextResponse.redirect(new URL('/', request.url))
    }
}

export const config = {
    matcher: [
        "/dashboard",
        "/dashboard/:page",
    ]
}
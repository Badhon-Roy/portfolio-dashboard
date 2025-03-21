"use server"
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/auth";

export const middleware = async (request: NextRequest) => {
    const userInfo = await getCurrentUser();
    console.log("from-middleware =>", userInfo);

    if (!userInfo || userInfo?.email !== process.env.PERSONAL_EMAIL) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
};

export const config = {
    matcher: [
        "/",
        "/dashboard",
        "/dashboard/:page",
        "/dashboard/:page/:page",
    ]
};

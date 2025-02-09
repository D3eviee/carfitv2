import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export default function middleware(req: NextRequest){
    const token = req.cookies.get("ClientToken")?.value

    if(!token) return NextResponse.next();

    try{
        const decodedToken = jwt.verify(token!, process.env.JWT_SECRET as string)
        return NextResponse.next();
    }catch(error){
        return NextResponse.redirect(new URL('/', req.url))
    }
}

export const config = {
    matcher: ["/onboarding", "/sign-in"],
}
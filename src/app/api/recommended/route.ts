import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
//import bcrypt from "bcryptjs";
//import {createSession} from "@/lib/session";

export async function POST(req: NextRequest) {
    try {
        const recommended = await prisma.service.findMany({ take: 5 });
        return NextResponse.json(recommended , { status: 201 });

    } catch (error) {
        console.error("Error fetching recommended services:", error);
        return NextResponse.json(
            { error: `There was a problem getting data: ${error instanceof Error ? error.message : String(error)}` }, 
            { status: 500 }
        );
    }
}

 

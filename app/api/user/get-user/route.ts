'use server'

import User from "@/lib/database/models/User";
import { connectToDB } from "@/lib/database/mongoose";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function GET (request: NextRequest) {
    try {
        connectToDB();
        const token = request.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'No token found' }, { status: 401 });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
        const userId = (decodedToken as { id: string }).id;

        const user = await User.findById({_id: userId}).select("-password");
        if(!user){
            return NextResponse.json({error: 'No token found'}, {status: 401});
        }

        return NextResponse.json({
            message: "User Found",
            data: user
        });
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400})
    }
}
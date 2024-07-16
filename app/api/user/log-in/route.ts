'use server'

import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'
import { connectToDB } from "@/lib/database/mongoose";
import User from "@/lib/database/models/User";
import { cookies } from "next/headers";

export async function POST(request: NextRequest){
    try {
        await connectToDB()

        const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log(reqBody);

        //check if user exists
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        console.log("user exists");
        
        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }
        console.log(user);
        
        //create token data
        const tokenData = {
            id: user._id
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {expiresIn: '7d'});
        const time = 7*24*60*60*1000;
        cookies().set('token', token, {expires: Date.now() + time});

        const { password: _, ...userWithoutPassword } = user.toObject();

        const response = NextResponse.json({
            message: "Login successful",
            user: userWithoutPassword
        })

        return response;
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
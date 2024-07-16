'use server'

import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'
import { connectToDB } from "@/lib/database/mongoose";
import User from "@/lib/database/models/User";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    try {
        await connectToDB()
        const reqBody = await request.json()
        const { name, email, password } = reqBody

        console.log(reqBody);

        // Check if user already exists
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            console.log("User already exists")
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();

        const tokenData = {
            id: savedUser._id
        }

        // Create token
        const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {expiresIn: '7d'});
        const time = 7*24*60*60*1000;
        cookies().set('token', token, {expires: Date.now() + time});

        const { password: _, ...userWithoutPassword } = newUser.toObject();
        // Create a response object
        const response = NextResponse.json({
            message: "User created successfully",
            success: true,
            user: userWithoutPassword
        });

        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}

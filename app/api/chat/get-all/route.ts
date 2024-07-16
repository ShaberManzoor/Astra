import Chat from "@/lib/database/models/Chat";
import { connectToDB } from "@/lib/database/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url);
    const id = searchParams.get('id');

    try {
        await connectToDB();
        const chats = await Chat.find({userId: id}).sort({updatedAt: -1});
        
        return NextResponse.json({
            chats: chats
        });
        
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}
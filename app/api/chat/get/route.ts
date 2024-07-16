import Chat from "@/lib/database/models/Chat";
import { connectToDB } from "@/lib/database/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    try {
        await connectToDB();
        const chat = await Chat.findOne({id});
        if(!chat){
            return NextResponse.json({
                error: "No chat found"
            })
        }
        const messages = chat.messages;

        return NextResponse.json({
            messages: messages
        }, {status: 200});
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            error: error.message
        })
    }
}
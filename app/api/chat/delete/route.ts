import Chat from "@/lib/database/models/Chat";
import { connectToDB } from "@/lib/database/mongoose";
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('chat_id');
    
    try {
        await connectToDB();
        const chat = await Chat.findOne({id});

        if(!chat){
            return NextResponse.json({
                message: "No chat found"
            }, {status: 404});
        }

        await Chat.deleteOne({id});
        return NextResponse.json({
            message: "Chat deleted succesfully"
        }, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Error deleting chat",
        }, {status: 404});
    }
}
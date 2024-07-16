import Chat from "@/lib/database/models/Chat";
import { connectToDB } from "@/lib/database/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {chatId, messages} = await req.json();
    try {
        await connectToDB();

        const chat = await Chat.findOne({id: chatId});
        if(!chat){
            throw new Error("Chat not found");
        }

        messages.forEach((message: { role: string, content: string }) => {
            chat.messages.push(message);
        });
        await chat.save();

        return NextResponse.json({
            message: "Chat saved"
        })
    } catch (error) {
        console.log(error);
    }
}
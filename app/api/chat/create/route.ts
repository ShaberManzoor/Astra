import Chat from "@/lib/database/models/Chat";
import { connectToDB } from "@/lib/database/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, message, title } = await req.json();
  try {
    await connectToDB();

    const newChat = new Chat({
      userId,
      messages: message,
      title
    });

    const savedChat = await newChat.save();

    return NextResponse.json({
      chatId: savedChat.id,
    })
  } catch (error) {
    console.log(error);
    
  }
}
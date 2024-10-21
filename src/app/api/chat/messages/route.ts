import Chat from "@/models/message";
import { NextResponse } from "next/server";
import { createHash } from 'crypto';
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";



export async function POST(req:any) {
    try{
        const body = await req.json();
        const { sessionId, message } = body;

        if (!sessionId || !message) {
            return NextResponse.json({ status: 400, message: "Missing required fields" });
        }
        

        // Hash users ip as a identifier
        const ip = req.headers.get('x-forwarded-for') || req.headers.get('remote-addr') || '0.0.0.0'; // Fallback to a default IP
        const hashedSenderId = createHash('sha256').update(ip).digest('hex'); 


        const chat = await Chat.findOne({ sessionId })
        if (!chat) {
            return NextResponse.json({ status: 404, message: "Chat not found" });
        }

        const TrueDate = Date.now();// Used to prevent time discrepancy 
        const newMessage = {
            senderId: hashedSenderId,
            text: message,
            timestamp: TrueDate
        };

        chat.messages.push(newMessage);
        await chat.save();

        // Pusher
        pusherServer.trigger(
            toPusherKey(`chatrooms:${sessionId}:incoming_message`),
            'incoming_message',
            {
                senderId: hashedSenderId,
                text: message,
                timestamp: TrueDate
            }
        )


        return NextResponse.json({
            status: 201,
            message: "Message sent!",
            data: newMessage
        });
    } catch (error) {
        return NextResponse.json({status: 500, message: "Error ", error});
    } 
}


export async function GET(req:any) {
    try {
        const { searchParams } = new URL(req.url);
        const sessionId = searchParams.get("sessionId"); // Extract sessionId from query parameters

        if (!sessionId) {
            return NextResponse.json({ status: 400, message: "Missing sessionId" });
        }

        const chat = await Chat.findOne({ sessionId });
        if (!chat) {
            return NextResponse.json({ status: 404, message: "Chat not found" });
        }

        return NextResponse.json({
            status: 200,
            message: "Messages retrieved successfully",
            data: chat.messages 
        });
    } catch (error) {
        return NextResponse.json({ status: 500, message: "Error", error });
    }
}


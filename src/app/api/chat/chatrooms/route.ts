import Chat from "@/models/message";
import { v4 as uuidv4 } from 'uuid'; 
import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";


export async function POST(req:any) {
    try{
        const body = await req.json();
        
        const sessionId = uuidv4(); //Used as a sessionId to distinguish between chats

        const newChat = new Chat({
            sessionId,
            live: false, // Default is not live (talking to an ai)
            messages: []
        })

        await newChat.save();

        //Pusher Update
        pusherServer.trigger(
            toPusherKey(`chatrooms:new_chatroom`),
            'new_chatroom',
            {
                sessionId,
                live: false,
                messages: []
            }
        )

        return NextResponse.json({ status: 201, message: "Chat created!", data: newChat });
    } catch (error) {
        return NextResponse.json({status: 500, message: "Error ", error});
    } 
}

export async function GET(req: any) {
    try {
        // Fetch all chat rooms from the database
        const chatRooms = await Chat.find({}); 

        return NextResponse.json({
            status: 200,
            message: "Chat rooms retrieved successfully!",
            data: chatRooms
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Error fetching chat rooms",
            error: error
        });
    }
}
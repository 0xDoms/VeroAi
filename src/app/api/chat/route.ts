import Chat from "../../models/message";
import { v4 as uuidv4 } from 'uuid'; 
import { NextResponse } from "next/server";


export async function POST(req:any) {
    try{
        const body = await req.json();
        const { title } = body;

        // Generate a unique ID for the customer
        const customerId = uuidv4(); 
        const aiSupportId = "ai-support-id";

        const newChat = await Chat.create({
            title,
            customerId,
            aiSupportId,
            status: 'ai',
            messages: []
        });


        return NextResponse.json({ status: 201, message: "Chat created!", data: newChat });
    } catch (error) {
        return NextResponse.json({status: 500, message: "Error ", error});
    } 
}


export async function GET(req: Request) {
    try {
        // Fetch all chats from the database
        const allChats = await Chat.find({}); 

        return NextResponse.json({ status: 200, message: "All chats retrieved!", data: allChats });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ status: 500, message: "Error retrieving chats", error });
    }
}
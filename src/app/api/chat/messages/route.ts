import Chat from "@/models/message";
import { NextResponse } from "next/server";
import { createHash } from 'crypto';
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";



export async function POST(req:any) {
    try{
        const body = await req.json();
        const { sessionId, message, assistant } = body;

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
            senderId: assistant ? 'assistant' : hashedSenderId,
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


        // If chat is not live, get ai's response
        if (chat.live){
            return NextResponse.json({
                status: 201,
                message: "Message sent!",
                data: newMessage
            });
        }

        const Prompt_engineering = {
            role: "system",
            content: `
            You are a highly knowledgeable and experienced sales representative for ADG Southwest. Services, which offers valuable services such as car wrapping along with window tinting. Your goal is to have a neutral, human-like conversation with the customer in order to understand their needs, provide relevant information, and ultimately guide them towards making a booking or working with the company. Keep this introduction short but effective.

            Right now you are talking to a customer for the first time. Start by giving them a warm welcome on behalf of ADG Southwest and make them feel welcomed.
            Your next task is to lead the conversation naturally to get the customer to create a booking with ADG Southwest. Be respectful and never break a character.

            YOU WILL NOT REAPET THE WELCOME AFTER YOUR FIRST MESSAGE
            `
        }

        let Conversation = [Prompt_engineering];

        chat.messages.forEach((msg: any) => {
            const role = msg.senderId === hashedSenderId ? 'user' : 'assistant';
            Conversation.push({
                role: role,
                content: msg.text
            });
        });

        // Send `Conversation` to OpenAI API endpoint
        const openAIResponse = await fetch("http://localhost:3000/api/openai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ messages: Conversation }),
        });

        const aiResponseData = await openAIResponse.json();
        console.log(aiResponseData);

        if (!openAIResponse.ok) {
            throw new Error(aiResponseData.error);
        }

        // Optionally, save AI response in chat
        const aiMessage = {
            senderId: 'assistant',
            text: aiResponseData.choices[0]?.message.content,
            timestamp: Date.now()
        };
        chat.messages.push(aiMessage);
        await chat.save();

        // Pusher
        pusherServer.trigger(
            toPusherKey(`chatrooms:${sessionId}:incoming_message`),
            'incoming_message',
            {
                senderId: 'assistant',
                text: aiResponseData.choices[0]?.message.content,
                timestamp: Date.now()
            }
        )

        return NextResponse.json({
            status: 201,
            message: "Message sent and AI responded!",
            data: { userMessage: newMessage, aiResponse: aiMessage }
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
            data: chat.messages,
            live: chat.live
        });
    } catch (error) {
        return NextResponse.json({ status: 500, message: "Error", error });
    }
}


"use client"
import { useState, useEffect } from 'react';
import { MessageSquareMore } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import {Message} from '@/types/conversation';
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

type Props = {}

const Chatroom = (props: Props) => {
    const [selectedSessionId, setSelectedSessionId] = useState<string | null>("c63ad372-32b3-4878-a43b-5c4791532c15");
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const [isChatOpen, setIsChatOpen] = useState(true);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    const handleSendMessage = () => {
        console.log("Sending message!")
    };

    const fetchMessages = async (sessionId: String) => {
        try {
            const response = await fetch(`/api/chat/messages?sessionId=${sessionId}`);
            const data = await response.json();
    
            if (data.status === 200) {
              setMessages(data.data);
            } else {
              console.error("Error fetching messages:", data.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
      };

    useEffect(() => {
        const htmlElement = document.documentElement;
        htmlElement.style.backgroundColor = 'none'; 

        // Fetch old messages
        if (selectedSessionId) {
          fetchMessages(selectedSessionId);
        }
    
    
        // subscribe to pusher
        pusherClient.subscribe(toPusherKey(`chatrooms:${selectedSessionId}:incoming_message`));
    
        const incoming_message = ({senderId,text,timestamp}: Message) => {
          setMessages((prev) => [...prev, {senderId,text,timestamp}])
        }
    
        pusherClient.bind('incoming_message', incoming_message);
    
        return () => {
            pusherClient.unsubscribe(toPusherKey(`cchatrooms:${selectedSessionId}:incoming_messag`));
            pusherClient.unbind('incoming_message', incoming_message);
        }
      }, [selectedSessionId]);

    return (
        <main className="p-3">
            <button 
                onClick={toggleChat} 
                className="fixed bottom-5 right-5 w-12 h-12  rounded-full bg-primary text-white  flex items-center justify-center  shadow-lg focus:outline-none">
                <MessageSquareMore/>
            </button>


            {isChatOpen && (
                <div className="bg-background w-full h-[500px] max-h-[500px] rounded-lg p-4 overflow-hidden">
                    <div className="flex">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                            <h1 className="font-bold">Sales Rep - Vero Ai</h1>
                            <p className="text-xs">Vero Ai</p>
                        </div>
                    </div>
                    <div className="flex flex-col overflow-y-scroll h-[375px] max-h-[375px]">
                        {messages.length > 0 ? (
                            messages.map((msg, index) => (
                            <div key={index} className='mb-5 flex justify-between'>
                                <div className={`inline-block max-w-1/2 p-2 ${msg.senderId === 'user1' ? 'ml-auto bg-primary rounded-bl-md rounded-tr-md rounded-tl-md mr-2' : 'bg-accent rounded-br-md rounded-tr-md rounded-tl-md ml-2'}`}>
                                {msg.text}
                                </div>
                            </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500">No messages yet.</div>
                        )}
                    </div>
                    <div className="w-full h-1/6 p-2 border-t-2 flex">
                        <Input type="text" placeholder="Type your message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)}className="flex-grow"/>
                        <Button onClick={handleSendMessage} className="ml-2">Send</Button>
                    </div>
                </div>
            )}
        </main>
    )
}

export default Chatroom
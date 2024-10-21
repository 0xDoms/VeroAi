'use client'
import { useEffect, useState } from 'react';
import {
Tabs,
TabsContent,
TabsList,
TabsTrigger,
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Chatroom } from "@/types/conversation"
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";


interface ChatRoomProps {
    onSelectChatroom: (sessionId: string) => void; // Prop type definition
  }

const ChatRoom: React.FC<ChatRoomProps> = ({ onSelectChatroom }) => {
    const [Chatrooms, setChatrooms] = useState<Chatroom[]>([]);
    const [activeChatRoom, setActiveChatroom] = useState<string | null>(null);

    useEffect(() => {
        // Fetch inital chat rooms
        const fetchChatrooms = async () => {
            try {
                const response = await fetch('/api/chat/chatrooms'); 
                if (!response.ok) {
                    throw new Error('Failed to fetch chat rooms');
                }
                const data = await response.json();
                setChatrooms(data.data); 
            } catch (error) {
                console.error('Error fetching chat rooms:', error);
            }
        };
        fetchChatrooms();

        // Subscribe to new events
        pusherClient.subscribe(toPusherKey(`chatrooms:new_chatroom`));

        const new_chatroom = ({sessionId,live,messages}: Chatroom) => {
            setChatrooms((prev) => [...prev, {sessionId,live,messages}])
        }

        pusherClient.bind('new_chatroom', new_chatroom);

        return () => {
            pusherClient.unsubscribe(toPusherKey(`chatrooms:new_chatroom`));
            pusherClient.unbind('new_chatroom', new_chatroom);
        }
    }, []);

    const handleChatroomClick = (sessionId: string) => {
        onSelectChatroom(sessionId);
        setActiveChatroom(sessionId);
    };

    return (
        <Tabs defaultValue="live">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="live">Live</TabsTrigger>
                <TabsTrigger value="other">other</TabsTrigger>
            </TabsList>

            <TabsContent value="live">
                {Chatrooms.map((chat) => (
                    <div 
                        key={chat.sessionId} 
                        className={`h-20 flex items-center border rounded-lg mb-2 
                        ${activeChatRoom === chat.sessionId ? 'bg-accent' : 'bg-background hover:bg-accent'}`}
                        onClick={() => handleChatroomClick(chat.sessionId)}
                    >
                    <div className="avatar flex justify-center items-center p-4">
                        <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex flex-col justify-center p-4 flex-grow">
                        <h1 className="font-bold">Example</h1>
                        <h2 className="text-gray-500">
                        {chat.sessionId}
                        </h2>
                    </div>
                    <div className="ml-auto p-4">
                        <p className="text-gray-600">12:34 PM</p> {/* Adjust to show actual timestamps if available */}
                    </div>
                    </div>
                ))}
            </TabsContent>
        </Tabs>
    )
}

export default ChatRoom;
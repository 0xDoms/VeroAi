'use client'
import ChatRoom from '../components/chatrooms';
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import {Message} from '@/types/conversation';
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

export default function Conversations(){
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);


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


  const handleSendMessage = () => {
    console.log("Sending message!")
  };

  useEffect(() => {
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
    <div className="flex flex-grow h-full">
      {/* Chat Room Section */}
      <div className="w-2/5 p-4 overflow-y-auto flex-grow">
        <ChatRoom onSelectChatroom={setSelectedSessionId} />
      </div>
      
      {/* Chat */}
      <div className="w-3/5 flex-grow border-l-2">
        <div className="w-full h-5/6 flex flex-col overflow-y-auto">
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
    </div>
  );
}
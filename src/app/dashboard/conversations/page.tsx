'use client'
import { useEffect, useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Chat {
  _id: string; // Assuming _id is a string
  title: string;
  messages: {
    content: string; // Message content
    // Add other message properties if needed
  }[];
}


export default function Conversations(){
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch('/api/chat');

        if (!response.ok) {
          throw new Error('Failed to fetch chats');
        }

        const data = await response.json();
        setChats(data.data);
      } catch(error){
        console.log(error)
      }
    };

    fetchChats(); // Call the function on inital load
  }, []);

  return (
    <main className="flex">
      <div className="w-2/5 p-4">
        <Tabs defaultValue="ai">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ai">Ai Support</TabsTrigger>
            <TabsTrigger value="active">Active Chats</TabsTrigger>
          </TabsList>

          <TabsContent value="ai">
          {chats.map((chat) => (
            <div key={chat._id} className="bg-background h-20 flex items-center border rounded-lg hover:bg-accent mb-2">
              <div className="avatar flex justify-center items-center p-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col justify-center p-4 flex-grow">
                <h1 className="font-bold">{chat.title}</h1>
                <h2 className="text-gray-500">
                  {chat.messages[chat.messages.length - 1]?.content || 'Waiting on inital message'}
                </h2>
              </div>
              <div className="ml-auto p-4">
                <p className="text-gray-600">12:34 PM</p> {/* Adjust to show actual timestamps if available */}
              </div>
            </div>
          ))}
          </TabsContent>

          <TabsContent value="active">
            <h1>Test2</h1>
          </TabsContent>

        </Tabs>
      </div>
      <div className="bg-blue-500 w-3/5">
        <p>Test</p>
      </div>
    </main>
  );
}
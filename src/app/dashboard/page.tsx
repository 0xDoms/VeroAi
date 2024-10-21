'use client'
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { useEffect } from "react";

export default function Dashboard() {
  const sessionId = '67163645096ae0a7ab1eaefe';

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:incoming_message`));

    const incoming_message = () => {
      console.log("updated messages!")
    }

    pusherClient.bind('incoming_message', incoming_message);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:incoming_message`));
      pusherClient.unbind('incoming_message', incoming_message);
    }
  }, [])

  return (
    <main>
      <h1>Dashboard</h1>
    </main>
  );
}
export interface Chatroom {
    sessionId: string;
    live: boolean;
    messages: Message[];
}

export interface Message {
    senderId: string;
    text: string;
    timestamp: number;
}
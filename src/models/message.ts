import mongoose, { Schema, Document, Types } from 'mongoose';
import { Chatroom, Message } from '../types/conversation';
  
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable in .env');
}

mongoose.connect(MONGO_URI);
mongoose.Promise = global.Promise;


const MessageSchema: Schema = new Schema({
  senderId: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Number, required: true }
});

const ChatSchema: Schema = new Schema({
  sessionId: { type: String, required: true },
  live: { type: Boolean, required: true },
  messages: [MessageSchema]
});


interface IChat extends Chatroom, Document {}

// Create and export the Chat model based on the ChatSchema
const Chat = mongoose.models.Chat || mongoose.model<IChat>('Chat', ChatSchema);

export default Chat;
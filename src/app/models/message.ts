import mongoose, { Schema, Document, Types } from 'mongoose';
  
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable in .env');
}
mongoose.connect(MONGO_URI);
mongoose.Promise = global.Promise;


// Message interface to type individual messages in the chat
interface Message {
  sender: Types.ObjectId;
  content: string;
  timestamp: Date;
}

// Chat interface to type the overall Chat schema
interface IChat extends Document {
  title: string;
  customerId: string;
  aiSupportId: string;
  liveSupportId?: string;
  status: 'ai' | 'live';
  messages: Message[];
}


// Message Schema to define individual message structure
const MessageSchema = new Schema<Message>({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
  content: { type: String, required: true }, 
  timestamp: { type: Date, default: Date.now },
});

// Chat Schema to define the structure of a chat room
const ChatSchema = new Schema<IChat>({
  title: { type: String, required: true },
  customerId: { type: String, required: true },
  aiSupportId: { type: String, required: true },
  liveSupportId: { type: String },
  status: { 
      type: String, 
      enum: ['ai', 'live'], 
      default: 'ai'
  }, 
  messages: [MessageSchema],
}, {
  timestamps: true,  // Automatically manage createdAt and updatedAt fields
});

// Create and export the Chat model based on the ChatSchema
const Chat = mongoose.models.Chat || mongoose.model<IChat>('Chat', ChatSchema);

export default Chat;
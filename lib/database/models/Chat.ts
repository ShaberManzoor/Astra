import { randomUUID } from "crypto";
import { Schema, model, models } from "mongoose";

const chatSchema = new Schema({
    id: {
        type: String,
        default:() => randomUUID()
    },
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    messages:[
        { 
            role: {
                type: String
            },
            content: {
                type: String,
            }
        }
    ]
}, {timestamps: true});

const Chat = models?.Chat || model('Chat',chatSchema);
export default Chat;
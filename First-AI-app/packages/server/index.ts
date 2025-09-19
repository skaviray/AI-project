import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import z from 'zod';
import {sendMessage} from './services/chats'
import {chatController} from './controllers/chat.controller'
dotenv.config();
console.log(process.env.OPENAI_API_KEY)
const app = express();
app.use(express.json())
const port = process.env.PORT || 3000;
let responseId: string | null = null
// const conversations = new Map<string, string>()
const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY
})

app.get('/', (req: Request, res: Response) => {
   res.send(process.env.OPENAI_API_KEY);
});


app.get('/api/info', (req: Request, res: Response) => {
   res.send({
      message: 'This is a simple backend developed in node',
      version: '1.0',
   });
});

const chatSchema = z.object({
   prompt: z.string().min(1, "Prompt is required").max(1000, "prompt is too long (max 1000 characters)"),
   conversationId: z.string().uuid()
})

app.post("/api/chat", async (req: Request, res: Response) => {
   chatController(req, res)
})

app.listen(port, () => {
   console.log(`Server is listening on http://localhost:3000`);
});

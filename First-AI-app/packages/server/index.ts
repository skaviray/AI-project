import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import {chatController, info} from './controllers/chat.controller'
import { info } from './controllers/info.controller';
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


app.get('/api/info',info )


app.post("/api/chat", chatController)

app.listen(port, () => {
   console.log(`Server is listening on http://localhost:3000`);
});

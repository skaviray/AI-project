import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import z from 'zod';
import Joi from 'joi';
import {conversationRepository} from './repository/conversations.repository'

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
// const response = await client.responses.create({
//    model: "gpt-4o-mini",
//    input: "what is the capital of india",
//    temperature: 0.2,
//    max_output_tokens: 100
// })
// console.log(response.output_text)

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
   const parseResult = chatSchema.safeParse(req.body)
   if (!parseResult.success){
      res.status(404).json(parseResult.error)
      return
   }
   const {prompt, conversationId} = req.body
   console.log(conversationRepository.getLastResponseId(conversationId))
   try {   
      const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
      temperature: 0.2,
      max_output_tokens: 100,
      previous_response_id: conversationRepository.getLastResponseId(conversationId)
   })
   conversationRepository.setLastResponseId(conversationId, response.id)
   console.log(response.output_text)
   res.json({response: response.output_text})
} catch(err) {
   res.status(500).json({error: err.error ? err.error.message : "Failed to generate a response"})
}

})

app.listen(port, () => {
   console.log(`Server is listening on http://localhost:3000`);
});

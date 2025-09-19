
import z from "zod"
import type { Request, Response } from 'express';
import { sendMessage } from "../services/chats";


const chatSchema = z.object({
   prompt: z.string().min(1, "Prompt is required").max(1000, "prompt is too long (max 1000 characters)"),
   conversationId: z.string().uuid()
})

export const chatController = async (req: Request, res: Response) => {
   const parseResult = chatSchema.safeParse(req.body)
   if (!parseResult.success){
      res.status(404).json(parseResult.error)
      return
   }
   const {prompt, conversationId} = req.body
   try {   
   const response = await sendMessage(prompt, conversationId)
   res.json({response: response.message})
} catch(err) {
   res.status(500).json({error: err.error ? err.error.message : "Failed to generate a response"})
}
}
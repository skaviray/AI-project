import OpenAI from "openai"
import {conversationRepository} from '../repository/conversations.repository'

import dotenv from 'dotenv';

dotenv.config()

// Implementation Detail
const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY
})

type ChatResponse = {
    id: string,
    message: string
}

// Public Interface
export const sendMessage = async (prompt: string, conversationId: string):Promise<ChatResponse> => {
    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
      temperature: 0.2,
      max_output_tokens: 100,
      previous_response_id: conversationRepository.getLastResponseId(conversationId)
    })
    conversationRepository.setLastResponseId(conversationId, response.id)
    return {
        id: response.id,
        message: response.output_text
    }
}
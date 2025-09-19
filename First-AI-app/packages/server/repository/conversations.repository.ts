const converstations = new Map<string, string>()

export function getLastResponseId(conversationId: string) {
    return converstations.get(conversationId)
}

export function setLastResponseId(conversationId: string, responseId: string) {
    converstations.set(conversationId, responseId)
}

export const conversationRepository = {
    getLastResponseId,
    setLastResponseId
}
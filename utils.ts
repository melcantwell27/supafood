// utils/chatGPT.ts

import axios, { AxiosResponse } from 'axios';

const openaiApiKey: string | undefined = process.env.OPENAI_API_KEY;

interface ChatGPTResponse {
    text: string;
}

export async function getChatGPTResponse(message: string): Promise<string> {
    try {
        const response: AxiosResponse<ChatGPTResponse> = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: 'text-davinci-003', // Adjust model if needed
                prompt: message,
                max_tokens: 150
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${openaiApiKey}`
                }
            }
        );
        return response.data.text.trim();
    } catch (error) {
        console.error('Error fetching response from ChatGPT:', error);
        return 'Sorry, I could not process your request at the moment.';
    }
}

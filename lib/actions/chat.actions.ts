'use server'

import { GoogleGenerativeAI } from "@google/generative-ai";

export const getAiRes = async (prompt: string) => {
  const apiKey = process.env.GEMINI_API_KEY!;
  try {
    console.log(prompt);
    // console.log(process.env.GEMINI_API_KEY);
    
    const genAi = new GoogleGenerativeAI(apiKey);

    // // Get the generative model
    const model = genAi.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // // Generate content based on the prompt
    const result = await model.generateContent(prompt);

    // Extract and return the text from the result
    const text = result.response.text();
    return text;
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw new Error('Failed to generate AI response');
  }
};

export const getChatTitle = async (prompt: string) => {
  const apiKey = process.env.GEMINI_API_KEY!;
  try {
    console.log(prompt);
    // console.log(process.env.GEMINI_API_KEY);
    
    const genAi = new GoogleGenerativeAI(apiKey);

    // // Get the generative model
    const model = genAi.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // // Generate title based on the prompt
    const titleResult = await model.generateContent("For the given prompt Generate a concise and informative title for the following chat message. The title should be brief (max 10 words) and capture the main point or topic of the message. And if you are not able to make a concise title from a give chat then just simply return the given chat message and do not include special symbols like # or any thing unecessarily: " + prompt);

    // Extract and return the text from the result
    const title = titleResult.response.text();
    return title;
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw new Error('Failed to generate AI response');
  }
};
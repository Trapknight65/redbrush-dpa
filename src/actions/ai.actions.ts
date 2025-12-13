"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export type GenerateContentResult = {
    success: boolean;
    data?: {
        description: string;
        challenge: string;
        solution: string;
        tech: string;
        tags: string;
    };
    error?: string;
};

export async function generateProjectContent(
    title: string,
    category: string
): Promise<GenerateContentResult> {
    if (!genAI) {
        return {
            success: false,
            error: "GEMINI_API_KEY is not configured on the server.",
        };
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      You are a professional copywriter and technical writer.
      Generate a creative and professional project description, challenge, solution, suggested detailed technical stack (comma separated), and tags (comma separated) for a portfolio project.
      
      Project Title: "${title}"
      Project Category: "${category}"
      
      Return ONLY a valid JSON object with the following keys and no markdown formatting:
      {
        "description": "A compelling summary of the project...",
        "challenge": "The core problem addressed...",
        "solution": "How the project solved the problem...",
        "tech": "React, Next.js, etc...",
        "tags": "Web, Design, etc..."
      }
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up potential markdown code blocks if the model includes them
        const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();

        const data = JSON.parse(cleanedText);

        return {
            success: true,
            data: {
                description: data.description || "",
                challenge: data.challenge || "",
                solution: data.solution || "",
                tech: data.tech || "",
                tags: data.tags || "",
            },
        };
    } catch (error) {
        console.error("AI Generation Error:", error);
        return {
            success: false,
            error: "Failed to generate content. Please try again.",
        };
    }
}

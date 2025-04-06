import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const { topic, duration, level } = body;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
Create a ${level} level, ${duration}-week project-based course on the topic "${topic}".

Respond ONLY with valid JSON matching this format:

{
  "title": "string",
  "description": "string",
  "weeks": [
    {
      "week": number,
      "title": "string",
      "description": "string",
      "assignments": ["string"],
      "resources": ["string"]
    }
  ]
}

NO extra text before or after the JSON. Do NOT include any intro, explanation, or markdown.
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Extract just the JSON
        const jsonStart = text.indexOf("{");
        const jsonEnd = text.lastIndexOf("}") + 1;
        const jsonString = text.slice(jsonStart, jsonEnd);

        const json = JSON.parse(jsonString);
        return NextResponse.json(json);
    } catch (error) {
        console.error("Error generating course:", error);
        return NextResponse.json(
            { error: "Failed to generate course" },
            { status: 500 }
        );
    }
}

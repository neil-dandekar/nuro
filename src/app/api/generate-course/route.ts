import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

function isBalancedJSON(str: string): boolean {
    let balance = 0;
    for (const char of str) {
        if (char === "{") balance++;
        if (char === "}") balance--;
    }
    return balance === 0;
}

export async function POST(req: Request) {
    console.log("generate-course API route hit");
    try {
        const body = await req.json();
        const { topic, duration, level } = body;
        console.log("Request body:", { topic, duration, level });

        if (!process.env.GEMINI_API_KEY) {
            console.error("Missing GEMINI_API_KEY");
            throw new Error("Missing GEMINI_API_KEY");
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
Create a ${level} level, ${duration}-week project-based course on the topic "${topic}".

Respond ONLY with valid JSON matching this exact format:

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

        console.log("Prompt sent to Gemini API:", prompt);

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        console.log("Full raw response text:", text);

        // Extract JSON from the text
        const match = text.match(/{[\s\S]*}/);
        if (!match) {
            console.error("No valid JSON found in the response:", text);
            throw new Error("No valid JSON found in the response");
        }
        const jsonString = match[0];

        // Check if the JSON string appears complete (balanced braces)
        if (!isBalancedJSON(jsonString)) {
            console.error("JSON string is not balanced:", jsonString);
            throw new Error("Incomplete JSON returned from the API");
        }

        let json;
        try {
            json = JSON.parse(jsonString);
        } catch (parseError) {
            console.error(
                "JSON parsing error:",
                parseError,
                "JSON string:",
                jsonString
            );
            throw new Error("Failed to parse JSON");
        }

        console.log("Parsed JSON:", json);
        return NextResponse.json(json);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error generating course:", error.message);
            return NextResponse.json(
                { error: "Failed to generate course", details: error.message },
                { status: 500 }
            );
        } else {
            console.error("Unexpected error", error);
            return NextResponse.json(
                {
                    error: "Failed to generate course",
                    details: "Unexpected error",
                },
                { status: 500 }
            );
        }
    }
}

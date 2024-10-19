import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { prompt } = body;

        // Check if prompt is provided
        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error.message);
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

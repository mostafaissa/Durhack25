import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = "You are Donna, an AI assistant. Be professional and concise.";
const ASSISTANT_ACK = "I understand. I am Donna, and I will assist you professionally and concisely.";

export async function POST(request: Request) {
  try {
    const { input } = await request.json();

    // Validate input
    if (!input || typeof input !== 'string' || !input.trim()) {
      return new NextResponse(
        JSON.stringify({ error: 'Input is required and cannot be empty.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return new NextResponse(
        JSON.stringify({
          text: `GenAI not configured. Please set the GOOGLE_API_KEY environment variable.`
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Prepare the API payload
    const payload = {
      contents: [
        { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
        { role: 'assistant', parts: [{ text: ASSISTANT_ACK }] },
        { role: 'user', parts: [{ text: input.trim() }] }
      ]
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    // Concatenate all parts if multiple parts are returned
    const text = data.candidates?.[0]?.content
      ?.map((part: any) => part.parts?.map((p: any) => p.text).join(' ') || '')
      .join(' ')
      .trim() || 'Sorry, no response generated.';

    return new NextResponse(JSON.stringify({ text }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: unknown) {
    console.error('GenAI Error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new NextResponse(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

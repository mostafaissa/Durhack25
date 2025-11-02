import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { input } = await request.json();

    if (!input || typeof input !== 'string') {
      return new NextResponse(JSON.stringify({ error: 'missing input' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return new NextResponse(
        JSON.stringify({
          text: `GenAI not configured. Set GOOGLE_API_KEY env var. Placeholder: '${input.slice(0, 200)}'`
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta3/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: 'You are Donna, an AI assistant. Be professional and concise.' }]
            },
            {
              role: 'assistant',
              parts: [{ text: 'I understand. I am Donna, and I will assist you professionally and concisely.' }]
            },
            {
              role: 'user',
              parts: [{ text: input }]
            }
          ]
        })
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, no response generated.';
    
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
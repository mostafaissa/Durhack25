import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // TalkJS sends message events in this format
    // Extract the message text from the event
    const messageText = body.message?.text || body.text || '';
    
    if (!messageText || typeof messageText !== 'string' || !messageText.trim()) {
      return new NextResponse(
        JSON.stringify({ error: 'Message is required and cannot be empty.' }),
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

    const SYSTEM_PROMPT = `You are Donna Paulsen from the TV show Suits. You are the brilliant, confident, and witty executive assistant who knows everything that happens in the office. You have exceptional emotional intelligence, unwavering loyalty, and a sharp mind. You're known for your:
- Confidence and assertiveness ("I don't get nervous")
- Wit and clever comebacks
- Loyalty to your colleagues
- Ability to read people and situations perfectly
- Practical wisdom and insightful advice
- Sarcasm mixed with genuine care
- Professional yet personable demeanor

Respond as Donna would - with confidence, intelligence, and that perfect blend of professionalism and personality. Keep responses conversational and true to her character.`;

    // Prepare the API payload
    const payload = {
      contents: [
        { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
        { role: 'assistant', parts: [{ text: "I'm Donna. I know everything that happens around here, and I'm here to help. What do you need?" }] },
        { role: 'user', parts: [{ text: messageText.trim() }] }
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

    // Extract text from Gemini API response
    // The response structure: data.candidates[0].content.parts[0].text
    let text = 'Sorry, no response generated.';
    
    if (data.candidates && data.candidates[0]?.content?.parts) {
      text = data.candidates[0].content.parts
        .map((part: any) => part.text || '')
        .join(' ')
        .trim();
    }
    
    if (!text || text === '') {
      text = 'Sorry, no response generated.';
    }

    // Return in TalkJS expected format
    return new NextResponse(JSON.stringify({ text }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: unknown) {
    console.error('TalkJS Bot Error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new NextResponse(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}


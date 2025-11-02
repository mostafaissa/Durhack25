import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { message } = await req.json();

  // Replace with Gemini API call
  const reply = `Gemini says: "${message}"`;

  return NextResponse.json({ reply });
}
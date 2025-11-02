import { NextResponse } from 'next/server';

export async function GET() {
  const user = {
    id: 'gandia123',
    name: 'Gandia',
    email: 'gandia@example.com',
    photoUrl: '/avatar-gandia.png',
    welcomeMessage: 'Hey there!',
  };

  return NextResponse.json(user);
}
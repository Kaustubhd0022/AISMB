import { NextResponse } from 'next/server';

export async function GET() {
  // Mock fetching scheduled content
  return NextResponse.json({
    success: true,
    data: [
      {
        id: "content_789",
        caption: "Fresh chocolate cake just ready! 🍫",
        hashtags: ["#chocolatecake", "#homemade"],
        scheduled_at: "2026-04-25T18:00:00Z",
        status: "scheduled"
      }
    ],
    timestamp: new Date().toISOString()
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Mock scheduling new content
    return NextResponse.json({
      success: true,
      message: "Content scheduled successfully",
      data: {
        ...body,
        id: `content_${Math.floor(Math.random() * 1000)}`,
        status: "scheduled"
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid Request' }, { status: 400 });
  }
}

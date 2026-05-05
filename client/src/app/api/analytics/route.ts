import { NextResponse } from 'next/server';
import { mockAnalytics } from '../mockData';

export async function GET() {
  // Return the mock analytics data to populate the dashboard
  return NextResponse.json({
    success: true,
    data: mockAnalytics,
    timestamp: new Date().toISOString()
  });
}

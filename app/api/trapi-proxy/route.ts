// app/api/strapi-proxy/route.ts
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const strapiUrl = process.env.STRAPI_URL || 'http://34.170.207.129:1337';
    const endpoint = request.nextUrl.searchParams.get('endpoint') || '';
    
    console.log(`Fetching from: ${strapiUrl}${endpoint}`);
    
    const response = await fetch(`${strapiUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Strapi responded with ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from Strapi', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
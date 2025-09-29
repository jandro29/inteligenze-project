import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const strapiUrl = process.env.STRAPI_URL || 'http://34.170.207.129:1337';
    const endpoint = request.nextUrl.searchParams.get('endpoint') || '';
    
    console.log(`🔄 Proxy: Fetching from: ${strapiUrl}${endpoint}`);
    
    const response = await fetch(`${strapiUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    console.log(`📡 Proxy: Strapi responded with status ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Proxy: Strapi error response:`, errorText);
      throw new Error(`Strapi responded with ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log(`✅ Proxy: Data received successfully`);
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('❌ Proxy error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { 
        error: 'Failed to fetch from Strapi', 
        details: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
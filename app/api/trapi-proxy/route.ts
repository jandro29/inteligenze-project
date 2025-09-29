import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Solo permitir GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const strapiUrl = process.env.STRAPI_URL || 'http://34.170.207.129:1337';
    const endpoint = req.query.endpoint as string || '';
    
    const fullUrl = `${strapiUrl}${endpoint}`;
    console.log(`🔄 Proxy: Fetching from: ${fullUrl}`);
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    console.log(`📡 Proxy: Strapi responded with status ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Proxy: Strapi error response:`, errorText);
      return res.status(response.status).json({
        error: `Strapi responded with ${response.status}`,
        details: errorText
      });
    }

    const data = await response.json();
    console.log(`✅ Proxy: Data received successfully`);
    
    // Configurar headers CORS
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('❌ Proxy error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({
      error: 'Failed to fetch from Strapi',
      details: errorMessage,
      timestamp: new Date().toISOString(),
    });
  }
}
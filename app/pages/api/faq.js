// pages/api/faq.js
export default async function handler(req, res) {
  // Habilita CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    console.log('🌐 Conectando con Strapi...');
    
    // ✅ VERIFICA ESTA URL - podría necesitar el puerto 1337
    const strapiUrl = 'http://34.170.207.129:1337/api/septimo-contenedor';
    console.log('🔗 URL de Strapi:', strapiUrl);
    
    const response = await fetch(strapiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('📡 Status de Strapi:', response.status);
    console.log('📡 OK:', response.ok);

    // Verifica si la respuesta es HTML en lugar de JSON
    const contentType = response.headers.get('content-type');
    console.log('📄 Content-Type:', contentType);

    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Strapi devolvió HTML en lugar de JSON. Verifica la URL.');
    }

    if (!response.ok) {
      const text = await response.text();
      console.error('❌ Respuesta de error:', text);
      throw new Error(`Strapi response: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ Datos recibidos de Strapi via API Route');
    
    res.status(200).json(data);
  } catch (error) {
    console.error('❌ Error en API Route:', error.message);
    
    res.status(500).json({ 
      error: 'No se pudo conectar con Strapi',
      details: error.message,
      debug: 'Verifica que Strapi esté corriendo en http://34.170.207.129:1337'
    });
  }
}
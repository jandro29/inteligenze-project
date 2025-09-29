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
    
    const response = await fetch('http://34.170.207.129:1337/api/septimo-contenedor', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Strapi response: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ Datos recibidos de Strapi via API Route');
    
    res.status(200).json(data);
  } catch (error) {
    console.error('❌ Error en API Route:', error.message);
    
    // ❌ SIN DATOS ESTÁTICOS - solo retorna error
    res.status(500).json({ 
      error: 'No se pudo conectar con Strapi',
      details: error.message 
    });
  }
}
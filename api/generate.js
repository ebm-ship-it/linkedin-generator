module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { idea, tono, sectorTexto } = req.body;
  if (!idea) return res.status(400).json({ error: 'Falta el campo idea' });

  const prompt = `Eres un experto en personal branding y contenido viral para LinkedIn. Genera un post profesional en español con tono ${tono}.${sectorTexto}

La idea del usuario: "${idea}"

Reglas:
- Primera línea: hook muy potente (máx 10 palabras)
- Saltos de línea estratégicos para móvil
- Entre 3 y 5 emojis
- Termina con pregunta que invite a comentar
- Entre 3 y 5 hashtags al final
- 150-220 palabras
- Solo texto plano, sin asteriscos

Devuelve únicamente el post, sin explicaciones.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-v

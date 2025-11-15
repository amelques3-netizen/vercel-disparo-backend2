// api/search-places.js
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

    const { query, city, limit = 10 } = req.body || {};
    if (!query || !city) return res.status(400).json({ error: 'query and city required' });

    const text = `${query} in ${city}`;

    const params = new URLSearchParams({
      query: text,
      key: apiKey,
      language: 'pt-BR'
    });

    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?${params.toString()}`;
    const r = await fetch(url);
    const j = await r.json();

    const results = j.results || [];

    const mapped = results.slice(0, limit).map(p => ({
      place_id: p.place_id,
      name: p.name,
      address: p.formatted_address || p.vicinity || null,
      rating: p.rating || null,
      types: p.types || []
    }));

    return res.json({ ok: true, data: mapped, next_page_token: j.next_page_token || null });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal_error', detail: err.message });
  }
};

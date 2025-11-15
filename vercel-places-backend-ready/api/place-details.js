// api/place-details.js
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

    const { place_id } = req.body || {};
    if (!place_id) return res.status(400).json({ error: 'place_id required' });

    const params = new URLSearchParams({
      place_id,
      key: apiKey,
      fields: 'name,formatted_address,formatted_phone_number,website,opening_hours'
    });

    const url = `https://maps.googleapis.com/maps/api/place/details/json?${params.toString()}`;
    const r = await fetch(url);
    const j = await r.json();

    const detail = j.result || {};
    return res.json({ ok: true, data: {
      name: detail.name,
      address: detail.formatted_address,
      phone: detail.formatted_phone_number || null,
      website: detail.website || null,
      opening_hours: detail.opening_hours || null
    }});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal_error', detail: err.message });
  }
};

export default async function handler(req, res) {
  const { key } = req.query;
  
  if (!key) {
    return res.status(400).json({ error: "API Key is missing!" });
  }
  const targetUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${key}`;

  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Server Error: " + error.message });
  }
}

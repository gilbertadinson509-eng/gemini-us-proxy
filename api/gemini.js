export default async function handler(req, res) {
  // گرفتن کلید API از آدرس شما
  const { key } = req.query;
  
  if (!key) {
    return res.status(400).json({ error: "API Key is missing!" });
  }

  // ساخت آدرس اصلی گوگل
  const targetUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;

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

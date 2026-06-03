export default async function handler(req, res) {
  const { key, endpoint } = req.query;
  
  if (!key) {
    return res.status(400).json({ error: "API Key is missing!" });
  }

  // اگر پارامتر endpoint فرستاده نشود، به صورت پیش‌فرض لیست مدل‌ها را می‌گیرد
  const apiPath = endpoint || "v1beta/models";
  const targetUrl = `https://generativelanguage.googleapis.com/${apiPath}?key=${key}`;

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
      body: req.method === 'POST' ? JSON.stringify(req.body) : null
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Proxy Error: " + error.message });
  }
}

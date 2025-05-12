export default async function handler(req, res) {
  try {
    const response = await fetch('https://extensions.aitopia.ai/extensions/app/get_key', {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...req.headers, // Forward headers if necessary
      },
      body: req.method === 'POST' ? JSON.stringify(req.body) : null,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
}

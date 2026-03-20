import { kv } from '@vercel/kv';

const KV_KEY = 'civfr:corrections';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const corrections = await kv.get(KV_KEY) || [];
      return res.status(200).json({ corrections });
    } catch (e) {
      return res.status(200).json({ corrections: [] });
    }
  }

  if (req.method === 'POST') {
    const { correction, author, adminKey } = req.body;
    if (adminKey !== process.env.ADMIN_KEY) return res.status(401).json({ error: 'Clé admin incorrecte' });
    if (!correction?.trim()) return res.status(400).json({ error: 'Correction vide' });
    try {
      const corrections = await kv.get(KV_KEY) || [];
      corrections.push({ id: Date.now(), text: correction.trim(), author: author || 'Admin', date: new Date().toISOString() });
      await kv.set(KV_KEY, corrections);
      return res.status(200).json({ success: true });
    } catch (e) {
      return res.status(500).json({ error: 'Erreur KV: ' + e.message });
    }
  }

  if (req.method === 'DELETE') {
    const { id, adminKey } = req.body;
    if (adminKey !== process.env.ADMIN_KEY) return res.status(401).json({ error: 'Clé admin incorrecte' });
    try {
      const corrections = await kv.get(KV_KEY) || [];
      await kv.set(KV_KEY, corrections.filter(c => c.id !== id));
      return res.status(200).json({ success: true });
    } catch (e) {
      return res.status(500).json({ error: 'Erreur KV: ' + e.message });
    }
  }

  res.status(405).end();
}

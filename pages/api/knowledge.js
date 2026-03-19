// API pour gérer la base de connaissances additionnelle
// Stockée dans un fichier JSON local (ou Google Drive via future intégration)

import fs from 'fs';
import path from 'path';

const KB_PATH = path.join(process.cwd(), 'data', 'corrections.json');

function ensureDataDir() {
  const dir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(KB_PATH)) fs.writeFileSync(KB_PATH, JSON.stringify({ corrections: [], lastUpdated: null }));
}

export default function handler(req, res) {
  ensureDataDir();

  if (req.method === 'GET') {
    const data = JSON.parse(fs.readFileSync(KB_PATH, 'utf8'));
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { correction, author, adminKey } = req.body;
    if (adminKey !== process.env.ADMIN_KEY) return res.status(401).json({ error: 'Non autorisé' });
    
    const data = JSON.parse(fs.readFileSync(KB_PATH, 'utf8'));
    data.corrections.push({
      id: Date.now(),
      text: correction,
      author: author || 'Admin',
      date: new Date().toISOString(),
    });
    data.lastUpdated = new Date().toISOString();
    fs.writeFileSync(KB_PATH, JSON.stringify(data, null, 2));
    return res.status(200).json({ success: true });
  }

  if (req.method === 'DELETE') {
    const { id, adminKey } = req.body;
    if (adminKey !== process.env.ADMIN_KEY) return res.status(401).json({ error: 'Non autorisé' });
    
    const data = JSON.parse(fs.readFileSync(KB_PATH, 'utf8'));
    data.corrections = data.corrections.filter(c => c.id !== id);
    fs.writeFileSync(KB_PATH, JSON.stringify(data, null, 2));
    return res.status(200).json({ success: true });
  }

  res.status(405).end();
}

// API Draft - stockage des drafts en cours et historique
import fs from 'fs';
import path from 'path';

const DRAFTS_PATH = path.join(process.cwd(), 'data', 'drafts.json');

function ensureDataDir() {
  const dir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DRAFTS_PATH)) fs.writeFileSync(DRAFTS_PATH, JSON.stringify({ drafts: [] }));
}

export default function handler(req, res) {
  ensureDataDir();

  if (req.method === 'GET') {
    const data = JSON.parse(fs.readFileSync(DRAFTS_PATH, 'utf8'));
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const draft = req.body;
    const data = JSON.parse(fs.readFileSync(DRAFTS_PATH, 'utf8'));
    draft.id = Date.now();
    draft.date = new Date().toISOString();
    data.drafts.unshift(draft);
    if (data.drafts.length > 100) data.drafts = data.drafts.slice(0, 100);
    fs.writeFileSync(DRAFTS_PATH, JSON.stringify(data, null, 2));
    return res.status(200).json({ success: true, id: draft.id });
  }

  res.status(405).end();
}

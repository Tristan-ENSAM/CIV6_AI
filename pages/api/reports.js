import fs from 'fs';
import path from 'path';

const REPORTS_PATH = path.join(process.cwd(), 'data', 'reports.json');

function ensureDataDir() {
  const dir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(REPORTS_PATH)) fs.writeFileSync(REPORTS_PATH, JSON.stringify({ reports: [] }));
}

export default function handler(req, res) {
  ensureDataDir();

  if (req.method === 'GET') {
    const data = JSON.parse(fs.readFileSync(REPORTS_PATH, 'utf8'));
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const report = req.body;
    const data = JSON.parse(fs.readFileSync(REPORTS_PATH, 'utf8'));
    report.id = Date.now();
    report.createdAt = new Date().toISOString();
    data.reports.unshift(report);
    fs.writeFileSync(REPORTS_PATH, JSON.stringify(data, null, 2));
    return res.status(200).json({ success: true, id: report.id });
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    const data = JSON.parse(fs.readFileSync(REPORTS_PATH, 'utf8'));
    data.reports = data.reports.filter(r => r.id !== id);
    fs.writeFileSync(REPORTS_PATH, JSON.stringify(data, null, 2));
    return res.status(200).json({ success: true });
  }

  res.status(405).end();
}

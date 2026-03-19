import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

const CIVS = ["Allemagne","Angleterre","Arabie","Australie","Aztèques","Babylone","Brésil","Byzance","Canada","Chine","Corée","Cree","Égypte","Éthiopie","France","Gaule","Géorgie","Grèce","Grande Colombie","Hongrie","Inca","Inde","Indonésie","Japon","Khmer","Kongo","Macédoine","Mali","Malte","Mamelouks","Maori","Mapuche","Maya","Mongolie","Norvège","Nubie","Ottomans","Pays-Bas","Perse","Philippines","Phénicie","Pologne","Portugal","Rome","Russie","Écosse","Scythie","Espagne","Sumeria","Swahili","Suède","Teotihuacán","Thule","Tibet","Vietnam","Zoulou"];
const MAPS = ["7 Mers","Pangée Classique","Rich Highland","Primordiale","Pangée Est/Ouest","Tilted Axis","Lacs"];
const VIC_LABELS = { dom: 'Domination', sci: 'Science', cul: 'Culture', rel: 'Religion', sco: 'Score', cc: 'CC' };

const SEQUENCE = [
  {t:1,a:'mban'},{t:2,a:'mban'},{t:1,a:'mban'},{t:2,a:'mban'},{t:1,a:'mban'},{t:2,a:'mban'},
  {t:1,a:'ban'},{t:2,a:'ban'},{t:1,a:'ban'},{t:2,a:'ban'},{t:1,a:'ban'},{t:2,a:'ban'},
  {t:1,a:'ban'},{t:2,a:'ban'},{t:1,a:'ban'},{t:2,a:'ban'},
  {t:1,a:'pick'},{t:2,a:'pick'},{t:2,a:'pick'},{t:1,a:'pick'},
  {t:2,a:'ban'},{t:1,a:'ban'},{t:2,a:'ban'},{t:1,a:'ban'},{t:2,a:'ban'},{t:1,a:'ban'},
  {t:2,a:'pick'},{t:1,a:'pick'},{t:1,a:'pick'},{t:2,a:'pick'}
];

export default function Home() {
  const [tab, setTab] = useState('coach');
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Salut commandant ! Je suis **Imperator**, coach officiel CivFR calibré sur la meta BBG 7.3 S16.\n\nDécrivez votre situation — civ, adversaires, map, tour — et je vous coach avec précision.' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [knowledge, setKnowledge] = useState({ corrections: [] });
  const [reports, setReports] = useState([]);
  const [adminKey, setAdminKey] = useState('');
  const [newCorrection, setNewCorrection] = useState('');
  const [adminAuthor, setAdminAuthor] = useState('');
  const [adminMsg, setAdminMsg] = useState('');
  const [draft, setDraft] = useState({ active: false, phase: 0, t1n: 'Équipe 1', t2n: 'Équipe 2', t1mb: [], t2mb: [], t1b: [], t2b: [], t1p: [], t2p: [], used: new Set(), mapUsed: new Set() });
  const [civSearch, setCivSearch] = useState('');
  const [report, setReport] = useState({ winner: '', vic: 'cc', turns: '', map: '7 Mers', civs: ['','','','','','','',''] });
  const [reportMsg, setReportMsg] = useState('');
  const [stats, setStats] = useState(null);
  const messagesEnd = useRef(null);

  useEffect(() => { loadKnowledge(); loadReports(); }, []);
  useEffect(() => { messagesEnd.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  async function loadKnowledge() {
    try { const r = await fetch('/api/knowledge'); const d = await r.json(); setKnowledge(d); } catch(e) {}
  }
  async function loadReports() {
    try { const r = await fetch('/api/reports'); const d = await r.json(); setReports(d.reports || []); computeStats(d.reports || []); } catch(e) {}
  }

  function computeStats(reps) {
    if (!reps.length) return setStats(null);
    const total = reps.length;
    const avgT = Math.round(reps.filter(r=>r.turns).reduce((s,r)=>s+parseInt(r.turns),0) / Math.max(reps.filter(r=>r.turns).length,1));
    const vc = {}; reps.forEach(r => vc[r.vic] = (vc[r.vic]||0)+1);
    const topV = Object.entries(vc).sort((a,b)=>b[1]-a[1])[0];
    const cc = {}; reps.forEach(r => r.civs?.filter(Boolean).forEach(c => cc[c] = (cc[c]||0)+1));
    const topC = Object.entries(cc).sort((a,b)=>b[1]-a[1])[0];
    const mc = {}; reps.forEach(r => r.map && (mc[r.map] = (mc[r.map]||0)+1));
    const topM = Object.entries(mc).sort((a,b)=>b[1]-a[1])[0];
    setStats({ total, avgT, topV, topC, topM, cc, vc });
  }

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input.trim() };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput('');
    setLoading(true);
    try {
      const extra = knowledge.corrections?.map(c => `[${c.author}] ${c.text}`).join('\n') || '';
      const r = await fetch('/api/coach', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ messages: newMsgs.map(m => ({ role: m.role, content: m.content })), knowledgeExtra: extra }) });
      const d = await r.json();
      setMessages([...newMsgs, { role: 'assistant', content: d.reply }]);
    } catch(e) { setMessages([...newMsgs, { role: 'assistant', content: 'Erreur de connexion. Réessayez.' }]); }
    setLoading(false);
  }

  async function addCorrection() {
    if (!newCorrection.trim() || !adminKey) return;
    const r = await fetch('/api/knowledge', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ correction: newCorrection, author: adminAuthor || 'Admin', adminKey }) });
    const d = await r.json();
    if (d.success) { setNewCorrection(''); setAdminMsg('✓ Correction ajoutée'); loadKnowledge(); setTimeout(() => setAdminMsg(''), 3000); }
    else setAdminMsg('❌ Clé admin incorrecte');
  }

  async function deleteCorrection(id) {
    if (!adminKey) return;
    await fetch('/api/knowledge', { method: 'DELETE', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ id, adminKey }) });
    loadKnowledge();
  }

  async function saveReport() {
    if (!report.winner.trim()) return;
    const r = await fetch('/api/reports', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(report) });
    const d = await r.json();
    if (d.success) { setReport({ winner: '', vic: 'cc', turns: '', map: '7 Mers', civs: ['','','','','','','',''] }); setReportMsg('✓ Partie enregistrée'); loadReports(); setTimeout(() => setReportMsg(''), 3000); }
  }

  function startDraft() {
    setDraft({ active: true, phase: 0, t1n: draft.t1n, t2n: draft.t2n, t1mb: [], t2mb: [], t1b: [], t2b: [], t1p: [], t2p: [], used: new Set(), mapUsed: new Set() });
    setCivSearch('');
  }

  function makePick(val, isMap) {
    if (!draft.active || draft.phase >= SEQUENCE.length) return;
    const s = SEQUENCE[draft.phase];
    const newDraft = { ...draft, phase: draft.phase + 1 };
    if (isMap) {
      newDraft.mapUsed = new Set([...draft.mapUsed, val]);
      if (s.t === 1) newDraft.t1mb = [...draft.t1mb, val]; else newDraft.t2mb = [...draft.t2mb, val];
    } else {
      newDraft.used = new Set([...draft.used, val]);
      if (s.a === 'ban') { if (s.t === 1) newDraft.t1b = [...draft.t1b, val]; else newDraft.t2b = [...draft.t2b, val]; }
      else { if (s.t === 1) newDraft.t1p = [...draft.t1p, val]; else newDraft.t2p = [...draft.t2p, val]; }
    }
    setDraft(newDraft);
  }

  function fmt(text) {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^[-•] (.+)$/gm, '<li>$1</li>').replace(/(<li>.*<\/li>\n?)+/g, m => `<ul>${m}</ul>`).replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');
  }

  const curStep = draft.active && draft.phase < SEQUENCE.length ? SEQUENCE[draft.phase] : null;
  const isMapPhase = curStep?.a === 'mban';
  const isCivPhase = curStep?.a === 'ban' || curStep?.a === 'pick';
  const filteredCivs = CIVS.filter(c => c.toLowerCase().includes(civSearch.toLowerCase()));

  return (
    <>
      <Head>
        <title>Imperator — Coach CivFR</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Pro:ital,wght@0,300;0,400;0,500;1,300&display=swap" rel="stylesheet" />
      </Head>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --gold: #C9A84C; --gold-light: #E8C97A; --gold-dark: #8B6914;
          --bg: #0A0C10; --bg2: #111418; --bg3: #181C22; --bg4: #1E2430;
          --border: rgba(201,168,76,0.2); --border2: rgba(201,168,76,0.4);
          --text: #E8E0D0; --text2: #9A9080; --text3: #5A5048;
          --red: #C84040; --green: #3A8A50; --blue: #3A5A8A;
          --shadow: 0 4px 24px rgba(0,0,0,0.6);
        }
        body { font-family: 'Crimson Pro', Georgia, serif; background: var(--bg); color: var(--text); min-height: 100vh; font-size: 16px; line-height: 1.6; }
        .app { max-width: 960px; margin: 0 auto; padding: 0 16px 40px; }
        
        header { text-align: center; padding: 32px 0 24px; border-bottom: 1px solid var(--border); margin-bottom: 24px; }
        header h1 { font-family: 'Cinzel', serif; font-size: 2.4rem; font-weight: 700; color: var(--gold); letter-spacing: 0.08em; text-shadow: 0 0 40px rgba(201,168,76,0.3); }
        header p { color: var(--text2); font-size: 0.95rem; margin-top: 6px; letter-spacing: 0.05em; }
        
        nav { display: flex; gap: 2px; margin-bottom: 24px; border: 1px solid var(--border); border-radius: 8px; overflow: hidden; background: var(--bg2); }
        nav button { flex: 1; padding: 12px 8px; font-family: 'Cinzel', serif; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.05em; background: none; border: none; color: var(--text2); cursor: pointer; transition: all 0.2s; }
        nav button.active { background: var(--bg4); color: var(--gold); border-bottom: 2px solid var(--gold); }
        nav button:hover:not(.active) { background: var(--bg3); color: var(--text); }
        
        .panel { display: none; } .panel.active { display: block; }
        
        .card { background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 20px; margin-bottom: 16px; }
        .card-title { font-family: 'Cinzel', serif; font-size: 0.85rem; font-weight: 600; color: var(--gold); letter-spacing: 0.06em; margin-bottom: 14px; text-transform: uppercase; }
        
        /* COACH */
        .chat-window { height: 420px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; padding: 4px 0; margin-bottom: 12px; scrollbar-width: thin; scrollbar-color: var(--border) transparent; }
        .msg { display: flex; gap: 10px; align-items: flex-start; }
        .msg.user { flex-direction: row-reverse; }
        .avatar { width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-family: 'Cinzel', serif; font-size: 12px; font-weight: 700; border: 1px solid var(--border2); }
        .avatar.bot { background: linear-gradient(135deg, #2A1F08, #4A3A18); color: var(--gold); }
        .avatar.usr { background: linear-gradient(135deg, #0A1A2A, #1A3A5A); color: #6A9ACC; }
        .bubble { max-width: 82%; padding: 10px 14px; border-radius: 12px; font-size: 0.95rem; line-height: 1.65; }
        .bubble.bot { background: var(--bg3); border: 1px solid var(--border); border-top-left-radius: 4px; }
        .bubble.usr { background: linear-gradient(135deg, #0A1A2A, #1A3050); border: 1px solid rgba(58,90,138,0.4); border-top-right-radius: 4px; color: #C0D8F0; }
        .bubble ul { padding-left: 16px; margin-top: 6px; } .bubble li { margin-bottom: 3px; }
        .bubble strong { color: var(--gold-light); font-weight: 600; }
        .typing-dots { display: flex; gap: 5px; padding: 4px 0; }
        .typing-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold); opacity: 0.4; animation: pulse 1.2s infinite; }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; } .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes pulse { 0%,60%,100%{opacity:0.4;transform:translateY(0)} 30%{opacity:1;transform:translateY(-4px)} }
        
        .chips { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 10px; }
        .chip { font-size: 0.75rem; padding: 4px 10px; border: 1px solid var(--border2); border-radius: 20px; cursor: pointer; color: var(--text2); background: var(--bg3); font-family: 'Crimson Pro', serif; transition: all 0.15s; }
        .chip:hover { border-color: var(--gold); color: var(--gold); background: var(--bg4); }
        
        .input-row { display: flex; gap: 8px; }
        textarea { flex: 1; background: var(--bg3); border: 1px solid var(--border); border-radius: 8px; padding: 10px 14px; color: var(--text); font-family: 'Crimson Pro', serif; font-size: 0.95rem; resize: none; outline: none; line-height: 1.5; transition: border-color 0.2s; }
        textarea:focus { border-color: var(--gold); }
        textarea::placeholder { color: var(--text3); }
        .send-btn { width: 42px; height: 42px; border-radius: 50%; background: linear-gradient(135deg, var(--gold-dark), var(--gold)); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: opacity 0.15s; }
        .send-btn:hover { opacity: 0.85; } .send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .send-btn svg { width: 16px; height: 16px; fill: #0A0C10; }
        
        /* DRAFT */
        .draft-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .team-card { background: var(--bg3); border: 1px solid var(--border); border-radius: 8px; padding: 12px; }
        .team-label { font-family: 'Cinzel', serif; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.05em; margin-bottom: 8px; }
        .team-label.t1 { color: #6A9ACC; } .team-label.t2 { color: #CC6A6A; }
        .slots { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; }
        .slot { padding: 5px 8px; border-radius: 6px; border: 1px solid var(--border); font-size: 0.85rem; min-height: 30px; display: flex; align-items: center; color: var(--text3); background: var(--bg4); }
        .slot.pick { background: rgba(58,138,80,0.15); color: #7ACC8A; border-color: rgba(58,138,80,0.4); font-weight: 500; }
        .slot.ban { background: rgba(200,64,64,0.12); color: #CC8A8A; border-color: rgba(200,64,64,0.3); font-weight: 500; }
        .bans-row { display: flex; flex-wrap: wrap; gap: 4px; min-height: 24px; margin-bottom: 8px; }
        .ban-pill { font-size: 0.75rem; padding: 2px 8px; border-radius: 20px; background: rgba(200,64,64,0.12); color: #CC8A8A; border: 1px solid rgba(200,64,64,0.3); }
        .map-pill { font-size: 0.75rem; padding: 2px 8px; border-radius: 20px; background: rgba(58,90,138,0.15); color: #8AACC8; border: 1px solid rgba(58,90,138,0.4); }
        .turn-box { background: rgba(201,168,76,0.08); border: 1px solid var(--border2); border-radius: 8px; padding: 10px 14px; font-family: 'Cinzel', serif; font-size: 0.82rem; color: var(--gold-light); letter-spacing: 0.03em; margin-bottom: 12px; text-align: center; }
        .phase-row { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; }
        .pbadge { font-size: 0.72rem; padding: 3px 10px; border-radius: 20px; font-family: 'Cinzel', serif; }
        .pbadge.abn { background: rgba(200,64,64,0.12); color: #CC8A8A; border: 1px solid rgba(200,64,64,0.3); }
        .pbadge.apk { background: rgba(58,138,80,0.12); color: #8ACC8A; border: 1px solid rgba(58,138,80,0.3); }
        .pbadge.done { background: var(--bg4); color: var(--text3); border: 1px solid var(--border); }
        .pbadge.pend { background: var(--bg3); color: var(--text3); border: 1px solid var(--border); }
        
        .civ-search-input { width: 100%; background: var(--bg3); border: 1px solid var(--border); border-radius: 8px; padding: 8px 12px; color: var(--text); font-family: 'Crimson Pro', serif; font-size: 0.9rem; outline: none; margin-bottom: 8px; }
        .civ-search-input:focus { border-color: var(--gold); }
        .civ-grid { display: flex; flex-wrap: wrap; gap: 5px; max-height: 130px; overflow-y: auto; scrollbar-width: thin; }
        .civ-btn { font-size: 0.78rem; padding: 4px 10px; border: 1px solid var(--border); border-radius: 20px; cursor: pointer; background: var(--bg3); color: var(--text); font-family: 'Crimson Pro', serif; transition: all 0.15s; }
        .civ-btn:hover { border-color: var(--gold); color: var(--gold); }
        .civ-btn.banned { background: rgba(200,64,64,0.1); color: var(--text3); cursor: not-allowed; opacity: 0.6; }
        .civ-btn.picked { background: rgba(58,138,80,0.1); color: var(--text3); cursor: not-allowed; opacity: 0.6; }
        .civ-btn.mapbanned { background: rgba(58,90,138,0.1); color: var(--text3); cursor: not-allowed; opacity: 0.6; }
        
        /* FORMS */
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .form-grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
        .field { display: flex; flex-direction: column; gap: 4px; }
        .field label { font-size: 0.75rem; color: var(--text2); font-family: 'Cinzel', serif; letter-spacing: 0.03em; }
        input[type="text"], input[type="number"], input[type="date"], input[type="password"], select {
          background: var(--bg3); border: 1px solid var(--border); border-radius: 6px; padding: 7px 10px;
          color: var(--text); font-family: 'Crimson Pro', serif; font-size: 0.9rem; outline: none; width: 100%;
        }
        input:focus, select:focus { border-color: var(--gold); }
        select option { background: var(--bg3); }
        
        .btn { padding: 8px 18px; font-family: 'Cinzel', serif; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.05em; border-radius: 6px; cursor: pointer; transition: all 0.15s; }
        .btn-gold { background: linear-gradient(135deg, var(--gold-dark), var(--gold)); color: #0A0C10; border: none; }
        .btn-gold:hover { opacity: 0.85; }
        .btn-outline { background: none; border: 1px solid var(--border2); color: var(--gold); }
        .btn-outline:hover { background: var(--bg4); }
        .btn-danger { background: none; border: 1px solid rgba(200,64,64,0.4); color: #CC8A8A; font-size: 0.7rem; padding: 3px 8px; }
        .btn-danger:hover { background: rgba(200,64,64,0.1); }
        
        /* TABLE */
        table { width: 100%; border-collapse: collapse; font-size: 0.88rem; }
        th { text-align: left; padding: 7px 10px; color: var(--text2); font-family: 'Cinzel', serif; font-size: 0.72rem; letter-spacing: 0.04em; border-bottom: 1px solid var(--border); font-weight: 600; }
        td { padding: 7px 10px; border-bottom: 1px solid rgba(201,168,76,0.08); color: var(--text); }
        .vic-badge { font-size: 0.72rem; padding: 2px 8px; border-radius: 20px; font-weight: 500; }
        .vic-cc { background: rgba(201,168,76,0.12); color: var(--gold-light); border: 1px solid var(--border); }
        .vic-dom { background: rgba(200,64,64,0.12); color: #CC8A8A; border: 1px solid rgba(200,64,64,0.3); }
        .vic-sci { background: rgba(58,90,138,0.15); color: #8AACC8; border: 1px solid rgba(58,90,138,0.4); }
        .vic-cul { background: rgba(138,58,138,0.12); color: #C88ACC; border: 1px solid rgba(138,58,138,0.3); }
        .vic-rel { background: rgba(138,100,20,0.15); color: #C8A850; border: 1px solid rgba(138,100,20,0.4); }
        .vic-sco { background: var(--bg4); color: var(--text2); border: 1px solid var(--border); }
        
        /* STATS */
        .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        .stat-card { background: var(--bg3); border: 1px solid var(--border); border-radius: 8px; padding: 14px; text-align: center; }
        .stat-val { font-family: 'Cinzel', serif; font-size: 1.6rem; color: var(--gold); }
        .stat-label { font-size: 0.75rem; color: var(--text2); margin-top: 4px; letter-spacing: 0.03em; }
        
        /* ADMIN */
        .correction-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px 0; border-bottom: 1px solid var(--border); }
        .correction-text { flex: 1; font-size: 0.9rem; color: var(--text); }
        .correction-meta { font-size: 0.72rem; color: var(--text3); margin-top: 3px; }
        .section-title { font-family: 'Cinzel', serif; font-size: 0.72rem; font-weight: 600; color: var(--text2); letter-spacing: 0.06em; text-transform: uppercase; margin: 16px 0 8px; }
        .msg-ok { color: #7ACC8A; font-size: 0.85rem; }
        .msg-err { color: #CC8A8A; font-size: 0.85rem; }
        .empty { text-align: center; padding: 24px; color: var(--text3); font-size: 0.9rem; }
        
        .divider { border: none; border-top: 1px solid var(--border); margin: 16px 0; }
        
        @media (max-width: 600px) {
          header h1 { font-size: 1.6rem; }
          .draft-grid, .form-grid { grid-template-columns: 1fr; }
          .form-grid4 { grid-template-columns: repeat(2, 1fr); }
          .stat-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div className="app">
        <header>
          <h1>⚔ IMPERATOR</h1>
          <p>Coach officiel CivFR · BBG 7.3 · Saison 16 · 4v4</p>
        </header>

        <nav>
          {['coach','draft','reports','admin'].map(t => (
            <button key={t} className={tab === t ? 'active' : ''} onClick={() => setTab(t)}>
              {t === 'coach' ? '⚔ Coach' : t === 'draft' ? '⚡ Draft S16' : t === 'reports' ? '📊 Reports' : '🔐 Admin'}
            </button>
          ))}
        </nav>

        {/* COACH */}
        <div className={`panel ${tab === 'coach' ? 'active' : ''}`}>
          <div className="card">
            <div className="chips">
              {['Meilleure synergie équipe BBG S16 ?','Quelles civs bannir en priorité ?','Stratégie sur Rich Highland 4v4 ?','Counter une équipe militaire ?','Guide une civ spécifique BBG 7.3 ?'].map(c => (
                <button key={c} className="chip" onClick={() => { setInput(c); }}>{c}</button>
              ))}
            </div>
            <div className="chat-window">
              {messages.map((m, i) => (
                <div key={i} className={`msg ${m.role === 'user' ? 'user' : ''}`}>
                  <div className={`avatar ${m.role === 'assistant' ? 'bot' : 'usr'}`}>{m.role === 'assistant' ? 'I' : 'V'}</div>
                  <div className={`bubble ${m.role === 'assistant' ? 'bot' : 'usr'}`} dangerouslySetInnerHTML={{ __html: fmt(m.content) }} />
                </div>
              ))}
              {loading && (
                <div className="msg">
                  <div className="avatar bot">I</div>
                  <div className="bubble bot"><div className="typing-dots">{[0,1,2].map(i => <div key={i} className="typing-dot" style={{animationDelay:`${i*0.2}s`}}/>)}</div></div>
                </div>
              )}
              <div ref={messagesEnd} />
            </div>
            <div className="input-row">
              <textarea rows="2" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }}} placeholder="Décrivez votre situation de jeu..." />
              <button className="send-btn" onClick={sendMessage} disabled={loading || !input.trim()}>
                <svg viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>
              </button>
            </div>
            {knowledge.corrections?.length > 0 && (
              <p style={{fontSize:'0.72rem',color:'var(--text3)',marginTop:'8px'}}>✓ {knowledge.corrections.length} correction{knowledge.corrections.length > 1 ? 's' : ''} communautaire{knowledge.corrections.length > 1 ? 's' : ''} chargée{knowledge.corrections.length > 1 ? 's' : ''}</p>
            )}
          </div>
        </div>

        {/* DRAFT */}
        <div className={`panel ${tab === 'draft' ? 'active' : ''}`}>
          <div className="card">
            <div className="card-title">Configuration du draft</div>
            <div className="form-grid" style={{marginBottom:'12px'}}>
              <div className="field"><label>Équipe 1 (mieux seedée)</label><input type="text" value={draft.t1n} onChange={e => setDraft({...draft, t1n: e.target.value})} /></div>
              <div className="field"><label>Équipe 2</label><input type="text" value={draft.t2n} onChange={e => setDraft({...draft, t2n: e.target.value})} /></div>
            </div>
            <div style={{display:'flex',gap:'8px'}}>
              <button className="btn btn-gold" onClick={startDraft}>Nouveau draft</button>
              <button className="btn btn-outline" onClick={() => setDraft({...draft, active:false, phase:0, t1mb:[],t2mb:[],t1b:[],t2b:[],t1p:[],t2p:[],used:new Set(),mapUsed:new Set()})}>Reset</button>
            </div>
          </div>

          {draft.active && (
            <>
              <div className="card">
                <div className="phase-row">
                  {[{l:'Bans maps',s:0,e:6},{l:'Bans 1',s:6,e:16},{l:'Picks 1',s:16,e:20},{l:'Bans 2',s:20,e:26},{l:'Picks 2',s:26,e:30}].map(p => (
                    <span key={p.l} className={`pbadge ${draft.phase < p.s ? 'pend' : draft.phase >= p.s && draft.phase < p.e ? (p.l.includes('Ban') ? 'abn' : 'apk') : 'done'}`}>{p.l}</span>
                  ))}
                </div>
                <div className="turn-box">
                  {draft.phase >= SEQUENCE.length ? '✓ Draft terminé !' : (() => {
                    const s = SEQUENCE[draft.phase];
                    const tn = s.t === 1 ? draft.t1n : draft.t2n;
                    const acts = {mban:'bannir une MAP',ban:'bannir une CIVILISATION',pick:'choisir une CIVILISATION'};
                    return `Étape ${draft.phase+1}/30 — ${tn} doit ${acts[s.a]}`;
                  })()}
                </div>

                {isMapPhase && (
                  <>
                    <div className="form-grid" style={{marginBottom:'10px'}}>
                      <div><div className="section-title" style={{color:'#8AACC8'}}>{draft.t1n} — bans maps</div><div className="bans-row">{draft.t1mb.map(m => <span key={m} className="map-pill">{m}</span>)}</div></div>
                      <div><div className="section-title" style={{color:'#CC8A8A'}}>{draft.t2n} — bans maps</div><div className="bans-row">{draft.t2mb.map(m => <span key={m} className="map-pill">{m}</span>)}</div></div>
                    </div>
                    <div className="civ-grid">
                      {MAPS.map(m => <button key={m} className={`civ-btn ${draft.mapUsed.has(m)?'mapbanned':''}`} onClick={() => !draft.mapUsed.has(m) && makePick(m, true)}>{m}</button>)}
                    </div>
                  </>
                )}

                {isCivPhase && (
                  <>
                    <input className="civ-search-input" placeholder="Rechercher une civ..." value={civSearch} onChange={e => setCivSearch(e.target.value)} />
                    <div className="civ-grid">
                      {filteredCivs.map(c => {
                        const isBanned = draft.t1b.includes(c) || draft.t2b.includes(c);
                        const isPicked = draft.t1p.includes(c) || draft.t2p.includes(c);
                        return <button key={c} className={`civ-btn ${isBanned?'banned':isPicked?'picked':''}`} onClick={() => !draft.used.has(c) && makePick(c, false)}>{c}</button>;
                      })}
                    </div>
                  </>
                )}
              </div>

              <div className="draft-grid">
                {[{t:'t1',label:draft.t1n,cl:'t1',bans:draft.t1b,picks:draft.t1p},{t:'t2',label:draft.t2n,cl:'t2',bans:draft.t2b,picks:draft.t2p}].map(team => (
                  <div key={team.t} className="team-card">
                    <div className={`team-label ${team.cl}`}>{team.label}</div>
                    <div className="section-title">Bans civs</div>
                    <div className="bans-row">{team.bans.map(b => <span key={b} className="ban-pill">{b}</span>)}</div>
                    <div className="section-title">Picks</div>
                    <div className="slots">
                      {[0,1,2,3].map(i => <div key={i} className={`slot ${team.picks[i]?'pick':''}`}>{team.picks[i]||'—'}</div>)}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* REPORTS */}
        <div className={`panel ${tab === 'reports' ? 'active' : ''}`}>
          {stats && (
            <div className="stat-grid" style={{marginBottom:'16px'}}>
              <div className="stat-card"><div className="stat-val">{stats.total}</div><div className="stat-label">Parties</div></div>
              <div className="stat-card"><div className="stat-val">{stats.avgT}</div><div className="stat-label">Tours moyens</div></div>
              <div className="stat-card"><div className="stat-val" style={{fontSize:'1.1rem'}}>{stats.topV ? VIC_LABELS[stats.topV[0]] : '—'}</div><div className="stat-label">Victoire fav.</div></div>
              <div className="stat-card"><div className="stat-val" style={{fontSize:'1rem'}}>{stats.topC?.[0] || '—'}</div><div className="stat-label">Civ la + jouée</div></div>
            </div>
          )}

          <div className="card">
            <div className="card-title">Ajouter une partie</div>
            <div className="form-grid" style={{marginBottom:'10px'}}>
              <div className="field"><label>Équipe gagnante</label><input type="text" value={report.winner} onChange={e => setReport({...report, winner: e.target.value})} placeholder="Nom du squadron" /></div>
              <div className="field"><label>Type de victoire</label>
                <select value={report.vic} onChange={e => setReport({...report, vic: e.target.value})}>
                  {Object.entries(VIC_LABELS).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
            </div>
            <div className="form-grid" style={{marginBottom:'10px'}}>
              <div className="field"><label>Tours joués</label><input type="number" value={report.turns} onChange={e => setReport({...report, turns: e.target.value})} placeholder="Ex: 87" /></div>
              <div className="field"><label>Map jouée</label>
                <select value={report.map} onChange={e => setReport({...report, map: e.target.value})}>
                  {MAPS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>
            <div className="section-title">Civs jouées (équipe 1)</div>
            <div className="form-grid4" style={{marginBottom:'8px'}}>
              {[0,1,2,3].map(i => <div key={i} className="field"><label>J{i+1}</label><input type="text" value={report.civs[i]} onChange={e => { const c=[...report.civs]; c[i]=e.target.value; setReport({...report,civs:c}); }} placeholder="Civ" /></div>)}
            </div>
            <div className="section-title">Civs jouées (équipe 2)</div>
            <div className="form-grid4" style={{marginBottom:'12px'}}>
              {[4,5,6,7].map(i => <div key={i} className="field"><label>J{i+1}</label><input type="text" value={report.civs[i]} onChange={e => { const c=[...report.civs]; c[i]=e.target.value; setReport({...report,civs:c}); }} placeholder="Civ" /></div>)}
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
              <button className="btn btn-gold" onClick={saveReport}>Enregistrer la partie</button>
              {reportMsg && <span className="msg-ok">{reportMsg}</span>}
            </div>
          </div>

          <div className="card">
            <div className="card-title">Historique ({reports.length} parties)</div>
            {!reports.length ? <div className="empty">Aucune partie enregistrée</div> : (
              <div style={{overflowX:'auto'}}>
                <table>
                  <thead><tr><th>Gagnant</th><th>Victoire</th><th>Tours</th><th>Map</th><th>Civs</th></tr></thead>
                  <tbody>
                    {reports.slice(0,30).map(r => (
                      <tr key={r.id}>
                        <td>{r.winner}</td>
                        <td><span className={`vic-badge vic-${r.vic}`}>{VIC_LABELS[r.vic]||r.vic}</span></td>
                        <td>{r.turns||'—'}</td>
                        <td style={{fontSize:'0.82rem'}}>{r.map}</td>
                        <td style={{fontSize:'0.78rem',color:'var(--text2)'}} title={r.civs?.filter(Boolean).join(', ')}>{r.civs?.filter(Boolean).slice(0,3).join(', ')}{r.civs?.filter(Boolean).length>3?'…':''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* ADMIN */}
        <div className={`panel ${tab === 'admin' ? 'active' : ''}`}>
          <div className="card">
            <div className="card-title">🔐 Espace admin — enrichissement du coach</div>
            <p style={{fontSize:'0.85rem',color:'var(--text2)',marginBottom:'14px',lineHeight:'1.7'}}>
              Ajoutez ici les corrections, mécaniques cachées, et mises à jour meta découvertes par la communauté. Ces données sont chargées automatiquement par le coach à chaque conversation.
            </p>
            <div className="field" style={{marginBottom:'10px'}}>
              <label>Clé admin</label>
              <input type="password" value={adminKey} onChange={e => setAdminKey(e.target.value)} placeholder="Clé secrète" />
            </div>
            <div className="field" style={{marginBottom:'10px'}}>
              <label>Votre pseudo</label>
              <input type="text" value={adminAuthor} onChange={e => setAdminAuthor(e.target.value)} placeholder="Ex: Malm, Spriggou..." />
            </div>
            <div className="field" style={{marginBottom:'12px'}}>
              <label>Nouvelle correction / mécanique</label>
              <textarea rows="4" value={newCorrection} onChange={e => setNewCorrection(e.target.value)} placeholder="Ex: 'En BBG 7.3, la civ X avec le gouverneur Y dans cette situation fait Z...'" style={{width:'100%',background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:'8px',padding:'10px',color:'var(--text)',fontFamily:'Crimson Pro, serif',fontSize:'0.9rem',resize:'vertical'}} />
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
              <button className="btn btn-gold" onClick={addCorrection}>Ajouter au coach</button>
              {adminMsg && <span className={adminMsg.startsWith('✓') ? 'msg-ok' : 'msg-err'}>{adminMsg}</span>}
            </div>
          </div>

          <div className="card">
            <div className="card-title">Base de connaissances communautaire ({knowledge.corrections?.length || 0} entrées)</div>
            {!knowledge.corrections?.length ? (
              <div className="empty">Aucune correction ajoutée. Soyez le premier à enrichir le coach !</div>
            ) : (
              knowledge.corrections.map(c => (
                <div key={c.id} className="correction-item">
                  <div style={{flex:1}}>
                    <div className="correction-text">{c.text}</div>
                    <div className="correction-meta">Par {c.author} · {new Date(c.date).toLocaleDateString('fr-FR')}</div>
                  </div>
                  {adminKey && <button className="btn btn-danger" onClick={() => deleteCorrection(c.id)}>Suppr.</button>}
                </div>
              ))
            )}
          </div>

          <div className="card">
            <div className="card-title">Configuration Vercel</div>
            <p style={{fontSize:'0.85rem',color:'var(--text2)',lineHeight:'1.8'}}>
              Variables d'environnement à configurer sur Vercel :<br/>
              <code style={{background:'var(--bg4)',padding:'2px 6px',borderRadius:'4px',color:'var(--gold-light)',fontSize:'0.82rem'}}>ANTHROPIC_API_KEY</code> — votre clé API Anthropic<br/>
              <code style={{background:'var(--bg4)',padding:'2px 6px',borderRadius:'4px',color:'var(--gold-light)',fontSize:'0.82rem'}}>ADMIN_KEY</code> — mot de passe admin de votre choix
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

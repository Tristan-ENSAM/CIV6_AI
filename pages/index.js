import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

const LINKS = [
  { label: 'CivFR Data', url: 'https://civfrdata.fr', desc: 'Stats, classements, historique des parties S16' },
  { label: 'BBG 7.3 — Leaders', url: 'https://civ6bbg.github.io/fr_FR/leaders_7.3.html', desc: 'Site officiel BBG 7.3' },
  { label: 'Règlement S16 CivFR', url: 'https://docs.google.com/document/d/1zAKkraegP6akhvR7qDl_Xgh7MSPphDvWLDXaRF-dPB8/edit?tab=t.0', desc: 'Règlement officiel squadrons saison 16' },
];

const CHIPS = [
  'Meilleure synergie équipe BBG S16 ?',
  'Quelles civs bannir en priorité ?',
  'Stratégie sur Rich Highland 4v4 ?',
  'Counter une équipe militaire ?',
  'Guide une civ spécifique BBG 7.3 ?',
  'Règle CivFR sur le relobby ?',
];

export default function Home() {
  const [tab, setTab] = useState('coach');
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: 'Bonjour, je suis **la conseillère**.\n\nDécrivez votre situation — civ, adversaires, map, tour — et je tenterais de vous aider.'
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEnd = useRef(null);

  useEffect(() => { messagesEnd.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input.trim() };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput('');
    setLoading(true);
    try {
      const r = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMsgs.map(m => ({ role: m.role, content: m.content })) })
      });
      const d = await r.json();
      setMessages([...newMsgs, { role: 'assistant', content: d.reply || d.error || 'Erreur.' }]);
    } catch (e) {
      setMessages([...newMsgs, { role: 'assistant', content: 'Erreur de connexion.' }]);
    }
    setLoading(false);
  }

  function fmt(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/^[-•] (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>\n?)+/g, m => `<ul>${m}</ul>`)
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');
  }

  return (
    <>
      <Head>
        <title>La Conseillère — Coach CivFR</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Pro:ital,wght@0,300;0,400;0,500;1,300&display=swap" rel="stylesheet" />
      </Head>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --gold: #C9A84C; --gold-light: #E8C97A; --gold-dark: #7A6020;
          --bg: #0A0C10; --bg2: #111418; --bg3: #181C22; --bg4: #1E2430;
          --border: rgba(201,168,76,0.18); --border2: rgba(201,168,76,0.38);
          --text: #E0D8C8; --text2: #8A8070; --text3: #4A4840;
        }
        body { font-family: 'Crimson Pro', Georgia, serif; background: var(--bg); color: var(--text); min-height: 100vh; font-size: 16px; line-height: 1.65; }
        .app { max-width: 900px; margin: 0 auto; padding: 0 16px 60px; }

        header { text-align: center; padding: 36px 0 28px; border-bottom: 1px solid var(--border); margin-bottom: 24px; }
        h1 { font-family: 'Cinzel', serif; font-size: 2.6rem; font-weight: 700; color: var(--gold); letter-spacing: .1em; }
        header p { color: var(--text2); font-size: .9rem; margin-top: 7px; letter-spacing: .06em; }

        nav { display: flex; margin-bottom: 24px; border: 1px solid var(--border); border-radius: 8px; overflow: hidden; background: var(--bg2); }
        nav button { flex: 1; padding: 13px 8px; font-family: 'Cinzel', serif; font-size: .78rem; font-weight: 600; letter-spacing: .05em; background: none; border: none; color: var(--text2); cursor: pointer; transition: all .2s; }
        nav button.active { background: var(--bg4); color: var(--gold); box-shadow: inset 0 -2px 0 var(--gold); }
        nav button:hover:not(.active) { background: var(--bg3); color: var(--text); }

        .panel { display: none; } .panel.active { display: block; }
        .card { background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 20px; margin-bottom: 16px; }
        .card-title { font-family: 'Cinzel', serif; font-size: .8rem; font-weight: 600; color: var(--gold); letter-spacing: .06em; text-transform: uppercase; margin-bottom: 14px; }

        .chat-window { height: 460px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; padding: 2px 0 8px; margin-bottom: 12px; scrollbar-width: thin; scrollbar-color: var(--border) transparent; }
        .msg { display: flex; gap: 10px; align-items: flex-start; }
        .msg.user { flex-direction: row-reverse; }
        .av { width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-family: 'Cinzel', serif; font-size: 12px; font-weight: 700; border: 1px solid var(--border2); overflow: hidden; }
        .av.bot { background: linear-gradient(135deg,#2A1F08,#4A3820); color: var(--gold); }
        .av.bot img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
        .av.usr { background: linear-gradient(135deg,#0A1828,#1A3050); color: #6A9ACC; }
        .bubble { max-width: 82%; padding: 10px 14px; border-radius: 12px; font-size: .95rem; line-height: 1.65; }
        .bubble.bot { background: var(--bg3); border: 1px solid var(--border); border-top-left-radius: 4px; }
        .bubble.usr { background: linear-gradient(135deg,#0A1828,#182A48); border: 1px solid rgba(58,90,138,.4); border-top-right-radius: 4px; color: #C0D4F0; }
        .bubble ul { padding-left: 16px; margin-top: 5px; } .bubble li { margin-bottom: 3px; }
        .bubble strong { color: var(--gold-light); font-weight: 600; }
        .dots { display: flex; gap: 5px; padding: 3px 0; }
        .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold); opacity: .35; animation: b 1.2s infinite; }
        .dot:nth-child(2){animation-delay:.2s} .dot:nth-child(3){animation-delay:.4s}
        @keyframes b{0%,60%,100%{opacity:.35;transform:translateY(0)}30%{opacity:1;transform:translateY(-4px)}}

        .chips { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 10px; }
        .chip { font-size: .72rem; padding: 4px 10px; border: 1px solid var(--border2); border-radius: 20px; cursor: pointer; color: var(--text2); background: var(--bg3); font-family: 'Crimson Pro',serif; transition: all .15s; white-space: nowrap; }
        .chip:hover { border-color: var(--gold); color: var(--gold); background: var(--bg4); }

        .input-row { display: flex; gap: 8px; }
        textarea { flex: 1; background: var(--bg3); border: 1px solid var(--border); border-radius: 8px; padding: 10px 13px; color: var(--text); font-family: 'Crimson Pro',serif; font-size: .95rem; resize: none; outline: none; line-height: 1.5; }
        textarea:focus { border-color: var(--gold); }
        textarea::placeholder { color: var(--text3); }
        .send { width: 42px; height: 42px; border-radius: 50%; background: linear-gradient(135deg,var(--gold-dark),var(--gold)); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .send:hover { opacity: .85; } .send:disabled { opacity: .35; cursor: not-allowed; }
        .send svg { width: 15px; height: 15px; fill: #0A0C10; }

        .link-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .link-card { background: var(--bg3); border: 1px solid var(--border); border-radius: 8px; padding: 14px 16px; text-decoration: none; transition: all .2s; display: block; }
        .link-card:hover { border-color: var(--border2); background: var(--bg4); }
        .link-label { font-family: 'Cinzel',serif; font-size: .82rem; font-weight: 600; color: var(--gold); margin-bottom: 4px; }
        .link-desc { font-size: .82rem; color: var(--text2); line-height: 1.5; }
        .link-arrow { float: right; color: var(--text3); font-size: .9rem; }

        @media(max-width:600px){ h1{font-size:1.8rem} .link-grid{grid-template-columns:1fr} }
      `}</style>

      <div className="app">
        <header>
          <h1>LA CONSEILLÈRE</h1>
          <p>Coach officiel CivFR · BBG 7.3 · Saison 16 · 4v4</p>
        </header>

        <nav>
          {[['coach','👩 Conseillère'],['links','🔗 Liens']].map(([t,l]) => (
            <button key={t} className={tab===t?'active':''} onClick={()=>setTab(t)}>{l}</button>
          ))}
        </nav>

        <div className={`panel ${tab==='coach'?'active':''}`}>
          <div className="card">
            <div className="chips">
              {CHIPS.map(c => <button key={c} className="chip" onClick={()=>setInput(c)}>{c}</button>)}
            </div>
            <div className="chat-window">
              {messages.map((m,i) => (
                <div key={i} className={`msg ${m.role==='user'?'user':''}`}>
                  <div className={`av ${m.role==='assistant'?'bot':'usr'}`}>
                    {m.role==='assistant' ? <img src="/conseillere.webp" alt="conseillère"/> : 'V'}
                  </div>
                  <div className={`bubble ${m.role==='assistant'?'bot':'usr'}`} dangerouslySetInnerHTML={{__html:fmt(m.content)}} />
                </div>
              ))}
              {loading && (
                <div className="msg">
                  <div className="av bot"><img src="/conseillere.webp" alt="conseillère"/></div>
                  <div className="bubble bot"><div className="dots">{[0,1,2].map(i=><div key={i} className="dot"/>)}</div></div>
                </div>
              )}
              <div ref={messagesEnd}/>
            </div>
            <div className="input-row">
              <textarea rows="2" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMessage()}}} placeholder="Décrivez votre situation de jeu..." />
              <button className="send" onClick={sendMessage} disabled={loading||!input.trim()}>
                <svg viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div className={`panel ${tab==='links'?'active':''}`}>
          <div className="card">
            <div className="card-title">Outils de la communauté CivFR</div>
            <div className="link-grid">
              {LINKS.map(l => (
                <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="link-card">
                  <span className="link-arrow">↗</span>
                  <div className="link-label">{l.label}</div>
                  <div className="link-desc">{l.desc}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

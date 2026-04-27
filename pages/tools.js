import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useState } from 'react';
import { TECH_TREE }  from '../lib/techTreeData';
import { CIVIC_TREE } from '../lib/civicTreeData';

// Chargement dynamique pour éviter SSR (canvas/SVG)
const TechTreeComponent = dynamic(() => import('../components/TechTreeComponent'), { ssr: false });

export default function Tools() {
  const [activeTree, setActiveTree] = useState('tech');

  const trees = [
    { id: 'tech',  label: '⚗ Technologies', data: TECH_TREE  },
    { id: 'civic', label: '📜 Dogmes',       data: CIVIC_TREE },
  ];

  const currentTree = trees.find(t => t.id === activeTree);

  return (
    <>
      <Head>
        <title>Outils — CivFR</title>
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
        html, body, #__next { height: 100%; }
        body {
          font-family: 'Crimson Pro', Georgia, serif;
          background: var(--bg); color: var(--text);
          display: flex; flex-direction: column;
        }
        #__next { display: flex; flex-direction: column; }

        /* ── Header ── */
        .page-header {
          background: #0d0a05;
          border-bottom: 1px solid var(--border);
          padding: 10px 20px;
          display: flex; align-items: center; gap: 16px; flex-shrink: 0;
        }
        .page-header a {
          font-family: 'Cinzel', serif; font-size: 13px; color: var(--gold);
          text-decoration: none; letter-spacing: .06em;
        }
        .page-header a:hover { color: var(--gold-light); }
        .page-header .sep { color: var(--text3); }

        /* ── Tree switcher ── */
        .tree-tabs {
          display: flex; gap: 0; border-bottom: 1px solid var(--border);
          background: #0d0a05; flex-shrink: 0;
        }
        .tree-tab {
          padding: 9px 20px; font-family: 'Cinzel', serif; font-size: 12px;
          font-weight: 600; letter-spacing: .05em; cursor: pointer;
          background: none; border: none; color: var(--text2);
          border-right: 1px solid var(--border); transition: all .15s;
        }
        .tree-tab.active {
          background: #14100a; color: var(--gold);
          box-shadow: inset 0 -2px 0 var(--gold);
        }
        .tree-tab:hover:not(.active) { background: #0d0a05; color: var(--text); }

        /* ── Canvas area ── */
        .tree-area { flex: 1; overflow: hidden; display: flex; flex-direction: column; }
      `}</style>

      {/* Header nav */}
      <div className="page-header">
        <a href="/">← La Conseillère</a>
        <span className="sep">/</span>
        <span style={{ fontFamily:'Cinzel,serif', fontSize:13, color:'var(--text2)' }}>Outils</span>
      </div>

      {/* Switcher Tech / Dogmes */}
      <div className="tree-tabs">
        {trees.map(t => (
          <button
            key={t.id}
            className={`tree-tab${activeTree === t.id ? ' active' : ''}`}
            onClick={() => setActiveTree(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Arbre actif */}
      <div className="tree-area">
        <TechTreeComponent key={activeTree} treeData={currentTree.data} />
      </div>
    </>
  );
}

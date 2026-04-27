import { useState, useEffect, useRef, useCallback } from 'react';

// ─── Algorithme chemin optimal ───────────────────────────────────────────────
function getResearchOrder(targets, researched, techs) {
  const needed = new Set();
  function collectDeps(id) {
    if (researched.has(id) || needed.has(id)) return;
    needed.add(id);
    const tech = techs.find(t => t.id === id);
    if (tech) tech.deps.forEach(d => collectDeps(d));
  }
  targets.forEach(id => collectDeps(id));

  // Tri topologique
  const sorted = [];
  const visited = new Set();
  function visit(id) {
    if (visited.has(id)) return;
    visited.add(id);
    const tech = techs.find(t => t.id === id);
    if (tech) tech.deps.forEach(d => { if (needed.has(d)) visit(d); });
    sorted.push(id);
  }
  [...needed].forEach(id => visit(id));
  return sorted;
}

function getEffectiveCost(techId, researched, eurekas, techs) {
  const tech = techs.find(t => t.id === techId);
  if (!tech || researched.has(techId)) return 0;
  return Math.round(tech.cost * (eurekas.has(techId) ? (1 - tech.eurekaDiscount) : 1));
}

// ─── SVG Lines ───────────────────────────────────────────────────────────────
function Lines({ techs, path, canvasW, canvasH }) {
  const lines = [];
  techs.forEach(tech => {
    tech.deps.forEach(depId => {
      const dep = techs.find(t => t.id === depId);
      if (!dep) return;
      const fromX = dep.x + 164;
      const fromY = dep.y + 32;
      const toX   = tech.x;
      const toY   = tech.y + 32;
      const midX  = (fromX + toX) / 2;
      const onPath = path.has(tech.id) && path.has(depId);
      lines.push(
        <path
          key={`${depId}-${tech.id}`}
          d={`M${fromX},${fromY} C${midX},${fromY} ${midX},${toY} ${toX},${toY}`}
          fill="none"
          stroke={onPath ? '#c9a84c' : '#2a1f08'}
          strokeWidth={onPath ? 2.5 : 1}
          strokeDasharray={onPath ? 'none' : undefined}
          markerEnd={onPath ? 'url(#arrOn)' : 'url(#arrOff)'}
        />
      );
    });
  });
  return (
    <svg
      style={{ position:'absolute', top:0, left:0, width:canvasW, height:canvasH, pointerEvents:'none' }}
    >
      <defs>
        {[['arrOff','#2a1f08'],['arrOn','#c9a84c']].map(([id,col]) => (
          <marker key={id} id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M2 1L8 5L2 9" fill="none" stroke={col} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </marker>
        ))}
      </defs>
      {lines}
    </svg>
  );
}

// ─── Noeud tech ──────────────────────────────────────────────────────────────
function TechNode({ tech, isResearched, isOnPath, isDestination, hasEureka, onClickNode, onToggleEureka, onDblClick }) {
  const borderCol = isDestination ? '#f0c000' : isOnPath ? '#c9a84c' : isResearched ? '#2a4a2a' : '#3a2810';
  const bg = isResearched ? '#0d1a0d' : '#1e1408';
  const glow = isDestination ? '0 0 14px rgba(240,192,0,.5)' : isOnPath ? '0 0 8px rgba(201,168,76,.3)' : 'none';

  const effCost = (() => {
    if (isResearched) return null;
    const base = tech.cost;
    const disc = hasEureka ? Math.round(base * (1 - tech.eurekaDiscount)) : base;
    return { disc, hasEureka };
  })();

  return (
    <div
      title={`${tech.name}\nEureka: ${tech.eureka}\nDébloque: ${tech.unlocks||'—'}`}
      style={{
        position:'absolute', left:tech.x, top:tech.y,
        width:164, background:bg, border:`1px solid ${borderCol}`,
        borderRadius:6, cursor:'pointer', transition:'border-color .15s, box-shadow .15s',
        boxShadow:glow, zIndex: isDestination ? 4 : isOnPath ? 3 : 1,
        fontFamily:"'Crimson Pro',Georgia,serif",
      }}
      onClick={e => onClickNode(tech.id, e.shiftKey)}
      onDoubleClick={e => { e.stopPropagation(); onDblClick(tech.id); }}
    >
      {/* Header */}
      <div style={{ padding:'5px 7px 3px', display:'flex', alignItems:'center', gap:5 }}>
        <span style={{ width:22, height:22, borderRadius:3, background:'#2a1f08', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, flexShrink:0 }}>
          {tech.icon}
        </span>
        <span style={{ fontSize:11, fontWeight:600, color: isResearched ? '#4a8a4a' : '#c9a84c', lineHeight:1.2 }}>
          {tech.name}
        </span>
      </div>

      {/* Cost + Eureka */}
      <div style={{ padding:'2px 7px 4px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ fontSize:10, color: hasEureka && !isResearched ? '#c9a84c' : '#6a5030' }}>
          {isResearched ? '✓ Recherchée' : `🔬 ${effCost.disc}${effCost.hasEureka ? ' ▼40%' : ''}`}
        </span>
        <div style={{ display:'flex', alignItems:'center', gap:3 }}>
          <span
            title={tech.eureka}
            onClick={e => { e.stopPropagation(); onToggleEureka(tech.id); }}
            style={{
              width:14, height:14, borderRadius:2,
              border:`1px solid ${hasEureka ? '#c9a84c' : '#4a3820'}`,
              background: hasEureka ? '#1a1408' : '#0d0a05',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:9, cursor:'pointer', color: hasEureka ? '#f0c000' : '#4a3820',
              flexShrink:0,
            }}
          >
            {hasEureka ? '✓' : '⚡'}
          </span>
          <span style={{ fontSize:9, color:'#4a3820', maxWidth:78, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}
                title={tech.eureka}>
            {tech.eureka}
          </span>
        </div>
      </div>

      {/* Unlocks */}
      {tech.unlocks && (
        <div style={{
          padding:'2px 7px 4px', fontSize:9,
          color: isOnPath || isDestination ? '#5a4020' : '#2a1f08',
          borderTop:'1px solid #2a1f08', lineHeight:1.3
        }}>
          → {tech.unlocks}
        </div>
      )}
    </div>
  );
}

// ─── Composant principal ─────────────────────────────────────────────────────
export default function TechTreeComponent({ treeData }) {
  const techs = treeData.techs;

  const [researched, setResearched]   = useState(new Set());
  const [eurekas, setEurekas]         = useState(new Set());
  const [destinations, setDests]      = useState([]);
  const [pathSet, setPathSet]         = useState(new Set());
  const [pathOrder, setPathOrder]     = useState([]);
  const [info, setInfo]               = useState('Clic = destination | Shift+Clic = ajouter | ✓ = Eureka | Double-clic = marquer recherchée');

  const canvasW = Math.max(...techs.map(t => t.x + 200)) + 60;
  const canvasH = Math.max(...techs.map(t => t.y + 80)) + 80;

  // Recalcul du chemin
  const recalcPath = useCallback((dests, res, eur) => {
    if (dests.length === 0) { setPathSet(new Set()); setPathOrder([]); return; }
    const order = getResearchOrder(dests, res, techs);
    setPathSet(new Set(order));
    setPathOrder(order);
  }, [techs]);

  useEffect(() => { recalcPath(destinations, researched, eurekas); }, [destinations, researched, eurekas, recalcPath]);

  const totalCost = pathOrder.reduce((s, id) => s + getEffectiveCost(id, researched, eurekas, techs), 0);
  const estTurns  = Math.ceil(totalCost / 45);

  // Handlers
  function handleClickNode(id, shiftKey) {
    if (researched.has(id)) { setInfo(`${techs.find(t=>t.id===id).name} est déjà recherchée.`); return; }
    const name = techs.find(t=>t.id===id).name;
    if (shiftKey) {
      setDests(prev => prev.includes(id) ? prev.filter(d=>d!==id) : [...prev, id]);
      setInfo(`Shift+Clic: ${name} ${destinations.includes(id)?'retirée':'ajoutée'} des destinations`);
    } else {
      setDests(prev => prev.length===1 && prev[0]===id ? [] : [id]);
      setInfo(`Destination: ${name} (coût base: ${getEffectiveCost(id, researched, eurekas, techs)} 🔬)`);
    }
  }

  function handleToggleEureka(id) {
    const name = techs.find(t=>t.id===id).name;
    setEurekas(prev => {
      const n = new Set(prev);
      if (n.has(id)) { n.delete(id); setInfo(`Eureka désactivé: ${name}`); }
      else           { n.add(id);    setInfo(`Eureka activé: ${name} — coût réduit de 40%`); }
      return n;
    });
  }

  function handleDblClick(id) {
    const name = techs.find(t=>t.id===id).name;
    setResearched(prev => {
      const n = new Set(prev);
      if (n.has(id)) { n.delete(id); setInfo(`${name} marquée non recherchée`); }
      else           { n.add(id); setDests(d=>d.filter(x=>x!==id)); setInfo(`${name} marquée recherchée`); }
      return n;
    });
  }

  // Panning
  const wrapRef = useRef(null);
  const drag    = useRef(null);
  function onMouseDown(e) {
    if (e.target.closest('[data-tech]')) return;
    drag.current = { sx:e.clientX, sy:e.clientY, sl:wrapRef.current.scrollLeft, st:wrapRef.current.scrollTop };
    wrapRef.current.style.cursor = 'grabbing';
  }
  function onMouseMove(e) {
    if (!drag.current) return;
    wrapRef.current.scrollLeft = drag.current.sl - (e.clientX - drag.current.sx);
    wrapRef.current.scrollTop  = drag.current.st - (e.clientY - drag.current.sy);
  }
  function onMouseUp() { drag.current = null; if (wrapRef.current) wrapRef.current.style.cursor = 'grab'; }

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%' }}>
      {/* Barre info chemin */}
      <div style={{
        background:'#0d0a05', borderBottom:'1px solid #2a1f08',
        padding:'6px 14px', display:'flex', alignItems:'center', gap:14, flexShrink:0,
        fontFamily:"'Crimson Pro',Georgia,serif",
      }}>
        <div style={{ display:'flex', gap:10, fontSize:11, color:'#8a7050' }}>
          {[['#c9a84c','Sur le chemin'],['#f0c000','Destination'],['#2a4a2a','Recherchée'],['#3a2810','Disponible']].map(([c,l]) => (
            <span key={l} style={{ display:'flex', alignItems:'center', gap:4 }}>
              <span style={{ width:10,height:10,borderRadius:2,background:c,border:`1px solid ${c}`,display:'inline-block' }}/>
              {l}
            </span>
          ))}
        </div>
        {pathOrder.length > 0 && (
          <div style={{ marginLeft:'auto', fontSize:11, color:'#8a7050' }}>
            Chemin: <span style={{ color:'#c9a84c', fontWeight:600 }}>{totalCost}</span> 🔬
            &nbsp;·&nbsp;<span style={{ color:'#c9a84c', fontWeight:600 }}>{estTurns}</span> tours est.
            &nbsp;·&nbsp;<span style={{ color:'#8a7050' }}>{pathOrder.length} tech(s)</span>
            {destinations.length > 1 && <span style={{ color:'#6a5030' }}>&nbsp;· {destinations.length} destinations</span>}
          </div>
        )}
      </div>

      {/* Canvas */}
      <div
        ref={wrapRef}
        style={{ flex:1, overflow:'auto', cursor:'grab', position:'relative' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div style={{ position:'relative', width:canvasW, height:canvasH, background:'#12100a' }}>
          {/* Era labels */}
          {treeData.eras.map(era => (
            <div key={era.id} style={{
              position:'absolute', top:0, left:era.x,
              height:'100%', borderLeft:'1px solid #1a1408',
              paddingLeft:8, paddingTop:6,
              fontSize:10, color:'#2a1f08', letterSpacing:'.1em',
              textTransform:'uppercase', fontFamily:"Georgia,serif",
              pointerEvents:'none', userSelect:'none',
            }}>
              {era.label}
            </div>
          ))}

          {/* Lignes de dépendances */}
          <Lines techs={techs} path={pathSet} canvasW={canvasW} canvasH={canvasH} />

          {/* Noeuds */}
          {techs.map(tech => (
            <div key={tech.id} data-tech={tech.id}>
              <TechNode
                tech={tech}
                isResearched={researched.has(tech.id)}
                isOnPath={pathSet.has(tech.id) && !destinations.includes(tech.id) && !researched.has(tech.id)}
                isDestination={destinations.includes(tech.id)}
                hasEureka={eurekas.has(tech.id)}
                onClickNode={handleClickNode}
                onToggleEureka={handleToggleEureka}
                onDblClick={handleDblClick}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Info bar */}
      <div style={{
        background:'#0d0a05', borderTop:'1px solid #2a1f08',
        padding:'5px 14px', fontSize:11, color:'#5a4020', flexShrink:0,
        fontFamily:"'Crimson Pro',Georgia,serif",
      }}>
        {info}
      </div>
    </div>
  );
}

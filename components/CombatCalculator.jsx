import { useState, useMemo, useCallback } from 'react';
import { UNITS, UNIT_TYPES, ERA_LIST, findUnit, unitsByEra, isObsoleteAgainst } from '../lib/combatUnits';
import { computeTrade, computeTotalCS, COMBAT_MODIFIERS, injuryPenalty } from '../lib/combatFormula';

// ─── État par défaut d'une unité ─────────────────────────────────────────────
const defaultUnitState = (unitId) => ({
  unitId,
  hp: 100,
  fortification: 0,
  terrain: 0,
  support: 0,
  diploVisibility: 0,
  greatPerson: 0,
  era: 0,
  religion: 0,
  promoBonus: 0,        // Saisie libre pour promotions / capacités spéciales
  customBonus: 0,       // Bonus libre additionnel
});

// ─── Sélecteur d'unité (modal) ───────────────────────────────────────────────
function UnitPicker({ currentId, onSelect, onClose }) {
  const grouped = useMemo(() => unitsByEra(), []);
  const [filter, setFilter] = useState('');

  const filtered = useMemo(() => {
    if (!filter) return grouped;
    const f = filter.toLowerCase();
    const out = {};
    for (const era of Object.keys(grouped)) {
      out[era] = grouped[era].filter(u =>
        u.name.toLowerCase().includes(f) ||
        u.civ.toLowerCase().includes(f)
      );
    }
    return out;
  }, [filter, grouped]);

  return (
    <div style={{
      position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', zIndex:100,
      display:'flex', alignItems:'center', justifyContent:'center', padding:20,
    }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{
        background:'#0d0a05', border:'1px solid #c9a84c',
        borderRadius:8, width:'min(900px,100%)', maxHeight:'90vh',
        display:'flex', flexDirection:'column', overflow:'hidden',
        fontFamily:"'Crimson Pro',Georgia,serif",
      }}>
        <div style={{ padding:'14px 18px', borderBottom:'1px solid #2a1f08', display:'flex', gap:12, alignItems:'center' }}>
          <span style={{ fontFamily:'Cinzel,serif', color:'#c9a84c', fontSize:14, letterSpacing:'.06em' }}>
            CHOISIR UNE UNITÉ
          </span>
          <input
            autoFocus
            placeholder="Rechercher (nom ou civ)…"
            value={filter}
            onChange={e=>setFilter(e.target.value)}
            style={{
              flex:1, background:'#1e1408', border:'1px solid #2a1f08',
              borderRadius:4, padding:'6px 10px', color:'#e0d8c8',
              fontFamily:"'Crimson Pro',serif", fontSize:14, outline:'none',
            }}
          />
          <button onClick={onClose} style={{
            background:'none', border:'1px solid #4a3820', color:'#8a7050',
            padding:'4px 10px', borderRadius:4, cursor:'pointer', fontSize:13,
          }}>Fermer</button>
        </div>

        <div style={{ overflowY:'auto', padding:12 }}>
          {ERA_LIST.map(era => filtered[era.id]?.length > 0 && (
            <div key={era.id} style={{ marginBottom:14 }}>
              <div style={{
                fontSize:10, letterSpacing:'.12em', textTransform:'uppercase',
                color:'#6a5030', marginBottom:6, paddingLeft:4,
                fontFamily:'Cinzel,serif',
              }}>
                {era.label}
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))', gap:6 }}>
                {filtered[era.id].map(u => {
                  const isCurrent = u.id === currentId;
                  return (
                    <button
                      key={u.id}
                      onClick={()=>{ onSelect(u.id); onClose(); }}
                      style={{
                        background: isCurrent ? '#1e1408' : '#12100a',
                        border: `1px solid ${isCurrent ? '#c9a84c' : '#2a1f08'}`,
                        borderRadius:5, padding:'7px 8px', cursor:'pointer',
                        textAlign:'left', display:'flex', alignItems:'center', gap:7,
                        fontFamily:"'Crimson Pro',serif", color:'#c9a84c',
                        transition:'all .12s',
                      }}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor='#c9a84c'; e.currentTarget.style.background='#1e1408';}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor=isCurrent?'#c9a84c':'#2a1f08'; e.currentTarget.style.background=isCurrent?'#1e1408':'#12100a';}}
                    >
                      <UnitImage unit={u} size={28} />
                      <div style={{ minWidth:0, flex:1 }}>
                        <div style={{ fontSize:11, fontWeight:600, lineHeight:1.15, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                          {u.name}
                        </div>
                        <div style={{ fontSize:9, color:'#6a5030', display:'flex', gap:5, marginTop:2 }}>
                          <span>⚔ {u.cs}</span>
                          {u.rangedCS && <span>🏹 {u.rangedCS}</span>}
                          {u.civ && <span style={{ marginLeft:'auto', color:'#8a7050', fontStyle:'italic' }}>{u.civ}</span>}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Image d'unité (PNG /public/units/{id}.png + fallback emoji) ─────────────
function UnitImage({ unit, size=48 }) {
  const [errored, setErrored] = useState(false);
  const typeIcon = UNIT_TYPES[unit.type]?.icon || '⚔️';
  if (errored) {
    return (
      <div style={{
        width:size, height:size, background:'#2a1f08', borderRadius:4,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:size*0.5, flexShrink:0,
      }}>{typeIcon}</div>
    );
  }
  return (
    <img
      src={`/units/${unit.id}.png`}
      alt={unit.name}
      onError={()=>setErrored(true)}
      style={{
        width:size, height:size, objectFit:'contain', flexShrink:0,
        background:'#2a1f08', borderRadius:4, padding:2,
      }}
    />
  );
}

// ─── Carte unité (un côté du combat) ─────────────────────────────────────────
function UnitCard({ side, state, onChange, onPick, accentColor }) {
  const unit = findUnit(state.unitId);
  if (!unit) return null;

  const update = (key, value) => onChange({ ...state, [key]: value });

  return (
    <div style={{
      background:'#12100a', border:`1px solid ${accentColor}`,
      borderRadius:8, padding:14,
      fontFamily:"'Crimson Pro',serif", color:'#e0d8c8',
    }}>
      {/* Header: avatar + nom + bouton changer */}
      <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:12 }}>
        <UnitImage unit={unit} size={56} />
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:10, letterSpacing:'.1em', color:accentColor, fontFamily:'Cinzel,serif' }}>
            {side === 'attacker' ? 'ATTAQUANT' : 'DÉFENSEUR'}
          </div>
          <div style={{ fontSize:16, fontWeight:600, color:'#c9a84c', lineHeight:1.2 }}>
            {unit.name}
          </div>
          <div style={{ fontSize:10, color:'#8a7050' }}>
            {UNIT_TYPES[unit.type]?.label}{unit.civ && ` · ${unit.civ}`}
          </div>
        </div>
        <button onClick={onPick} style={{
          background:'#1e1408', border:`1px solid ${accentColor}`, color:accentColor,
          padding:'6px 10px', borderRadius:4, cursor:'pointer', fontSize:11,
          fontFamily:"'Crimson Pro',serif",
        }}>Changer</button>
      </div>

      {/* Stats de base */}
      <div style={{ display:'flex', gap:14, fontSize:12, marginBottom:12, padding:'8px 10px', background:'#0d0a05', borderRadius:4 }}>
        <span>⚔ <strong style={{ color:'#c9a84c' }}>{unit.cs}</strong></span>
        {unit.rangedCS && <span>🏹 <strong style={{ color:'#c9a84c' }}>{unit.rangedCS}</strong> ({unit.range} cases)</span>}
        <span>🏃 {unit.movement} PM</span>
      </div>

      {unit.bonuses && (
        <div style={{ fontSize:11, color:'#8a7050', fontStyle:'italic', marginBottom:12, lineHeight:1.4 }}>
          {unit.bonuses}
        </div>
      )}

      {/* HP slider */}
      <Field label={`HP : ${state.hp}/100`}>
        <input type="range" min={1} max={100} value={state.hp}
          onChange={e=>update('hp', parseInt(e.target.value))}
          style={{ width:'100%', accentColor:accentColor }} />
        <div style={{ fontSize:10, color:'#6a5030', marginTop:2 }}>
          Pénalité blessé : {injuryPenalty(state.hp).toFixed(1)} CS
        </div>
      </Field>

      {/* Selects de modifieurs */}
      <ModifierSelect label="Retranchement" value={state.fortification}
        options={COMBAT_MODIFIERS.fortification} onChange={v=>update('fortification', v)} />
      <ModifierSelect label="Terrain" value={state.terrain}
        options={COMBAT_MODIFIERS.terrain} onChange={v=>update('terrain', v)} />
      <ModifierSelect label="Soutien adjacent" value={state.support}
        options={COMBAT_MODIFIERS.support} onChange={v=>update('support', v)} />
      <ModifierSelect label="Visibilité diplomatique" value={state.diploVisibility}
        options={COMBAT_MODIFIERS.diploVisibility} onChange={v=>update('diploVisibility', v)} />
      <ModifierSelect label="Général/Amiral à proximité" value={state.greatPerson}
        options={COMBAT_MODIFIERS.greatPerson} onChange={v=>update('greatPerson', v)} />
      <ModifierSelect label="Différence d'ère (obsolescence)" value={state.era}
        options={COMBAT_MODIFIERS.era} onChange={v=>update('era', v)} />
      <ModifierSelect label="Religion / Croyance" value={state.religion}
        options={COMBAT_MODIFIERS.religion} onChange={v=>update('religion', v)} />

      {/* Bonus de promotion (saisie numérique) */}
      <Field label={`Promotions / capacités (${state.promoBonus >= 0 ? '+' : ''}${state.promoBonus})`}>
        <input type="number" value={state.promoBonus}
          onChange={e=>update('promoBonus', parseInt(e.target.value) || 0)}
          placeholder="Ex: 7 (Cri de guerre), 10 (Tortue)…"
          style={inputStyle} />
        <div style={{ fontSize:10, color:'#6a5030', marginTop:2 }}>
          Cri de guerre +7 vs distance · Tortue +10 def vs distance · Espadon +7 vs anti-cav · Combat urbain +10 dans quartier · Garnison +10 dans fort
        </div>
      </Field>

      {/* Bonus libre (cartes politiques, civ ability, etc.) */}
      <Field label={`Bonus libre (${state.customBonus >= 0 ? '+' : ''}${state.customBonus})`}>
        <input type="number" value={state.customBonus}
          onChange={e=>update('customBonus', parseInt(e.target.value) || 0)}
          placeholder="Ex: +5 Agoge, +4 Maneuver…"
          style={inputStyle} />
      </Field>
    </div>
  );
}

// ─── Helpers UI ──────────────────────────────────────────────────────────────
const inputStyle = {
  width:'100%', background:'#1e1408', border:'1px solid #2a1f08',
  borderRadius:4, padding:'6px 10px', color:'#e0d8c8',
  fontFamily:"'Crimson Pro',serif", fontSize:13, outline:'none',
};

function Field({ label, children }) {
  return (
    <div style={{ marginBottom:10 }}>
      <div style={{ fontSize:11, color:'#8a7050', marginBottom:4, letterSpacing:'.03em' }}>{label}</div>
      {children}
    </div>
  );
}

function ModifierSelect({ label, value, options, onChange }) {
  return (
    <Field label={label}>
      <select value={value} onChange={e=>onChange(parseInt(e.target.value))}
        style={{ ...inputStyle, cursor:'pointer' }}>
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </Field>
  );
}

// ─── Composant principal ─────────────────────────────────────────────────────
export default function CombatCalculator() {
  const [attacker, setAttacker] = useState(() => defaultUnitState('warrior'));
  const [defender, setDefender] = useState(() => defaultUnitState('warrior'));
  const [pickerFor, setPickerFor] = useState(null); // 'attacker' | 'defender' | null
  const [mode, setMode] = useState('melee'); // 'melee' | 'ranged'

  // Calcul
  const result = useMemo(() => {
    const aUnit = findUnit(attacker.unitId);
    const dUnit = findUnit(defender.unitId);
    if (!aUnit || !dUnit) return null;

    const aBaseCS = mode === 'ranged' ? (aUnit.rangedCS || aUnit.cs) : aUnit.cs;
    const dBaseCS = dUnit.cs; // le défenseur défend toujours en CS mêlée

    const aMods = {
      fort: attacker.fortification,
      terrain: attacker.terrain,
      support: attacker.support,
      diplo: attacker.diploVisibility,
      gp: attacker.greatPerson,
      era: attacker.era,
      religion: attacker.religion,
      promo: attacker.promoBonus,
      custom: attacker.customBonus,
      injury: injuryPenalty(attacker.hp),
    };
    const dMods = {
      fort: defender.fortification,
      terrain: defender.terrain,
      support: defender.support,
      diplo: defender.diploVisibility,
      gp: defender.greatPerson,
      era: defender.era,
      religion: defender.religion,
      promo: defender.promoBonus,
      custom: defender.customBonus,
      injury: injuryPenalty(defender.hp),
    };

    const aTotalCS = computeTotalCS(aBaseCS, aMods);
    const dTotalCS = computeTotalCS(dBaseCS, dMods);

    const trade = computeTrade(
      { totalCS: aTotalCS, hp: attacker.hp },
      { totalCS: dTotalCS, hp: defender.hp },
      mode
    );

    return { aTotalCS, dTotalCS, aMods, dMods, ...trade };
  }, [attacker, defender, mode]);

  // Vérification : l'attaquant peut-il attaquer à distance ?
  const aUnit = findUnit(attacker.unitId);
  const canRanged = aUnit?.rangedCS != null;

  // Détection auto obsolescence
  const dUnit = findUnit(defender.unitId);
  const aIsObsolete = isObsoleteAgainst(aUnit, dUnit);
  const dIsObsolete = isObsoleteAgainst(dUnit, aUnit);

  return (
    <div style={{
      flex:1, overflow:'auto', padding:16, background:'#0a0c10',
      fontFamily:"'Crimson Pro',Georgia,serif",
    }}>
      {/* Mode mêlée / distance */}
      <div style={{
        display:'flex', justifyContent:'center', gap:8, marginBottom:14,
      }}>
        <button onClick={()=>setMode('melee')} style={modeBtnStyle(mode==='melee')}>
          ⚔ Combat rapproché
        </button>
        <button
          onClick={()=>canRanged && setMode('ranged')}
          disabled={!canRanged}
          style={{ ...modeBtnStyle(mode==='ranged'), opacity: canRanged ? 1 : 0.4, cursor: canRanged ? 'pointer' : 'not-allowed' }}
        >
          🏹 Attaque à distance {!canRanged && '(N/A)'}
        </button>
      </div>

      {/* Avertissement obsolescence */}
      {(aIsObsolete || dIsObsolete) && (
        <div style={{
          background:'#1e1408', border:'1px solid #c9a84c', borderRadius:6,
          padding:'8px 12px', marginBottom:14, fontSize:12, color:'#c9a84c',
        }}>
          ⚠ Différence d'ère ≥ 2 détectée : <strong>{aIsObsolete ? aUnit.name : dUnit.name}</strong> est probablement obsolète.
          Pense à activer "Unité obsolète (-17 CS)" dans son profil.
        </div>
      )}

      {/* Layout 2 colonnes + résultat */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
        <UnitCard side="attacker" state={attacker} onChange={setAttacker}
          onPick={()=>setPickerFor('attacker')} accentColor="#c9a84c" />
        <UnitCard side="defender" state={defender} onChange={setDefender}
          onPick={()=>setPickerFor('defender')} accentColor="#8a6a3a" />
      </div>

      {/* Résultat du combat */}
      {result && <ResultPanel result={result} attacker={attacker} defender={defender} mode={mode} />}

      {/* Picker modal */}
      {pickerFor && (
        <UnitPicker
          currentId={pickerFor === 'attacker' ? attacker.unitId : defender.unitId}
          onSelect={(id) => {
            if (pickerFor === 'attacker') setAttacker(s => ({ ...s, unitId: id }));
            else setDefender(s => ({ ...s, unitId: id }));
          }}
          onClose={()=>setPickerFor(null)}
        />
      )}
    </div>
  );
}

function modeBtnStyle(active) {
  return {
    background: active ? '#1e1408' : '#0d0a05',
    border: `1px solid ${active ? '#c9a84c' : '#2a1f08'}`,
    color: active ? '#c9a84c' : '#8a7050',
    padding:'8px 16px', borderRadius:4, cursor:'pointer',
    fontFamily:"'Cinzel',serif", fontSize:11, letterSpacing:'.06em',
  };
}

// ─── Panneau résultat ────────────────────────────────────────────────────────
function ResultPanel({ result, attacker, defender, mode }) {
  return (
    <div style={{
      background:'#12100a', border:'1px solid #c9a84c', borderRadius:8,
      padding:14, fontFamily:"'Crimson Pro',serif",
    }}>
      <div style={{
        fontFamily:'Cinzel,serif', fontSize:12, letterSpacing:'.08em',
        color:'#c9a84c', marginBottom:12, textAlign:'center',
      }}>
        RÉSULTAT DU COMBAT — {mode === 'melee' ? 'MÊLÉE' : 'DISTANCE'}
      </div>

      {/* CS totales */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr auto 1fr', gap:14, alignItems:'center', marginBottom:14 }}>
        <CSDisplay label="Attaquant" cs={result.aTotalCS} mods={result.aMods} color="#c9a84c" />
        <div style={{ fontSize:18, color:'#6a5030', textAlign:'center' }}>VS</div>
        <CSDisplay label="Défenseur" cs={result.dTotalCS} mods={result.dMods} color="#8a6a3a" />
      </div>

      {/* Différence */}
      <div style={{ textAlign:'center', marginBottom:14, fontSize:13, color:'#8a7050' }}>
        Différence : <strong style={{ color: result.aTotalCS >= result.dTotalCS ? '#4a8a4a' : '#c44' }}>
          {result.aTotalCS - result.dTotalCS >= 0 ? '+' : ''}{result.aTotalCS - result.dTotalCS} CS
        </strong>
      </div>

      {/* Barres de HP */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
        <HPBar
          label="Attaquant"
          before={attacker.hp}
          after={result.attackerHpAfter}
          damage={result.attackerDamage}
          dies={result.attackerDies}
          color="#c9a84c"
        />
        <HPBar
          label="Défenseur"
          before={defender.hp}
          after={result.defenderHpAfter}
          damage={result.defenderDamage}
          dies={result.defenderDies}
          color="#8a6a3a"
        />
      </div>

      {mode === 'ranged' && (
        <div style={{ marginTop:10, fontSize:11, color:'#6a5030', textAlign:'center', fontStyle:'italic' }}>
          ℹ Attaque à distance : pas de dégâts en retour à l'attaquant
        </div>
      )}

      <div style={{ marginTop:12, fontSize:10, color:'#4a3820', textAlign:'center', borderTop:'1px solid #2a1f08', paddingTop:8 }}>
        Formule BBG 7.3 (déterministe) : Dégâts = 30 × e^(0.04 × ΔCS) — sans RNG
      </div>
    </div>
  );
}

function CSDisplay({ label, cs, mods, color }) {
  const breakdown = Object.entries(mods).filter(([_, v]) => v !== 0);
  return (
    <div style={{ textAlign:'center' }}>
      <div style={{ fontSize:10, color:'#8a7050', letterSpacing:'.06em' }}>{label}</div>
      <div style={{ fontSize:32, fontWeight:600, color, lineHeight:1 }}>{cs.toFixed(1)}</div>
      <div style={{ fontSize:9, color:'#6a5030', marginTop:4 }}>
        {breakdown.length > 0
          ? breakdown.map(([k,v]) => `${k}: ${v >= 0 ? '+' : ''}${v}`).join(' · ')
          : 'Aucun modifieur'}
      </div>
    </div>
  );
}

function HPBar({ label, before, after, damage, dies, color }) {
  const pct = (after / 100) * 100;
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, marginBottom:4, color:'#8a7050' }}>
        <span>{label}</span>
        <span style={{ color: dies ? '#c44' : '#e0d8c8' }}>
          {before} → {after} HP {dies && '💀'}
        </span>
      </div>
      <div style={{ background:'#0d0a05', height:18, borderRadius:3, overflow:'hidden', position:'relative', border:'1px solid #2a1f08' }}>
        <div style={{
          width:`${pct}%`, height:'100%',
          background:`linear-gradient(90deg, ${color}40, ${color})`,
          transition:'width .35s ease',
        }} />
        <div style={{
          position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:11, color:'#e0d8c8', fontWeight:600,
        }}>
          {damage > 0 ? `-${damage} dégâts` : 'Aucun dégât'}
        </div>
      </div>
    </div>
  );
}

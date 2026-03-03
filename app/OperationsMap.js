"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import {
  MAP_BOUNDS, PHASE_LINES, OBJECTIVES, KEY_TERRAIN,
  FRIENDLY_UNITS, ENEMY_UNITS, ASSEMBLY_AREAS, SUPPORT_AREAS,
  FIRE_AREAS, TAIS, ROADS, ROUTES, PASAK_BRIDGES, NSKK_BRIDGES,
  CHAO_PHRAYA_BRIDGES, NAIS, DECISION_POINTS, TCOA_ZONES,
  TIMELINE_PLS, BOUNDARIES,
} from "../lib/mapData";

// ═══════════════════════════════════════════════════════════════
// Operations Map — COA Sketch Style SVG
// ═══════════════════════════════════════════════════════════════

const W = MAP_BOUNDS.width;   // 270 km
const H = MAP_BOUNDS.height;  // 222 km

// Y-inversion: km y=0 at bottom → SVG y=H at bottom
const toSvg = (x, y) => [x, H - y];
const ptsSvg = (pts) => pts.map(p => toSvg(p[0], p[1]));
const ptsStr = (pts) => ptsSvg(pts).map(p => `${p[0]},${p[1]}`).join(" ");

// Initial view (focused on 25ID AO)
const INIT_VB = { x: 20, y: 12, w: 220, h: 170 };

// Colors
const BG = "#D4C89E";       // tan/sand paper
const GRID_COLOR = "#B8A878";
const RIVER_COLOR = "#4A7FB5";
const MTN_FILL = "#A89070";
const MTN_STROKE = "#8B7355";
const BLUE_UNIT = "#2563EB";
const RED_UNIT = "#DC2626";

// Layer config
const LAYER_DEFS = [
  { id: "satellite",  label: "Satellite",    default: true },
  { id: "grid",       label: "MGRS Grid",    default: false },
  { id: "terrain",    label: "Terrain",       default: true },
  { id: "roads",      label: "AAs / Roads",   default: true },
  { id: "pls",        label: "Phase Lines",   default: true },
  { id: "boundaries", label: "Boundaries",    default: false },
  { id: "objectives", label: "Objectives",    default: true },
  { id: "keyterrain", label: "Key Terrain",   default: true },
  { id: "friendly",   label: "Friendly",      default: true },
  { id: "enemy",      label: "Enemy",         default: true },
  { id: "tcoa",       label: "TCOA Zones",    default: false },
  { id: "fires",      label: "Fire Support",  default: false },
  { id: "tais",       label: "TAIs",          default: false },
  { id: "dps",        label: "Decision Pts",  default: false },
  { id: "timeline",   label: "Timeline",      default: false },
  { id: "sustainment",label: "Sust / AA",     default: false },
  { id: "nais",       label: "NAIs",          default: false },
  { id: "routes",     label: "Routes/Lanes",  default: false },
  { id: "bridges",    label: "Bridges",       default: false },
];

export default function OperationsMap() {
  // Viewport state
  const [vb, setVb] = useState(INIT_VB);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [showLegend, setShowLegend] = useState(false);
  const svgRef = useRef(null);

  // Layer visibility
  const [layers, setLayers] = useState(() => {
    const obj = {};
    LAYER_DEFS.forEach(l => obj[l.id] = l.default);
    return obj;
  });
  const toggleLayer = (id) => setLayers(prev => ({ ...prev, [id]: !prev[id] }));

  // ── Zoom ──────────────────────────────────────────────────
  const zoom = useCallback((factor, cx, cy) => {
    setVb(prev => {
      const newW = Math.max(40, Math.min(500, prev.w / factor));
      const newH = newW * (prev.h / prev.w);
      const mx = cx !== undefined ? cx : prev.x + prev.w / 2;
      const my = cy !== undefined ? cy : prev.y + prev.h / 2;
      const rx = (mx - prev.x) / prev.w;
      const ry = (my - prev.y) / prev.h;
      return { x: mx - newW * rx, y: my - newH * ry, w: newW, h: newH };
    });
  }, []);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const sx = (e.clientX - rect.left) / rect.width;
    const sy = (e.clientY - rect.top) / rect.height;
    setVb(prev => {
      const cx = prev.x + sx * prev.w;
      const cy = prev.y + sy * prev.h;
      const factor = e.deltaY < 0 ? 1.15 : 0.87;
      const newW = Math.max(40, Math.min(500, prev.w / factor));
      const newH = newW * (prev.h / prev.w);
      return { x: cx - newW * sx, y: cy - newH * sy, w: newW, h: newH };
    });
  }, []);

  // ── Pan ───────────────────────────────────────────────────
  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    setDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY, vb: vb });
  }, [vb]);

  const handleMouseMove = useCallback((e) => {
    if (!dragging || !dragStart) return;
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const dx = (e.clientX - dragStart.x) / rect.width * dragStart.vb.w;
    const dy = (e.clientY - dragStart.y) / rect.height * dragStart.vb.h;
    setVb({ ...dragStart.vb, x: dragStart.vb.x - dx, y: dragStart.vb.y - dy });
  }, [dragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setDragging(false);
    setDragStart(null);
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    svg.addEventListener("wheel", handleWheel, { passive: false });
    return () => svg.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  // ── Tooltip helper ────────────────────────────────────────
  const showTip = (e, content) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({ x: e.clientX - rect.left + 12, y: e.clientY - rect.top - 8, content });
  };
  const hideTip = () => setTooltip(null);

  // ── Render ────────────────────────────────────────────────
  const vbStr = `${vb.x} ${vb.y} ${vb.w} ${vb.h}`;
  const scale = vb.w / 220; // relative to initial width
  const fontSize = Math.max(2, 3.5 * scale);
  const unitSize = Math.max(3, 5 * scale);
  const strokeW = Math.max(0.3, 0.6 * scale);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "#0A0E14", position: "relative" }}>
      {/* Layer controls — top left */}
      <div style={MS.layerPanel}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: "#566A80", textTransform: "uppercase", marginBottom: 4 }}>LAYERS</div>
        {LAYER_DEFS.map(l => (
          <label key={l.id} style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer", fontSize: 9, color: layers[l.id] ? "#E8ECF2" : "#566A80", padding: "1px 0" }}>
            <input type="checkbox" checked={layers[l.id]} onChange={() => toggleLayer(l.id)} style={{ width: 10, height: 10, accentColor: "#D4A843" }} />
            {l.label}
          </label>
        ))}
      </div>

      {/* Zoom controls — top right */}
      <div style={MS.zoomPanel}>
        <button style={MS.zoomBtn} onClick={() => zoom(1.3)}>+</button>
        <button style={MS.zoomBtn} onClick={() => zoom(0.77)}>−</button>
        <button style={{ ...MS.zoomBtn, fontSize: 7 }} onClick={() => setVb(INIT_VB)}>RST</button>
        <button style={{ ...MS.zoomBtn, fontSize: 8 }} onClick={() => setShowLegend(!showLegend)}>?</button>
      </div>

      {/* Legend overlay */}
      {showLegend && (
        <div style={MS.legendPanel}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#D4A843", marginBottom: 6, letterSpacing: 1 }}>LEGEND</div>
          <LegendRow color={BLUE_UNIT} label="Friendly Unit (NATO)" />
          <LegendRow color={RED_UNIT} label="Enemy Unit (NATO)" />
          <LegendRow color="#DAA520" shape="diamond" label="Key Terrain (K1-K9)" />
          <LegendRow color="#E08830" shape="star" label="Objective" />
          <LegendRow color="#00E5FF" shape="pentagon" label="Decision Point" />
          <LegendRow color={RIVER_COLOR} shape="line" label="River / Water" />
          <LegendRow color="#3EAF5C" shape="line" label="Phase Line" />
          <LegendRow color="#DC2626" shape="dashed" label="TAI / TCOA Zone" />
          <LegendRow color="#E08830" shape="dashed" label="PAA" />
          <LegendRow color="#888" shape="dashed" label="Boundary" />
          <div style={{ fontSize: 8, color: "#566A80", marginTop: 6 }}>Scroll to zoom · Drag to pan</div>
        </div>
      )}

      {/* Tooltip */}
      {tooltip && (
        <div style={{ ...MS.tooltip, left: tooltip.x, top: tooltip.y }}>
          {tooltip.content}
        </div>
      )}

      {/* SVG Map */}
      <svg
        ref={svgRef}
        viewBox={vbStr}
        style={{ flex: 1, cursor: dragging ? "grabbing" : "grab", userSelect: "none" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <defs>
          {/* Hatching pattern for mountains */}
          <pattern id="mtnHatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="4" stroke={MTN_STROKE} strokeWidth="0.5" opacity="0.4" />
          </pattern>
          {/* Arrow marker for AAs */}
          <marker id="arrowRed" markerWidth="4" markerHeight="3" refX="4" refY="1.5" orient="auto">
            <polygon points="0,0 4,1.5 0,3" fill={RED_UNIT} opacity="0.5" />
          </marker>
          <marker id="arrowBlue" markerWidth="4" markerHeight="3" refX="4" refY="1.5" orient="auto">
            <polygon points="0,0 4,1.5 0,3" fill={BLUE_UNIT} opacity="0.5" />
          </marker>
        </defs>

        {/* Background — satellite or tan paper */}
        {layers.satellite ? (
          <g>
            <rect x={-200} y={-100} width={W + 400} height={H + 300} fill="#1A2332" />
            <image href="/sat-ao.jpg" x={0} y={0} width={W} height={H} opacity={0.75} />
          </g>
        ) : (
          <rect x={-200} y={-100} width={W + 400} height={H + 300} fill={BG} />
        )}

        {/* MGRS Grid */}
        {layers.grid && <GridLayer vb={vb} fontSize={fontSize} strokeW={strokeW} />}

        {/* Terrain (rivers, mountains, dams) */}
        {layers.terrain && <TerrainLayer strokeW={strokeW} fontSize={fontSize} />}

        {/* Bridges */}
        {layers.bridges && <BridgeLayer strokeW={strokeW} />}

        {/* Roads / Avenues of Approach */}
        {layers.roads && <RoadLayer strokeW={strokeW} fontSize={fontSize} showTip={showTip} hideTip={hideTip} />}

        {/* Boundaries */}
        {layers.boundaries && <BoundaryLayer strokeW={strokeW} fontSize={fontSize} />}

        {/* Phase Lines */}
        {layers.pls && <PhaseLineLayer strokeW={strokeW} fontSize={fontSize} />}

        {/* Routes / Lanes */}
        {layers.routes && <RouteLayer strokeW={strokeW} fontSize={fontSize} />}

        {/* TCOA Zones (enemy defense/attack zones) */}
        {layers.tcoa && <TCOALayer strokeW={strokeW} fontSize={fontSize} showTip={showTip} hideTip={hideTip} />}

        {/* Fire Support (PAAs) */}
        {layers.fires && <FireLayer unitSize={unitSize} fontSize={fontSize} showTip={showTip} hideTip={hideTip} />}

        {/* TAIs (Target Areas of Interest) */}
        {layers.tais && <TAILayer unitSize={unitSize} fontSize={fontSize} strokeW={strokeW} showTip={showTip} hideTip={hideTip} />}

        {/* Timeline Phase Lines */}
        {layers.timeline && <TimelineLayer strokeW={strokeW} fontSize={fontSize} />}

        {/* Sustainment (Assembly Areas, Support Areas) */}
        {layers.sustainment && <SustainmentLayer unitSize={unitSize} fontSize={fontSize} showTip={showTip} hideTip={hideTip} />}

        {/* Objectives */}
        {layers.objectives && <ObjectiveLayer unitSize={unitSize} fontSize={fontSize} showTip={showTip} hideTip={hideTip} />}

        {/* Key Terrain */}
        {layers.keyterrain && <KeyTerrainLayer unitSize={unitSize} fontSize={fontSize} showTip={showTip} hideTip={hideTip} />}

        {/* NAIs */}
        {layers.nais && <NAILayer unitSize={unitSize} fontSize={fontSize} />}

        {/* Decision Points */}
        {layers.dps && <DecisionPointLayer unitSize={unitSize} fontSize={fontSize} showTip={showTip} hideTip={hideTip} />}

        {/* Friendly Units */}
        {layers.friendly && <UnitLayer units={FRIENDLY_UNITS} side="friendly" unitSize={unitSize} fontSize={fontSize} showTip={showTip} hideTip={hideTip} />}

        {/* Enemy Units */}
        {layers.enemy && <UnitLayer units={ENEMY_UNITS} side="enemy" unitSize={unitSize} fontSize={fontSize} showTip={showTip} hideTip={hideTip} />}
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════

function LegendRow({ color, label, shape }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 8, color: "#B8C4D4", padding: "1px 0" }}>
      {shape === "diamond" ? (
        <svg width="10" height="10"><polygon points="5,1 9,5 5,9 1,5" fill={color} /></svg>
      ) : shape === "pentagon" ? (
        <svg width="10" height="10"><polygon points="5,1 9,4 7.5,9 2.5,9 1,4" fill={color} /></svg>
      ) : shape === "star" ? (
        <svg width="10" height="10"><polygon points="5,1 6.2,3.8 9,4 7,6.2 7.6,9 5,7.6 2.4,9 3,6.2 1,4 3.8,3.8" fill={color} /></svg>
      ) : shape === "line" ? (
        <svg width="14" height="10"><line x1="0" y1="5" x2="14" y2="5" stroke={color} strokeWidth="1.5" /></svg>
      ) : shape === "dashed" ? (
        <svg width="14" height="10"><line x1="0" y1="5" x2="14" y2="5" stroke={color} strokeWidth="1" strokeDasharray="2,2" /></svg>
      ) : (
        <svg width="10" height="10"><rect x="1" y="1" width="8" height="8" fill="none" stroke={color} strokeWidth="1.5" /></svg>
      )}
      <span>{label}</span>
    </div>
  );
}

// ── Grid Layer ──────────────────────────────────────────────
function GridLayer({ vb, fontSize, strokeW }) {
  const lines = [];
  const labels = [];
  const step = 10; // 10km grid
  const startX = Math.floor(vb.x / step) * step;
  const startY = Math.floor(vb.y / step) * step;
  const endX = startX + vb.w + step;
  const endY = startY + vb.h + step;

  for (let x = startX; x <= endX; x += step) {
    lines.push(<line key={`gx${x}`} x1={x} y1={startY} x2={x} y2={endY} stroke={GRID_COLOR} strokeWidth={strokeW * 0.4} opacity={0.3} />);
    if (x % 50 === 0) {
      labels.push(<text key={`lx${x}`} x={x} y={startY + fontSize * 1.2} fontSize={fontSize * 0.7} fill={GRID_COLOR} opacity={0.5} textAnchor="middle">{x}km</text>);
    }
  }
  for (let y = startY; y <= endY; y += step) {
    lines.push(<line key={`gy${y}`} x1={startX} y1={y} x2={endX} y2={y} stroke={GRID_COLOR} strokeWidth={strokeW * 0.4} opacity={0.3} />);
    if (y % 50 === 0) {
      const kmY = H - y;
      labels.push(<text key={`ly${y}`} x={startX + fontSize * 0.5} y={y - fontSize * 0.3} fontSize={fontSize * 0.7} fill={GRID_COLOR} opacity={0.5}>{kmY}km</text>);
    }
  }
  return <g>{lines}{labels}</g>;
}

// ── Terrain Layer ───────────────────────────────────────────
function TerrainLayer({ strokeW, fontSize }) {
  // Pa Sak River — approximate from bridge positions (runs N-S along PL BANANA)
  const pasakPts = PASAK_BRIDGES.map(b => toSvg(b[0], b[1]));
  const pasakPath = pasakPts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");

  // Nueng Sai Kao Khwa Canal — approximate from bridge positions
  const nskkPts = NSKK_BRIDGES.map(b => toSvg(b[0], b[1]));
  const nskkPath = nskkPts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");

  // Dong Phaya Yen Mountains — approximate polygon east of PL DATE
  // K5 (148, 148.5), K6 (150.4, 121.9), K7 (162.8, 89.6), K8 (218.8, 135)
  const mtnPoly = [
    [140, 165], [148, 155], [155, 140], [155, 125], [157, 110],
    [163, 95], [168, 85], [175, 80], [190, 75],
    [225, 145], [220, 150], [205, 155], [185, 160],
    [165, 165], [150, 165], [140, 165],
  ].map(p => toSvg(p[0], p[1]));
  const mtnPath = mtnPoly.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ") + "Z";

  // Pa Sak Cholasit Dam — approximate between K3 and K4
  const damPos = toSvg(116.5, 105);

  return (
    <g>
      {/* Dong Phaya Yen Mountains */}
      <path d={mtnPath} fill={MTN_FILL} opacity={0.25} stroke={MTN_STROKE} strokeWidth={strokeW} />
      <path d={mtnPath} fill="url(#mtnHatch)" opacity={0.3} />
      <text x={toSvg(178, 125)[0]} y={toSvg(178, 125)[1]} fontSize={fontSize * 1.1} fill={MTN_STROKE} textAnchor="middle" fontWeight="bold" opacity={0.6}>DONG PHAYA YEN MTNS</text>
      <text x={toSvg(178, 120)[0]} y={toSvg(178, 120)[1]} fontSize={fontSize * 0.8} fill={MTN_STROKE} textAnchor="middle" opacity={0.5}>Max 1,167m</text>

      {/* Pa Sak River */}
      <path d={pasakPath} fill="none" stroke={RIVER_COLOR} strokeWidth={strokeW * 3} strokeLinecap="round" strokeLinejoin="round" opacity={0.7} />
      <path d={pasakPath} fill="none" stroke={RIVER_COLOR} strokeWidth={strokeW * 1.5} strokeLinecap="round" strokeLinejoin="round" opacity={0.4} />
      {/* River label at midpoint */}
      {pasakPts.length > 7 && (
        <text x={pasakPts[7][0] + 4} y={pasakPts[7][1]} fontSize={fontSize * 0.9} fill={RIVER_COLOR} fontWeight="bold" opacity={0.7} transform={`rotate(-10, ${pasakPts[7][0] + 4}, ${pasakPts[7][1]})`}>PA SAK RIVER</text>
      )}

      {/* Nueng Sai Kao Khwa Canal */}
      <path d={nskkPath} fill="none" stroke={RIVER_COLOR} strokeWidth={strokeW * 1.5} strokeLinecap="round" strokeLinejoin="round" opacity={0.4} />
      {nskkPts.length > 20 && (
        <text x={nskkPts[20][0] - 4} y={nskkPts[20][1]} fontSize={fontSize * 0.7} fill={RIVER_COLOR} opacity={0.5} textAnchor="end">NSKK Canal</text>
      )}

      {/* Pa Sak Cholasit Dam */}
      <rect x={damPos[0] - 3} y={damPos[1] - 0.8} width={6} height={1.6} fill="#8B7355" stroke="#5C4A35" strokeWidth={strokeW * 0.8} />
      <text x={damPos[0]} y={damPos[1] - 2} fontSize={fontSize * 0.7} fill="#8B7355" textAnchor="middle" fontWeight="bold">PA SAK DAM</text>
    </g>
  );
}

// ── Bridge Layer ────────────────────────────────────────────
function BridgeLayer({ strokeW }) {
  return (
    <g>
      {PASAK_BRIDGES.map((b, i) => {
        const [sx, sy] = toSvg(b[0], b[1]);
        return <rect key={`pb${i}`} x={sx - 1} y={sy - 0.5} width={2} height={1} fill="#5C4A35" stroke="#3C2A15" strokeWidth={strokeW * 0.5} rx={0.2} />;
      })}
      {NSKK_BRIDGES.map((b, i) => {
        const [sx, sy] = toSvg(b[0], b[1]);
        return <rect key={`nb${i}`} x={sx - 0.8} y={sy - 0.4} width={1.6} height={0.8} fill="#5C4A35" stroke="#3C2A15" strokeWidth={strokeW * 0.3} rx={0.2} />;
      })}
      {CHAO_PHRAYA_BRIDGES.map((b, i) => {
        const [sx, sy] = toSvg(b[0], b[1]);
        return <rect key={`cb${i}`} x={sx - 0.8} y={sy - 0.4} width={1.6} height={0.8} fill="#3A5A7A" stroke="#1A3A5A" strokeWidth={strokeW * 0.3} rx={0.2} />;
      })}
    </g>
  );
}

// ── Road / AA Layer ─────────────────────────────────────────
function RoadLayer({ strokeW, fontSize, showTip, hideTip }) {
  // Color AAs by their general orientation/importance
  const aaColor = (name) => {
    if (name.includes("5") || name.includes("6") || name.includes("7")) return "#555";
    return "#777";
  };
  const aaWidth = (name) => {
    // Major AAs wider
    if (/^AA[567]$/.test(name)) return strokeW * 2;
    return strokeW * 1.2;
  };

  return (
    <g>
      {ROADS.map(r => (
        <g key={r.id}>
          <polyline
            points={ptsStr(r.points)}
            fill="none"
            stroke={aaColor(r.name)}
            strokeWidth={aaWidth(r.name)}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.5}
            strokeDasharray={r.name.includes("a") || r.name.includes("b") ? `${strokeW * 3},${strokeW * 2}` : "none"}
            onMouseEnter={(e) => showTip(e, r.name)}
            onMouseLeave={hideTip}
          />
          {/* Label at midpoint */}
          {r.points.length > 1 && (() => {
            const mid = Math.floor(r.points.length / 2);
            const [mx, my] = toSvg(r.points[mid][0], r.points[mid][1]);
            return <text x={mx + 2} y={my - 1} fontSize={fontSize * 0.7} fill="#555" opacity={0.6} fontWeight="bold">{r.name}</text>;
          })()}
        </g>
      ))}
    </g>
  );
}

// ── Boundary Layer ──────────────────────────────────────────
function BoundaryLayer({ strokeW, fontSize }) {
  return (
    <g>
      {BOUNDARIES.map(b => {
        const dash = b.echelon === "CORPS" ? `${strokeW * 6},${strokeW * 3},${strokeW * 2},${strokeW * 3}` :
                     b.echelon === "ARMY" ? `${strokeW * 8},${strokeW * 3}` :
                     `${strokeW * 4},${strokeW * 3}`;
        return (
          <polyline
            key={b.id}
            points={ptsStr(b.points)}
            fill="none"
            stroke="#444"
            strokeWidth={strokeW * 0.8}
            strokeDasharray={dash}
            opacity={0.4}
          />
        );
      })}
    </g>
  );
}

// ── Phase Line Layer ────────────────────────────────────────
function PhaseLineLayer({ strokeW, fontSize }) {
  // Only show PLs relevant to 25ID AO: APPLE through GRAPE, plus TAN, BLUE
  const relevantPLs = ["pl_tan", "pl_apple", "pl_banana", "pl_blue", "pl_cherry", "pl_date", "pl_fig", "pl_grape", "pl_black", "pl_brown"];

  return (
    <g>
      {PHASE_LINES.filter(pl => relevantPLs.includes(pl.id)).map(pl => {
        const pts = ptsSvg(pl.points);
        const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
        // Label position — top of the line
        const labelPt = pts[0];
        const isLD = pl.type === "ld";
        const isWGX = pl.type === "wgx";
        const isObj = pl.type === "obj";
        const sw = isLD || isWGX ? strokeW * 2 : strokeW * 1.2;

        return (
          <g key={pl.id}>
            <path d={pathD} fill="none" stroke={pl.color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" opacity={0.8}
              strokeDasharray={pl.type === "rear" ? `${strokeW * 3},${strokeW * 2}` : "none"} />
            {/* Label badge */}
            <rect x={labelPt[0] - fontSize * 3} y={labelPt[1] - fontSize * 1.2} width={fontSize * 6} height={fontSize * 1.6} rx={fontSize * 0.3} fill={pl.color} opacity={0.85} />
            <text x={labelPt[0]} y={labelPt[1] + fontSize * 0.1} fontSize={fontSize * 0.8} fill="#FFF" textAnchor="middle" fontWeight="bold">{pl.name}</text>
            {/* Subtext for special PLs */}
            {isLD && <text x={labelPt[0]} y={labelPt[1] + fontSize * 1.2} fontSize={fontSize * 0.6} fill={pl.color} textAnchor="middle" fontWeight="bold">(25ID LD)</text>}
            {isWGX && <text x={labelPt[0]} y={labelPt[1] + fontSize * 1.2} fontSize={fontSize * 0.6} fill={pl.color} textAnchor="middle" fontWeight="bold">(WGX / Pa Sak)</text>}
            {isObj && <text x={labelPt[0]} y={labelPt[1] + fontSize * 1.2} fontSize={fontSize * 0.6} fill={pl.color} textAnchor="middle" fontWeight="bold">(OBJ / Passes)</text>}
          </g>
        );
      })}
    </g>
  );
}

// ── Route / Lane Layer ──────────────────────────────────────
function RouteLayer({ strokeW, fontSize }) {
  return (
    <g>
      {ROUTES.map(r => {
        const isLane = r.name.startsWith("LANE");
        return (
          <g key={r.id}>
            <polyline
              points={ptsStr(r.points)}
              fill="none"
              stroke={isLane ? "#2563EB" : "#7B2D8E"}
              strokeWidth={strokeW * 1.5}
              strokeDasharray={`${strokeW * 4},${strokeW * 2}`}
              strokeLinecap="round"
              opacity={0.6}
            />
            {r.points.length > 0 && (() => {
              const mid = Math.floor(r.points.length / 2);
              const [mx, my] = toSvg(r.points[mid][0], r.points[mid][1]);
              return <text x={mx} y={my - 1.5} fontSize={fontSize * 0.7} fill={isLane ? "#2563EB" : "#7B2D8E"} textAnchor="middle" fontWeight="bold">{r.name}</text>;
            })()}
          </g>
        );
      })}
    </g>
  );
}

// ── Fire Support Layer ──────────────────────────────────────
function FireLayer({ unitSize, fontSize, showTip, hideTip }) {
  return (
    <g>
      {FIRE_AREAS.map(f => {
        const [sx, sy] = toSvg(f.position[0], f.position[1]);
        const r = unitSize * 0.8;
        return (
          <g key={f.id}
            onMouseEnter={(e) => showTip(e, f.name)}
            onMouseLeave={hideTip}
          >
            <circle cx={sx} cy={sy} r={r} fill="#E08830" opacity={0.2} stroke="#E08830" strokeWidth={0.5} strokeDasharray="1,1" />
            <text x={sx} y={sy + fontSize * 0.3} fontSize={fontSize * 0.65} fill="#E08830" textAnchor="middle" fontWeight="bold">{f.name.replace("PAA ", "")}</text>
          </g>
        );
      })}
    </g>
  );
}

// ── Sustainment Layer ───────────────────────────────────────
function SustainmentLayer({ unitSize, fontSize, showTip, hideTip }) {
  return (
    <g>
      {ASSEMBLY_AREAS.map(a => {
        const [sx, sy] = toSvg(a.position[0], a.position[1]);
        return (
          <g key={a.id} onMouseEnter={(e) => showTip(e, a.name)} onMouseLeave={hideTip}>
            <rect x={sx - unitSize} y={sy - unitSize * 0.6} width={unitSize * 2} height={unitSize * 1.2} fill="#3EAF5C" opacity={0.15} stroke="#3EAF5C" strokeWidth={0.4} strokeDasharray="1.5,1" rx={0.5} />
            <text x={sx} y={sy + fontSize * 0.25} fontSize={fontSize * 0.6} fill="#3EAF5C" textAnchor="middle" fontWeight="bold">{a.name.replace("AA ", "")}</text>
          </g>
        );
      })}
      {SUPPORT_AREAS.map(s => {
        const [sx, sy] = toSvg(s.position[0], s.position[1]);
        return (
          <g key={s.id} onMouseEnter={(e) => showTip(e, s.name)} onMouseLeave={hideTip}>
            <rect x={sx - unitSize} y={sy - unitSize * 0.5} width={unitSize * 2} height={unitSize} fill="#9E6DC8" opacity={0.15} stroke="#9E6DC8" strokeWidth={0.4} rx={0.5} />
            <text x={sx} y={sy + fontSize * 0.25} fontSize={fontSize * 0.55} fill="#9E6DC8" textAnchor="middle" fontWeight="bold">{s.name}</text>
          </g>
        );
      })}
    </g>
  );
}

// ── Objective Layer ─────────────────────────────────────────
function ObjectiveLayer({ unitSize, fontSize, showTip, hideTip }) {
  return (
    <g>
      {OBJECTIVES.map(o => {
        const [sx, sy] = toSvg(o.position[0], o.position[1]);
        const r = unitSize * 0.9;
        // 5-point star
        const starPts = [];
        for (let i = 0; i < 10; i++) {
          const angle = (i * 36 - 90) * Math.PI / 180;
          const rad = i % 2 === 0 ? r : r * 0.45;
          starPts.push(`${sx + Math.cos(angle) * rad},${sy + Math.sin(angle) * rad}`);
        }
        return (
          <g key={o.id} onMouseEnter={(e) => showTip(e, o.name)} onMouseLeave={hideTip}>
            <polygon points={starPts.join(" ")} fill="#E08830" stroke="#B86B10" strokeWidth={0.4} opacity={0.85} />
            <text x={sx} y={sy + r + fontSize * 1.0} fontSize={fontSize * 0.8} fill="#B86B10" textAnchor="middle" fontWeight="bold">{o.name}</text>
          </g>
        );
      })}
    </g>
  );
}

// ── Key Terrain Layer ───────────────────────────────────────
function KeyTerrainLayer({ unitSize, fontSize, showTip, hideTip }) {
  return (
    <g>
      {KEY_TERRAIN.map(k => {
        const [sx, sy] = toSvg(k.position[0], k.position[1]);
        const r = unitSize * 0.7;
        return (
          <g key={k.id} onMouseEnter={(e) => showTip(e, `${k.name}: ${k.description}`)} onMouseLeave={hideTip}>
            <polygon points={`${sx},${sy - r} ${sx + r},${sy} ${sx},${sy + r} ${sx - r},${sy}`} fill="#DAA520" stroke="#B8860B" strokeWidth={0.5} opacity={0.8} />
            <text x={sx} y={sy + fontSize * 0.3} fontSize={fontSize * 0.7} fill="#FFF" textAnchor="middle" fontWeight="bold">{k.name}</text>
          </g>
        );
      })}
    </g>
  );
}

// ── TAI Layer (Target Areas of Interest) ────────────────────
function TAILayer({ unitSize, fontSize, strokeW, showTip, hideTip }) {
  return (
    <g>
      {TAIS.map(t => {
        const [sx, sy] = toSvg(t.position[0], t.position[1]);
        if (t.polygon && t.polygon.length > 2) {
          const polyPts = ptsSvg(t.polygon).map(p => `${p[0]},${p[1]}`).join(" ");
          return (
            <g key={t.id} onMouseEnter={(e) => showTip(e, t.name)} onMouseLeave={hideTip}>
              <polygon points={polyPts} fill="#DC2626" opacity={0.12} stroke="#DC2626" strokeWidth={strokeW * 0.8} strokeDasharray={`${strokeW * 2},${strokeW * 1.5}`} />
              <text x={sx} y={sy + fontSize * 0.3} fontSize={fontSize * 0.6} fill="#DC2626" textAnchor="middle" fontWeight="bold" opacity={0.8}>{t.name.replace("TAI ", "")}</text>
            </g>
          );
        }
        // Fallback: point marker
        const r = unitSize * 0.6;
        return (
          <g key={t.id} onMouseEnter={(e) => showTip(e, t.name)} onMouseLeave={hideTip}>
            <circle cx={sx} cy={sy} r={r} fill="#DC2626" opacity={0.15} stroke="#DC2626" strokeWidth={0.4} strokeDasharray="1,1" />
            <text x={sx} y={sy + fontSize * 0.3} fontSize={fontSize * 0.6} fill="#DC2626" textAnchor="middle" fontWeight="bold" opacity={0.8}>{t.name.replace("TAI ", "")}</text>
          </g>
        );
      })}
    </g>
  );
}

// ── Decision Point Layer ────────────────────────────────────
function DecisionPointLayer({ unitSize, fontSize, showTip, hideTip }) {
  return (
    <g>
      {DECISION_POINTS.map(dp => {
        const [sx, sy] = toSvg(dp.position[0], dp.position[1]);
        const r = unitSize * 0.8;
        return (
          <g key={dp.id} onMouseEnter={(e) => showTip(e, dp.name)} onMouseLeave={hideTip}>
            <polygon points={`${sx},${sy - r} ${sx + r * 0.7},${sy} ${sx + r * 0.4},${sy + r * 0.8} ${sx - r * 0.4},${sy + r * 0.8} ${sx - r * 0.7},${sy}`} fill="#00E5FF" stroke="#00B8CC" strokeWidth={0.5} opacity={0.8} />
            <text x={sx} y={sy + fontSize * 0.2} fontSize={fontSize * 0.7} fill="#002233" textAnchor="middle" fontWeight="bold">{dp.name}</text>
          </g>
        );
      })}
    </g>
  );
}

// ── TCOA Zone Layer (enemy defense/attack zones) ────────────
function TCOALayer({ strokeW, fontSize, showTip, hideTip }) {
  const zoneColors = {
    "Frontal Blocking Zone": { fill: "#FF4444", stroke: "#CC0000" },
    "Frontier Defense Zone": { fill: "#FF8800", stroke: "#CC6600" },
    "Depth Defense Zone":    { fill: "#FFCC00", stroke: "#AA8800" },
    "AZ1": { fill: "#FF2222", stroke: "#AA0000" },
    "AZ2": { fill: "#FF2222", stroke: "#AA0000" },
    "AZ3": { fill: "#FF2222", stroke: "#AA0000" },
    "AZ4": { fill: "#FF2222", stroke: "#AA0000" },
  };
  return (
    <g>
      {TCOA_ZONES.map(z => {
        const colors = zoneColors[z.name] || { fill: "#FF4444", stroke: "#CC0000" };
        const polyPts = ptsSvg(z.polygon).map(p => `${p[0]},${p[1]}`).join(" ");
        const center = coords_center_svg(z.polygon);
        return (
          <g key={z.id} onMouseEnter={(e) => showTip(e, `${z.name} (TCOA 1)`)} onMouseLeave={hideTip}>
            <polygon points={polyPts} fill={colors.fill} opacity={0.1} stroke={colors.stroke} strokeWidth={strokeW * 1.2} strokeDasharray={`${strokeW * 4},${strokeW * 2}`} />
            <text x={center[0]} y={center[1]} fontSize={fontSize * 0.7} fill={colors.stroke} textAnchor="middle" fontWeight="bold" opacity={0.7}>{z.name}</text>
          </g>
        );
      })}
    </g>
  );
}

// Helper for TCOA zone label positioning
function coords_center_svg(pts) {
  if (!pts || pts.length === 0) return [0, 0];
  const svgPts = ptsSvg(pts);
  const cx = svgPts.reduce((s, p) => s + p[0], 0) / svgPts.length;
  const cy = svgPts.reduce((s, p) => s + p[1], 0) / svgPts.length;
  return [cx, cy];
}

// ── Timeline Layer (D+16 through D+22) ─────────────────────
function TimelineLayer({ strokeW, fontSize }) {
  return (
    <g>
      {TIMELINE_PLS.map(t => {
        const pts = ptsSvg(t.points);
        const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
        const labelPt = pts[0];
        return (
          <g key={t.id}>
            <path d={pathD} fill="none" stroke="#00E5FF" strokeWidth={strokeW * 0.8} strokeDasharray={`${strokeW * 2},${strokeW * 3}`} opacity={0.5} />
            <text x={labelPt[0]} y={labelPt[1] - fontSize * 0.5} fontSize={fontSize * 0.7} fill="#00E5FF" textAnchor="middle" fontWeight="bold" opacity={0.7}>{t.name}</text>
          </g>
        );
      })}
    </g>
  );
}

// ── NAI Layer ───────────────────────────────────────────────
function NAILayer({ unitSize, fontSize }) {
  return (
    <g>
      {NAIS.map(n => {
        const [sx, sy] = toSvg(n.position[0], n.position[1]);
        const r = unitSize * 0.6;
        return (
          <g key={n.id}>
            <circle cx={sx} cy={sy} r={r} fill="none" stroke="#E05555" strokeWidth={0.4} strokeDasharray="1,1" opacity={0.5} />
            <text x={sx} y={sy + fontSize * 0.25} fontSize={fontSize * 0.55} fill="#E05555" textAnchor="middle" opacity={0.6}>{n.name.replace("NAI ", "")}</text>
          </g>
        );
      })}
    </g>
  );
}

// ── Unit Layer (NATO APP-6 symbols) ─────────────────────────
function UnitLayer({ units, side, unitSize, fontSize, showTip, hideTip }) {
  const color = side === "friendly" ? BLUE_UNIT : RED_UNIT;
  const fillBg = side === "friendly" ? "#D4E5FF" : "#FFD4D4";

  // Filter to units within a reasonable map extent
  const visible = units.filter(u => {
    const [x, y] = u.position;
    return x > -50 && x < W + 50 && y > -50 && y < H + 50;
  });

  return (
    <g>
      {visible.map(u => {
        const [sx, sy] = toSvg(u.position[0], u.position[1]);
        const s = unitSize;
        const ech = u.echelon;

        // Skip non-unit entries
        if (ech === "CITY") return null;

        return (
          <g key={u.id}
            onMouseEnter={(e) => showTip(e, `${u.designation}${u.strength ? ` (${u.strength})` : ""} — ${u.notes || u.unitType}`)}
            onMouseLeave={hideTip}
          >
            {/* Unit box */}
            <rect x={sx - s} y={sy - s * 0.7} width={s * 2} height={s * 1.4} fill={fillBg}
              stroke={color} strokeWidth={side === "enemy" ? 0.6 : 0.8} rx={0.3}
              strokeDasharray={side === "enemy" && u.strength === "UNK" ? "1.5,1" : "none"} />

            {/* Echelon marks (above box) */}
            {ech === "BN" && <circle cx={sx} cy={sy - s * 0.7 - s * 0.3} r={s * 0.15} fill={color} />}
            {ech === "BDE" && (
              <g>
                <line x1={sx - s * 0.15} y1={sy - s * 0.7 - s * 0.15} x2={sx + s * 0.15} y2={sy - s * 0.7 - s * 0.45} stroke={color} strokeWidth={0.6} />
                <line x1={sx + s * 0.15} y1={sy - s * 0.7 - s * 0.15} x2={sx - s * 0.15} y2={sy - s * 0.7 - s * 0.45} stroke={color} strokeWidth={0.6} />
              </g>
            )}
            {ech === "DIV" && (
              <g>
                <line x1={sx - s * 0.35} y1={sy - s * 0.7 - s * 0.15} x2={sx - s * 0.05} y2={sy - s * 0.7 - s * 0.45} stroke={color} strokeWidth={0.6} />
                <line x1={sx - s * 0.05} y1={sy - s * 0.7 - s * 0.15} x2={sx - s * 0.35} y2={sy - s * 0.7 - s * 0.45} stroke={color} strokeWidth={0.6} />
                <line x1={sx + s * 0.05} y1={sy - s * 0.7 - s * 0.15} x2={sx + s * 0.35} y2={sy - s * 0.7 - s * 0.45} stroke={color} strokeWidth={0.6} />
                <line x1={sx + s * 0.35} y1={sy - s * 0.7 - s * 0.15} x2={sx + s * 0.05} y2={sy - s * 0.7 - s * 0.45} stroke={color} strokeWidth={0.6} />
              </g>
            )}
            {ech === "CORPS" && (
              <g>
                <line x1={sx - s * 0.55} y1={sy - s * 0.7 - s * 0.15} x2={sx - s * 0.25} y2={sy - s * 0.7 - s * 0.45} stroke={color} strokeWidth={0.6} />
                <line x1={sx - s * 0.25} y1={sy - s * 0.7 - s * 0.15} x2={sx - s * 0.55} y2={sy - s * 0.7 - s * 0.45} stroke={color} strokeWidth={0.6} />
                <line x1={sx - s * 0.15} y1={sy - s * 0.7 - s * 0.15} x2={sx + s * 0.15} y2={sy - s * 0.7 - s * 0.45} stroke={color} strokeWidth={0.6} />
                <line x1={sx + s * 0.15} y1={sy - s * 0.7 - s * 0.15} x2={sx - s * 0.15} y2={sy - s * 0.7 - s * 0.45} stroke={color} strokeWidth={0.6} />
                <line x1={sx + s * 0.25} y1={sy - s * 0.7 - s * 0.15} x2={sx + s * 0.55} y2={sy - s * 0.7 - s * 0.45} stroke={color} strokeWidth={0.6} />
                <line x1={sx + s * 0.55} y1={sy - s * 0.7 - s * 0.15} x2={sx + s * 0.25} y2={sy - s * 0.7 - s * 0.45} stroke={color} strokeWidth={0.6} />
              </g>
            )}

            {/* Unit type icon inside box */}
            {renderUnitType(u.unitType, sx, sy, s, color)}

            {/* Designation label below */}
            <text x={sx} y={sy + s * 0.7 + fontSize * 1.0} fontSize={fontSize * 0.75} fill={color} textAnchor="middle" fontWeight="bold">{u.designation}</text>

            {/* Strength indicator for enemy */}
            {side === "enemy" && u.strength && u.strength !== "UNK" && (
              <text x={sx + s + fontSize * 0.3} y={sy} fontSize={fontSize * 0.55} fill={color} opacity={0.7}>{u.strength}</text>
            )}
          </g>
        );
      })}
    </g>
  );
}

function renderUnitType(type, cx, cy, s, color) {
  const sw = 0.5;
  switch (type) {
    case "Infantry":
    case "Motorized":
      // Crossed diagonals
      return (
        <g>
          <line x1={cx - s * 0.6} y1={cy - s * 0.4} x2={cx + s * 0.6} y2={cy + s * 0.4} stroke={color} strokeWidth={sw} />
          <line x1={cx + s * 0.6} y1={cy - s * 0.4} x2={cx - s * 0.6} y2={cy + s * 0.4} stroke={color} strokeWidth={sw} />
        </g>
      );
    case "Armored":
    case "ABCT":
    case "Heavy":
      // Oval (armor)
      return <ellipse cx={cx} cy={cy} rx={s * 0.5} ry={s * 0.3} fill="none" stroke={color} strokeWidth={sw} />;
    case "FA":
    case "Artillery":
      // Dot
      return <circle cx={cx} cy={cy} r={s * 0.25} fill={color} />;
    case "ADA":
      // Bow-tie
      return (
        <g>
          <line x1={cx - s * 0.5} y1={cy - s * 0.35} x2={cx + s * 0.5} y2={cy + s * 0.35} stroke={color} strokeWidth={sw} />
          <line x1={cx + s * 0.5} y1={cy - s * 0.35} x2={cx - s * 0.5} y2={cy + s * 0.35} stroke={color} strokeWidth={sw} />
          <line x1={cx - s * 0.5} y1={cy - s * 0.35} x2={cx - s * 0.5} y2={cy + s * 0.35} stroke={color} strokeWidth={sw} />
          <line x1={cx + s * 0.5} y1={cy - s * 0.35} x2={cx + s * 0.5} y2={cy + s * 0.35} stroke={color} strokeWidth={sw} />
        </g>
      );
    case "Engineer":
      // Castle (E)
      return <text x={cx} y={cy + s * 0.2} fontSize={s * 0.7} fill={color} textAnchor="middle" fontWeight="bold">E</text>;
    case "Aviation":
      // Propeller symbol
      return (
        <g>
          <line x1={cx} y1={cy - s * 0.35} x2={cx} y2={cy + s * 0.35} stroke={color} strokeWidth={sw} />
          <line x1={cx - s * 0.35} y1={cy} x2={cx + s * 0.35} y2={cy} stroke={color} strokeWidth={sw} />
        </g>
      );
    case "SOF":
      // Arrow
      return (
        <g>
          <line x1={cx - s * 0.4} y1={cy + s * 0.3} x2={cx} y2={cy - s * 0.3} stroke={color} strokeWidth={sw} />
          <line x1={cx} y1={cy - s * 0.3} x2={cx + s * 0.4} y2={cy + s * 0.3} stroke={color} strokeWidth={sw} />
        </g>
      );
    case "Sustainment":
      return <text x={cx} y={cy + s * 0.2} fontSize={s * 0.5} fill={color} textAnchor="middle" fontWeight="bold">SPT</text>;
    case "Airborne":
      // Parachute arc
      return (
        <g>
          <path d={`M${cx - s * 0.5},${cy} Q${cx},${cy - s * 0.6} ${cx + s * 0.5},${cy}`} fill="none" stroke={color} strokeWidth={sw} />
          <line x1={cx} y1={cy} x2={cx} y2={cy + s * 0.3} stroke={color} strokeWidth={sw} />
        </g>
      );
    case "Cover Force":
      // Diagonal + C
      return (
        <g>
          <line x1={cx - s * 0.5} y1={cy + s * 0.3} x2={cx + s * 0.5} y2={cy - s * 0.3} stroke={color} strokeWidth={sw} />
          <text x={cx + s * 0.15} y={cy + s * 0.15} fontSize={s * 0.45} fill={color} textAnchor="middle" fontWeight="bold">CF</text>
        </g>
      );
    case "Marine":
      return <text x={cx} y={cy + s * 0.2} fontSize={s * 0.5} fill={color} textAnchor="middle" fontWeight="bold">MAR</text>;
    case "Medium":
      // Infantry X + wheel
      return (
        <g>
          <line x1={cx - s * 0.5} y1={cy - s * 0.35} x2={cx + s * 0.5} y2={cy + s * 0.35} stroke={color} strokeWidth={sw} />
          <line x1={cx + s * 0.5} y1={cy - s * 0.35} x2={cx - s * 0.5} y2={cy + s * 0.35} stroke={color} strokeWidth={sw} />
          <circle cx={cx} cy={cy + s * 0.5} r={s * 0.15} fill="none" stroke={color} strokeWidth={sw * 0.5} />
        </g>
      );
    default:
      // Default: question mark
      return <text x={cx} y={cy + s * 0.2} fontSize={s * 0.5} fill={color} textAnchor="middle">?</text>;
  }
}

// ═══════════════════════════════════════════════════════════════
// MAP-SPECIFIC STYLES
// ═══════════════════════════════════════════════════════════════
const MS = {
  layerPanel: {
    position: "absolute", top: 8, left: 8, zIndex: 10,
    background: "rgba(13,17,23,0.92)", border: "1px solid #1E2A3A",
    borderRadius: 4, padding: "6px 8px", maxHeight: "60%", overflowY: "auto",
  },
  zoomPanel: {
    position: "absolute", top: 8, right: 8, zIndex: 10,
    display: "flex", flexDirection: "column", gap: 2,
  },
  zoomBtn: {
    width: 26, height: 26, background: "rgba(13,17,23,0.92)",
    border: "1px solid #1E2A3A", borderRadius: 3, color: "#D4A843",
    fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  legendPanel: {
    position: "absolute", top: 8, right: 40, zIndex: 10,
    background: "rgba(13,17,23,0.95)", border: "1px solid #1E2A3A",
    borderRadius: 4, padding: "8px 10px", minWidth: 160,
  },
  tooltip: {
    position: "absolute", zIndex: 20,
    background: "rgba(13,17,23,0.95)", border: "1px solid #D4A843",
    borderRadius: 3, padding: "4px 8px", fontSize: 10,
    color: "#E8ECF2", pointerEvents: "none", maxWidth: 240,
    whiteSpace: "pre-wrap", lineHeight: 1.4,
  },
};

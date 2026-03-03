"""
parse_kmz.py — Parse CPCE KMZ exports → generate lib/mapData.js
Scans all KMZ subfolders (M2, FIRES, INTEL), deduplicates by filename,
and produces a single JavaScript module with all geographic features.

Usage:
    python scripts/parse_kmz.py

Coordinate system:
    Origin: SW corner (lon 100.0, lat 14.0)
    x = east (km), y = north (km)
    Equirectangular projection at reference latitude 15°
"""
import zipfile, sys, os, json, math, re
import xml.etree.ElementTree as ET

sys.stdout.reconfigure(encoding="utf-8")

# ── Configuration ─────────────────────────────────────────────────
KMZ_ROOT = r"C:\Users\shita\OneDrive\Desktop\ILE\CGSC\W 500_Division Operations Part II\W 500_Scenario\Products\KMZs"
SUBFOLDERS = ["M2 KMZ", "FIRES KMZ", "INTEL KMZ"]
OUTPUT = os.path.join(os.path.dirname(os.path.dirname(__file__)), "lib", "mapData.js")

# Map origin (SW corner) and projection constants
ORIGIN_LON = 100.0
ORIGIN_LAT = 14.0
REF_LAT    = 15.0  # degrees — center of AO
KM_PER_DEG_LON = math.cos(math.radians(REF_LAT)) * 111.32  # ~107.53
KM_PER_DEG_LAT = 110.57

# Map bounds in km (NE corner relative to origin)
MAP_WIDTH  = 270  # ~2.5° longitude
MAP_HEIGHT = 222  # ~2.0° latitude

KML_NS = "http://www.opengis.net/kml/2.2"

# ── Coordinate conversion ────────────────────────────────────────
def to_km(lon, lat):
    """Convert WGS84 lat/lon to local km coordinates."""
    x = (lon - ORIGIN_LON) * KM_PER_DEG_LON
    y = (lat - ORIGIN_LAT) * KM_PER_DEG_LAT
    return [round(x, 2), round(y, 2)]

def coords_center(coords):
    """Get center of a coordinate list (already in km)."""
    if not coords:
        return [0, 0]
    cx = sum(c[0] for c in coords) / len(coords)
    cy = sum(c[1] for c in coords) / len(coords)
    return [round(cx, 2), round(cy, 2)]

# ── KMZ Parsing ──────────────────────────────────────────────────
def parse_kmz(filepath):
    """Parse a KMZ file, return list of feature dicts."""
    features = []
    with zipfile.ZipFile(filepath, "r") as z:
        for name in z.namelist():
            if not name.endswith(".kml"):
                continue
            kml = z.read(name).decode("utf-8")
            root = ET.fromstring(kml)
            for pm in root.iter(f"{{{KML_NS}}}Placemark"):
                feat = extract_placemark(pm)
                if feat:
                    features.append(feat)
    return features

def extract_placemark(pm):
    """Extract name, metadata, and geometry from a Placemark."""
    feat = {}
    # Name
    el = pm.find(f"{{{KML_NS}}}name")
    feat["name"] = el.text.strip() if el is not None and el.text else ""

    # ExtendedData
    ext = pm.find(f"{{{KML_NS}}}ExtendedData")
    if ext is not None:
        for data in ext.findall(f"{{{KML_NS}}}Data"):
            dname = data.get("name", "")
            val = data.find(f"{{{KML_NS}}}value")
            if val is None or not val.text:
                continue
            if dname == "milsymbol":
                try:
                    feat["milsymbol"] = json.loads(val.text)
                except json.JSONDecodeError:
                    pass
            elif dname in ("stroke", "fill", "stroke-width", "fill-opacity"):
                feat[dname] = val.text

    # Description — extract Function, Size, Affiliation
    desc_el = pm.find(f"{{{KML_NS}}}description")
    if desc_el is not None and desc_el.text:
        t = desc_el.text
        for label in ["Function", "Modifier / Size", "Affiliation"]:
            idx = t.find(f"<b>{label}: </b>")
            if idx < 0:
                idx = t.find(f"{label}: ")
            if idx >= 0:
                after = t[idx:]
                nowrap = after.find("nowrap>")
                if nowrap >= 0:
                    val_start = nowrap + 7
                    val_end = after.find("<", val_start)
                    if val_end > val_start:
                        feat[label.replace(" / ", "_")] = after[val_start:val_end].strip()

    # Geometry — Point
    pt = pm.find(f".//{{{KML_NS}}}Point/{{{KML_NS}}}coordinates")
    if pt is not None and pt.text:
        parts = pt.text.strip().split(",")
        feat["type"] = "point"
        feat["lonlat"] = [float(parts[0]), float(parts[1])]
        feat["km"] = to_km(float(parts[0]), float(parts[1]))

    # Geometry — LineString (may be inside MultiGeometry)
    ls = pm.find(f".//{{{KML_NS}}}LineString/{{{KML_NS}}}coordinates")
    if ls is not None and ls.text:
        coords = parse_coord_string(ls.text)
        feat["type"] = "line"
        feat["coords_km"] = [to_km(c[0], c[1]) for c in coords]

    # Geometry — Polygon
    poly = pm.find(f".//{{{KML_NS}}}Polygon//{{{KML_NS}}}coordinates")
    if poly is not None and poly.text:
        coords = parse_coord_string(poly.text)
        feat["type"] = "polygon"
        feat["coords_km"] = [to_km(c[0], c[1]) for c in coords]

    return feat

def parse_coord_string(text):
    """Parse KML coordinate string into list of [lon, lat]."""
    coords = []
    for line in text.strip().split("\n"):
        line = line.strip()
        if not line:
            continue
        parts = line.split(",")
        if len(parts) >= 2:
            coords.append([float(parts[0]), float(parts[1])])
    return coords


# ── Feature categorization helpers ───────────────────────────────
def simplify_line(coords, tolerance=1.0):
    """Ramer-Douglas-Peucker simplification for line coords in km."""
    if len(coords) <= 2:
        return coords
    first, last = coords[0], coords[-1]
    max_dist = 0
    max_idx = 0
    for i in range(1, len(coords) - 1):
        d = point_line_dist(coords[i], first, last)
        if d > max_dist:
            max_dist = d
            max_idx = i
    if max_dist > tolerance:
        left = simplify_line(coords[:max_idx + 1], tolerance)
        right = simplify_line(coords[max_idx:], tolerance)
        return left[:-1] + right
    return [first, last]

def point_line_dist(p, a, b):
    """Perpendicular distance from point p to line segment a-b."""
    dx, dy = b[0] - a[0], b[1] - a[1]
    if dx == 0 and dy == 0:
        return math.hypot(p[0] - a[0], p[1] - a[1])
    t = max(0, min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy)))
    proj = [a[0] + t * dx, a[1] + t * dy]
    return math.hypot(p[0] - proj[0], p[1] - proj[1])


# ── Multi-folder dedup scanner ───────────────────────────────────
def scan_kmz_folders():
    """Scan all subfolders, return dict of filename → first path found.
    Files with the same name across folders are identical CPCE exports,
    so we only need to parse each unique filename once."""
    file_map = {}  # basename → full path (first found wins)
    for subfolder in SUBFOLDERS:
        folder = os.path.join(KMZ_ROOT, subfolder)
        if not os.path.isdir(folder):
            print(f"  WARNING: {subfolder} not found, skipping")
            continue
        for fname in sorted(os.listdir(folder)):
            if fname.lower().endswith(".kmz") and fname not in file_map:
                file_map[fname] = os.path.join(folder, fname)
    return file_map


# ── Main parsing logic ───────────────────────────────────────────
def main():
    print(f"KMZ root: {KMZ_ROOT}")
    print(f"Subfolders: {SUBFOLDERS}")
    print(f"Output: {OUTPUT}")
    print(f"Projection: origin ({ORIGIN_LON}, {ORIGIN_LAT}), ref lat {REF_LAT}°")
    print(f"  1° lon = {KM_PER_DEG_LON:.2f} km, 1° lat = {KM_PER_DEG_LAT:.2f} km")
    print(f"  Map: {MAP_WIDTH} × {MAP_HEIGHT} km\n")

    # Scan all folders, deduplicate by filename
    file_map = scan_kmz_folders()
    print(f"Found {len(file_map)} unique KMZ files across {len(SUBFOLDERS)} folders:\n")
    for fname, path in sorted(file_map.items()):
        folder = os.path.basename(os.path.dirname(path))
        print(f"  [{folder}] {fname}")
    print()

    # Map filenames to logical keys
    key_to_file = {
        "enemy":             "0 - Enemy-Sit (D+10).kmz",
        "friendly":          "0 - Friendly-Sit (D+10).kmz",
        "aas":               "B.1.A - Terrain - Avenues of Approach.kmz",
        "chao_phraya":       "B.1.A - Terrain - Chao Phraya Bridges.kmz",
        "key_terrain":       "B.1.A - Terrain - Key Terrain.kmz",
        "nskk_bridges":      "B.1.A - Terrain - Nueng Sai Kao Khwa Bridges.kmz",
        "pasak_bridges":     "B.1.A - Terrain - Pa Sak Bridges.kmz",
        "event_template":    "B.1.D - IPOE - Event Template.kmz",
        "tcoa1":             "B.1.D - IPOE - TCOA 1.kmz",
        "tcoa2":             "B.1.D - IPOE - TCOA 2.kmz",
        "ops_phase0":        "C.2.0 - Ops Overlay (Phase 0).kmz",
        "ops_phase1":        "C.2.1 - Ops Overlay (Phase I).kmz",
        "ops_phase2":        "C.2.2 - Ops Overlay (Phase II).kmz",
        "ops_phase3":        "C.2.3 - Ops Overlay (Phase III).kmz",
        "paas":              "D.1 - Fire Support - PAAs.kmz",
        "tais":              "D.1 - Fire Support - TAIs.kmz",
        "nais":              "L.2 - Info Collection - NAIs.kmz",
        "nais_extra":        "L.2 - Info Collection - NAIs (1).kmz",
    }

    # Parse all KMZ files
    all_features = {}
    print("Parsing KMZ files:")
    for key, filename in key_to_file.items():
        if filename in file_map:
            all_features[key] = parse_kmz(file_map[filename])
            print(f"  {key}: {filename} → {len(all_features[key])} features")
        else:
            print(f"  {key}: {filename} — NOT FOUND")
            all_features[key] = []

    # ── Extract Phase Lines from ops overlay Phase II ─────────
    phase_lines = []
    pl_colors = {
        "PL SILVER": "#808080", "PL TAN": "#C4A882", "PL APPLE": "#3EAF5C",
        "PL BLACK": "#333333", "PL BANANA": "#F5D033", "PL BLUE": "#4A9EE8",
        "PL AQUA": "#00CED1", "PL PURPLE": "#8B5CF6", "PL BROWN": "#8B4513",
        "PL RED": "#DC2626", "PL WHITE": "#CCCCCC",
        "PL CHERRY": "#DC143C", "PL DATE": "#B8860B",
        "PL FIG": "#6B8E23", "PL GRAPE": "#7B2D8E",
    }
    pl_types = {
        "PL APPLE": "ld", "PL BANANA": "wgx", "PL DATE": "obj",
        "PL GRAPE": "loa", "PL SILVER": "rear", "PL TAN": "rear",
        "PL FIG": "loa",
    }
    for f in all_features.get("ops_phase2", []):
        name = f.get("name", "")
        if name.startswith("PL ") and f.get("type") == "line":
            coords = f.get("coords_km", [])
            simplified = simplify_line(coords, 1.5)
            pl = {
                "id": name.lower().replace(" ", "_"),
                "name": name,
                "color": pl_colors.get(name, "#888888"),
                "type": pl_types.get(name, "pl"),
                "points": simplified,
            }
            if name == "PL BLACK":
                avg_x = sum(p[0] for p in simplified) / len(simplified) if simplified else 0
                if avg_x > 150:
                    continue
            phase_lines.append(pl)
    seen_pls = set()
    deduped_pls = []
    for pl in phase_lines:
        if pl["name"] not in seen_pls:
            seen_pls.add(pl["name"])
            deduped_pls.append(pl)
    phase_lines = deduped_pls
    print(f"\n  Phase Lines: {len(phase_lines)} — {[p['name'] for p in phase_lines]}")

    # ── Extract Objectives ────────────────────────────────────
    objectives = []
    for f in all_features.get("ops_phase2", []):
        name = f.get("name", "")
        if name.startswith("OBJ ") and f.get("type") == "polygon":
            center = coords_center(f.get("coords_km", []))
            objectives.append({
                "id": name.lower().replace(" ", "_"),
                "name": name,
                "position": center,
            })
    print(f"  Objectives: {len(objectives)} — {[o['name'] for o in objectives]}")

    # ── Extract Key Terrain ───────────────────────────────────
    key_terrain = []
    kt_desc = {
        "K1": "Si Thep road network — 71 ACG LOC node",
        "K2": "Pa Sak crossing sites at Chai Badan",
        "K3": "Bridge at Pa Sak Cholasit Dam (north)",
        "K4": "Pa Sak Cholasit Dam — civilian critical infra",
        "K5": "HWY 205 pass (AA6a) — northern gateway",
        "K6": "HWY 2256 pass (AA6b) — central gateway",
        "K7": "Southern pass (AA7) — HWY 2 + rail + dam",
        "K8": "HWY 205 corridor — enemy lateral route",
        "K9": "Nakhon Ratchasima — rail/air/road hub",
    }
    for f in all_features.get("key_terrain", []):
        name = f.get("name", "")
        if name.startswith("K") and f.get("type") == "polygon":
            center = coords_center(f.get("coords_km", []))
            key_terrain.append({
                "id": name.lower(),
                "name": name,
                "position": center,
                "description": kt_desc.get(name, ""),
            })
    print(f"  Key Terrain: {len(key_terrain)} — {[k['name'] for k in key_terrain]}")

    # ── Extract Friendly Units ────────────────────────────────
    friendly_map = {
        "25ID":   {"designation": "25 ID", "echelon": "DIV", "type": "Infantry", "notes": "Main effort"},
        "2/3ID":  {"designation": "2/3 ID", "echelon": "BDE", "type": "Cover Force", "notes": "Covering force, 75%"},
        "3DIV":   {"designation": "3 DIV (GBR)", "echelon": "DIV", "type": "Armored", "notes": "British division"},
        "I CORPS":{"designation": "I Corps", "echelon": "CORPS", "type": "HQ", "notes": "Higher HQ"},
        "17 FA":  {"designation": "17 FA BDE", "echelon": "BDE", "type": "FA", "notes": "Force FA HQ"},
        "45 FA":  {"designation": "45 FA BDE", "echelon": "BDE", "type": "FA", "notes": "Counterfire HQ"},
        "420":    {"designation": "420 EN BDE", "echelon": "BDE", "type": "Engineer", "notes": "GS/DS WGX"},
        "593 CSC":{"designation": "593 ESC", "echelon": "BDE", "type": "Sustainment", "notes": "Corps sust"},
        "I MEF":  {"designation": "I MEF", "echelon": "DIV", "type": "Marine", "notes": "West flank"},
        "1MD":    {"designation": "1 MD (KAF)", "echelon": "DIV", "type": "Infantry", "notes": "Host nation"},
        "2KD":    {"designation": "2 KD (KAF)", "echelon": "DIV", "type": "Infantry", "notes": "Host nation"},
        "2/2ID":  {"designation": "2/2 ID", "echelon": "BDE", "type": "ABCT", "notes": "Not in AO"},
        "3KD":    {"designation": "3 KD (KAF)", "echelon": "DIV", "type": "Infantry", "notes": "IV Corps"},
        "4KD":    {"designation": "4 KD (KAF)", "echelon": "DIV", "type": "Infantry", "notes": "IV Corps"},
        "IV CORPS":{"designation": "IV Corps (KAF)", "echelon": "CORPS", "type": "HQ", "notes": "Eastern flank"},
        "BK":     {"designation": "Bangkok", "echelon": "CITY", "type": "City", "notes": "Capital"},
    }
    friendly_units = []
    for f in all_features.get("friendly", []):
        if f.get("type") != "point":
            continue
        ms = f.get("milsymbol", {})
        uid = ms.get("uniqueDesignation", f.get("name", ""))
        info = friendly_map.get(uid, {"designation": uid, "echelon": "UNK", "type": "Unknown", "notes": ""})
        friendly_units.append({
            "id": uid.lower().replace(" ", "_").replace("/", "_"),
            "designation": info["designation"],
            "echelon": info["echelon"],
            "unitType": info["type"],
            "position": f["km"],
            "notes": info["notes"],
            "affiliation": "friendly",
        })
    print(f"  Friendly Units: {len(friendly_units)}")

    # ── Extract Enemy Units ───────────────────────────────────
    enemy_map = {
        "715":  {"designation": "715 BCG", "echelon": "BDE", "type": "Motorized", "strength": "70%", "notes": "Hasty defense Nong Bua"},
        "7131": {"designation": "7131 BnCG", "echelon": "BN", "type": "Motorized", "strength": "80%", "notes": "Holding Si Thep"},
        "164":  {"designation": "164 BCG", "echelon": "BDE", "type": "Motorized", "strength": "85-90%", "notes": "Cover force south, AA7"},
        "165":  {"designation": "165 BCG", "echelon": "BDE", "type": "Motorized", "strength": "95%", "notes": "Cover force north, AA6"},
        "791":  {"designation": "791 FA", "echelon": "BDE", "type": "Artillery", "strength": "70%", "notes": "71 ACG arty, repositioning NE"},
        "807":  {"designation": "807 AD", "echelon": "BDE", "type": "ADA", "strength": "70%", "notes": "71 ACG ADA"},
        "774":  {"designation": "774 SOF", "echelon": "BDE", "type": "SOF", "strength": "UNK", "notes": "Recon/Intel group"},
        "163":  {"designation": "163 BCG", "echelon": "BDE", "type": "Medium", "strength": "100%", "notes": "16 ACG, assembling"},
        "166":  {"designation": "166 BCG", "echelon": "BDE", "type": "Heavy", "strength": "100%", "notes": "16 ACG, assembling"},
        "741":  {"designation": "741 BCG (ABN)", "echelon": "BDE", "type": "Airborne", "strength": "100%", "notes": "Udan Thani airhead"},
        "168":  {"designation": "168 FA", "echelon": "BDE", "type": "Artillery", "strength": "100%", "notes": "16 ACG arty"},
        "169":  {"designation": "169 AD", "echelon": "BDE", "type": "ADA", "strength": "100%", "notes": "16 ACG ADA"},
        "711":  {"designation": "711 BCG", "echelon": "BDE", "type": "Motorized", "strength": "UNK", "notes": "71 ACG"},
        "712":  {"designation": "712 BCG", "echelon": "BDE", "type": "Motorized", "strength": "UNK", "notes": "71 ACG"},
        "714":  {"designation": "714 BCG", "echelon": "BDE", "type": "Motorized", "strength": "UNK", "notes": "71 ACG"},
        "852":  {"designation": "852 AV", "echelon": "BDE", "type": "Aviation", "strength": "UNK", "notes": "71 ACG aviation"},
    }
    enemy_units = []
    for f in all_features.get("enemy", []):
        if f.get("type") != "point":
            continue
        ms = f.get("milsymbol", {})
        uid = ms.get("uniqueDesignation", f.get("name", ""))
        info = enemy_map.get(uid, {"designation": uid, "echelon": "UNK", "type": "Unknown", "strength": "UNK", "notes": ""})
        enemy_units.append({
            "id": f"eny_{uid.lower().replace(' ', '_')}",
            "designation": info["designation"],
            "echelon": info["echelon"],
            "unitType": info["type"],
            "strength": info["strength"],
            "position": f["km"],
            "notes": info["notes"],
            "affiliation": "hostile",
        })
    print(f"  Enemy Units: {len(enemy_units)}")

    # ── Extract Assembly Areas and key locations ──────────────
    assembly_areas = []
    support_areas = []
    for f in all_features.get("ops_phase2", []):
        name = f.get("name", "")
        if f.get("type") != "polygon":
            continue
        center = coords_center(f.get("coords_km", []))
        if name.startswith("AA "):
            assembly_areas.append({"id": name.lower().replace(" ", "_"), "name": name, "position": center})
        elif name.startswith("CSA ") or name.startswith("TSA ") or name.startswith("MCLB "):
            support_areas.append({"id": name.lower().replace(" ", "_"), "name": name, "position": center})
    print(f"  Assembly Areas: {len(assembly_areas)}")
    print(f"  Support Areas: {len(support_areas)}")

    # ── Extract PAAs ──────────────────────────────────────────
    fire_areas = []
    for f in all_features.get("paas", []):
        name = f.get("name", "")
        if name.startswith("PAA"):
            if f.get("type") == "polygon":
                center = coords_center(f.get("coords_km", []))
            elif f.get("type") == "point":
                center = f["km"]
            else:
                continue
            fire_areas.append({"id": name.lower().replace(" ", "_"), "name": name, "position": center})
    print(f"  Fire Areas (PAAs): {len(fire_areas)}")

    # ── Extract TAIs (FIRES unique) ───────────────────────────
    tais = []
    for f in all_features.get("tais", []):
        name = f.get("name", "")
        if name.startswith("TAI"):
            if f.get("type") == "polygon":
                center = coords_center(f.get("coords_km", []))
                simplified = simplify_line(f.get("coords_km", []), 1.0)
                tais.append({
                    "id": name.lower().replace(" ", "_"),
                    "name": name,
                    "position": center,
                    "polygon": simplified,
                })
            elif f.get("type") == "point":
                tais.append({
                    "id": name.lower().replace(" ", "_"),
                    "name": name,
                    "position": f["km"],
                    "polygon": [],
                })
    print(f"  TAIs: {len(tais)}")

    # ── Extract Avenues of Approach ───────────────────────────
    roads = []
    for f in all_features.get("aas", []):
        name = f.get("name", "")
        if f.get("type") == "line":
            coords = f.get("coords_km", [])
            simplified = simplify_line(coords, 2.0)
            roads.append({
                "id": name.lower().replace(" ", "_").replace(" - ", "_"),
                "name": name,
                "points": simplified,
            })
    print(f"  Avenues of Approach: {len(roads)}")

    # ── Extract Routes ────────────────────────────────────────
    routes = []
    for f in all_features.get("ops_phase2", []):
        name = f.get("name", "")
        if (name.startswith("ROUTE ") or name.startswith("LANE ")) and f.get("type") == "line":
            coords = f.get("coords_km", [])
            simplified = simplify_line(coords, 1.5)
            routes.append({
                "id": name.lower().replace(" ", "_"),
                "name": name,
                "points": simplified,
            })
    print(f"  Routes/Lanes: {len(routes)}")

    # ── Extract Bridges (Pa Sak + NSKK + Chao Phraya) ────────
    pasak_bridges = []
    for f in all_features.get("pasak_bridges", []):
        if f.get("type") == "point":
            pasak_bridges.append(f["km"])
    nskk_bridges = []
    for f in all_features.get("nskk_bridges", []):
        if f.get("type") == "point":
            nskk_bridges.append(f["km"])
    chao_phraya_bridges = []
    for f in all_features.get("chao_phraya", []):
        if f.get("type") == "point":
            chao_phraya_bridges.append(f["km"])
    print(f"  Pa Sak Bridges: {len(pasak_bridges)}")
    print(f"  NSKK Bridges: {len(nskk_bridges)}")
    print(f"  Chao Phraya Bridges: {len(chao_phraya_bridges)}")

    # ── Extract NAIs (merge base + extra, dedup by name) ─────
    nais = []
    seen_nais = set()
    for src_key in ["nais", "nais_extra"]:
        for f in all_features.get(src_key, []):
            name = f.get("name", "")
            if name.startswith("NAI") and name not in seen_nais:
                seen_nais.add(name)
                if f.get("type") == "polygon":
                    center = coords_center(f.get("coords_km", []))
                elif f.get("type") == "point":
                    center = f["km"]
                else:
                    continue
                nais.append({"id": name.lower().replace(" ", "_"), "name": name, "position": center})
    # Also pull NAIs from Event Template
    for f in all_features.get("event_template", []):
        name = f.get("name", "")
        if name.startswith("NAI") and name not in seen_nais:
            seen_nais.add(name)
            if f.get("type") == "polygon":
                center = coords_center(f.get("coords_km", []))
            elif f.get("type") == "point":
                center = f["km"]
            else:
                continue
            nais.append({"id": name.lower().replace(" ", "_"), "name": name, "position": center})
    print(f"  NAIs (deduplicated): {len(nais)}")

    # ── Extract Decision Points from Event Template ──────────
    decision_points = []
    seen_dps = set()
    for f in all_features.get("event_template", []):
        name = f.get("name", "")
        if name.startswith("DP ") and f.get("type") == "point" and name not in seen_dps:
            seen_dps.add(name)
            decision_points.append({
                "id": name.lower().replace(" ", "_"),
                "name": name,
                "position": f["km"],
            })
    print(f"  Decision Points: {len(decision_points)}")

    # ── Extract TCOA zones from TCOA 1 (most dangerous COA) ──
    tcoa_zones = []
    zone_names = {
        "Frontal Blocking Zone", "Frontier Defense Zone", "Depth Defense Zone",
        "AZ1", "AZ2", "AZ3", "AZ4",
    }
    for f in all_features.get("tcoa1", []):
        name = f.get("name", "")
        if name in zone_names and f.get("type") == "polygon":
            coords = f.get("coords_km", [])
            simplified = simplify_line(coords, 2.0)
            zone_type = "defense" if "Zone" in name else "attack"
            tcoa_zones.append({
                "id": f"tcoa_{name.lower().replace(' ', '_')}",
                "name": name,
                "zoneType": zone_type,
                "polygon": simplified,
            })
    print(f"  TCOA Zones: {len(tcoa_zones)}")

    # ── Extract Timeline phase lines from Event Template ─────
    timeline_pls = []
    for f in all_features.get("event_template", []):
        name = f.get("name", "")
        if re.match(r"D\+\d+", name) and f.get("type") == "line":
            coords = f.get("coords_km", [])
            simplified = simplify_line(coords, 2.0)
            timeline_pls.append({
                "id": f"tl_{name.lower().replace('+', 'plus')}",
                "name": name,
                "points": simplified,
            })
    print(f"  Timeline PLs: {len(timeline_pls)}")

    # ── Extract Boundaries ────────────────────────────────────
    boundaries = []
    for f in all_features.get("ops_phase2", []):
        name = f.get("name", "")
        if " XX " in name or " XXX " in name or " XXXX " in name:
            if f.get("type") == "line":
                coords = f.get("coords_km", [])
                simplified = simplify_line(coords, 2.0)
                echelon = "DIV" if " XX " in name else ("CORPS" if " XXX " in name else "ARMY")
                boundaries.append({
                    "id": f"bdy_{name.lower().replace(' ', '_')[:30]}",
                    "name": name,
                    "echelon": echelon,
                    "points": simplified,
                })
    print(f"  Boundaries: {len(boundaries)}")

    # ── Generate JavaScript output ────────────────────────────
    print(f"\nGenerating {OUTPUT}...")
    js = generate_js(
        phase_lines=phase_lines,
        objectives=objectives,
        key_terrain=key_terrain,
        friendly_units=friendly_units,
        enemy_units=enemy_units,
        assembly_areas=assembly_areas,
        support_areas=support_areas,
        fire_areas=fire_areas,
        tais=tais,
        roads=roads,
        routes=routes,
        pasak_bridges=pasak_bridges,
        nskk_bridges=nskk_bridges,
        chao_phraya_bridges=chao_phraya_bridges,
        nais=nais,
        decision_points=decision_points,
        tcoa_zones=tcoa_zones,
        timeline_pls=timeline_pls,
        boundaries=boundaries,
    )
    os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
    with open(OUTPUT, "w", encoding="utf-8") as f:
        f.write(js)
    print(f"  Written: {len(js):,} chars ({os.path.getsize(OUTPUT):,} bytes)")
    print("Done!")


def fmt_pts(points):
    """Format points array as JS array literal."""
    return "[" + ",".join(f"[{p[0]},{p[1]}]" for p in points) + "]"

def generate_js(**data):
    """Generate the mapData.js file content."""
    lines = []
    lines.append("// ═══════════════════════════════════════════════════════════════════")
    lines.append("// MDMP WAR ROOM — Map Data (Auto-generated from CPCE KMZ exports)")
    lines.append("// Sources: M2 KMZ + FIRES KMZ + INTEL KMZ (deduplicated)")
    lines.append("// ═══════════════════════════════════════════════════════════════════")
    lines.append("// Coordinate system: local km, origin at (100.0°E, 14.0°N)")
    lines.append(f"// Projection: equirectangular at {REF_LAT}° ref lat")
    lines.append(f"// 1° lon = {KM_PER_DEG_LON:.2f} km, 1° lat = {KM_PER_DEG_LAT:.2f} km")
    lines.append("")
    lines.append(f"export const MAP_BOUNDS = {{ width: {MAP_WIDTH}, height: {MAP_HEIGHT} }};")
    lines.append(f"export const MAP_ORIGIN = {{ lon: {ORIGIN_LON}, lat: {ORIGIN_LAT} }};")
    lines.append(f"export const KM_PER_DEG = {{ lon: {KM_PER_DEG_LON:.2f}, lat: {KM_PER_DEG_LAT:.2f} }};")
    lines.append("")

    # Phase Lines
    lines.append("export const PHASE_LINES = [")
    for pl in data["phase_lines"]:
        lines.append(f'  {{ id: "{pl["id"]}", name: "{pl["name"]}", color: "{pl["color"]}", type: "{pl["type"]}",')
        lines.append(f'    points: {fmt_pts(pl["points"])} }},')
    lines.append("];")
    lines.append("")

    # Objectives
    lines.append("export const OBJECTIVES = [")
    for o in data["objectives"]:
        lines.append(f'  {{ id: "{o["id"]}", name: "{o["name"]}", position: [{o["position"][0]},{o["position"][1]}] }},')
    lines.append("];")
    lines.append("")

    # Key Terrain
    lines.append("export const KEY_TERRAIN = [")
    for k in data["key_terrain"]:
        lines.append(f'  {{ id: "{k["id"]}", name: "{k["name"]}", position: [{k["position"][0]},{k["position"][1]}],')
        lines.append(f'    description: "{k["description"]}" }},')
    lines.append("];")
    lines.append("")

    # Friendly Units
    lines.append("export const FRIENDLY_UNITS = [")
    for u in data["friendly_units"]:
        lines.append(f'  {{ id: "{u["id"]}", designation: "{u["designation"]}", echelon: "{u["echelon"]}",')
        lines.append(f'    unitType: "{u["unitType"]}", position: [{u["position"][0]},{u["position"][1]}],')
        lines.append(f'    notes: "{u["notes"]}" }},')
    lines.append("];")
    lines.append("")

    # Enemy Units
    lines.append("export const ENEMY_UNITS = [")
    for u in data["enemy_units"]:
        lines.append(f'  {{ id: "{u["id"]}", designation: "{u["designation"]}", echelon: "{u["echelon"]}",')
        lines.append(f'    unitType: "{u["unitType"]}", strength: "{u["strength"]}",')
        lines.append(f'    position: [{u["position"][0]},{u["position"][1]}],')
        lines.append(f'    notes: "{u["notes"]}" }},')
    lines.append("];")
    lines.append("")

    # Assembly Areas
    lines.append("export const ASSEMBLY_AREAS = [")
    for a in data["assembly_areas"]:
        lines.append(f'  {{ id: "{a["id"]}", name: "{a["name"]}", position: [{a["position"][0]},{a["position"][1]}] }},')
    lines.append("];")
    lines.append("")

    # Support Areas
    lines.append("export const SUPPORT_AREAS = [")
    for s in data["support_areas"]:
        lines.append(f'  {{ id: "{s["id"]}", name: "{s["name"]}", position: [{s["position"][0]},{s["position"][1]}] }},')
    lines.append("];")
    lines.append("")

    # Fire Areas (PAAs)
    lines.append("export const FIRE_AREAS = [")
    for f in data["fire_areas"]:
        lines.append(f'  {{ id: "{f["id"]}", name: "{f["name"]}", position: [{f["position"][0]},{f["position"][1]}] }},')
    lines.append("];")
    lines.append("")

    # TAIs
    lines.append("export const TAIS = [")
    for t in data["tais"]:
        lines.append(f'  {{ id: "{t["id"]}", name: "{t["name"]}", position: [{t["position"][0]},{t["position"][1]}],')
        lines.append(f'    polygon: {fmt_pts(t["polygon"])} }},')
    lines.append("];")
    lines.append("")

    # Avenues of Approach (roads)
    lines.append("export const ROADS = [")
    for r in data["roads"]:
        lines.append(f'  {{ id: "{r["id"]}", name: "{r["name"]}",')
        lines.append(f'    points: {fmt_pts(r["points"])} }},')
    lines.append("];")
    lines.append("")

    # Routes & Lanes
    lines.append("export const ROUTES = [")
    for r in data["routes"]:
        lines.append(f'  {{ id: "{r["id"]}", name: "{r["name"]}",')
        lines.append(f'    points: {fmt_pts(r["points"])} }},')
    lines.append("];")
    lines.append("")

    # Bridges
    lines.append(f"export const PASAK_BRIDGES = {fmt_pts(data['pasak_bridges'])};")
    lines.append(f"export const NSKK_BRIDGES = {fmt_pts(data['nskk_bridges'])};")
    lines.append(f"export const CHAO_PHRAYA_BRIDGES = {fmt_pts(data['chao_phraya_bridges'])};")
    lines.append("")

    # NAIs
    lines.append("export const NAIS = [")
    for n in data["nais"]:
        lines.append(f'  {{ id: "{n["id"]}", name: "{n["name"]}", position: [{n["position"][0]},{n["position"][1]}] }},')
    lines.append("];")
    lines.append("")

    # Decision Points
    lines.append("export const DECISION_POINTS = [")
    for dp in data["decision_points"]:
        lines.append(f'  {{ id: "{dp["id"]}", name: "{dp["name"]}", position: [{dp["position"][0]},{dp["position"][1]}] }},')
    lines.append("];")
    lines.append("")

    # TCOA Zones
    lines.append("export const TCOA_ZONES = [")
    for z in data["tcoa_zones"]:
        lines.append(f'  {{ id: "{z["id"]}", name: "{z["name"]}", zoneType: "{z["zoneType"]}",')
        lines.append(f'    polygon: {fmt_pts(z["polygon"])} }},')
    lines.append("];")
    lines.append("")

    # Timeline Phase Lines
    lines.append("export const TIMELINE_PLS = [")
    for t in data["timeline_pls"]:
        lines.append(f'  {{ id: "{t["id"]}", name: "{t["name"]}",')
        lines.append(f'    points: {fmt_pts(t["points"])} }},')
    lines.append("];")
    lines.append("")

    # Boundaries
    lines.append("export const BOUNDARIES = [")
    for b in data["boundaries"]:
        lines.append(f'  {{ id: "{b["id"]}", name: "{b["name"]}", echelon: "{b["echelon"]}",')
        lines.append(f'    points: {fmt_pts(b["points"])} }},')
    lines.append("];")

    return "\n".join(lines) + "\n"


if __name__ == "__main__":
    main()

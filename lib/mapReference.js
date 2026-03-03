// ═══════════════════════════════════════════════════════════════════
// MDMP WAR ROOM — Agent Spatial Reference (injected into system prompts)
// ═══════════════════════════════════════════════════════════════════
// Sources: M2 KMZ + FIRES KMZ + INTEL KMZ (deduplicated from CPCE COP)
// This gives every AI staff agent ground truth about the operational
// geography so they can reason about positions, distances, and terrain.

export const MAP_REFERENCE = `
═══════════════════════════════════════════════════════════════════
  SPATIAL REFERENCE — 25ID AO / I CORPS OPERATIONAL AREA
  All positions from CPCE COP (D+10). Coordinates approximate lat/lon.
  Sources: M2 + FIRES + INTEL KMZ layers (deduplicated).
═══════════════════════════════════════════════════════════════════

PHASE LINES (west to east, approximate longitude):
  PL SILVER  (~100.0°E) — Corps rear boundary
  PL TAN     (~100.3°E) — Rear/support area boundary (~30 km east of SILVER)
  PL BROWN   (~100.3-100.5°E) — Short PL, south sector only
  PL APPLE   (~100.6°E) — 25ID Line of Departure (~25 km east of TAN)
  PL BLACK   (~100.8°E) — Former IHL, shifting contact line
  PL BANANA  (~101.1°E) — Pa Sak River / WGX site / 3DIV LD (~45 km east of APPLE)
  PL CHERRY  (~101.3°E) — IHL with subordinate divs (Phase I)
  PL BLUE    (~101.3°E) — Covering force line (~20 km east of BANANA)
  PL DATE    (~101.5°E) — Dong Phaya Yen passes / breakout OBJs (~40 km east of BANANA)
  PL FIG     (~101.6°E) — 25ID/3DIV LOA / 1AD FPOL line
  PL GRAPE   (~101.7°E) — Corps LOA / deep ops eastern boundary
  PL AQUA    (~101.0-101.5°E) — Angled PL crossing AO north-to-south
  PL WHITE   (~100.9-101.8°E) — Intermediate PL, arcs across full AO
  PL RED     (~100.5-102.0°E) — Furthest east, deep operations reference

SECTORS (north to south):
  2/3ID sector: North of 25ID, oriented on AA5. Cover force mission.
  25ID sector: Main effort. Three BCTs.
    Northern: AA6a (HWY 205) — OBJ BRONCOS (~101.38°E, 15.34°N)
    Central: AA6b (HWY 2256) — OBJ SEAHAWKS (~101.40°E, 15.10°N)
  3DIV (GBR) sector: South of 25ID. AA7 (HWY 2) — OBJ JAGUARS (~101.52°E, 14.81°N)

FRIENDLY POSITIONS (D+10):
  25 ID HQ:       ~100.57°E, 15.22°N (west of PL APPLE, main effort)
  2/3 ID:         ~100.82°E, 15.32°N (covering force, 75%, on AA4/AA5)
  3 DIV (GBR):    ~100.82°E, 14.79°N (south sector, near PL BANANA)
  I Corps HQ:     ~100.32°E, 14.66°N (well west, near PL TAN)
  I MEF:          ~100.13°E, 15.26°N (west flank)
  17 FA BDE:      ~100.69°E, 14.99°N (PAA 171/172 area, force FA)
  45 FA BDE:      ~100.42°E, 14.56°N (PAA 451/452 area, counterfire)
  420 EN BDE:     ~100.34°E, 14.84°N (staging for WGX support)
  593 ESC:        ~100.40°E, 14.77°N (corps sustainment)
  2/2 ID:         ~100.24°E, 14.91°N (AA RED RAIDERS area)
  1 MD (KAF):     ~100.18°E, 15.58°N (host nation, north flank)
  2 KD (KAF):     ~99.63°E, 15.69°N (host nation, far west)
  3 KD (KAF):     ~101.70°E, 15.29°N (IV Corps sector)
  4 KD (KAF):     ~102.83°E, 14.93°N (IV Corps sector)

ENEMY POSITIONS (D+10):
  71 ACG (covering force — in contact):
    165 BCG (95%):  ~101.08°E, 15.48°N — AA6 north, crossing PL BLUE
    164 BCG (85%):  ~101.34°E, 14.65°N — AA7 south, as far south as Pak Chong
    715 BCG (70%):  ~100.60°E, 15.87°N — Hasty defense at Nong Bua (north)
    711 BCG:        ~99.75°E, 16.05°N — 71 ACG, deep north
    712 BCG:        ~100.12°E, 16.05°N — 71 ACG, deep north
    714 BCG:        ~100.24°E, 16.87°N — 71 ACG, far north
    791 FA (70%):   ~100.39°E, 16.03°N — 71 ACG arty, repositioning NE
    807 AD (70%):   ~99.92°E, 16.33°N — 71 ACG ADA, well north
    852 AV:         ~100.29°E, 16.77°N — 71 ACG aviation, far north
    774 SOF:        ~100.34°E, 15.43°N — Small teams south of PL BLUE
  16 ACG (main body — assembling, NOT yet in AO):
    163 BCG (100%): ~102.79°E, 17.41°N — Far east, assembling
    166 BCG (100%): ~102.88°E, 17.27°N — Far east, heavy brigade
    741 BCG (ABN):  ~102.59°E, 17.46°N — Udan Thani airhead
    168 FA (100%):  ~102.68°E, 18.13°N — 16 ACG arty, far NE
    169 AD (100%):  ~104.11°E, 17.56°N — 16 ACG ADA, very far east

TCOA DEFENSE ZONES (Intel estimate — where enemy will fight):
  Frontal Blocking Zone: PL APPLE to PL BANANA (~100.9-101.3°E)
    — Enemy delays 25ID advance to WGX site, buys time for 16 ACG
  Frontier Defense Zone: PL BANANA to PL DATE (~101.3-101.6°E)
    — Defense in depth between river and mountains
  Depth Defense Zone: East of PL DATE (~101.6-102.1°E)
    — 16 ACG main defense in Dong Phaya Yen passes and beyond
  Attack Zones (AZ 1-4): Along NSKK canal/PL APPLE area (~100.9-101.1°E)
    — Expected enemy counterattack corridors against 25ID attack positions

16 ACG TIMELINE (estimated arrival — Intel assessment):
  D+16: Lead elements reach ~PL FIG/GRAPE area (101.6-101.9°E)
  D+17-18: Main body fills Frontier/Depth defense zones (101.2-101.6°E)
  D+19-20: Full defense established PL CHERRY to PL DATE (101.2-101.5°E)
  D+21-22: Defense extends to PL BANANA (101.1°E), WGX site contested
  CRITICAL: 25ID must secure WGX and passes BEFORE D+19 or face 16 ACG at full strength

KEY TERRAIN:
  K1: Si Thep road network (~101.07°E, 15.45°N) — 71 ACG LOC node
  K2: Pa Sak crossing at Chai Badan (~101.18°E, 15.22°N) — AA6a to AA5a
  K3: Pa Sak Cholasit Dam bridge (~101.09°E, 15.07°N) — AA6b to AA5b
  K4: Pa Sak Cholasit Dam (~101.08°E, 14.85°N) — civilian critical infra
  K5: HWY 205 pass/AA6a (~101.38°E, 15.34°N) — northern Dong Phaya Yen gateway
  K6: HWY 2256 pass/AA6b (~101.40°E, 15.10°N) — central gateway
  K7: Southern pass/AA7 (~101.51°E, 14.81°N) — HWY 2 + rail + Lam Takhong
  K8: HWY 205 corridor (~102.03°E, 15.22°N) — enemy lateral repositioning
  K9: Nakhon Ratchasima (~102.11°E, 14.98°N) — 3rd largest city, rail/air/road hub

MAJOR OBSTACLES:
  Pa Sak River: N-S along PL BANANA. 50-100m wide, 5-20m deep. 15 bridges. KEY WGX SITE.
  NSKK Canal: ~40m wide, 5-10m deep. 43 bridges. West of PL APPLE.
  Chao Phraya River: Major river further west. 17 bridges in AO.
  Pa Sak Cholasit Dam: 4,860m wide, 36.5m high. Between K3 and K4.
  Dong Phaya Yen Mountains: N-S east of PL DATE. 170km range, max 1,167m elev.
    Three passes: AA6a (K5, HWY 205), AA6b (K6, HWY 2256), AA7 (K7, HWY 2)
  Lam Takhong Dam: On AA7 between Pak Chong and Sikhio. 251m long, 40.3m high.

DECISION POINTS:
  DP 1: ~100.87°E, 15.15°N — Near NSKK canal, commit to WGX approach
  DP 2: ~101.01°E, 15.22°N — Between PL APPLE and PL BANANA, fix/bypass 165 BCG
  DP 3: ~101.23°E, 14.75°N — South sector, commit 3DIV on AA7
  DP 4: ~101.33°E, 15.19°N — At PL BANANA (WGX site), execute river crossing
  DP 5: ~101.16°E, 15.46°N — North sector, clear K1/Si Thep
  DP 6: ~101.46°E, 15.04°N — East of PL DATE, exploit through pass

FIRE SUPPORT (PAAs and TAIs):
  17 FA BDE positions: PAA 171 (~100.69°E,14.99°N), PAA 172 (~100.81°E,14.96°N),
    PAA 173 (~101.10°E,14.77°N), PAA 174 (~101.44°E,14.82°N)
  45 FA BDE positions: PAA 451 (~100.53°E,15.22°N), PAA 452 (~100.63°E,15.09°N),
    PAA 453 (~100.99°E,15.28°N), PAA 454 (~100.89°E,15.10°N),
    PAA 455 (~101.16°E,15.34°N), PAA 456 (~101.06°E,15.15°N),
    PAA 457 (~101.32°E,15.30°N), PAA 458 (~101.35°E,15.16°N)
  TAIs: 24 Target Areas of Interest (TAI 05-28) positioned along enemy approach routes:
    Northern corridor (AA4-AA6): TAI 05-13, 14-16 (~100.2-101.1°E, 15.9-16.5°N)
    Central corridor (AA5-AA6): TAI 17-20, 24-25 (~100.5-101.1°E, 15.6-15.9°N)
    Southern/WGX area: TAI 21-23, 26-28 (~100.5-101.2°E, 15.2-15.7°N)

NAIS (Named Areas of Interest — 38 total):
  Close-in NAIs (141-164): Between PL APPLE and PL DATE, monitoring enemy positions
  Deep NAIs (619-634): East of PL DATE into Dong Phaya Yen and beyond, tracking 16 ACG

ASSEMBLY AREAS:
  AA EAGLES:      ~100.64°E, 14.95°N (25ID maneuver)
  AA HUSKIES:     ~100.77°E, 14.99°N (25ID maneuver)
  AA HUSKIES 2:   ~101.14°E, 14.98°N (forward assembly)
  AA PEGASUS:     ~100.66°E, 14.87°N (25ID maneuver)
  AA RED RAIDERS: ~100.24°E, 14.91°N (2/2 ID location)
  AA LEATHERNECK: ~100.30°E, 15.27°N (I MEF area)
  AA MINERS:      ~100.83°E, 14.18°N (rear area)

SUPPORT AREAS:
  CSA COURAGE:    ~100.37°E, 14.79°N (forward combat sust)
  CSA COURAGE 2:  ~100.87°E, 14.84°N (forward combat sust)
  CSA HONOR:      ~100.71°E, 14.35°N (south sector sust)
  MCLB BUTLER:    ~99.93°E, 14.71°N (Marine logistics base)
  MCLB PULLER:    ~100.15°E, 15.28°N (Marine logistics base)
  TSA LIBERTY:    ~99.90°E, 13.30°N (theater sust, Bangkok area)
  TSA LIGHTNING:  ~101.37°E, 13.55°N (theater sust, south)

MANEUVER ROUTES & LANES (through objectives):
  ROUTE COLORADO: PL BANANA → OBJ BRONCOS via AA6a (northern corridor)
  ROUTE WASHINGTON: PL BANANA → OBJ SEAHAWKS via AA6b (central corridor)
  ROUTE FLORIDA: PL BANANA → OBJ JAGUARS via AA7 (southern corridor)
  LANE DENVER: Through-pass lane at OBJ BRONCOS (north)
  LANE SEATTLE: Through-pass lane at OBJ SEAHAWKS (center)
  LANE JACKSONVILLE: Through-pass lane at OBJ JAGUARS (south)

DISTANCES (approximate):
  PL APPLE to PL BANANA (WGX): ~45 km
  PL BANANA to PL DATE (passes): ~40 km
  PL APPLE to PL DATE (total advance): ~85 km
  25ID HQ to Pa Sak River: ~50 km
  OBJ BRONCOS to OBJ SEAHAWKS: ~30 km (north to south)
  OBJ SEAHAWKS to OBJ JAGUARS: ~35 km (north to south)

SPATIAL RULES:
  - All Phase I attack positions are WEST of PL APPLE
  - The WET GAP CROSSING occurs at PL BANANA (~45 km east of LD)
  - 165 BCG is between PL BLUE and PL DATE, primarily on AA6
  - 164 BCG is between PL BANANA and PL DATE, primarily on AA7
  - Dong Phaya Yen Mountains are EAST of PL DATE (the passes are AT PL DATE)
  - 16 ACG main body (163, 166 BCGs) is far EAST beyond mountains — arrives D+16-22
  - All 25ID maneuver occurs between PL APPLE (west) and PL FIG (east)
  - 3DIV (GBR) operates SOUTH of 25ID, between PL BANANA and PL DATE
  - I Corps TAC co-locates with 25ID MCP to control WGX and FPOL
  - 17 FA BDE supports 25ID attack (PAAs 171-174, east of PL APPLE)
  - 45 FA BDE provides counterfire/corps shaping (PAAs 451-458, bracketing AO)
  - TAIs are positioned to interdict 71 ACG withdrawal and 16 ACG approach routes
  - MSR KANSAS is the primary supply route through the 25ID sector
  - ROUTE COLORADO/WASHINGTON/FLORIDA are the attack routes to objectives
  - Decision Point 4 (WGX) is the most critical — commit to river crossing
`;

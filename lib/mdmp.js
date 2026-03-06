// ═══════════════════════════════════════════════════════════════════════════════
// MDMP WAR ROOM — 25th Infantry Division Staff — W500 SCENARIO HARDCODED
// ═══════════════════════════════════════════════════════════════════════════════

import { MAP_REFERENCE } from "./mapReference";

export const UNIT_CONTEXT = `UNIT: 25th Infantry Division ("Tropic Lightning") — OPERATION PACIFIC PUGILIST
HEADQUARTERS: Currently deployed, Khorathidin (Southeast Asia)
HIGHER HQ: I Corps (LTG RODRIGUEZ), Sixth Army, CJTF-SEA
MOTTO: "Ready to Strike, Anywhere, Anytime"

W500 TASK ORGANIZATION (OPORD 12030-04):
- 1st Brigade, 2nd Infantry Division (SBCT) (1/2ID) — ATTACHED
  - 1-23 IN, 2-3 IN, 5-20 IN, 296 BSB, MI CO
- 2nd Brigade, 1st Armored Division (ABCT) (2/1AD) — ATTACHED
  - 1-6 IN, 1-35 AR, 1-37 AR, 1-1 CAV, 47 BSB
- 3rd Brigade, 25th Infantry Division (MBCT) (3/25ID)
  - 1-28 IN, 2-27 IN, 2-35 IN, MFRC 3/25ID
- Combat Aviation Brigade, 25th ID (25 CAB)
  - 1-25 AVN (ATK), 2-25 AVN (AHB), 3-25 AVN (AHB-M), D/25 AVN (UAS), 209 BSB
- DIVARTY, 25th ID
  - 2-11 FA (HIMARS 3x9), 3-7 FA (COMP)(DS to 3/25ID), 1-37 FA (155T)(ATT)(DS to 1/2ID), 4-27 FA (155SP)(ATT)(DS to 2/1AD), 6-56 ADA (DivAD)(ATT), D BTRY DIVARTY (C-sUAS)
- 158th Maneuver Enhancement Brigade (158 MEB)
  - 1-158 IN, 253 EN BN, 850 MP BN, 184 ORD BN (EOD), 476 CML BN, 365 SIG CO
- Division Sustainment Brigade, 25th ID (25 DSB)
  - 524 SPT BN (DSSB), 325 LSB, 365 SPT BN (CSSB)(ATT), 569 QM CO (FF), 18 TRANS DET (MCT)
- 65 EN BN (CEC-I), 40 EN BN (ATT from 1AD EN)(CEC-A)
- 25ID Signal BN (+ B/1AD SIG, SC/1-2ID ATT)
- 125 MI BN (IEW)
- 411 CA BN (OPCON), 16 PSYOP BN (OPCON)
- 3 ASOS (USAF)(ATTACHED)
- 385 Field Hospital (32 bed)(DS to 25ID)

DIVISION CAPABILITIES:
- Stryker combined arms maneuver (1/2ID SBCT — ATTACHED)
- Armored combined arms maneuver (2/1AD ABCT — ATTACHED)
- Medium infantry operations (3/25ID MBCT — organic)
- Attack/assault aviation (25 CAB: AH-64, UH-60, CH-47, UAS)
- HIMARS fires (2-11 FA: 3x9 launchers), cannon artillery (3x155mm BNs)
- Division air defense (6-56 ADA DivAD + D BTRY C-sUAS)
- Engineer mobility/countermobility (65 EN, 40 EN, 253 EN via 158 MEB)
- ISR capability (125 MI BN, D/25 AVN UAS, BCT organic scouts)

CRITICAL NOTE: 25ID must plan for a WET GAP CROSSING of the Pa Sak River (50-100m wide, 5-20m deep). This is the division's most complex and dangerous operation. 420 EN BDE (Corps) is in DS to 25ID for Phase II gap crossing.

All staff products must reference the 25th ID W500 task organization, capabilities, and limitations. Tailor recommendations to what 25 ID can realistically accomplish with its organic and attached assets.`;

// ═══════════════════════════════════════════════════════════════════════════════
// W500 SCENARIO PACKAGE — HARDCODED AND VERIFIED
// ═══════════════════════════════════════════════════════════════════════════════
export const SCENARIO_PACKAGE = `
======================================================================
  W500 SCENARIO PACKAGE — I CORPS / 25TH INFANTRY DIVISION
  OPORD 12030-04 (PACIFIC PUGILIST)
  CLASSIFICATION: UNCLASSIFIED // FOUO — TRAINING
  AS OF: 110700MAR2030 (D+10) — Time Zone: Gulf (UTC+7)
======================================================================

1. SITUATION

  a. Strategic Context
  - OPERATION PACIFIC PUGILIST is a corps-level offensive operation within CJTF-SEA's defense of Khorathidin (fictional Thailand analog)
  - Olvana (fictional China analog) and Bagansait (fictional Myanmar analog) have invaded Khorathidin
  - CJTF-SEA > Sixth Army > I Corps > 25th Infantry Division
  - I Corps Commander: LTG RODRIGUEZ (call sign: COURAGE 06)
  - I Corps Main CP: CSA COURAGE | TAC CP: Co-located with 25ID Main | RACP: CSA HONOR
  - Succession of Command: Courage 66G, Courage 66F, Lightning 06, Ironside 06

  b. What Changed (D+9 to D+10)
  - Olvana opened a SECOND FRONT through Sungzon (fictional Laos) to Udan Thani
  - Sungzon declared ally to Olvana, opened rail lines and airspace
  - 741 BCG (ABN) air-assaulted and seized Udan Thani International Airport (48QTE 649237) and railheads
  - 16 ACG elements arriving via rail from KUNMING/HANOI through Sungzon
  - I Corps must now reorient from defensive (north-facing) to offensive (east-facing) operations
  - IV Corps (KAF) falling back; cannot stop 16 ACG alone

  c. Enemy Forces — 71 ACG (Northern Threat, in corps AO/AOI)
  - 715 BCG (70% strength): Hasty defense at NONG BUA (47PPT 715555). Not expected to resume offensive ops for 72hrs. Moving out of corps AO as I Corps turns east.
  - 7131 BnCG (advance group from 713 BCG, 80%): Holding SI THEP. Securing LOCs. Receiving aviation support from 852 AV.
  - 164 BCG (85-90%): Crossed Pa Sak River, moving south on AA5a (HWY 2243). Operating as far south as PAK CHONG. Center of mass vic THANANPHON (47PQS 565238). Will likely establish positional defense on AA7.
  - 165 BCG (95%): Crossing PL BLUE. One CA-Bn on HWY 21 through SI THEP, second CA-Bn on HWY 2275. Consolidating vic CHAI BADAN. Will likely establish positional defense on AA6.
  - 791 FA (71 ACG arty, 70%): Repositioning NE to provide reinforcing fires to cover groups. Observed vic NONG BUA (47PPT 715555).
  - 807 AD (71 ACG ADA, 70%): Repositioning to support 71 ACG fires and 16 ACG cover force movement.
  - 812 EC&D (71 ACG engineers): Attritted by I Corps.
  - 774 SOF (71 ACG Recon & Intel Group): Operating in rear area; template 1671 SOF BN operating south of PL BLUE in small teams (PLT-size or less) to disrupt I Corps offensive.

  d. Enemy Forces — 16 ACG (Eastern Threat, arriving)
  COMPOSITION: Three combined arms brigades + enablers:
  - 741 BCG (ABN) — Already at Udan Thani, controlling airhead/railhead
  - 163 BCG (Medium) — Assembling, will be Frontier Defense Group #1 on AA6
  - 166 BCG (Heavy) — Assembling, will be Frontier Defense Group #2 on AA7
  - 168 FA (Artillery Group)
  - 160 AV (Air Firepower Strike Group)
  - 169 AD (Air Defense Group)
  - 167 SOF (Special Operations)
  - 486 EN (Engineer & Chemical Defense Brigade, 3x EN BNs)
  - 501 SSB (Rear Area Support Group)
  ADDITIONALLY ACTIVATED: 161 BCG and 162 BCG — assembling in garrisons
  ASSESSMENT: 16 ACG covering force (164 + 165 BCGs) will delay I Corps while main body establishes defense at Dong Phaya Yen Mountains. Six-day window to destroy cover groups before 16 ACG main body arrives.

  e. Enemy Capabilities
  - Combined arms ops over extended distances; independent brigade operations
  - National GPS denial capability (2-3 hour windows)
  - Increased UAS across formations (visualization, targeting, limited resupply)
  - 70/30 split conventional vs PGM/special munitions
  - 164 BCG CDR: COL Haoyu Chen — aggressive, innovative, published author on combined arms ops
  - Vulnerable to fuel shortages in 48hrs and CL V depletion in 72hrs (last resupply at PL AQUA)

  f. Enemy Threat COAs

  TCOA 1 (MLCOA): MOBILE DEFENSE OF DONG PHAYA YEN MOUNTAINS
  - Objective: Retain NAKHON RATCHASIMA
  - 165 BCG establishes positional defense along Pa Sak River NORTH of Pa Sak Reservoir
  - 164 BCG establishes positional defense along Pa Sak River SOUTH of Pa Sak Reservoir
  - Cover groups delay until D+17 for 16 ACG main body to establish frontier defense zone
  - 163 BCG advances on AA6 to hasty defense east of PL DATE
  - 166 BCG advances on AA7 to hasty defense east of PL DATE
  - 168 FA rocket assets suppress enemy arty and strike C2/supply nodes
  - 160 AV disrupts in Annihilation Zones (AZ) 1-4
  - 162 BCG (Depth Defense) follows 166 BCG on AA7, defends along HWY 205 NET D+19
  - 161 BCG (Combat Reserve) completes railhead ops in UDAN THANI NET D+19
  - 501 SSB supports from KHON KAEN with forward nodes in NAKHON RATCHASIMA

  TCOA 2 (MDCOA): PENETRATION WEST OF PA SAK RIVER
  - Objective: Defeat I Corps west of Pa Sak River
  - 165 BCG defends west of Pa Sak on AA6a/AA6b; 164 BCG defends east on AA7
  - D+19: Both transition to offense, begin reconnaissance toward PL APPLE/BANANA
  - 774 SOF infiltrates south to PL TAN to identify Sixth Army positions
  - D+20: 168 FA + 791 FA + 852 AV conduct depth firepower attacks
  - D+21: 165 BCG attacks AA6a/AA6b to penetrate vic NONG MUANG/KHOK SAMRONG; 164 BCG (main effort) attacks AA7 to penetrate vic SARABURI
  - D+22: 166 BCG (Depth Attack Group) follows 164 BCG through penetration point, attacks east to defeat I Corps vic PHAK HAI
  - 163 BCG (Thrust Maneuver Group) prepares for pursuit on AA6
  - 162 BCG secures LOCs in Garrison Zone

  g. Friendly Forces
  - I MEF (west): Defending PL BLUE. Heavy contact. Believes 71 ACG will not attempt penetration. Expects to retain positions 72hrs.
  - IV Corps (KAF) (east): Building combat power but cannot defeat 16 ACG. Expected to delay south into Sankamphaeng Mountains.
  - 2/3ID (covering force): In contact 24hrs, 75% strength. 3-15 IN overrun (no comms). DP1 for rearward passage not yet decided. Currently south of PL BLUE on AA4/AA5.
  - 25ID: Defending in sector. Limited contact with recon/intel groups. OR >93%.
  - 3DIV (GBR): Defending in sector. Limited contact. OR >93%.
  - 1AD: In RSOI south of PL TAN. Will close AA MINERS NLT D+14.
  - 593 ESC: Maintaining 3 DOS in CSA COURAGE and CSA HONOR.

  h. Terrain (OAKOC Summary)
  AO spans Lopburi, Saraburi, Nakhon-Ratchasima provinces. ~22,500 km2 (size of Vermont).
  Four geographic areas west to east:
  1. Noi-to-Chao Phraya floodplain: Elev <35m, agricultural, well-developed roads, significant population
  2. Chao Phraya-to-Pa Sak arid highlands: Elev 50-100m, ridgelines to 500m, compartmentalized, sparse population
  3. Pa Sak-to-Dong Phaya Yen valley: Elev 100-300m, more vegetation, fertile
  4. Khorat Plateau (east of mountains): Elev 250m avg. Nakhon-Ratchasima (pop 2.6M)

  MAJOR OBSTACLES:
  - Chao Phraya River: 200-1200m wide, 5-20m deep. 17 bridges in AO.
  - Nueng Sai Kao Khwa Canal: ~40m wide, 5-10m deep. 43 bridges in AO.
  - Pa Sak River (PL BANANA): 50-100m wide, 5-20m deep. 14 bridges in AO. KEY WET GAP CROSSING.
  - Pa Sak Cholasit Dam: 4,860m wide, 36.5m high. Controls Bangkok flooding. Civilian critical infrastructure.
  - Dong Phaya Yen Mountains: 170km range, max elev 1,167m. Three passes (AA6a, AA6b, AA7).
  - Lam Takhong Dam: On AA7 between Pak Chong and Sikhio. 251m long, 40.3m high.

  AVENUES OF APPROACH:
  - AA5: BDE-size. HWY 21 south through Pa Sak Valley. 4-lane divided. 71 ACG GLOC.
  - AA5a: 3x BN-size cross-corridors (HWY 2219, 2340, 2321) from AA5 west to Nong Muang.
  - AA5b: BDE-size. HWY 205 east-west from Pa Sak Dam to Ban Mi. 4-lane divided.
  - AA6: BDE-size. HWY 201 from Sungzon through Chum Phae. 4-lane divided. 165 BCG approach.
  - AA6a: BDE-size. HWY 205 through northern Dong Phaya Yen pass. 2-lane. Rail parallel.
  - AA6b: BDE-size. HWY 2256 through central Dong Phaya Yen pass. 2-lane.
  - AA7: BDE-size. HWY 2 (Mittraphap Road) from Udan Thani. 4-lane divided + elevated expressway. Rail parallel. 164 BCG approach.

  KEY TERRAIN:
  - K1: Si Thep road network — 71 ACG LOC node
  - K2: Pa Sak River crossing sites at Chai Badan — connect AA6a to AA5a
  - K3: Bridge at Pa Sak Cholasit Dam (north end) — connects AA6b to AA5b
  - K4: Pa Sak Cholasit Dam — civilian critical infrastructure (Bangkok flood control)
  - K5: HWY 205 pass (AA6a) — northern gateway to Khorat Plateau, elevation advantage to defender
  - K6: HWY 2256 pass (AA6b) — central gateway, elevation advantage to defender
  - K7: Southern pass (AA7) — complex: HWY 2 + rail + Lam Takhong Reservoir; advantage to defender
  - K8: HWY 205 corridor between HWY 201 and HWY 2 — enemy lateral repositioning route
  - K9: Nakhon-Ratchasima — 3rd largest city, rail/air/road hub for enemy

  OBSERVATION & FIELDS OF FIRE: Valley floors: visibility ~750m (tree breaks). Hills: mixed forest, useful for dismounts. Exception: Dong Phaya Yen Mountains offer LOS to 6,000m west. Elevation changes may mask radar/signals.
  COVER & CONCEALMENT: Vegetation conceals but doesn't provide cover. Urban areas: 2-3 story cinder block, cover vs small arms only. Streams/canals best for dismounted cover.

  i. Weather (D+11 to D+13)
  - Subtropical, hot/humid. Temps: Lo 68-79F, Hi 83-93F. Heat index up to 105F.
  - Precipitation: 0.00 in forecast. Dry season (March). Only ~2 rain days in March.
  - Winds: 5-15 kts, gusts to 20 kts. Low cross-winds.
  - Visibility: 7 SM, no ceiling. Partly cloudy to clear.
  - Moon illumination: 82% (D+11) declining to 61% (D+13). Dark periods 2-4hrs.
  - BMNT ~0613, SR ~0705, SS ~1919, EENT ~2012
  - Aviation: No weather restrictions. DA max +5421ft.
  - Heat casualties: HIGH RISK during daytime operations (heat index 100-105F).
  - Solar weather: Minimal (solar cycle 25 near minimum). Low risk to GPS/SATCOM/HF.

2. HIGHER HQ ORDER (I CORPS OPORD 12030-04)

  a. I Corps Mission
  On D+13, I Corps attacks in zone to seize the passes in the Dong Phaya Yen Mountains IOT gain access to the Khorat Plateau to enable Sixth Army to transition to Joint Phase III - Dominate.

  b. Commander's Intent (LTG RODRIGUEZ)
  PURPOSE: Gain access to the Khorat Plateau to enable Sixth Army to transition to Joint Phase III - Dominate.
  KEY TASKS:
  1. Conduct a wet gap crossing of the Pa Sak River
  2. Prevent the 16 ACG from controlling the passes on the Dong Phaya Yen Mountain Ranges
  3. Reposition fires, aviation, and collection assets to mass between PL DATE and PL GRAPE
  4. Reposition corps support area to support three divisions conducting offensive operations east of PL BANANA
  ENDSTATE: I Corps destroys 16 ACG cover groups and defends with one division forward along PL GRAPE and two back in the passes along PL DATE. Sixth Army is prepared to transition to Joint Phase III - Dominate. The host nation assumes responsibility for civil security south of PL TAN.

  c. Concept of Operations (3 Phases)

  PHASE I — Occupation of Attack Positions (D+10 to D+12)
  - 2/3ID (main effort): Repositions to cover north of PL BLUE, oriented on AA5
  - 25ID: Repositions NE to attack positions west of PL APPLE
  - 3DIV (GBR): Detaches 3/1ID (AUS) as corps reserve to AA HUSKIES; remainder occupies attack positions along PL BANANA
  - 1AD: Continues RSOI, begins moving to AA MINERS
  - Corps deep ops: PL BLACK to PL BLUE, shifts to PL BLUE-AQUA (north) and PL BANANA-CHERRY (east)
  - 17 FA: PAA 171/172, disrupting enemy. 45 FA: PAA 451/452, counterfire HQ.
  - Rear ops: PL SILVER to PL TAN

  PHASE II — Advance to Dong Phaya Yen Mountains (D+13 to D+17) — 25ID IS MAIN EFFORT
  - 2/3ID: Continues to cover on AA5, protect corps northern flank
  - 25ID (MAIN EFFORT): Attacks in zone PL APPLE to PL BANANA. Conducts WET GAP CROSSING of Pa Sak River. Destroys 165 BCG cover group. Continues attack PL BANANA to PL DATE. Seizes OBJ BRONCOS and OBJ SEAHAWKS. Establishes LANES DENVER and SEATTLE for 1AD FPOL.
  - 3DIV (GBR): Attacks in zone PL BANANA to PL DATE when 25ID approaches PL BANANA (DP1). Engages 164 BCG. Seizes OBJ JAGUARS. Establishes LANE JACKSONVILLE.
  - 1AD: Completes RSOI ~D+16, moves toward start points of ROUTES COLORADO, WASHINGTON, FLORIDA.
  - 45 FA: Follows 25ID, occupies PAAs 453-458.
  - Deep ops shift: PL CHERRY to PL GRAPE, then PL DATE to PL GRAPE, then PL FIG to PL GRAPE.

  PHASE III — Interdiction of 163 and 166 BCGs (D+18 to D+20)
  - 1AD: FPOL through 25ID and 3DIV (GBR). Movement to contact to interdict 163 and 166 BCGs on AA6/AA7.
  - 25ID: Conducts FPOL of 1AD. Establishes LANES DENVER and SEATTLE. BPT attach company TCF to 130 MEB. Provide D-25 AVN TACON to 201 E-MIB.
  - 3DIV (GBR): Conducts FPOL of 1AD.
  - 3/1ID (AUS): Follows 1AD, occupies AA HUSKIES 2 as corps reserve.
  - Rear boundary shifts from PL TAN to PL APPLE (I MEF assumes).

  d. Tasks to 25ID (Verbatim from OPORD)
  1. Occupy attack positions west of PL APPLE (Phase I)
  2. Conduct wet gap crossing of the PA SAK RIVER (PL BANANA) (Phase II)
  3. Seize OBJ BRONCOS and OBJ SEAHAWKS to pass 1AD forward (Phase II)
  4. Establish LANES DENVER and SEATTLE (Phase III)
  5. Conduct FPOL of 1AD (Phase III)
  6. Be prepared to attach a company-size TCF to 130 MEB (Phase III)
  7. Provide D-25 AV TACON to 201 E-MIB (Phase III)

  e. Adjacent Unit Missions
  - I MEF: BLOCK enemy on AA2, AA3, AA4. Prevent interference with I Corps transition.
  - IV Corps (KAF): DELAY on AA6/AA7 from PL BLUE to PL BLACK. BLOCK on HWY 304 south of PAK THONG CHAI.
  - 2/3ID: COVER corps left flank north of PL BLUE oriented on AA5 (Phase I-III).
  - 3DIV (GBR): Attack in zone PL BANANA to PL DATE. Seize OBJ JAGUARS.
  - 1AD: RSOI, then FPOL and MOC to interdict 163/166 BCGs.
  - 3/1ID (AUS): Corps reserve at AA HUSKIES. Planning priority: reinforce 25ID (Phase I-II), reinforce 1AD (Phase III).

3. CONTROL MEASURES

  PHASE LINES (west to east):
  - PL SILVER: Corps rear boundary. HWY 305 to HWY 346 to HWY 340.
  - PL TAN: Rear area / support area boundary
  - PL APPLE: 25ID Line of Departure (LD). Attack positions west of here.
  - PL BLACK: Former IHL (now shifting)
  - PL BANANA: Pa Sak River. 3DIV (GBR) LD. WET GAP CROSSING site for 25ID.
  - PL BLUE: Covering force line. 2/3ID reorients north of here.
  - PL AQUA: Northern LOA. Sixth Army FSCL.
  - PL PURPLE: 715 BCG culmination line
  - PL CHERRY: IHL with subordinate divisions (Phase I), on-order PL DATE
  - PL DATE: Dong Phaya Yen Mountain passes. Breakout objectives here. On-order IHL.
  - PL FIG: LOA for 25ID and 3DIV (GBR). 1AD FPOL line.
  - PL GRAPE: Corps LOA. Deep ops eastern boundary.

  OBJECTIVES:
  - OBJ BRONCOS: 25ID breakout objective on PL DATE (northern pass area, AA6a)
  - OBJ SEAHAWKS: 25ID breakout objective on PL DATE (central/southern pass area)
  - OBJ JAGUARS: 3DIV (GBR) breakout objective on PL DATE (southern, AA7)

  LANES (for 1AD FPOL):
  - LANE DENVER: Established by 25ID (northern)
  - LANE SEATTLE: Established by 25ID (southern)
  - LANE JACKSONVILLE: Established by 3DIV (GBR)

  ROUTES:
  - MSR KANSAS: Main supply route
  - MSR OHIO: Supply route (Phase I)
  - MSR TEXAS: Supply route (Phase I)
  - ASR GEORGIA: Alternate supply route
  - ASR WASHINGTON: Alternate supply route (Phase III)
  - ROUTE COLORADO, WASHINGTON, FLORIDA: 1AD FPOL routes

  ASSEMBLY AREAS:
  - AA HUSKIES: 3/1ID (AUS) corps reserve location
  - AA MINERS: 1AD RSOI/staging area
  - AA HUSKIES 2: Corps reserve follow-on location (Phase III)

  FSCMs:
  - Sixth Army FSCL: PL AQUA
  - I Corps CFL / common sensor boundary: PL BANANA (Phase I), on-order PL CHERRY (Phase II), on-order PL FIG (Phase II), on-order PL BLUE (Phase III)
  - NFAs over religious, government, industrial, and critical infrastructure sites

  FIRE SUPPORT:
  - 17 FA BDE (Force FA HQ): PAA 171/172, follows 3DIV to PAA 173/174 (Phase II)
  - 45 FA BDE (Counterfire HQ): PAA 451/452 (Phase I), follows 25ID to PAAs 453-458 (Phase II)
  - 420 EN BDE: GS to I Corps (Phase I/III), DS to 25ID for wet gap crossing (Phase II)

4. CCIRs

  PIRs:
  1. Where will 165 BCG establish their Frontal Blocking Zone?
  2. Where will 164 BCG establish their Frontal Blocking Zone?
  3. Where will 165 BCG establish their Frontier Defense Zone?
  4. Where will 164 BCG establish their Frontier Defense Zone?
  5. Where will 165 BCG position their Artillery Group?
  6. Where will 164 BCG position their Artillery Group?
  7. Will the 166 BCG arrive at PL BLUE earlier than D+17?
  8. Will the 16 ACG transition to the defense east of PL DATE?

  FFIRs:
  1. 1AD completes RSOI
  2. 25ID has seized far-side objectives
  3. 45 FA occupies PAAs 455 & 456
  4. 17 FA occupies PAA 173
  5. 25ID is prepared to begin its attack to seize OBJs BRONCOS and SEAHAWKS
  6. 3DIV (GBR) is prepared to begin its attack to seize OBJ JAGUARS
  7. 1AD FPOL complete

  EEFIs:
  1. Location of wet gap crossing
  2. Locations of support areas, FARPs, flight paths, and FLEs
  3. Sustainment convoy schedules and routes
  4. Location of counter fire and ADA assets
  5. Arrival, positioning, and commitment of 1AD

5. FIRES (from Annex D)
  - Enemy fire support: 791 FA (71 ACG) repositioning NE. 168 FA (16 ACG) arriving with main body.
  - Enemy has demonstrated GPS denial for 2-3hr windows.
  - Intervening crests up to 500m between PL APPLE and PL BANANA may reduce cannon range.
  - Elevation change at Khorat Plateau affects engagement from Pa Sak Valley.
  - I Corps priority of fires: Phase I: counterfire and disruption. Phase II: 25ID wet gap crossing and advance. Phase III: 1AD interdiction.
  - DIVARTY 25ID has 2-11 FA (HIMARS 3x9), 3-7 FA (DS 3/25), 1-37 FA (DS 1/2ID), 4-27 FA (DS 2/1AD)

6. ENGINEER (from Annex G)
  - Priority of mobility Phase I: MSR KANSAS, MSR OHIO, ASR GEORGIA
  - Priority of mobility Phase II: WET GAP CROSSING in 25ID AO, then MSR KANSAS, ASR GEORGIA
  - Priority of mobility Phase III: FPOL routes COLORADO, WASHINGTON, FLORIDA
  - 420 EN BDE: GS to I Corps (Phase I/III), DS to 25ID wet gap crossing (Phase II)
  - Enemy engineer capabilities: 486 EN brigade (3x EN BNs) in 16 ACG, plus organic EN COs in each BCG
  - Engineer HVTs: Fast Mech Bridge Hz 21/24, Scissor Bridge GQL-111, Mine Dispenser GBL-131
  - Mines: US forces only allowed anti-vehicular self-destruct mines. Bridge destruction requires I Corps CDR approval.
  - Engineer work line: PL TAN, on-order PL BANANA
  - 25ID task: Determine MLC of routes from PL APPLE to PL FIG (All Phases)

7. SIGNAL (from Annex H)
  - Corps TAC co-locates with 25ID MCP to control WGX and FPOL
  - LOS limitations in 25ID and 3DIV AOs; few positions offer observation of OBJ BRONCOS/SEAHAWKS AND reach-back to Corps support area
  - Khorat Plateau gives enemy advantage for jamming/geolocating comms
  - PACE: P-StarShield (PLEO), A-5G Cell Network, C-MILSATCOM, E-SC TACSAT
  - Priority of signal: Phase I: 2/3ID, 17FA, 25ID, 45FA | Phase II: 25ID, 3DIV, 45FA, 17FA | Phase III: 1AD, 25ID, 3DIV
  - Enemy EW: DZ-9001 (CP DF), R-330zh Zhitel (GPS/cellular jamming), JN-1105A (HF/VHF jamming), DCK-006-EW (UAS EW/ECM)
  - 25ID MCP must have LOS to PAAs 187/188 and AA HUSKIES with max one relay site.
  - Use of cellular comms prohibited unless in Corps scheme of signal support.

8. PROTECTION (from Annex E)
  - Threats: 71 ACG recon/intel groups in rear area; insider threats via HN sympathizers; UXO; industrial chemical release
  - No indication Olvana has offensive CBRN capability
  - MOPP Level: ZERO south of PL TAN; MOPP1 from PL TAN to forward boundary
  - Fratricide: US vehicles display IR marker panels; non-US display VS-17 panels (pink side up)
  - Template: 1671 SOF BN operating south of PL BLUE in small teams to disrupt I Corps offensive ops

9. SUSTAINMENT (from Annex F)
  - 593 ESC maintains 3 DOS in CSA COURAGE and CSA HONOR
  - CSA COURAGE 2 established in Phase II
  - 364 ESC manages RSOI. 1AD closes AA MINERS NLT D+14.
  - 25 DSB: 524 SPT BN (DSSB), 325 LSB, 365 SPT BN (CSSB)(ATT)
  - Rear boundary shifts from PL TAN to PL APPLE in Phase III (I MEF assumes)
  - MSRs: KANSAS (main), OHIO, TEXAS (Phase I). ASR: GEORGIA (Phase I-II), WASHINGTON (Phase III).
  - 385 Field Hospital (32 bed) DS to 25ID; 313 Hospital Center at corps level.
  - Class IV (construction/fortification) is command-controlled due to theater shortages.
  - 593 CSC pushes CL IV/V on request. Routine CCL requests 72hrs in advance; emergency 24hrs.

10. INFORMATION OPERATIONS
  - IO objective: Convince 16 ACG CDR that I Corps COG is on AA7 and his best opportunity is attacking on AA6
  - Primary theme: Coalition forces committed to protection of Nakhon-Ratchasima
  - Purpose: Deceive enemy about location of corps main effort (1AD)

11. TIMELINE
  DTG                  | Event                              | Location
  110700MAR2030 (D+10) | OPORD published, I Corps OPORD Brief | CSA COURAGE
  120700MAR2030 (D+11) | NLT Division OPORD briefs           | Various
  121300MAR2030 (D+11) | I Corps Combined Arms Rehearsal      | CSA COURAGE
  122000MAR2030 (D+11) | I Corps Fires Rehearsal              | CSA COURAGE
  121400MAR2030 (D+11) | I Corps Communications Rehearsal     | CSA COURAGE
  121900MAR2030 (D+11) | Division Rehearsals complete          | Various
  101400MAR2030 (D+9)  | 2/3ID LD                             | PL BLUE
  130700MAR2030 (D+12) | 25ID LD                              | PL APPLE
  140700MAR2030 (D+13) | 3DIV (GBR) LD                        | PL BANANA
  170700MAR2030 (D+16) | 1AD LD                               | AA MINERS
  180700MAR2030 (D+17) | Breakout Objectives Seized           | PL DATE
  190700MAR2030 (D+18) | 1AD FPOL                             | PL FIG

12. I CORPS INTSUM #10 (D+9 Summary)
  - 71 ACG fixing I Corps along PL BLUE to enable 16 ACG flanking in east
  - 16 ACG conducts mobile defense to retain Khorat Plateau and isolate Bangkok
  - 16 ACG covering forces conduct offensive cover force ops to delay I Corps vic PL DATE
  - I Corps has 6-day window to destroy cover groups before 16 ACG main body arrives
  - Lead elements 166 BCG reach Dong Phaya Yen Mountains NET D+18

13. AIRFIELDS IN AO
  Name                      | Runway    | Surface | Grid              | Capable
  Don Mueang                | 4000x60m  | Asphalt | 47PPR 732382      | C-5
  Khok Kathiam              | 2200x45m  | Asphalt | 47PPS 789451      | C-5
  Nakhon Ratchasima         | 2000x45m  | Asphalt | 48PTB 110547      | C-17
  Lapangan Terbang Khorat   | 3600x50m  | Asphalt | 48PSB 860531      | C-5
  Phetchabun                | 2200x45m  | Asphalt | 47QQU 341448      | C-17

14. WARNORD 02 KEY UPDATES (D+9)
  - Proposed Mission: On D+13, I Corps attacks in zone to seize the passes in the Dong Phaya Yen Mountains IOT interdict the 16 ACG
  - IHL shifts from PL BLACK to PL BLUE between 2/3ID and 25ID
  - 25ID: BPT reposition NE to attack positions west of PL APPLE; on-order attack in zone PL APPLE (LD) to PL FIG (LOA)
  - 3DIV (GBR): BPT reorient east, occupy attack positions along PL BANANA; on-order attack in zone PL BANANA (LD) to PL FIG (LOA)
  - Assumption: Lead elements 166 BCG reach Dong Phaya Yen Mountains NET D+18
======================================================================
  END SCENARIO PACKAGE
======================================================================
`;

// ═══════════════════════════════════════════════════════════════════════════════
// DOCTRINE PACKAGE — CONDENSED KEY PUBLICATIONS FOR MDMP AT DIVISION LEVEL
// ═══════════════════════════════════════════════════════════════════════════════
export const DOCTRINE_PACKAGE = `
======================================================================
  DOCTRINE REFERENCE PACKAGE — 25TH INFANTRY DIVISION MDMP
  KEY PUBLICATIONS FOR DIVISION-LEVEL PLANNING AND OPERATIONS
  Condensed from FM 5-0, FM 6-0, FM 3-0, FM 3-94, WfF pubs,
  ATP 3-09.12, ATP 3-09.90, ATP 3-09.23, ATP 3-09.42,
  FM 90-13/ATP 3-90.4 (Gap Crossing), ATP 3-34.22/FM 3-34 (Engineer)
======================================================================

1. MILITARY DECISION-MAKING PROCESS (FM 5-0, Nov 2024)

  The MDMP is an iterative planning methodology to understand the situation
  and mission, develop a course of action, and produce an OPLAN/OPORD.

  SEVEN STEPS:
  Step 1 — Receipt of Mission: Alert staff, issue initial timeline (1/3-2/3 rule),
    issue WARNO #1 (para 1-5 format), begin staff estimates, update IPB.
  Step 2 — Mission Analysis: 17 sub-tasks including analyze higher HQ order,
    conduct IPB (ATP 2-01.3), determine specified/implied/essential tasks,
    review available assets, determine constraints, identify critical facts
    and assumptions, conduct risk assessment, determine CCIRs (PIRs, FFIRs,
    EEFIs), develop initial ISR plan, update operational timeline, develop
    restated mission, present MA brief, CDR issues guidance/intent, issue WARNO #2.
  Step 3 — COA Development: Generate options (min 2-3 viable COAs). Each COA
    must be suitable, feasible, acceptable, distinguishable, complete.
    COA statement = WHO + WHAT + WHEN + WHERE + WHY + HOW.
    COA sketch = maneuver graphic with unit symbols, objectives, phase lines,
    coordinating measures, fire support, main/supporting efforts.
  Step 4 — COA Analysis (Wargame): Synchronize each COA against threat COAs.
    Methods: belt, avenue-in-depth, box. Record results in sync matrix.
    Wargame using action-reaction-counteraction for each critical event.
    Assess: decision points, branches, sequels, high-risk areas, FSCMs,
    movement times, logistics requirements, C2 nodes.
  Step 5 — COA Comparison: Use evaluation criteria (weighted by CDR guidance).
    Decision matrix with quantitative scoring. Staff recommends best COA.
  Step 6 — COA Approval: CDR selects/modifies COA. Issues final planning
    guidance, refined intent, risk tolerance, and CCIR updates.
  Step 7 — Orders Production: Publish OPORD/OPLAN IAW FM 6-0 App C/D format.
    5-paragraph order: Situation, Mission, Execution, Sustainment, C2.
    Annexes A-Z. Conduct transition brief. Backbrief subordinates.

  TIME-CONSTRAINED MDMP: CDR drives abbreviated timeline. May combine steps,
  limit COAs to 2, use abbreviated wargame, or delegate to staff sections.

2. COMMANDER & STAFF ORGANIZATION (FM 6-0, May 2022)

  STAFF ROLES AND RESPONSIBILITIES:
  - CofS/XO: Manages staff, synchronizes WfFs, runs MDMP, enforces timelines
  - G2: Intelligence preparation, threat analysis, collection management
  - G3: Operations, scheme of maneuver, synchronization, task organization
  - G4: Sustainment planning, CSS overlay, logistics estimate
  - G5: Plans (future operations), develops branches and sequels
  - G6: Signal/C4I, communications architecture, PACE plans
  - FSCOORD: Fire support, targeting (D3A: Decide-Detect-Deliver-Assess)
  - Division Engineer: M/CM/S priorities, mobility analysis, route classification
  - G9/CMIO: Civil-military operations, information operations, PSYOP integration
  - DFSCOORD: Air and missile defense, airspace coordination
  - SJA: Legal review, ROE compliance, law of armed conflict
  - Surgeon: Medical estimate, casualty estimates, MEDEVAC planning

  RUNNING ESTIMATES (FM 6-0 Ch 9):
  Each staff section maintains a continuously updated running estimate:
  1. Situation and considerations (how WfF affects operations)
  2. Mission (restated from WfF perspective)
  3. COA analysis (from WfF perspective)
  4. Comparison and recommendation
  5. Risks and mitigation measures

  ORDERS FORMAT (FM 6-0 App C):
  OPORD 5-paragraph format:
    1. SITUATION: a. Area of Interest, b. Area of Operations, c. Enemy Forces,
       d. Friendly Forces, e. Interagency/IO/Multinational, f. Civil, g. Attachments
    2. MISSION: Who, What, When, Where, Why (restated mission)
    3. EXECUTION: a. CDR's Intent, b. Concept of Ops, c. Scheme of Movement/Maneuver,
       d. Scheme of Fires, e. Tasks to Subordinate Units, f. Coordinating Instructions
    4. SUSTAINMENT: a. Logistics, b. Personnel, c. Health System Support
    5. COMMAND AND SIGNAL: a. Command, b. Control, c. Signal

3. OPERATIONS (FM 3-0, Mar 2025; ADP 3-0)

  MULTI-DOMAIN OPERATIONS (MDO):
  Army operations conducted across all domains (land, air, maritime, space, cyber,
  information, electromagnetic spectrum) to create and exploit windows of advantage.
  Three tenets: calibrated force posture, multi-domain formations, convergence.

  OPERATIONAL FRAMEWORK:
  - Deep: Shape conditions, interdict, disrupt enemy C2/logistics/reserves
  - Close: Decisive operations, destruction of enemy main body
  - Rear: Sustain operations, protect LOCs, maintain freedom of action
  - Support: Consolidation, population security, stability operations

  FORMS OF MANEUVER (FM 3-90):
  - Envelopment (single/double): Main attack avoids enemy front, strikes flank/rear
  - Turning movement: Force enemy to abandon position without direct assault
  - Frontal attack: Strike enemy across wide front (least preferred)
  - Penetration: Concentrate combat power at narrow point to breach enemy defense
  - Infiltration: Pass through enemy positions undetected

  DIVISION IN LARGE-SCALE COMBAT (FM 3-94):
  Division is the Army's primary tactical warfighting HQ for LSCO. Typically commands
  2-5 BCTs plus enablers. Division:
  - Synchronizes WfFs across close/deep/rear operations
  - Manages battlespace 50-100km deep, 40-80km wide
  - Conducts river crossings, passage of lines, relief in place at scale
  - Integrates joint fires (CAS, AI, SEAD/DEAD, JDAM, HIMARS, ATACMS)
  - Commands organic: DIVARTY (FA), CAB (AVN), DSB (sustainment), MEB (enablers)

  WARFIGHTING FUNCTIONS:
  1. Command & Control: Exercise authority through mission command philosophy
  2. Movement & Maneuver: Move forces to positions of advantage, close with enemy
  3. Intelligence: Understand threat, terrain, weather, civil considerations (METT-TC)
  4. Fires: Create lethal/nonlethal effects — surface fires, joint fires, IO
  5. Sustainment: Provide logistics, personnel services, health service support
  6. Protection: Preserve force through active/passive measures (AD, CBRN, EOD, OPSEC)

4. INTELLIGENCE DOCTRINE (FM 2-0, Oct 2023; ATP 2-01.3)

  IPB PROCESS (ATP 2-01.3):
  Step 1: Define the operational environment (AO, AOI, areas of influence)
  Step 2: Describe environmental effects (terrain, weather, civil, infrastructure)
    OAKOC: Observation/Fields of Fire, Avenues of Approach, Key/Decisive Terrain,
    Obstacles, Cover/Concealment. Modified combined obstacle overlay (MCOO).
  Step 3: Evaluate the threat (doctrine, composition, disposition, capabilities,
    recent activities, peculiarities — DCSDCAP). Threat order of battle.
    Doctrinal templates, high-value targets (HVTs).
  Step 4: Determine threat COAs (most likely, most dangerous, other).
    SITEMP overlay. Event template. Decision support template input.

  COLLECTION MANAGEMENT:
  PIR-driven. Develop indicators for each PIR. Match indicators to collectors.
  ISR synchronization matrix. Assets: HUMINT, SIGINT, GEOINT, MASINT, OSINT.

5. FIRES DOCTRINE (FM 3-09, Aug 2024; FM 3-60)

  TARGETING PROCESS — D3A:
  DECIDE: Develop HPTL (High-Payoff Target List) from HVT nominations.
    Attack guidance matrix (AGM): target, when to engage, how to engage,
    effects desired, delivery system. TSS: Target Selection Standards.
  DETECT: ISR plan to find targets. Cue sensors to HPTs. Trigger criteria.
  DELIVER: Execute fires. Joint/organic: HIMARS, 155mm (SP/towed), mortars,
    AH-64 Apache, CAS (F-35, A-10, F-15E), naval fires if available.
  ASSESS: BDA — did we achieve desired effects? Re-attack if necessary.

  FIRE SUPPORT COORDINATION MEASURES (FSCMs):
  Permissive: CFL (Coordinated Fire Line), FSCL (Fire Support Coordination Line)
  Restrictive: RFL (Restrictive Fire Line), NFA (No-Fire Area), RFA (Restrictive Fire Area)
  ACA (Airspace Coordination Area), KILL BOX, ROZ (Restricted Operations Zone)

  DIVISION FIRES: DIVARTY provides technical fire direction and reinforcing fires.
  FA BNs in DS to each BCT. HIMARS for deep fires. Joint fires via ASOC/TACP.

6. SUSTAINMENT DOCTRINE (FM 4-0, Aug 2024; ATP 4-90)

  LOGISTICS ESTIMATE FRAMEWORK:
  Classes of supply: I (rations), II (clothing/equipment), III (POL), IV (construction),
  V (ammunition), VI (personal demand), VII (major end items), VIII (medical), IX (repair parts)

  SUSTAINMENT PLANNING CONSIDERATIONS:
  - Consumption rates by unit type (BCT = ~300K gal fuel/day for ABCT in LSCO)
  - Main Supply Routes (MSR) / Alternate Supply Routes (ASR) planning
  - Distribution: throughput vs stockage. Push packages for initial ops, pull for sustained.
  - Maintenance: BDAR forward, DS maintenance at BSA, GS at DSA
  - Medical: Role 1 (BAS), Role 2 (BSA aid station), Role 3 (CSH/field hospital)
  - Personnel: replacement, casualty reporting, EPW processing

  25 DSB CAPABILITIES:
  - 524 SPT BN (DSSB): div-level distribution
  - 325 LSB: logistics support
  - 365 SPT BN (CSSB)(ATT): additional CSS capacity
  - 569 QM CO (FF): fuel distribution
  - Each BCT BSB provides organic CSS at BCT level

7. PROTECTION DOCTRINE (ADP 3-37, Jan 2024; FM 3-01)

  PROTECTION PRIORITIES: Personnel, physical assets, information.
  Protection WfF tasks: Air/missile defense, CBRN, EOD, force health protection,
  fratricide avoidance, OPSEC, personnel recovery, physical security.

  AIR & MISSILE DEFENSE: 6-56 ADA (DivAD)(ATT) provides SHORAD/C-sUAS.
  D BTRY DIVARTY (C-sUAS) counters Group 1-3 UAS. Patriot at corps/theater.

  ENGINEER (FM 3-34):
  M/CM/S priorities set by CDR at each phase:
  - Mobility: Route clearance, breach lanes, bridging (wet gap crossing)
  - Countermobility: Obstacles, minefields, point/tactical obstacles
  - Survivability: Fighting positions, protective positions, hardening
  25 ID Engineers: 65 EN BN (CEC-I), 40 EN BN (CEC-A)(ATT), 253 EN BN (under 158 MEB)

8. SIGNAL/MISSION COMMAND (FM 6-02, Sep 2019; ADP 6-0)

  MISSION COMMAND PHILOSOPHY: Exercise C2 through mutual trust, shared understanding,
  mission orders, CDR's intent, disciplined initiative, risk acceptance, mission-type orders.

  PACE PLAN: Primary, Alternate, Contingency, Emergency for each C2 node.
  - Primary: JTAC/SATCOM, MSE
  - Alternate: HF radio, FM retrans
  - Contingency: Courier, LNO
  - Emergency: Messenger, visual signals

  25 ID SIGNAL: 25ID Signal BN (+ B/1AD SIG, SC/1-2ID ATT)
  - Provides division-level network transport and service
  - MSE nodes at Main CP, TAC CP, and each BSA

9. JOINT PLANNING (JP 5-0, Jul 2025)

  JOINT PLANNING PROCESS (JPP): 7 steps that parallel MDMP:
  1. Planning Initiation, 2. Mission Analysis, 3. COA Development,
  4. COA Analysis & Wargaming, 5. COA Comparison, 6. COA Approval,
  7. Plan/Order Development.

  JOINT FIRES INTEGRATION:
  - JFACC controls theater air via ATO (Air Tasking Order)
  - Division accesses CAS via ASOC (Air Support Operations Center)
  - 3 ASOS (USAF)(ATT) provides TACPs to BCTs
  - Kill chain: sensor-to-shooter timelines, dynamic targeting
  - SEAD/DEAD coordination with JFACC for enemy IADS suppression

  JOINT TARGETING: Joint Targeting Cycle (find-fix-track-target-engage-assess)
  Division nominates targets to corps/JTF for joint engagement.
  Restricted Target List (RTL), Joint Integrated Prioritized Target List (JIPTL).

10. RISK MANAGEMENT (ATP 5-19)

  5-STEP RISK MANAGEMENT PROCESS:
  1. Identify hazards (tactical, operational, strategic)
  2. Assess hazards (probability × severity = risk level)
  3. Develop controls and make risk decisions
  4. Implement controls
  5. Supervise and evaluate

  RISK LEVELS: Extremely High, High, Medium, Low
  RISK DECISION AUTHORITY: CDR accepts risk commensurate with echelon.
  Division CDR accepts HIGH risk. Corps CDR accepts EXTREMELY HIGH risk.
  Residual risk after controls must be within CDR's risk tolerance.

11. COUNTERFIRE OPERATIONS (ATP 3-09.12, Oct 2021)

  COUNTERFIRE DEFINITION: Operations to destroy or neutralize enemy indirect
  fire systems. Two types: PROACTIVE (targeting before enemy fires) and
  REACTIVE (responding to detected enemy fires).

  COUNTERFIRE PLANNING IN MDMP:
  - Step 1 (Receipt): Identify enemy indirect fire threat (composition, range fans,
    likely PAAs). Identify organic/supporting counterfire assets. Establish counterfire HQ.
  - Step 2 (Mission Analysis): IPB for enemy FA — likely positions, range fans,
    positioning areas. Identify counterfire sensors (WLRs: AN/TPQ-53, AN/TPQ-50).
    Determine counterfire delivery assets. Develop initial counterfire overlay.
  - Step 3 (COA Dev): Include counterfire scheme in each COA. Assign WLR zones.
    Plan counterfire delivery asset PAAs. Quick-fire channels for responsive fires.
  - Step 4 (Wargame): War-game counterfire at each critical event. Anticipate
    enemy indirect fire triggers. Plan sensor cueing and handoff.
  - Step 7 (Orders): Counterfire annex to fire support plan. WLR positioning plan.
    Counterfire execution matrix. Quick-fire channel SOPs.

  COUNTERFIRE HQ: CDR designates DIVARTY, FAB, or separate FA BN as counterfire HQ.
  DIVARTY can serve if task-organized with firing units, sensors, TPS, and TAP.
  Counterfire HQ responsibilities: sensor-to-shooter link management, WLR coordination,
  counterfire delivery asset C2, target processing, and BDA.

  WEAPONS LOCATING RADAR (WLR) EMPLOYMENT:
  - AN/TPQ-53: Mobile radar, locates mortar/arty/rocket. 1600-mil sector (long range)
    or 6400-mil (360° but reduced range). Link digitally to firing units for quick-fire.
  - AN/TPQ-50 (LCMR): Lightweight, 360° detection, shorter range. Ideal for forward
    positioning to detect mortars. Can be repositioned rapidly.
  - Positioning: General areas designated by operations/counterfire officer. Radar section
    chief selects final site using RPAS. Requires LOS to threat area. Separation distance
    between WLRs in 6400-mil mode. Survivability: engineer support for berms/hardening.
  - CUEING: WLRs can be cued by other sensors (SIGINT, UAS, HUMINT) to focus search.

  QUICK-FIRE CHANNELS: Direct digital/voice link from WLR to dedicated firing unit.
  Bypasses normal fire mission processing for fastest counterfire response.
  Pre-authorized engagement criteria. DIVARTY/FAB approves QF channel establishment.

  COUNTERFIRE AGAINST 25ID THREAT (165 BCG):
  - 1658 FA: 27x PLZ-52 (155mm SP, 39km range), 9x SR-4 (MLRS, 70-130km range)
  - Priority: SR-4 launchers (greatest threat to BSAs/DSA/MSRs)
  - WLR coverage: TPQ-53 in 1600-mil mode oriented on likely enemy PAAs
  - Delivery: HIMARS (2-11 FA) for deep counterfire, 155mm BNs for close counterfire
  - Integration with corps counterfire (45 FA BDE following 25ID, PAAs 453-458)

12. DIVARTY OPERATIONS (ATP 3-09.90, Jul 2017)

  DIVARTY ROLE: Division Artillery provides the division commander technical and
  tactical fires expertise. DIVARTY is the division's force field artillery (FFA) HQ.

  DIVARTY CORE FUNCTIONS:
  - Plan, coordinate, and synchronize division fires across all subordinate BCTs
  - Serve as counterfire HQ for the division
  - Provide reinforcing fires from non-BCT organic FA assets (HIMARS, additional FA BNs)
  - Coordinate SEAD in support of aviation operations (25 CAB)
  - Integrate joint fires through coordination with ASOC and 3 ASOS TACPs
  - Manage fire support coordination measures (FSCMs) at division level
  - Technical fire direction: met data, survey, firing tables, safety

  DIVARTY ORGANIZATION (25ID for PACIFIC PUGILIST):
  - 2-11 FA (HIMARS): 3 batteries x 9 launchers = 27 HIMARS launchers (deep fires, counterfire)
  - 3-7 FA (COMPOSITE): DS to 3/25ID MBCT (155mm towed + rocket platoon)
  - 1-37 FA (155T)(ATT): DS to 1/2ID SBCT (155mm towed, attached from corps)
  - 4-27 FA (155SP)(ATT): DS to 2/1AD ABCT (155mm self-propelled, attached from 1AD)
  - 6-56 ADA (DivAD)(ATT): SHORAD/C-sUAS division air defense
  - D BTRY DIVARTY: Counter-small UAS battery

  FIRE SUPPORT RELATIONSHIPS:
  - DS (Direct Support): Answers directly to supported BCT CDR. Provides LNO/FIST.
    DS FA BN CDR is BCT FSCOORD.
  - R (Reinforcing): Augments fires of another FA unit. Answers to reinforced unit for fires.
  - GSR (General Support-Reinforcing): Provides fires for force as whole, reinforces another FA.
  - GS (General Support): Provides fires for force as whole. Answers to DIVARTY/Force FA HQ.
  - HIMARS (2-11 FA) typically GS or GSR — provides deep fires, counterfire, and shaping.

  FIRE SUPPORT EXECUTION PRINCIPLES (AWIFM-N):
  A — Adequate fires for committed forces
  W — Weight the main effort / decisive operation
  I — Immediately available fires for CDR to influence the battle
  F — Facilitate future operations
  M — Maximum feasible centralized control
  N — Never place artillery in reserve

  DIVARTY IN OFFENSIVE OPERATIONS:
  - Pre-assault fires: Suppress/neutralize enemy in objective area
  - Preparation fires: Scheduled fires before H-Hour to degrade enemy
  - Smoke: Obscure friendly movement, screen crossing sites (WGX critical)
  - Suppression: Continuous fires on enemy positions during assault
  - Counterfire: Protect maneuver force from enemy indirect fire
  - Deep fires: Interdict enemy reserves, C2 nodes, logistics with HIMARS
  - SEAD: Suppress enemy ADA to enable 25 CAB operations

  DIVARTY LIAISON: FSEs at division main/TAC, LNOs to each BCT, ASOC coordination.
  DIVARTY fires cell processes targets from all BCTs and division collection assets.

13. FA CANNON BATTALION OPERATIONS (ATP 3-09.23, Jul 2016)

  FA CANNON BN ROLE: Provides close support fires to BCT. DS FA BN is primary
  indirect fire asset for BCT CDR. Executes: suppression, neutralization, destruction,
  smoke/illumination, counterfire, and SEAD.

  ORGANIZATION (typical 155mm BN):
  - HHB: BN CDR (FSCOORD for BCT), S-staff, FDC, TAP (WLRs), Survey
  - 3x Firing Batteries (6x howitzers each = 18 guns/BN)
  - 155mm SP (M109A7 Paladin) or 155mm Towed (M777A2)

  FIRE MISSION PROCESSING:
  Observer → Fire Request → FDC (tactical fire direction) → Firing Battery (technical fire direction)
  Digital: AFATDS processes call-for-fire, computes firing data, transmits to guns
  Manual: Voice CFF processed by FDC computer, manual safety calculations
  Priority of fires set by supported CDR. On-call targets pre-planned.

  POSITIONING (PAA):
  - Survivability: DISPLACE after 3-4 fire missions (or as SOP). Alternate/supplementary positions.
  - Range: Must cover BCT zone. 155mm SP (M109A7): 22km standard, 30km RAP.
    155mm Towed (M777A2): 22km standard, 30km RAP, 40km Excalibur.
  - Survey: Position Area Survey (PAS) for accuracy. IPADS or GPS-degraded survey methods.
  - Survivability moves: Primary → Alternate → Supplementary PAAs pre-planned.

  MASSED FIRES: Multiple batteries/battalions engage single target simultaneously.
  Requires coordination by DIVARTY. Used for preparation fires, counterfire.
  25ID can mass up to 54x 155mm howitzers (3 BNs x 18 guns) plus 27 HIMARS launchers.

  SMOKE OPERATIONS (critical for WGX):
  - 155mm WP (M825A1): Bursting smoke, immediate screening
  - 155mm HC smoke (M116): Base-ejection, sustained screening (3-5 min per round)
  - Smoke planning: Wind direction, duration needed, rounds required, resupply
  - WGX smoke screen: Continuous smoke on enemy observation posts and direct fire positions
    during crossing. Requires pre-positioned smoke ammunition at firing battery PAAs.

  COUNTERFIRE: FA BN responds to WLR acquisition through quick-fire channel.
  Counterfire drill: WLR acquires → TPS processes → FDC receives → Battery fires.
  Target-to-trigger time goal: <3 minutes from detection to rounds on target.

  155mm BN APPLICATION TO PACIFIC PUGILIST:
  - 3-7 FA (DS 3/25ID): Supports medium infantry through passes and to river
  - 1-37 FA (DS 1/2ID): Supports Stryker brigade in zone
  - 4-27 FA (DS 2/1AD): Supports armored brigade, displaces with M109A7 SP mobility
  - Coordination: Lateral boundaries define FA responsibility. BCT FSCMs nest within div.
  - CSR: Controlled Supply Rate set by I Corps. Critical to manage 155mm consumption.

14. FIRE SUPPORT FOR THE BCT (ATP 3-09.42, Mar 2016)

  BCT FSE ORGANIZATION:
  - BCT FSCOORD: DS FA BN CDR (dual-hatted)
  - BCT FSO: Plans/coordinates fires for BCT CDR
  - Fires Cell: AFATDS operators, targeting NCO, weather team
  - Battalion FISTs: Fire support teams at each maneuver BN
  - Company FSOs/FOs: Forward observers at company level (JFOs when JTAC-qualified)

  BCT FIRE SUPPORT PLANNING:
  - Essential Fire Support Tasks (EFSTs): CDR-driven, priority fires that must be accomplished.
  - Target List Worksheet (TLWS): Planned targets with grid, attitude, method, effect.
  - Fire Support Execution Matrix (FSEM): Targets synchronized to maneuver scheme by phase.
  - Target Synchronization Matrix (TSM): Ties targets to triggers, delivery systems, BDA plan.

  BCT TARGETING (D3A at BCT level):
  DECIDE: HPTL derived from enemy HVTs. Attack guidance: suppress, neutralize, destroy.
  DETECT: BCT ISR plan (scouts, UAS, WLRs, SIGINT) tied to HPTs and NAIs.
  DELIVER: Organic (FA BN, mortars), division (HIMARS), joint (CAS via TACP).
  ASSESS: BDA methods and criteria. Re-attack decision.

  STRIKE/COUNTERFIRE AT BCT:
  - BCT can conduct counterfire within zone using organic FA BN
  - TPQ-53 positioned to cover enemy indirect fire threat axes
  - Quick-fire channel from TPQ-53 to FA battery for reactive counterfire
  - Coordinate with DIVARTY for division-level counterfire assets

  CAS INTEGRATION:
  - 3 ASOS TACPs organic to BCTs via attachment from 3 ASOS (USAF)
  - JTAC qualified personnel control CAS aircraft
  - CAS requests: preplanned (ATO cycle, 72hr) or immediate (ASOC)
  - Type 1/2/3 controls based on JTAC visual/sensor contact
  - 8 CAS sorties allocated to 25ID — BCTs submit prioritized requests to div FSE

15. COMBINED ARMS WET GAP CROSSING (FM 90-13 / ATP 3-90.4)

  *** THIS IS THE MOST COMPLEX AND DANGEROUS OPERATION IN PACIFIC PUGILIST ***

  WET GAP CROSSING (WGX) DEFINITION: Movement of a force across a water obstacle
  in the presence of the enemy. The Pa Sak River (50-100m wide, 5-20m deep) requires
  a deliberate crossing with corps engineer support (420 EN BDE in DS).

  TYPES OF RIVER CROSSINGS:
  - Hasty: Conducted from march formation, minimal preparation, speed over security.
    Only feasible against weak/unprepared enemy. Unlikely for Pa Sak against 165 BCG.
  - Deliberate: Planned with full engineer support, preparation, and rehearsal.
    Required when enemy defends far bank. THIS IS WHAT 25ID WILL EXECUTE.

  CROSSING FUNDAMENTALS:
  1. Surprise — crossing before enemy can react (deception plan critical)
  2. Leadership — CDR forward, clear task organization and C2
  3. Concentration — mass combat power at crossing site(s)
  4. Flexibility — alternate sites, branches if primary site fails
  5. Speed — minimize time force is vulnerable on/near the water
  6. Traffic Control — rigorous movement plan to prevent congestion

  CROSSING PHASES:
  Phase 1 — ADVANCE TO THE RIVER: Seize near bank, clear enemy from crossing sites.
    Establish security. Engineers conduct route recon and site preparation.
  Phase 2 — ASSAULT CROSSING: First wave crosses using assault boats, rafts, or
    amphibious vehicles. Seize far bank bridgehead. This is the highest-risk phase.
  Phase 3 — BRIDGEHEAD EXPANSION: Expand far bank lodgment. Repel counterattacks.
    Engineers emplace bridge(s) for heavy vehicles/sustainment.
  Phase 4 — BREAKOUT: Continue the attack from far bank toward subsequent objectives.

  CROSSING MEANS:
  - Assault boats (M2 assault boat): Infantry squads, first wave
  - Bridge erection boats (BEB): Support ribbon bridge/raft construction
  - Improved Ribbon Bridge (IRB): Corps-level asset (420 EN BDE). MLC 70+ (supports M1/M2).
    Emplacement: 60-90 minutes for 100m crossing. Requires security.
  - Float bridge: For sustained operations. MLC 96 for unlimited crossings.
  - Armored Vehicle Launched Bridge (AVLB): Gap <24m only. Not for Pa Sak.
  - Amphibious vehicles: Stryker is NOT amphibious. M2 Bradley can swim in calm water
    (requires preparation). Tanks require bridge.

  CROSSING SITE SELECTION CRITERIA:
  - Width at crossing point (narrower is better, <100m preferred)
  - Current velocity (<1.5 m/s for assault boats, <1.0 m/s for bridges)
  - Bank conditions (slope <30%, firm soil, vegetation cleared for approach)
  - Cover/concealment for assembly areas on near bank
  - Road network approach/exit on both banks (for throughput)
  - Enemy observation and direct fire coverage (avoid)
  - Air defense umbrella coverage from near bank

  PA SAK RIVER CROSSING SITES (from scenario):
  - K2 (Chai Badan area): Narrower section, road access, but likely defended
  - K3 (Pa Sak Dam bridge): Existing bridge structure, but likely prepared for demolition
  - Must coordinate with 420 EN BDE for site recon and engineer assessment

  ENGINEER SUPPORT TO WGX:
  - 420 EN BDE (Corps, DS Phase II): Provides IRB, BEBs, heavy bridging assets
  - 65 EN BN (CEC-I): Organic div engineers, route clearance, obstacle reduction
  - 40 EN BN (CEC-A)(ATT): Armored engineers for breach support, survivability
  - 253 EN BN (158 MEB): Route maintenance, MSR improvement
  - Engineer tasks: Site recon, bank preparation, boat/bridge emplacement, traffic control,
    bridge maintenance, far bank obstacle reduction

  FIRE SUPPORT FOR WGX:
  - Smoke: CRITICAL — continuous smoke screen to obscure crossing from enemy observation.
    155mm smoke rounds (M825A1 WP, M116 HC). Plan 4-8 hours of smoke.
    Smoke generator units if available. Wind contingency plans.
  - Preparation fires: Suppress/neutralize far bank defenders before crossing
  - Counterfire: Protect crossing site from enemy artillery (WLRs oriented, HIMARS on call)
  - CAS: On-call CAS for enemy counterattack during bridgehead expansion
  - SEAD: Suppress enemy ADA to enable 25 CAB support of crossing

  WGX COMMAND AND CONTROL:
  - Crossing CDR: Usually BCT CDR conducting main effort crossing
  - Crossing Area CDR: Engineer responsible for crossing site operations
  - Traffic Control: Crossing authority manages bridge traffic (priority by phase)
  - PACE for crossing control: FM/digital primary, relay alternate, messenger contingency

  RISK FACTORS:
  - Force vulnerability during crossing (concentrated at crossing site)
  - Enemy counterattack window during bridgehead expansion
  - Bridge emplacement under fire (90 min exposed)
  - Current/weather effects on bridge stability
  - Equipment loss in water (recovery plan required)
  - Casualty evacuation from far bank (MEDEVAC plan critical)

16. ENGINEER OPERATIONS (ATP 3-34.22 / FM 3-34)

  ENGINEER SUPPORT AT DIVISION LEVEL:
  Engineer priorities set by CDR per phase (Mobility / Countermobility / Survivability):
  - Phase I (Advance to River): SURVIVABILITY-MOBILITY-CM (protect force while closing)
  - Phase II (Assault Crossing): MOBILITY-SURVIVABILITY-CM (breach and cross)
  - Phase III (Breakout): MOBILITY-SURVIVABILITY-CM (sustain momentum)

  25ID ENGINEER ASSETS:
  - 65 EN BN (CEC-I): Combat Engineer Company, Route Clearance, Horizontal Construction
    Capabilities: Obstacle reduction, route clearance (RCPs), fighting positions, tactical wire
  - 40 EN BN (CEC-A)(ATT from 1AD): Armored engineer capability
    Capabilities: Breach with ABV (Assault Breacher Vehicle), M1150 with mine plow/roller,
    armored route clearance, joint assault bridge (JAB) for short gaps
  - 253 EN BN (158 MEB): Area/route clearance, construction, MSR maintenance
  - 420 EN BDE (Corps, DS Phase II): Heavy bridging (IRB), BEBs, bridge companies

  MOBILITY OPERATIONS:
  - Route clearance: RCP teams clear MSR/ASR of IEDs, mines, obstacles
  - Obstacle reduction: Breach enemy tactical obstacles (minefields, wire, ditches)
  - Bridging: Short-gap (AVLB <24m), medium-gap (dry support bridge), wet-gap (IRB/float bridge)
  - Route classification: MLC ratings for bridges and routes PL APPLE to PL FIG

  COUNTERMOBILITY OPERATIONS:
  - Obstacle plan: Protective (near friendly positions), tactical (channelize enemy)
  - Mines: Anti-vehicular self-destruct ONLY (per corps restriction). No persistent mines.
  - Point obstacles: Crater roads, abatis, road blocks at chokepoints
  - Bridge destruction: Requires I Corps CDR approval

  SURVIVABILITY OPERATIONS:
  - Fighting positions: Blade cut for vehicles, dug for dismounts
  - CP hardening: Overhead cover for division main/TAC CPs
  - Artillery survivability: PAA positions for 155mm batteries
  - Critical asset protection: BSA/DSA berming and hardening

  ENGINEER WORK LINE: PL TAN (current), O/O PL BANANA
  Engineer work beyond the engineer work line is the responsibility of the supported BCT.

  ROUTE CLASSIFICATION (KEY FOR THIS SCENARIO):
  MLC (Military Load Classification): Bridge/route capacity by vehicle weight class
  - M1A2 Abrams: MLC 72 (requires Class 70+ routes/bridges)
  - M2A3 Bradley: MLC 34
  - Stryker: MLC 20
  - HEMTT: MLC 28 (logistics vehicles)
  All routes/bridges PL APPLE to PL FIG must be classified. Bridges below MLC 70
  restrict 2/1AD ABCT movement — identify bypasses or reinforcement requirements.

  END DOCTRINE REFERENCE PACKAGE
======================================================================
`;

// ═══════════════════════════════════════════════════════════════════
// ADDITIONAL DOCTRINE — Uploaded during prior sessions, now hardcoded
// ═══════════════════════════════════════════════════════════════════

const ADDITIONAL_DOCTRINE = `
======================================================================
  ADDITIONAL DOCTRINE REFERENCES (from prior session uploads)
======================================================================

12. CLOSE AIR SUPPORT (JP 3-09.3, Jun 2021)
CAS Types: Type 1 (FAC has visual with target AND attacking aircraft), Type 2 (FAC has visual with either target or aircraft), Type 3 (FAC has neither visual — requires coordinates and altitude deconfliction).
CAS Request Flow: Commander identifies need → JTAC/FSO submits immediate request through ASOC → JFACC allocates from CAS stack or diverts. Preplanned CAS submitted 24hrs prior via ATO cycle (0001Z-2400Z).
Terminal Attack Control: JTAC provides 9-line brief (IP/BP, heading, distance, target elevation, target description, target location, mark type, friendlies, egress). CAS abort criteria must be established.
Division Fires Integration: 3 ASOS TACPs organic to 25ID. CAS deconflicted with HIMARS via PAH/TAH/MFP (altitude blocks). Coordinating Altitude 21,000ft MSL, Coordination Level 3,000ft AGL.
Key Planning Factors: 8 CAS sorties allocated Phase II. Time on station ~20-30 min per sortie. Recommend 2-sortie packages for mutual support.

13. TARGETING (AFDP 3-60 / JP 3-60)
D3A Targeting Cycle: DECIDE (develop HPT/HPTL/AGM, identify targets), DETECT (task ISR to find HPTs, develop collection plan), DELIVER (attack targets per AGM guidance), ASSESS (+/- ASSESS: BDA, re-attack decisions).
Target Development: Targets must meet all 4 criteria: (1) positively identified, (2) located accurately, (3) legal/ROE compliant, (4) within delivery capability.
HPTL Development: Staff nominates HPTs based on threat analysis → Targeting Team prioritizes → CDR approves. Each HPT gets attack guidance: When (trigger), What effect (destroy/neutralize/suppress/disrupt), How (delivery system), and Assessment criteria.
AGM Structure: For each HPT — trigger/timing, desired effect, primary delivery system, alternate delivery, BDA method. Updated each targeting cycle.
Targeting Team: Led by FSO/targeting officer. Members: G2 (detect/assess), G3 (operational priorities), FSO (delivery), ALO (air allocation), SJA (legal review).
Key: Counterfire is a DETECT-DELIVER problem. Speed of CF response (radar acquisition → fire mission) must be <3 minutes.

14. INTELLIGENCE PREPARATION OF THE BATTLEFIELD (ATP 2-01.3)
IPB 4-Step Process:
  Step 1 — Define the Operational Environment: Identify AO, AI, battlespace dimensions, significant characteristics.
  Step 2 — Describe Environmental Effects: Terrain (OAKOC), weather, civil considerations (ASCOPE). Produce MCOO.
  Step 3 — Evaluate the Threat: Threat models, doctrinal templates, OB, HVT list, threat capabilities.
  Step 4 — Determine Threat COAs: Develop threat COAs (MLCOA/MDCOA), event templates, event matrices.
Products: MCOO (Modified Combined Obstacle Overlay), Threat COA overlays, Event Template (NAIs/TAIs/DPs placed on map), Event Matrix (links NAIs to indicators and collection assets), Collection Plan.
NAI/TAI/DP Framework: NAIs monitor enemy activity/decisions. TAIs are areas where fires/maneuver can affect enemy. DPs trigger friendly decisions. Event template links all three to enemy COAs.
HVT→HPT: HVTs (High-Value Targets) are enemy assets whose loss degrades capability. HVTs that match friendly objectives become HPTs on the HPTL.

15. ORDNANCE/AMMUNITION OPERATIONS (FM 4-30, 2014)
CSR Process: Theater Army sets RSR (Required Supply Rate) based on mission. Corps/Division allocates CSR (Controlled Supply Rate) to subordinate units. CSR ≤ RSR. Units fire at CSR unless emergency.
Ammunition Management: Class V supply chain: CONUS → Theater → Corps ASP → Division ATP → BSA/unit.
ATP Operations: Ammunition Transfer Points handle throughput (receive, configure, issue). ATPs do NOT store — they are flow-through nodes. Key for WGX: pre-position ATP east of Pa Sak for Phase II surge.
Key Planning Factors: CSR table in OPORD Annex F drives all ammunition planning. Track by DODIC. Monitor expenditure vs CSR daily. Request CSR increase through Corps G4 when consumption exceeds allocation.
Critical for 25ID: 2 UBL on-hand maximum. Smoke CSR (M825 WP) = 8 rds/sys/day may be insufficient for 4-8hr WGX screen. Forward ATP location selection must account for enemy indirect fire threat.

16. ARMY SPACE OPERATIONS (FM 3-14)
Space-Based ISR: GEOINT (satellite imagery for BDA, terrain analysis), SIGINT (ELINT for radar/emitter location), MASINT (detecting launches, movements).
SATCOM: Primary long-haul comms for division. Vulnerable to enemy EW/jamming. PACE should include HF backup for SATCOM degradation.
PNT (Position, Navigation, Timing): GPS is primary PNT source. Enemy EW suite (SPR-2, Pole-21E, JN-1601) can jam/spoof GPS — degrades Excalibur, GMLRS precision. Mitigation: SAASM GPS, backup inertial nav, non-GPS munitions.
Space Weather: Solar events can degrade GPS accuracy, SATCOM links, and HF propagation. G6 must monitor.
Key for 25ID: Enemy EW capability against GPS is a documented threat. Plan for degraded precision munition effectiveness. M795 HE (non-GPS) is the fallback when GPS is jammed.

17. 25ID OBSERVATION & FIELDS OF FIRE — FIRES ANALYSIS (DIVARTY/FSE, OAKOC Terrain Product)
Prepared DTG: 110700MAR2030 (D+10) — Custom analysis for OPORD 12030-04

BLUF: Terrain creates 3 distinct fires environments:
  (1) West of Pa Sak: flat valley, 750m ground obs, favorable for radar/cannon
  (2) Pa Sak River corridor: defender advantage from east bank, ridgelines between PL APPLE-BANANA degrade cannon range by up to 500m due to crest clearance
  (3) East into Dong Phaya Yen: 100-650m elevation gives enemy 6,000m LOS west, masks our CF/ADA radar

CRITICAL FIRES FACTORS:
  - Intervening crests (up to 500m) between PL APPLE and PL BANANA reduce effective cannon range. FA BNs must account for crest clearance in QE calculations. May require repositioning for targets beyond ridgelines. SEVERITY: HIGH
  - Elevation data validation required for targets east of PL DATE from Pa Sak Valley positions (~35m → 100-200m+ Khorat Plateau). SEVERITY: HIGH
  - Q-53 CF radars: mountains mask LOS to enemy arty east of Dong Phaya Yen. Crests between PL APPLE-BANANA degrade northern detection. Must position on high ground. SEVERITY: HIGH
  - HIMARS less affected by crests than cannon; PAAs balance range-to-target with survivability
  - Cannon dead space pockets exist between valley and mountain range foothills. COLT/JFO teams essential.
  - Ground FO visibility limited to 750m by tree breaks; rely on UAS/radar/overhead ISR

ENEMY FIRES THREAT AT CROSSING:
  - 1658 FA (27x PLZ-52, 9x SR-4, 2x SLC-2E, CH-91 UAS): 155mm range overmatch, mountain elevation gives 6km LOS, pre-registered TRPs at bridge/ford sites
  - 1648 FA (23x PLL-09, 7x Type-90B MRL, 2x SLC-2E): Southern sector, could range into 25ID boundary
  - 791 FA (34 how, 37 lnchr, 4x SLC-2E): PHL-03 300mm MRL deep strike, BZK-006 persistent surveillance, ranges into 25ID rear from north
  - Every enemy CA-Bn has 6x 120mm mortars (9.5km range) — 2-3km overmatch vs our organic mortars

WGX FIRES REQUIREMENTS:
  - Suppress/destroy enemy OPs on east bank ridgelines and Dong Phaya Yen foothills
  - Smoke screen must account for 4-12 mph winds; plan for wind shifts
  - SEAD vs 1658 FA SLC-2E radars and 1659 AD HQ-17A before CAS commitment
  - CL V pre-positioning for sustained counterfire + suppression + obscuration simultaneously
  - CF radar fan overlay vs terrain profile needed for each PAA position (PL BLACK, PL BANANA, PL FIG)

COUNTERFIRE ZONES:
  - CFFZ 19 (791 FA/Northern): Radar fans from PL BLACK must clear ridgelines between PL APPLE-BANANA
  - CFFZ 20 (1658 FA/Eastern): Dong Phaya Yen masking prevents valley-positioned radar detection. Must advance radar with CFL movement.

PHASE III WARNING: 168 FA (16 ACG) arrives ~D+18 with 36x PLZ-05, 27x SR-5 MRL, 12x PHL-03, 4x SLC-2E — massive firepower increase. SEAD/joint fires essential before 168 FA achieves combat effectiveness.

END ADDITIONAL DOCTRINE
`;

// ═══════════════════════════════════════════════════════════════════
// APPROVED MISSION ANALYSIS BRIEF — Human Staff Products (CDR Approved)
// Source: Mission Analysis Brief_25 ID Staff_human.pdf (61 pages)
// These products are GROUND TRUTH. Virtual staff must build COAs on these.
// ═══════════════════════════════════════════════════════════════════

const APPROVED_MA_BRIEF = `
======================================================================
  25ID APPROVED MISSION ANALYSIS — REVISED CDR GUIDANCE
  POST-MA BRIEF UPDATE. CDR disapproved original intent & tasks.
  These REVISED products override ALL prior MA outputs.
  All COA Development (Step 3+) must be built on these products.
======================================================================

REVISED APPROVED MISSION STATEMENT:
NLT D+13, 25ID ATTACKS to seize the passes vicinity 47PQS553976 (OBJ BRONCOS) and 47PQS557871 (OBJ SEAHAWKS) in order to ALLOW 1AD to interdict the 163 and 166 BCGs.
NOTE: Mission changed from D+17 to D+13. Task verb changed to ATTACKS. Purpose refocused on ALLOWING 1AD to interdict specific BCGs.

APPROVED PROBLEM STATEMENT:
To seize OBJ BRONCOS and OBJ SEAHAWKS, 25ID must maintain synchronization of combat power while maneuvering across 50km of terrain restricted by a minimum of one known Wet Gap Crossing that provides insufficient preexisting bridges. The 165 Heavy BCG (with 4x CA-BNs) has had 2 days to establish a deliberate defense of our assigned objectives. The Division must accomplish its mission to pass 1AD before the 162 and 163 BCG can arrive to the AO. The identified passage lanes must remain passable by an Armored Division while maintaining critical infrastructure and services.
CDR FEEDBACK: Problem statement must address TIME and SPACE more explicitly.

REVISED COMMANDER'S INTENT (CDR DISAPPROVED ORIGINAL — THIS IS THE APPROVED VERSION):
Purpose: Prevent 16 ACG from establishing a frontier defense zone along the Dong Phaya Yen Mountains, setting the conditions for a reestablishment of Khorathidin sovereign territory.
Key Tasks:
  1. Generate a rapid tempo through Chi Badan Mountains to prevent the enemy from targeting the Division with IDF.
  2. Prevent enemy from massing against our wet gap crossing sites.
  3. Create space East of the Dong Phaya Yen to enable 1AD generating combat power toward the East.
  4. Generate tactical deception to delay the enemy from massing against our crossing sites.
End State: 25ID seized OBJ BRONCO/SEAHAWK out to PL FIG with at least 2 Battalions. 16 ACG pushed East of PL FIG and unable to disrupt 1AD ability to maneuver out of the passes. Civilian population not disrupting 1AD movement.
CRITICAL NOTE: Specified tasks are NOT key tasks. Key tasks go toward accomplishing end state; specified tasks accomplish mission. Staff must understand this distinction.

ESSENTIAL TASK:
Seize OBJ BRONCOS and OBJ SEAHAWKS.

SPECIFIED TASKS:
1. Occupy attack positions west of PL APPLE (Phase I).
2. Conduct wet gap crossing of the PA SAK RIVER at PL BANANA (Phase II).
3. Seize OBJ BRONCOS and OBJ SEAHAWKS to pass 1AD forward (Phase II).
4. Establish LANES DENVER and SEATTLE (Phase III).
5. Conduct FPOL of 1AD (Phase III).
6. Be prepared to attach a company-size TCF to 130 MEB (Phase III).
7. Provide D-25 AV TACON to 201 E-MIB (Phase III).
8. (FIRES) EFST 4a: DISRUPT (cyber) 16 ACG CP Groups to prevent 164/165 BCG commanders from issuing counter-attack orders during WGX.
9. (FIRES) EFST 4b: DISRUPT (cyber) 16 ACG CP Groups to prevent enemy coordinating attacks during FPOL of 1AD.
10. (INTEL) D+10-D+13 collect on Corps NAI 141-156 (PIR 1,3,5). D+14-D+18 collect on Corps NAI 158 (PIR 8).
11. (C2) Provide planned location and emplacement time of 25ID MCP NLT Corps Communication Rehearsal.
12. (C2) Accept TACON of I Corps Retrans TM 1 for LOS comms to PAAs 187/188.

IMPLIED TASKS:
1. (M2) Defeat 165 BCG covering forces west of PL Banana.
2. (M2) Isolate and secure the Pa Sak River crossing area.
3. (M2) Establish and protect a far-side bridgehead of sufficient depth.
4. (M2) Synchronize deep, close, and rear operations to prevent enemy interference.
5. (M2) Establish conditions for unimpeded FPOL of 1AD.
6. (M2) Retain division reserve to defeat enemy counterattack.
7. (M2) Establish FARP IVO PL Banana. Prepare for/mitigate IDPs. Provide protection for bridging assets.
8. (FIRES) Counterfire ops against 1658 FA using organic TPQ-53s and quick-fire channels.
9. (FIRES) Continuous smoke screen operations for WGX obscuration (Phase II).
10. (FIRES) SEAD coordination with joint CAS. MET support for all firing units.
11. (FIRES) Quick-fire channel establishment from organic TPQ-53s to firing units.
12. (INTEL) Prioritize identifying enemy defensive preparations at K2, K3 and mountain passes K5, K6, K7.
13. (PROTECTION) Provide protection for WGX IVO Pa Sak River using 420 EN during Phase II.
14. (PROTECTION) Provide protection over mountain passes along Dong Phaya Yen to enable breakout force.
15. (SUST) Plan phased displacement of DSA. Establish forward DSA east of PL BANANA. Prioritize CL III and V during WGX. Stage CL IV for bridging. Establish redundant fuel nodes.
16. (C2) Ensure CPs enforce EMCON, disperse and remain mobile.

FIRES ESSENTIAL TASKS (APPROVED):
EFST 1: NEUTRALIZE 1658 FA (27x PLZ-52 + 9x SR-4 + 2x SLC-2E) — prevent enemy long-range fires against crossing sites. Method: HIMARS priority, 45 FA BDE counterfire, organic TPQ-53 detection.
EFST 2: SUPPRESS 1659 AD (18x PGZ-09, 6x HQ-17A) to enable CAS/ATK AVN. Method: SEAD with 1-25 AVN and joint CAS.
EFST 3: Provide continuous smoke screen during WGX (Phase II) — obscure crossing from enemy observation/direct fire. Method: Massed 155mm smoke (M825 WP) on enemy OPs.
EFST 4: DESTROY enemy direct fire systems on far side of Pa Sak with preparation fires. Method: 155mm HE and GMLRS.
EFST 5: Protect AN/TPQ-53 radars (PPL Priority 1 & 2). Method: Survivability positions, rapid displacement.

REVISED CCIR (POST-MA BRIEF — CDR APPROVED):
PIR 1: Is the 16 ACG's Covering Group establishing its Frontal Blocking Zone West of PL Banana?
PIR 2: Where can 25ID cross the Pa Sak River?
PIR 3: Will 16 ACG Frontier Defense Group establish a deliberate defense along PL DATE prior to 25ID seizing OBJ SEAHAWKS and OBJ BRONCOS?
PIR 4: Is the Covering Group's Main Effort North or South?
PIR 5: When will the 71st ACG resume offense operations?
PIR 6: Location and movement rate of any element, company sized or larger, attempting to reinforce the covering group.
NOTE: PIRs must match decision authority for CG. These replace all prior PIRs.

REVISED FFIR (POST-MA BRIEF — CDR APPROVED):
FFIR 1: Any Brigade combat power loss that creates an unfavorable combat power ratio (refine in wargame).
FFIR 2: Weather conditions precluding use of Attack or Lift Helicopter.
FFIR 3: Aviation combat power drops below required amount for Air Assault (refine in wargame).
FFIR 4: Loss of any bridging assets.
FFIR 5: Interdiction of LOCs for >12 hours.
FFIR 6: 2-3 ABCT anticipates a penetration on our cover.
NOTE: Old FFIR 3 (commitment of division reserve) ELIMINATED per CDR. New FFIR added: location of 1AD (impacts 25ID timing).

REVISED EEFI (POST-MA BRIEF — CDR APPROVED):
EEFI 1: Crossing Sites over Pa Sak.
EEFI 2: Locations of Bridging Assets.
EEFI 3: Locations of MLRS.
EEFI 4: Locations of FARPs.
EEFI 5: Location of the DSA.
EEFI 6: Location of Counter Fire Radar.
EEFI 7: Locations of Command Nodes.

CONSTRAINTS:
- Execute within Corps Phase I-III framework.
- Seize designated objectives to enable 1AD FPOL.
- Conduct crossing at PL BANANA as directed.
- Operate within Corps fire control measures (CFL/FSCL).
- Maintain directed rear boundaries (PL TAN → PL BANANA Phase III).
- Adhere to established priority of fires and sustainment.
- Must maintain LOS Comms with I Corps Main CP.
- ATACMS and GMLRS-ER retained at Corps level. Only 10x M39A1 ATACMS for ALL I Corps.
- ER-GMLRS NOT allocated to 25ID — only 17 FA/45 FA get 15 M40 + 15 M41 pods total.
- WP PROHIBITED near civilian population centers/built-up areas. NO HC smoke allocated.
- CSR and UBL constraints WAIVED for 155mm smoke ISO WGX.
- 2 UBL on-hand maximum (corps transportation priority).
- Unobserved fires: O-8 CDR approval when in contact.
- Cluster munitions: >1% UXO west PL BANANA = I Corps CDR; <1% = Div CDR; east PL BANANA = all approved.
- Scatterable mines: 15-day = corps authority only; divisions limited to 4/48hr self-destruct.
- HN forces responsible for all IDP movements/camps. 25ID cannot establish civil control.
- 25ID cannot request ISR assets east of PL Banana until Phase II. Phase I collection east of PL Banana must use organic assets or be requested through I Corps G2.
- Southern axis cannot support M1 Abrams without Engineer support.
- Maximum river velocity for WGX is 3 m/s (1.8 m/s for bridging M1 Abrams).
- RESTRICTED TARGET LIST: All bridges need I CORPS commander's approval. Do NOT destroy any bridges.
- Do NOT plan to use FASCAM. Use precision munitions in populated areas.
CDR NOTE: Improve understanding of constraint vs task. Constraints restrict action; tasks direct action.
LIMITATIONS:
- 25ID has 60km movement from current AO to attack positions, requires up to 48hrs to reorient.
- 6x MQ-1C ground stations (12x aircraft, 6x max simultaneous).
- Limited organic bridging capability.
- Intervening crests up to 500m between PL APPLE-BANANA reduce cannon range.
- PLZ-52 outranges 155mm by ~15km (39km vs 22km standard).
- Enemy EW (SPR-2, Pole-21E, JN-1601) can jam GPS — threatens Excalibur/GMLRS precision.
- ATO submission 0001Z, 24hrs prior — limits preplanned CAS flexibility.
- Mountainous terrain and dense vegetation degrade LOS comms (VHF/UHF).

KEY FACTS:
1. Phase I (D+10-D+12) = occupation of attack positions. Phase II (D+13-D+17) = WGX and seizure. Phase III (D+18-D+20) = FPOL.
2. 165 BCG last resupplied D+10 with 70/30 conventional/precision split. ~72hrs combat supply remain.
3. 1658 FA has 27x PLZ-52 + 9x SR-4 + 2x SLC-2E registering fires on Pa Sak crossing sites. CFFZs 153/154 carry immediate fire authority D+14.
4. 1AD closes in AA MINERS NLT D+14.
5. Priority of sustainment: CL III, V, VIII, IX. Phase I priority = 2/3ID, 25ID. Phase II priority = 25ID. Phase III priority = 1AD.
6. 420 EN BDE in direct support for WGX Phase II (3x BN, 3x MRBC, capable bridging 600m, 45 rafts, 9 crossing sites simultaneously).
7. 25ID can air assault 1x IN BN per lift ISO WGX.
8. Corps deep operations shift by PL: BLUE → AQUA → CHERRY → DATE → GRAPE.
9. CFL shifts: PL BANANA (Ph I) → PL CHERRY (Ph II) → PL FIG (Ph II) → PL BLUE (Ph III). FSCL remains PL AQUA (static, Sixth Army).
10. Krasukha-4/Pole-21E (enemy EW) can affect Excalibur and GMLRS accuracy.

KEY ASSUMPTIONS:
1. Enemy retains sufficient combat power to counterattack the bridgehead.
2. CPs and CMD VICs will be targeted by non-lethal (EW/cyber) effects. Expect degradation, intermittent connectivity, need analog backup.
3. At least four crossing sites remain viable D+13-D+17.
4. Corps shaping prevents enemy massing east of PL DATE.
5. 1AD prepared to conduct FPOL NLT D+17.
6. Offensive operations will result in significant IDPs. Southward migration affects GLOCs/MSRs.
7. Corps PAAs can be utilized by Division (with deconfliction) due to limited usable terrain.
8. Enemy will NOT flood Pa Sak basin by destroying dam north of AO.
9. 16 ACG remainder commits by rail, completing in 7 days. If false, TCOA 2 timing changes significantly.
10. 165 BCG establishes positional defense north of Pa Sak Reservoir between PL BANANA and PL DATE, not forward of PL BANANA.

FORCES AVAILABLE:
Maneuver: 1x MBCT (3/25ID), 1x ABCT (2/1AD w/ recon SQDN), 1x SBCT (1/2ID).
Aviation: 24x AH-64E (1-25 AVN), 12x MQ-1C Gray Eagle (D/25 AVN, 6x max simultaneous), 30x UH-60, 12x CH-47, 15x HH-60.
Fires: 27x M142 HIMARS (2-11 FA), 12x M119 + 6x M777 (3-7 FA), 18x M777 (1-37 FA), 18x M109A7 (4-27 FA). Total: 42x 155mm + 12x 105mm + 27x HIMARS. 4x TPQ-53 radars organic.
ADA: 6-56 ADA (M-SHORAD/Avenger), D BTRY DIVARTY (LMADIS/CRAM).
Engineers: 420 EN BDE (DS WGX Ph II) — 3x MRBC.
CAS: 8 sorties allocated (F-35/A-10/F-15E) via 3 ASOS TACPs.
Corps Fires: 17 FA BDE (ER-GMLRS: 15x M40 + 15x M41), 45 FA BDE (counterfire HQ, same ER-GMLRS alloc).
Sustainment: 365th SPT BN (CSSB ATT), 25th DSB, 313 Hospital Center (385 FH 32-bed, 915 MD FRSD, 514 MD ground ambulance).
Protection: 850 MP BN, 184 ORD BN, 476 CM BN, 411 CA BN, 40th EN BN, 253 EN BN.

CSR TABLE (APPROVED — per Annex D/F):
D529 155mm HE M795: 15 rds/sys/day (42 sys = 630 rds/day)
D544 155mm RAP M549A1: 14 rds/sys/day (42 sys = 588 rds/day)
D528 155mm WP Smoke M825: 8 rds/sys/day (42 sys = 336 rds/day) — WAIVED for WGX
DA45 155mm Excalibur XM982: 2 rds/sys/day (42 sys = 84 rds/day)
D563 155mm DPICM M483A1: 90 rds/sys/day (42 sys = 3,780 rds/day)
K145 155mm RAAM M741: 2 rds/sys/day (42 sys = 84 rds/day)
C445 105mm HE M1: 15 rds/sys/day (12 sys = 180 rds/day)
D574 GMLRS DPICM M30: 0.7 pods/lnchr/day (27 lnchr = 18.9 rds/day)
D575 GMLRS Unitary M31: 0.7 pods/lnchr/day (27 lnchr = 18.9 rds/day)
CDR NOTE ON CSR: Develop RSRs and assess against CSRs for each major combat weapon system (TOW, 120mm, 155mm, JAVELIN, M26, M30, M31). Do the math for the commander — tell CDR how much we can shoot. Prioritize IBCT/SBCT for JAVELINs and TOWs at the expense of ABCT. IBCT/SBCT use AT weapons at higher rate than ABCT.

RESOURCE SHORTFALLS:
- Range disadvantage: PLZ-52 outranges 155mm by ~15km.
- Smoke CSR: 336 rds/day insufficient for sustained 4-6hr WGX screen (192-480 rounds needed).
- 2 UBL max constraint limits sustained operations.
- ER-GMLRS not allocated to division.
- No organic ground-based chemical obscuration units in I Corps.
- No dedicated TCF Phases I-II (Level III threat assessed low).
- Limited pre-hostility Class IV and precision-guided munitions stockages.
- MOPP1 water requirement: 243K gal/day. 25ID storage only 290K gal (3DOS = 731K gal shortfall).
- M1/M2/M3 engine and transmission critical shortages — command controlled.
- Class III(B) Phase III requires 700K gal/day sustained for 5 days — at top of operational limits.
- 32-bed field hospital could be quickly overwhelmed during WGX casualties.
- Air MEDEVAC limited by phase: Ph I = PL BLACK, Ph II = PL BANANA, Ph III = PL CHERRY.

COA EVALUATION CRITERIA (CDR APPROVED — FINAL):
1. WGX Speed (Weight 2): The amount of time it takes to move the entire Division across the Wet Gap Crossing (WGX). Less time = more favorable.
2. Tempo (Weight 1): Time it takes to seize both OBJ Broncos and OBJ Seahawks. Faster = more favorable.
3. Force Attrition (Weight 3): Attrition of combat power. Lower attrition = more favorable.
4. Concentration (Weight 3): The convergence of appropriate military capability in time and space to create decisive effects against the adversary while presenting multiple dilemmas. Higher combat power ratio at decisive points = more favorable.
Total Weight: 9. These are the ONLY 4 evaluation criteria — no additional criteria.

TIMELINE:
D+10 (110700MAR): Receipt of OPORD. 25ID begins planning. 165 BCG departs to Chai Badan.
D+10-D+12: Phase I — Occupy attack positions west of PL APPLE. 25ID reorientation (up to 48hrs, 60km movement).
D+12: 165 BCG assessed to establish FBZ between PL APPLE-BANANA.
D+13: Phase II begins — 25ID LD at PL APPLE. 165 BCG assessed to establish FDZ west of PL DATE.
D+13-D+17: WGX of Pa Sak River, seize OBJ BRONCOS and OBJ SEAHAWKS.
D+14: 1AD closes in AA MINERS. CFFZs 153/154 carry immediate fire authority.
D+16: 166 BCG enters corps AO NE (earliest).
D+17: NLT — mission complete, 1AD FPOL.
D+18-D+20: Phase III — Establish LANES DENVER/SEATTLE, conduct FPOL of 1AD.
D+21: 161/162 BCG arrive (not before).

HIGHER HQ CONTEXT:
Sixth Army Mission: Defend Khorathidin, on order attack to defeat Olvanan forces, reestablish sovereign territory.
I Corps Mission: NLT D+20, interdict 163 and 166 BCG east of PL DATE to prevent 16 ACG frontier defense zone along Dong Phaya Yen.
I Corps Concept: Phase I = transition to attack positions. Phase II = attack with 2 divisions abreast (25ID + 3UK) to seize passes at PL DATE. Phase III = FPOL of 1AD, interdict 163/166 BCGs.
Corps Task: 25ID seize OBJ BRONCOS and SEAHAWKS. 3UK seize OBJ JAGUARS. 1AD interdict 163/166 BCGs to PL GRAPE.
CDR NOTE: Staff must help 25ID CDR see I CORPS better — what is I CORPS doing for 25ID against TCOAs.

AREA OF INFLUENCE:
25ID can influence to 84km with organic fires (GMLRS only, no ATACMS), beyond with ATK AVN (180km) and CAS.
Deep Fight (PL Cherry): 2-11 FA HIMARS (27x M142) shapes 165 BCG blocking positions, 1658 FA PAAs, C2, logistics east of Pa Sak.
Close Fight (PL Apple): 3-7 FA, 1-37 FA, 4-27 FA cover to 30km (RAP)/40km (Excalibur). Q-53 tracks incoming to 50km (sector). Counterfire response: <3 minutes.
1-25 AVN (24x AH-64E): 180km combat radius — deep attack, armed reconnaissance.
D/25 AVN (4x MQ-1C): Persistent ISR/strike.
6-56 ADA: M-SHORAD bubble — Stinger 5km, Hellfire ~8km, interceptor ~8km, radar 30-50km vs Group 4-5 UAS.

RISKS (APPROVED):
HIGH: Fratricide at crossing site (converging fires + CAS + AVN). Mitigation: RFL, positive clearance, JAGIC.
HIGH: Counterfire threat from PLZ-52 range overmatch. Mitigation: Rapid displacement, survivability positions, TPQ-53 quick-fire.
HIGH: Smoke screen failure (CSR insufficient + wind shift). Mitigation: CSR increase request, mortar supplement, wind contingency.
HIGH: WGX could produce mass casualties overwhelming 32-bed field hospital. Mitigation: Efficient evacuation to corps hospitals.
MODERATE: 1659 AD threat vs CAS/AVN. Mitigation: SEAD, standoff munitions.
MODERATE: Ammunition sustainability (2 UBL limit + high WGX consumption). Mitigation: Pre-position ATPs.
MODERATE: EW degrades GPS munitions. Mitigation: Non-GPS munitions planning.
MODERATE: Enemy recon/insider threat to WGX preparation and CP locations.
MODERATE: Sustainment route disruption from IDPs and enemy SOF.
CDR RISK ACCEPTANCE: Willing to accept risk in NOT requiring deliberate clearance of all enemy forces attacking toward PL DATE. Fix bypassed forces no larger than battalion size. Use precision munitions in populated areas to reduce collateral damage. DO NOT DESTROY ANY BRIDGES.

======================================================================
  CDR COA DEVELOPMENT GUIDANCE (STEP 3)
  Issued post-MA brief. All COA development must follow this guidance.
======================================================================

COA GUIDANCE: Develop two (2) Courses of Action:
COA 1 — CONCENTRATED GAP CROSSING: Create a single large crossing area so that Division can mass and concentrate its capabilities at the crossing.
COA 2 — DISPERSED GAP CROSSING: Create multiple crossing areas to prevent the enemy from concentrating capabilities at the crossing.
COMMON TO EACH COA: Incorporate military deception. Explore incorporating at least a BN-sized Air Assault. Create a Division Reconnaissance element.
CDR DIRECTION: I want thorough analysis and recommendations on sequential vs simultaneous seizure of BRONCOS and SEAHAWKS.

OPERATIONAL FRAMEWORK (Concept of Operations):
Deep Area: Initially PL APPLE to BANANA. After LD shift: PL BANANA to CHERRY, then CHERRY to FIG.
Main Effort: Initially, seizure of a foothold across the Pa Sak River, then BRONCOs or/and SEAHAWKS.
Supporting Efforts:
  - Counter reconnaissance between PL APPLE and PL BANANA.
  - Securing passage lanes for 1AD.
  - Controlling civilian movement.
Sustainment: Focus mainly on supporting offensive operations along the main axis of advance toward breakout objectives (lanes DENVER and SEATTLE). Maintain mobility to ensure CL III and CL V resupply. Determine what classes of supply are needed forward and when.

CRITICAL EVENTS:
1. Deep area operations against 16 ACG fires and maneuver assets.
2. Defeat enemy reconnaissance and disruption forces.
3. In Contact or Out of Contact attack with rotary aviation.
4. Wet gap crossing of the Pa Sak River.
5. Close area operations against Covering Group.
6. Detect and interdict movement of counterattack forces.

RESERVE GUIDANCE: Plan for a battalion-sized ground maneuver reserve.

DECISION POINTS:
1. Transition of the main effort if the tempo to PL BANANA is reduced.
2. Re-allocation of combat power to enable the main effort.
3. Change in tempo based on 3 UK movement.
4. 71 ACG threatens from the North.
5. 16 ACG defense collapses — opportunity to transition directly to exploitation.
6. 16 ACG Covering Group stops the Division's momentum — transition to defense.

BRANCHES AND SEQUELS:
Sequel: Defeat 16 ACG east of PL DATE (opportunity for the division to Continue the Attack).

======================================================================
  CDR WfF-SPECIFIC PLANNING GUIDANCE (STEP 3)
======================================================================

MOVEMENT AND MANEUVER GUIDANCE:
- Generate rapid tempo through Chi Badan Mountains.
- Weight the gap crossing with fire support for obscuration, then shift to Main Effort at OBJ BRONCO/SEAHAWK.
- Plan for BN-sized Air Assault.
- Create a Division Reconnaissance element.

INTELLIGENCE GUIDANCE:
- INFORMATION COLLECTION: SIGINT focus = identify enemy artillery and C2 nodes supporting Covering Group. HUMINT focus = force protection along LOCs. UAS = identifying enemy counter-attack forces and long-range artillery.
- ENEMY COA GUIDANCE: CDR does NOT think 16th ACG Covering Group's Frontier Defense Zone will be on the near side of PL BANANA. Focus on enemy decision points (DPs) to develop ECOAs. Ensure ECOAs integrate hybrid threats in support area and reactions of bypassed forces in close area. Clearly identify triggers (enemy PIR) for decision to counterattack breakout force and indicators of counterattack actions.
- HPT (High Payoff Targets): Enemy rocket artillery, enemy air defense units/systems, C2 nodes, enemy aerial reconnaissance, enemy scatter-able mine systems, Covering Group reserve.
- 165 BCG THREAT: Purpose of 165 BCG defense is to RETAIN the city. HVT analysis must NOT ignore enemy capabilities that retain terrain — tanks, ground maneuver, not just fires and C2. What helps them RETAIN terrain?
- THREAT COA 1 (Positional Defense): Define what LOSING means for 165.
- THREAT COA 2 (Mobile Defense): Analyze enemy counter-attack triggers and reserve employment.

FIRES GUIDANCE:
- SYNCHRONIZATION: Establish FSCM to allow Division to take on majority of counter fight. Division needs robust SEAD to allow rotary wing. Ensure DIVARTY forces move forward sufficiently to shape in front of lead brigades. Weight gap crossing with additional fire support for obscuration, then shift support to Main Effort at seizure of OBJ BRONCO and SEAHAWK.
- SPECIAL MUNITIONS: Do NOT plan to use FASCAM. Use precision munitions in populated areas.
- AIR/MISSILE DEFENSE: Units provide Small Arms for Air Defense (SAFAD) to defeat enemy UASs and air-breathing systems. Ensure lead forces have SHORAD capability.
- ATTACK GUIDANCE: Focus CAS against enemy MRL and enemy reserve. AH-64s against armored vehicles in larger than company formations. Focus MRL fires on counterfire and SEAD.
- RESTRICTED TARGET LIST: ALL BRIDGES need I CORPS commander's approval.

PROTECTION GUIDANCE:
- PRIORITIES: First concern is enemy ability to disrupt Division with IDF. Place mobile ADA systems (M-SHORAD) forward. Protect rear areas with point defense systems (Stinger). Ensure PAL identifies passive measures. Recommend displacement frequencies for division and brigade CPs based on enemy recon, fires, and irregular/unconventional warfare capabilities.
- IDP/RESETTLEMENT: Facilitate movement of IDPs away from key MSRs for division movement to Corps support area and host nation support.

SUSTAINMENT GUIDANCE:
- SYNCHRONIZATION: Ensure adequate areas identified and cleared by maneuver forces to echelon sustainment assets to maintain momentum with penetration. Plan multiple FLE/FARPs (nodes) to support wet gap crossing. Determine when and where to move DSA. Plan Refuel on the Move (ROM) for 1AD elements during FPOL.
- SMOKE RESUPPLY: Division requires significant amount of 155mm Smoke rounds for gap crossing. Ensure DSA synchronizes resupply of smoke rounds to appropriate Fires Battalions.
- ROCKET RESUPPLY: Ensure DSA synchronizes resupply of rocket rounds to MLRS/HIMARS Battalion to support SEAD.
- HEALTH SUPPORT: Recommend phased limits for Air MEDEVAC based on ADA threats throughout the operation. Develop detailed AXP and CASEVAC plan encompassing totality of 25ID AO integrated with MEDEVAC effort. Develop detailed plan to augment a Brigade if they receive a MASCAL.

INFORMATION OPERATIONS GUIDANCE:
Engage in active messaging encouraging local populace to stay off main routes and move under direction of local authorities. Convey concern for their safety but they must not interfere with military operations. Convince and help local government and police forces working with us to take care of the population.

RECONNAISSANCE GUIDANCE:
- FOCUS: Division Ground Recon on Chi Badan Mountains up to PL Banana, then transition to refit.
- RECON FOCUS: Terrain focused through Chi Badan Mountain to determine trafficability of AoA, then enemy east to PL Banana to determine locations of lead elements of 16 ACG's Covering Group.
- TEMPO: Rapid and Forceful through Chi Badan Mountains, then Deliberate and Forceful to PL Banana.
- ENGAGEMENT/DISENGAGEMENT: Engage Platoon and below level formation.

SECURITY GUIDANCE:
- CDR CONCERN: Division ability to maintain security of LOCs as 1AD conducts FPOL at PL DATE.
- FOCUS: 1AD moving between PL BANANA and PL DATE.
- DURATION: Short duration.
- ENGAGEMENT/DISENGAGEMENT: Engage all enemy units moving toward LOCs.

COMMAND AND CONTROL GUIDANCE:
- CP POSITIONING: TAC1 with ME for breakout objectives. TAC2 command and controls wet gap crossing at PL BANANA. MEB CP serves as division rear area command post (RACP). Main CP is the digital pivot point for Corps reporting.
- CDR LOCATION: Initially with Main CP to PL APPLE, then with Main Effort (ME) for the penetration to breakout objectives.
- LNO GUIDANCE: Recommend priority of LNOs as part of COA Dev Brief.
- ORDER TYPE: Draft OPORD with WFF products needed to complete annexes. Prepare but do NOT issue WARNORD 2 and 3. Prepare for at minimum: Sustainment rehearsal (RXL), combined Fires/Intel RXL, and Combined Arms RXL.

======================================================================
  CDR MA BRIEF FEEDBACK — CORRECTIONS & IMPROVEMENTS
  Staff must integrate these corrections into all future products.
======================================================================

AO BOUNDARY CORRECTION: Western AO boundary should be 1 MEF/25ID, NOT 1 MEF/I CORPS. Staff officers must catch mistakes on I CORPS products and correct them.

CIVIL CONSIDERATIONS: Address real-world mobility considerations in MA for COA DEV and how to mitigate. Include infrastructure analysis (width of roads, power lines, etc). Include agrarian considerations — harvest season, livestock, types of crops — and their impact on mobility.

WEATHER INTEGRATION: (1) Need timeline covering space and time of where we are at with weather impact. (2) Sync weather to operations: water/sustainment, water level/WGX, address periods of thermal crossover and timing of operations, space weather effects.

CROSSING SITES: Proposed crossing sites are IN ADDITION to fixed/existing bridges. For graduate-level analysis, add layer on map showing where fixed/existing bridges are. Also address tempo and resource allocation for each site.

LOCAL ENVIRONMENT: CDR expects enemy forces to locate key systems in populated areas to avoid attack and will use world media to vilify the coalition when we attack them. Identify how and when the enemy might significantly damage or destroy bridges across the Pa Sak River.

CDR INITIAL PLANNING GUIDANCE (GENERAL):
- Know 25ID HQ's role.
- Always prepare for the next phase and mitigate transitional parts between phases.
- Know yourself, know the enemy, know the OE. Staff knows 25ID/I CORPS and the enemy well. WGX area understood but need better understanding of follow-on areas.
- Help 25ID CDR see I CORPS better — what is I CORPS doing for 25ID against TCOAs.

END APPROVED MISSION ANALYSIS (REVISED)
`;

// ═══════════════════════════════════════════════════════════════════
//  APPROVED COA 1 PRODUCTS — Human staff COA Development output
//  These products are GROUND TRUTH for COA Analysis (Step 4).
//  Virtual staff must wargame/analyze COA 1 based on these products.
// ═══════════════════════════════════════════════════════════════════

const APPROVED_COA1_PRODUCTS = `
======================================================================
  25ID APPROVED COA 1 PRODUCTS — CONCENTRATED WET GAP CROSSING
  COA Development Brief + Fires + Protection + Sync Matrix
  These products were developed by human staff and approved by the CDR.
  All COA Analysis (Step 4) must be conducted against these products.
======================================================================

COA 1 TITLE: CONCENTRATED WET GAP CROSSING (PENETRATION)

COA 1 STATEMENT:
NLT D+13, 25 ID ATTACKS to seize the passes vicinity 47PQS553976 (OBJ BRONCOS) and 47PQS557871 (OBJ SEAHAWKS) in order to ALLOW 1AD to interdict the 163 and 166 BCGs.
Decisive to this operation is seizing OBJ CAT with 2x BNs — this is decisive because it allows 25 ID to build enough combat power to seize OBJ BRONCOS and SEAHAWKS. 25th ID will accomplish this by conducting a penetration.

COMMANDER'S INTENT:
Purpose: Prevent 16 ACG from establishing a frontier defense zone along the Dong Phaya Yen Mountains, setting conditions for reestablishment of Khorathidin sovereignty.
Key Tasks:
  1. Generate rapid tempo through Chi Badan Mountains to prevent enemy from targeting the Division with IDF.
  2. Prevent enemy from massing against our wet gap crossing sites.
  3. Create space East of the Dong Phaya Yen to enable 1AD generating combat power toward the East.
  4. Generate tactical deception to delay the enemy from massing against our crossing sites.
End State: 25ID seized OBJ BRONCO/SEAHAWK out to PL FIG with at least 2 Battalions. 16 ACG pushed East of PL FIG and unable to disrupt 1AD ability to maneuver out of the passes. Civilian population not disrupting 1AD movement.

======================================================================
  COA 1 TASK ORGANIZATION
======================================================================
25ID:
  DIVARTY/25ID: HHB/DIVARTY, 2-11 FA (HIMARS, 27x M142), 3-7 FA (COMP, 12x M119 + 6x M777), D/25 AV (UAS), 6-56 ADA (DivAD), D/DIVARTY (C-sUAS), 3 ASOS
  1-1 CAV: Organic
  125 MI BN: HHC/125 MI, D/125 MI (MD)
  25 SC BN: HHC/25 SC, A/25 SC, B/25 SC
  DSB/25ID: STB/DSB, 325 SPT BN (LSB)
  CAB/25ID: HHC/CAB, 1-25 AV (ATK, 24x AH-64E), 2-25 AV (AHB), 3-25 AV (AHB-M)
  158 MEB: HHC/158 MEB, 1-158 IN, 850 MP BN, 476 CML BN, 47 SPT BN

2/1AD (ABCT — attached):
  HHC/2/1AD, 1-35 AR, 2-35 IN, 1-6 IN, 4-27 FA (155-SP, 18x M109A7), 209 SPT BN, SC/2/1AD, 253 EN BN, 184 OD BN
  Attached: A/125 MI BN (A&PED), 25 SC BN elements, MFRC/3/25ID, 338 PSY CO, B/411 CA BN

3/25ID (IBCT):
  HHC/3/25ID, 2-27 IN, 2-3 IN, 5-20 IN, 3-7 FA (COMP, DS), 296 SPT BN, 36 SC CO
  Attached: C/125 MI BN (EW), A/411 CA BN, 303 PSY CO

1/2ID (SBCT — attached):
  HHC/1/2ID, 1-37 AR, 1-23 IN, 1-28 IN, 1-37 FA (155-T, 18x M777A2), 524 SPT BN (DSSB), SC/1/2ID
  Attached: B/125 MI BN (SPT), B/25 SC BN, C/411 CA BN, 316 PSY CO

Engineers: 40 EN BN, 65 EN BN, 570 EN CO (CEC-S), 937 EN CO (CEC-A)
Information: 16 PSY BN, 411 CA BN

======================================================================
  COA 1 PHASE SUMMARY
======================================================================

--- PHASE I: OCCUPY ATTACK POSITIONS (D+10 to D+12) ---
Starts With: Receipt of mission
Ends With: 25 ID established in ATK POS prepared to begin OFF OPS
ME: 1-1 CAV — T: Area Recon to PL PURPLE / P: Identify ENY COMP/DISP and potential crossing sites along PL BANANA
SE1: DIVARTY — T: Occupy and prepare PAA, plan C-Bat / P: Responsive fires for Area Recon and shaping deep
SE2: 1/2 ID — T: Occupy ATK POS IRON / P: Prepare for OFF OPS
SE3: 3/25 ID — T: Prepare / P: Prepare for OFF OPS
SE4: 2/1 AD — T: Occupy ATK POS IRON / P: Prepare for OFF OPS
SE5: 25 CAB — T: Recon / P: Prepare for OFF OPS, Support feint
SE6: 25 SUP BDE — T: Jump DSA to PL CIRCUS / P: Prepare to support OFF OPS
DP1: Transition of the main effort if tempo is reduced (3/25 ID initial ME loses tempo, 2/1 AD on standby)
Transition Conditions: PAAs established with DIVARTY, Area Recon of PL BANANA Complete, FLE Established
Support Area: DIV BOUNDARY to PL APPLE | Close Area: PL APPLE to PL BANANA | Deep Area: PL BANANA to PL CHERRY
Broad Concept: BDEs move to ATK POS. All units conduct planning/preparation including resupply CL V, III, IV. DIVARTY establishes PAAs to support 1-1 CAV. O/O 1-1 CAV LDs and begins Area Recon towards PL BANANA.
WfF: Intel — IHL: PL Cherry, O/O PL DATE. NAIs: 250,252,257,253. IMINT: UAS to identify ENY DEF POS, SUST OPs, ART POS. SIGINT: ID C2 Nodes and ARTY.
WfF: Fires — Set CF architecture, occupy PAAs, pre-position smoke, rehearse. Nothing fires for effect. Gate: all FA REDCON 1, QF confirmed, AASLT staged.
WfF: Protection — Priorities: DSA, DIV MAIN, AN/TPQ-53, HIMARS, DIV TAC. EN Priorities: Mobility, Survivability, C-Mobility.
WfF: Sustainment — Pri of Sup: III, V, I, IX. Pri of Sup: ME, SE1, SE2. Key Actions: Configure o/c logpacs; Prep FLE1, FRSD, and MCAS (-) for disp to 47PQS12168724.
WfF: C2 — Main CP (C2), TAC 1 (Prep), TAC 2 (Prep), RCP (Est), EMCON.

--- PHASE II: WET GAP CROSSING (D+13 to D+15) — DECISIVE ---
Starts With: On Order
Ends With: OBJ CAT Seized
ME: 2/1 AD — T: Seize OBJ CAT / P: Enable subsequent seizure of OBJ BRONCOS
SE1: 3/25 ID — T: Seize OBJ DOGWOOD / P: Enable 2/1 AD to Seize OBJ CAT
SE2: 1/2 ID — T: Feint along AA SMASH / P: Force 165 BCG to allocate combat power to the south
SE3: 25 CAB — T: Air Assault/Establish ABF SUSHI, PORK / P: Support 2/25 ID Seizure of OBJ DOGWOOD
SE4: DIVARTY — T: Disrupt / P: Support WGX across PL BANANA
SE5: 158 MEB — T: Support WGX w/ Traffic Control and Regulation / P: Enables OFF Ops
SE6: 1-1 CAV — T: RPOL 1/2 ID and 3/25 ID / P: Enable OFF OPS
Reserve Planning Priorities: Reinforce 3/25 ID during WGX; Reinforce 2/1 AD seizure of OBJ CAT
DP2: Re-allocation of combat power — 1/2 ID moved from southern to northern corridor to enable ME
DP3: Change in tempo based on 3 UK movement — slowing or speeding up IOT match 3 UK
Transition Conditions: OBJ CAT Seized, PAAs established, 25 CAB prepared to LD to establish ABF STEAK
Support Area: PL CIRCUS to PL APPLE | Close Area: PL APPLE to PL CHERRY | Deep Area: PL CHERRY to PL DATE
Broad Concept: BDEs begin in ATK POS along PL APPLE. O/O 1/2 ID LDs along AA SMASH to feint WGX and force 165 BCG to commit forces south. 1/2 ID crossing PL ASP triggers RPOL w/ 1-1 CAV and 3/25 to LD along AA KILL to seize OBJ CEDAR and conduct Assault Crossing. 3/25 ID crossing PL ASP triggers RPOL w/ 1-1 CAV, SEAD, air assault, 1x CAS, and 25 CAB establishing ABF SUSHI. 3/25 ID seizing OBJ Cedar triggers 2/1AD to LD along AA KILL to STAGING AREA ALPHA. 3/25 ID will cross 2/1 AD upon seizure of OBJ Dogwood to seize OBJ CAT. 2/1 AD crossing PL BIRCH triggers 25th CAB to occupy ABF PORK to support OBJ CAT seizure.
WfF: Intel — NAIs: 251,255,256,252,250. Identify location, composition, disposition of enemy DDG B/W PL CHERRY and PL Banana.
WfF: Fires — Cannons: Feint/SMK. Rockets: SEAD/CF/Shaping. AAA: Shaping/SPT WGX. CAS: Shaping.
WfF: Protection — Priorities: WGX, DIV TAC, AN/TPQ-53, HIMARS, DIV MAIN. EN Priorities: Surv, mobility, C-Mobility.
WfF: Sustainment — Pri of Sup: III, V, VIII, IX, I. Pri of Sup: ME, SE1, SE2. Key Actions: FLE1 FOC, Prep FLE 2 and ROM, primary support shifts to FLE 1.
WfF: C2 — TAC 1 (C2), TAC 2 (C2), Main CP (MVT), EMCON.

--- PHASE III: SEIZE OBJS BRONCOS AND SEAHAWKS (D+16 to D+17) ---
Starts With: OBJ CAT Seized
Ends With: OBJ BRONCOS and SEAHAWKS SEIZED
ME: 2/1 AD — T: Seize OBJ BRONCOS / P: Enable Passage of 1 AD
SE1: 1/2 ID — T: Seize OBJ SEAHAWKS / P: Enable Passage of 1 AD
SE2: 3/25 ID — T: Pass 1/2ID / P: Enable seizure of OBJ SEAHAWKS
SE3: 25 CAB — T: Establish ABF STEAK/TACO / P: Support seizure of OBJ BRONCOS
SE4: DIVARTY — T: Disrupt on OBJ BRONCOS/SEAHAWKS / P: Protect GLOCs and Critical Assets
SE5: 158 MEB — T: Support WGX w/ Traffic Control and Regulation / P: Enables OFF Ops
SE6: 1-1 CAV — T: Coordinate w/ 1 AD / P: Prepare to pass 1 AD
Reserve Planning Priorities: Reinforce seizures of OBJ BRONCOS or SEAHAWKS; Destroy ENY forces on bypassed OBJS
DP2: Re-allocation of combat power
DP3: Change in Tempo
Transition Conditions: PAAs established with DIVARTY, OBJ BRONCOS SEIZED
Support Area: PL CIRCUS to PL BANANA | Close Area: PL BANANA to PL FIG | Deep Area: PL FIG to PL GRAPE
Broad Concept: 2/1 AD establishes hasty defense on OBJ CAT and prepares for offensive ops. Establishment of internal PAAs East of PL BANANA triggers 2/1AD to seize OBJ BRONCOS. 2/1 AD crossing PL CHERRY triggers 25 CAB to occupy ABF STEAK. 1/2 ID conducts WGX IAW 25 ID DP 2, occupies OBJ CAT or MOUSE, builds 2x BNs of combat power, establishes PAAs. This triggers 1/2 ID to assault along AA HAMMER or SCREWDRIVER to seize OBJ SEAHAWKS. 1/2 ID crossing PL CHERRY triggers 25 CAB to occupy ABF TACO.
WfF: Fires — Cannons: SPT to OBJs. Rockets: Deep/interdiction tgts. AAA: Armed Recce. CAS: Close SPT to OBJs.
WfF: Protection — Priorities: Lanes DENVER, SEATTLE, WGX, AN/TPQ-53, DSA, DIV TAC. EN Priorities: Mobility, Survivability, C-Mobility.
WfF: Sustainment — Pri of Sup: III, V, VIII, IX, I. Key Actions: FLE 2 est IVO 47PQS40058449, DSA prepped for disp, ROM established.
WfF: C2 — TAC 1 (C2), TAC 2 (C2), EMCON.

--- PHASE IV: FPOL (D+18 to D+20) ---
Starts With: OBJ BRONCOS and OBJ SEAHAWKS seized
Ends With: FPOL complete
ME: 1-1 CAV — T: Pass 1 AD / P: Enable corps operations
SE1: 1/2 ID — T: Defend W of PL DATE / P: Enable Passage of 1 AD
SE2: 3/25 ID — T: Pass 1 AD / P: Enable Corps Operations
SE3: 2/1 AD — T: Defend W of PL DATE / P: Enable Passage of 1 AD
SE4: DIVARTY — T: Establish PAA / P: Support passage
SE5: 25 CAB — T: Jump AA EAST of PL Banana / P: Enables Future OPS
SE6: 158 MEB — T: Reinforce MSRs and ASRs / P: Enable passage of 1 AD
Reserve Planning Priorities: Reinforce 2/1 AD or 1/2 ID; Destroy ENY forces on bypassed OBJS
DP: Employ Reserve; PASS 1 AD North or South
Transition Conditions: 1 AD RPOL Complete, DIV Security Zone Established
Support Area: PL CIRCUS to PL BANANA | Close Area: PL BANANA to PL FIG | Deep Area: PL FIG to PL GRAPE
Broad Concept: 1/2 AD and 2/1ID establish Hasty Defense east of PL DATE. AA SMASH becomes 25 ID MSR to support jumping DSA and 25 CAB TAA IVO PL CHERRY. O/O 1-1 CAV coordinates with 1 AD in SA ALPHA to pass them through 25 ID AO. 1-1 CAV passes 1 AD then establishes screen and division security zone IVO PL FIG. 3/25 ID reconsolidates and occupies TAA STRAWBERRY.

======================================================================
  COA 1 DECISION SUPPORT MATRIX
======================================================================
DP1 — Transition of the main effort if tempo to PL BANANA is reduced
  Decision: 2/1 AD becomes main effort west of PL BANANA
  Condition: 3/25 ID initial ME loses tempo enroute to wet gap crossing, 2/1 AD on standby
  CCIR: FFIR 1, 2, 4 | Phase: 1 / D+11-13 | NAI: 250, 251, 252, 257
  Action: 3/25 conducts FPOL with 2/1 AD. 2/1 AD becomes ME.

DP2 — Re-allocation of combat power to enable the main effort
  Decision: 1/2 ID moved from southern to northern corridor
  Condition: Enemy does not retrograde in southern corridor or 1/2 ID combat power needed to ensure success
  CCIR: FFIR 1, 4, 5 | Phase: 2-3 / D+13-17 | NAI: 255, 256, 254
  Action: 1/2 ID re-allocated from southern to northern corridor.

DP3 — Change in tempo based on 3 UK movement
  Decision: Slowing or speeding up tempo IOT match 3 UK
  Condition: 3 UK moving too fast or too slow and de-syncing Corps
  CCIR: FFIR 1, 3 | Phase: 2-3 / D+13-17 | NAI: 256, 255, 253, 254
  Action: Change 25 ID tempo to match 3 UK.

DP4 — 71 ACG threatens from the North
  Decision: 1/2 ID moved north IOT provide combat power
  Condition: 71 ACG threatens tempo and combat effectiveness in northern corridor
  CCIR: PIR 5, 6 | Phase: D+12-17 | NAI: 257, 251, 253, 255, 256, 254
  Action: Re-allocate 1/2 ID from southern to northern corridor.

DP5 — 16 ACG defense collapses giving opportunity to transition to exploitation
  Decision: Transition 2/1 AD to ME immediately IOT enable combat power allocation and tempo
  Condition: 16 ACG defense collapses allowing coalition armored forces to exploit
  CCIR: PIR 1, 3 | Phase: D+12-17 | NAI: 257, 251, 253, 255, 256, 254
  Action: Transition 2/1 AD to ME.

DP6 — 16 ACG Covering Group stops Division momentum causing transition to defense
  Decision: 2/1 AD becomes ME and stabilized front line to enable preparation for defense
  Condition: 16 ACG degrades 25th ID below 80% combat power
  CCIR: PIR 1, 4, 5 | Phase: D+12-17 | NAI: 257, 251, 253, 255, 256, 254
  Action: Transition 2/1 AD to ME, stabilize FLOT and enable transition to defense.

======================================================================
  COA 1 FIRES PRODUCTS (FSEM, HPTL, AGM, TSM)
======================================================================

--- FIRE SUPPORT EXECUTION MATRIX (FSEM) ---

PH I FSCMs: 6th Army FSCL: PL AQUA | CORPS CFL: PL BANANA | DIV CFL: PL APPLE | CFZ on K2 | RFA over TF RECON positions | CZ over Recce/MTR PLT | NFAs civ infrastructure

PH I TASKS:
1. Est CF Architecture — 2-11 FA / TPQ-53 vs 1658 FA PAAs E of PL BANANA. Occupy PAA 451. Est QF channels TPQ-53 to HIMARS. CZ over Recce/MTR PLT. Trigger: NLT D+12. Effect: NEUTRALIZE. Assessment: QF confirmed <2 min.
2. Recon Fires Coord — TF RECON / 3-7 FA at K2/K3 sites NAIs 301-310. MVT to PAA 500. Zone recon to PL BANANA. RFA over RECCE positions. Trigger: Upon TF RECON crossing SP. Effect: SUPPRESS. Ammo: Pre-position 480 rds WP (400 K2 + 80 feint).
3. Occupy All FA PAAs — All FA BNs W of PL APPLE. Trigger: NLT D+12. Effect: SET. All FA REDCON 1 to DIVARTY FDC. Ammo: 155mm: 2 UBL OH per BN.
4. SEAD Planning — 3 ASOS / 2-11 FA / 1-25 AVN vs 1659 AD positions (AB0005-0020). Finalize ATO. Coord F-35 timing. Deconflict ACA CHARLIE. 1-25 AVN plans AH-64 SEAD confirm + armed overwatch post-SEAD. Trigger: ATO window opens (T-24 hrs). 4x F-35 + AH-64 plan.
5. Protect CF Radars — DIVARTY / 6-56 ADA. TPQ-53 in RPA 1 & RPA 2. Survivability positions. ADA coverage. Prep displacement to RPA 3/4 for PH II. Enduring task.
6. AVN: FARP Prep & Rehearsal — 1-25 AVN (24x AH-64) / 25 CAB. Est FARP vic PL APPLE. Rehearse SEAD confirm, armed overwatch, deep attack vs 1656 CA-BN. Deconflict with smoke screen plan — AH-64 work FLANKS of K2, not through WP screen. Trigger: NLT D+12.

PH II FSCMs: 6th Army FSCL: PL AQUA | CORPS CFL: PL BANANA, O/O PL CHERRY | DIV CFL: PL APPLE to PL BANANA | RFL: 500m K2 (until crossing complete) | RFL: 1km LZ BRONCOS | ACA CHARLIE: K2 to BRONCOS | CFZs: K2, K3, all PAAs | Smoke CSR WAIVED

PH II TASKS (DECISIVE):
1. SUPPRESS PGZ-09 (SEAD - cannon) — 4-27 FA, 1-37 FA, 3-7 FA vs 1659 AD: 18x PGZ-09 (6 PLTs x 3). 155mm HE massed, 25 rds per PLT cluster x 6 PLTs. Excalibur if >30km. Trigger: AASLT force STAGED & reports READY. Effect: SUPPRESS. Ammo: 155mm HE ~150 rds.
2. DESTROY HQ-17A (SEAD - GMLRS) EFST 2 — 2-11 FA (M31) from PAA 454 vs 6x HQ-17A. 12x M31 unitary (2 rds per site). Precision required. Trigger: PGZ-09 suppression CONFIRMED. Effect: DESTROY. Ammo: GMLRS M31: 12 rds.
3. F-35 SEAD follow-on — F-35 (4 sorties) via 3 ASOS vs surviving HQ-17A. Trigger: GMLRS complete + BDA confirms survivors. Effect: DESTROY. Confirms AVN corridor CLEAR for 25 CAB.
4. AVN: AH-64 SEAD Confirm & Overwatch — 1-25 AVN (8-12x AH-64). Confirm ADA kill on HQ-17A/PGZ-09 (30mm/Hellfire on survivors). Transition to armed overwatch of K2 crossing. Work FLANKS of smoke screen — do NOT fly through WP. Suppress EN DF positions JFO identifies. Trigger: F-35 SEAD complete + corridor assessed CLEAR. Ammo: Hellfire ~8 rds.
5. NEUTRALIZE 1658 FA (EFST 1) — 2-11 FA (HIMARS) / 45 FA BDE / TPQ-53 x4 vs SLC-2E, PLZ-52, SR-4. Destroy SLC-2E on detection. QF vs PLZ-52/SR-4. Radars: RPA 1 to RPA 3 FIRST (deep), then RPA 2 to RPA 4 (feint). Maintain K2 coverage. Trigger: CF arch SET + continuous until crossing complete. Effect: NEUTRALIZE. Ammo: GMLRS CF ~30 rds, SLC-2E 6 rds, 155mm CF ~200 rds.
6. SMOKE K2 PRIMARY (EFST 3) — 3-7 FA (6x M777) / 81mm mortars. 80 rds/hr M825 WP from PAA 505. 5-hr screen. Night crossing ~1800L; smoke covers BMNT through daylight bridge completion. Trigger: ME/breach force PREPARED TO CROSS. Effect: OBSCURE. Ammo: M825 WP: 400 rds (80 rds/hr x 5 hrs). CSR WAIVED.
7. FEINT SMOKE + HE at K3 — 1-37 FA (DS 1/2ID). 40 rds/hr WP x 2 hrs + HE from vic RPA 4. Cease smoke H+2, maintain HE on-call. Trigger: SIMULTANEOUS with K2 smoke initiation. Effect: DECEIVE. Ammo: WP 80 rds, 155mm HE ~50 rds.
8. PREP FIRES far side (EFST 4) — 4-27 FA, 1-37 FA, 2-11 FA. 155mm HE + GMLRS. Destroy EN DF on far bank. Trigger: JFO confirms smoke screen EFFECTIVE. Effect: DESTROY. Ammo: 155mm HE ~300 rds, GMLRS ~12 rds.
9. CAS ISO WGX — 3 ASOS / A-10 on-call. JAGIC. Positive ID. Trigger: Crossing force WATERBORNE / IN GAP. 2x A-10 sorties.
10. AVN: Deep Attack vs 1656 CA-BN (HPT 7) — 1-25 AVN (12-16x AH-64). Hellfire vs ZTZ-99A (priority), 30mm vs ZBD-04A. Attack EN reserve BEFORE it can mass for CK ATK on bridgehead. Coord with HIMARS interdiction fires — AH-64 attacks what GMLRS cannot fix (moving armor in complex terrain). Trigger: ISR confirms 1656 CA-BN MOVING toward K2 bridgehead. Ammo: Hellfire ~24 rds.

PH II CONDITIONS CHAIN: CF SET > AASLT STAGED > 155mm suppresses PGZ-09 > GMLRS destroys HQ-17A > F-35 confirms > AH-64 confirms + overwatch > ME PREPARED TO CROSS > SMOKE > JFO confirms screen > PREP FIRES > Force CROSSES > CAS on-call > AH-64 deep attack if reserve moves

PH III FSCMs: 6th Army FSCL: PL AQUA | CORPS CFL: O/O PL FIG | DIV CFL: PL CHERRY, O/O PL DATE | RFL: LANES DENVER/SEATTLE | RFL: DIV & BCT boundaries

PH III TASKS:
1. Prep OBJ BRONCOS — 1-37 FA, 2-11 FA. Massed 155mm + GMLRS from PAA 456/507. Trigger: Bridgehead SECURED + 1/2ID POSTURED for attack. Ammo: 155mm ~200 rds, GMLRS ~12 rds.
2. Prep OBJ SEAHAWKS — 4-27 FA, 2-11 FA. Massed 155mm SP + GMLRS from PAA 456/507. Sequential after BRONCOS. Trigger: 2/1AD POSTURED for attack. Ammo: 155mm ~200 rds, GMLRS ~12 rds.
3. AVN: Armed Recon ahead of breakout — 1-25 AVN (8-12x AH-64). Find/fix EN positions in passes. Hellfire vs hardened positions, 30mm vs dismounts/soft vehicles. On-call CAS to lead BCTs. Trigger: Prep fires COMPLETE + lead BCT crossing LD. Ammo: Hellfire ~16 rds.
4. Counterfire (cont) — 2-11 FA / TPQ-53. TPQ-53 leap-frog fwd from RPA 3/4. Enduring task. GMLRS ~18 rds.
5. Deep Interdiction — 2-11 FA (HIMARS). Extended range into passes from PAA 456/507. Trigger: Intel confirms EN movement toward passes. GMLRS ~12 rds.
6. CAS Reserve — 3 ASOS, 2x sorties: CK ATK, emergent HPT, breakout support. CDR directs.

PH IV FSCMs: 6th Army FSCL: PL AQUA | CORPS CFL: O/O PL BLUE | DIV CFL: advances E with 1AD | RFA: LANES DENVER/SEATTLE during FPOL

PH IV TASKS:
1. Deep Fires for 1AD — 2-11 FA (HIMARS). Interdict 16 ACG main body from PAA 456/507. Trigger: 1AD READY for FPOL + intel confirms EN approach. GMLRS ~24 rds.
2. AVN: Screen/Armed Recon ISO FPOL — 1-25 AVN (8x AH-64). Screen ahead of 1AD passage routes. Early warning of EN CK ATK. Hellfire vs lead armor. Handoff targeting to 1AD AVN. Trigger: 1AD begins movement to SP. Hellfire ~8 rds.
3. CF Posture — All FA / TPQ-53. Maintain CF, displace PAAs fwd. Enduring task. 155mm ~100 rds held.
4. FPOL Fire Support — All DS FA BNs. Suppression ISO 1AD passage. RFA on LANES. Trigger: 1AD crosses SP into LANE. On-call.
5. Hasty DEF Fires — All FA BNs. FPF/TRP registered. Mass vs EN CK ATK. Trigger: EN CK ATK detected. All remaining ammo.

--- CAS ALLOCATION (8 SORTIES TOTAL) ---
PRI 1: SEAD ISO AASLT — 4x F-35 (PH II) — Pre-planned. Confirms AVN corridor.
PRI 2: CAS ISO WGX — 2x A-10 (PH II) — On-call. Insurance for most vulnerable moment.
PRI 3: CDR RESERVE — 2x TBD (PH II/III) — Held. CK ATK, HPT, PH III support.

--- AH-64 TASK SUMMARY (1-25 AVN: 24x AH-64E) ---
PH I: FARP prep + rehearsal. 24 aircraft (ground). Full Hellfire load. Smoke deconfliction briefed — FLANKS only.
PH II: SEAD confirm + armed overwatch K2 (8-12 AH-64, ~8 Hellfire). Deep attack vs 1656 CA-BN reserve (12-16 AH-64, ~24 Hellfire). COORD with HIMARS interdiction.
PH III: Armed recon ahead of breakout (8-12 AH-64, ~16 Hellfire). On-call CAS to lead BCTs in passes.
PH IV: Screen ISO FPOL (8 AH-64, ~8 Hellfire). Handoff to 1AD AVN.
TOTAL HELLFIRE ESTIMATE: ~56 rds across all phases. 24 aircraft x 8-16 per = 192-384 available. Rearm at FARP.

--- HIGH PAYOFF TARGET LIST (HPTL) ---
PRI 1: HQ-17A (6x) / PGZ-09 (18x) — 1659 AD — GMLRS/F-35/AH-64 — As Acq — DESTROY — EFST 2: SEAD. Opens air corridor.
PRI 2: CF Radar SLC-2E (2x) — 1658 FA — GMLRS QF — Immediate — DESTROY — EFST 1: Blind EN arty. QF <2 min.
PRI 3: MRL SR-4 (9x) — 1658 FA — HIMARS GMLRS — As Acq — NEUTRALIZE — EFST 1: 70-130km range. Threat to DSA.
PRI 4: SP How PLZ-52 (27x) — 1658 FA — 155mm/HIMARS — As Acq — NEUTRALIZE — EFST 1: 39km range. Pre-registered K2/K3.
PRI 5: ACV ZBL-08C / YW-534 — 165 BCG MCP — Hellfire/GMLRS — As Acq — DISRUPT — Degrade coordinated defense.
PRI 6: Type 89 / Bridge Hz 21/24 — 1655 EN — Hellfire/GMLRS — Immediate — DESTROY — Destroy obstacle/reinforcement capability.
PRI 7: ZTZ-99A / ZBD-04A — 1656 CA-BN — CAS/GMLRS — As Acq — DISRUPT — Prevent CK ATK on bridgehead.

--- ATTACK GUIDANCE MATRIX (AGM) ---
PRI 1: HQ-17A/PGZ-09 — As Acq — DESTROY — Primary: HIMARS M31 — Alt: F-35/AH-64 — BDA: MQ-1C/SIGINT
PRI 2: SLC-2E Radar — Immediate — DESTROY — Primary: HIMARS QF — Alt: 155mm mass — BDA: TPQ-53 silent
PRI 3: SR-4 MRL — As Acq — NEUTRALIZE — Primary: HIMARS GMLRS — Alt: 155mm mass — BDA: MQ-1C/TPQ-53
PRI 4: PLZ-52 (27x) — As Acq — NEUTRALIZE — Primary: 155mm/HIMARS — Alt: CAS (A-10) — BDA: TPQ-53/MQ-1C
PRI 5: 165 BCG MCP — As Acq — DISRUPT — Primary: ATK AVN Hellfire — Alt: GMLRS — BDA: SIGINT degrade
PRI 6: Type 89/Bridge — Immediate — DESTROY — Primary: ATK AVN Hellfire — Alt: GMLRS — BDA: Scout/MQ-1C
PRI 7: ZTZ-99A/ZBD-04A — As Acq — DISRUPT — Primary: CAS GBU-38 — Alt: GMLRS/ATK AVN — BDA: AH-64/MQ-1C

--- TARGET SYNCHRONIZATION MATRIX (TSM) ---
TGT PRI: 1. 1659 AD  2. 1658 FA (RDR)  3. 1658 FA (MRL/Arty)  4. 165 BCG C2
COLL PRI: 1. 1658 FA positions (PIR 5)  2. 1659 AD  3. 165 BCG MCP  4. EN reserves
EFFORTS: ME: 3/25ID | SE1: 1/2ID (Feint/BRONCOS) | SE2: 2/1AD (SEAHAWKS) | SE3: 25 CAB
TSM Detail:
  1. AD: HQ-17A/PGZ-09 — Sensor: SIGINT/MQ-1C/125MI — TAI 201-203 — Indicator: ADA radar/SAM — Deliver: 2-11 FA/F-35 (M31/GBU) — Trigger: H-45 — Assess: Corridor clear
  2. FS: SLC-2E RDR — Sensor: TPQ-53/DIVARTY — NAI 305-306 — Indicator: CF emissions — Deliver: 2-11 FA (GMLRS QF) — Trigger: Radar det — Assess: Radar silent
  3. FS: SR-4 MRL — Sensor: TPQ-53/DIVARTY — TAI 301 — Indicator: MRL launch — Deliver: 2-11 FA (GMLRS) — Trigger: IDF det — Assess: <10 rds/hr
  4. FS: PLZ-52 — Sensor: TPQ-53/DIVARTY — TAI 302-304 — Indicator: Arty fire — Deliver: 4-27/2-11 (155/GMLRS) — Trigger: IDF det — Assess: <10 rds/hr
  5. C2: 165 MCP — Sensor: SIGINT/125 MI — NAI 310 — Indicator: C2 emit — Deliver: 1-25 AVN (Hellfire) — Trigger: C2 found — Assess: C2 degraded
  6. EN: Type 89/Bridge — Sensor: Scout/TF RECON — TAI 306 — Indicator: Bridge act — Deliver: 1-25 AVN (Hellfire) — Trigger: EN at gap — Assess: Route clear
  7. M2: ZTZ-99A — Sensor: GEOINT/MQ-1C — TAI 305 — Indicator: Armor move — Deliver: CAS/2-11 (GBU/GMLRS) — Trigger: Armor move — Assess: Armor halted

--- FA ORGANIZATION FOR COMBAT ---
25 DIVARTY: FFA HQ / CF HQ for 25ID. Force FA HQ, counterfire HQ, FSCM mgmt, tech fire direction.
2-11 FA: 27x M142 HIMARS (3x9) — GS to 25ID — Deep fires, CF, SEAD, shaping. 70km GMLRS, 300km ATACMS (corps).
3-7 FA (COMP): 12x M119 + 6x M777 — DS to 3/25ID — WGX smoke primary (6x M777). 155: 22/30/40km. 105: 11.5/14.5km.
1-37 FA (ATT): 18x M777A2 — DS to 1/2ID — Feint K3 (PH II), DS BRONCOS (PH III). 22/30/40km.
4-27 FA (ATT): 18x M109A7 SP — DS to 2/1AD — Armor mobility. DS SEAHAWKS (PH III). 22/30km.
6-56 ADA (ATT): M-SHORAD/Avenger — DivAD for 25ID — Protect PAAs, CPs, K2. Priority: K2, DMAIN, DSA.
D BTRY DIVARTY: LMADIS/CRAM — C-sUAS for 25ID — Counter Gp 1-3 UAS.
CORPS: 45 FA BDE (ER-GMLRS) — Reinforcing I Corps>25ID — CF HQ following 25ID. PAAs 451-458.

--- AMMO ANALYSIS ---
GMLRS (162 loaded): SEAD vs HQ-17A 12 rds + CF vs SLC-2E 6 rds + CF vs PLZ-52/SR-4 54 rds + Prep K2 12 rds + Prep BRONCOS 12 rds + Prep SEAHAWKS 12 rds + Deep interdiction 36 rds = 144 planned + 18 reserve (11%). ON-HAND: 162. PLANNED: 144. RESERVE: 18.
155mm (42x howitzers): SEAD PGZ-09 150 rds + Smoke K2 400 rds + Feint K3 130 rds + Prep K2 far side 300 rds + DS 3/25 200 rds + DS 2/1AD 350 rds + DS 1/2ID 300 rds + CF 400 rds = 2,230 total. ON-HAND: ~15,120. Expenditure: 15%.
Hellfire (24x AH-64E): SEAD confirm 8 + overwatch K2 8 + deep attack 1656 CA-BN 24 + armed recon 16 + screen FPOL 8 = 64 total. Available: 192-384. NOT a constraint. FARP CL V is limiting factor.
SMOKE: 480 rds total (400 K2 + 80 K3 feint). 80 rds/hr x 5 hrs at K2. Cessation signal: GREEN STAR CLUSTER.

--- FSCMs BY PHASE ---
FSCL: PL AQUA (static, all phases — 6th Army)
CORPS CFL: PL BANANA (PH I-II) -> O/O PL CHERRY (PH II) -> O/O PL FIG (PH III) -> O/O PL BLUE (PH IV)
DIV CFL: PL APPLE (PH I, advances w/ recon) -> PL APPLE to PL BANANA (PH II) -> PL CHERRY, O/O PL DATE (PH III) -> advances E with 1AD (PH IV)
RFL: None (PH I) | 500m K2 + 1km LZ BRONCOS + DIV/BCT boundaries (PH II) | LANES DENVER/SEATTLE + DIV/BCT boundaries (PH III) | LANES during FPOL (PH IV)
ACA: None (PH I) | ACA CHARLIE: K2 to BRONCOS, 500-1500ft AGL, AH-64 restricted to FLANKS of smoke (PH II)
CFZ: K2 + all PAAs (PH I) | K2, K3, all PAAs, CFZ 153/154 (PH II)
NFA: Religious/govt/crit infra, Pa Sak Dam (K4) (all phases) + crossing bridges (PH II+)

--- RESTRICTIONS ---
Cluster Munitions: >1% UXO W of PL BANANA: I Corps CDR. <1% W: DIV CDR. E of BANANA: All approved.
White Phosphorus: PROHIBITED near civ pop. WAIVED ISO WGX.
Unobserved Fires: O-8 CDR approval when in contact.
ATACMS / ER-GMLRS: Corps retained. 10x ATACMS. ER-GMLRS only 17/45 FA.
Scatterable Mines: 15-day: Corps. DIV: 4/48hr. No FASCAM.
Bridges: ALL on RTL. I Corps CDR to destroy.
River Velocity: WGX: 3 m/s. M1 bridge: 1.8 m/s.
Ammo: 2 UBL OH max. CSR WAIVED smoke. 480 rds (400 K2 + 80 feint). No HC. Min 2 PGM guns/BTRY.
Precision/GPS: PGM in pop areas. GPS degraded by EW 2-3hr.
CAS: 8 sorties. ATO T-24hr. 4x F-35 SEAD.
AH-64/Smoke: AH-64 work FLANKS of K2 smoke screen. Do NOT fly through WP.
ISR E of BANANA: Organic only PH I.
Southern Axis: M1 requires EN support.

--- PAA & RADAR POSITION TRACKER ---
2-11 FA (HIMARS): PAA 451 (PH I) -> PAA 454 deep / PAA 505 crossing (PH II) -> FWD to PAA 456 / PAA 507 (PH III-IV)
4-27 FA (155SP): W of PL APPLE (PH I) -> DS 2/1AD vic K2 (PH II) -> Fwd with 2/1AD (PH III-IV)
3-7 FA (COMP): W of PL APPLE + smoke pre-pos PAA 500 (PH I) -> PAA 505 smoke K2 (PH II) -> Across Pa Sak (PH III) -> Fwd with 3/25ID (PH IV)
1-37 FA (155T): W of PL APPLE (PH I) -> Feint from vic RPA 4 (PH II) -> Fwd for OBJ BRONCOS (PH III) -> Fwd with 1/2ID (PH IV)
TPQ-53 #1 (N): RPA 1 (PH I) -> FIRST to RPA 3 deep (PH II) -> Leap-frog fwd (PH III-IV)
TPQ-53 #2 (S): RPA 2 (PH I) -> Hold, then to RPA 4 (PH II) -> Leap-frog fwd (PH III-IV)
TPQ-53 #3: Depth (PH I) -> K2 coverage NO MOVE (PH II) -> Fwd as needed (PH III-IV)
TPQ-53 #4: Alternate (PH I) -> Backup (PH II) -> Fwd as needed (PH III-IV)
1-25 AVN (AH-64): FARP vic PL APPLE (PH I) -> SEAD confirm > overwatch K2 > deep atk vs reserve (PH II) -> Armed recon to OBJs, rearm at fwd FARP (PH III) -> Screen ISO FPOL (PH IV)
FARP: Est vic PL APPLE (PH I) -> Sustain AH-64 ops CL III/V push (PH II) -> FARP fwd E of Pa Sak (PH III) -> Fwd with AVN (PH IV)

======================================================================
  COA 1 PROTECTION PRIORITIZATION LIST
======================================================================

--- PHASE I: OCCUPY ATK POSITIONS ---
PRI 1: DSA — DIV support area. Req: 1x IN PLT, 1x MP SQD, 1x IFPC/FS-LIDS. Threat: Dispersed layout. Mitigation: Survivability Positions, Active Air Defense, IN SQD Securing. Unit: 158 MEB, DIVARTY.
PRI 2: Division Main CP — Essential C2 node. Req: 1x EN SQD, 1x IN, 1x IFPC. Threat: Enemy artillery targeting, EW/cyber attack, SOF infiltration. Mitigation: Survivability, redundant comms, dispersion, security perimeter. Unit: 65 EN BN, DIVARTY, 158 MEB.
PRI 3: AN/TPQ-53 Counterfire Radars (4 systems) — PAAs 401-404 (W of PL APPLE). Critical for detecting 1658 FA (27x PLZ-52, 9x SR-4). Req: 1x IFPC/M-LIDS. Threat: Enemy counterfire, SOF attack, air/UAS recon. Unit: DIVARTY.
PRI 4: 2-11 FA HIMARS Launchers (27x M142) — Dispersed PAAs W of PL APPLE. Primary deep fires/counterfire asset. Req: 1x IFPC/M-LIDS. Threat: Enemy counterfire (PLZ-52 outranges by 15km), air attack, SOF. Unit: DIVARTY.
PRI 5: Division TAC CP — 47PQS 53228 97959. Req: 1x IN PLT, 1x M-LIDS, 1x M-SHORAD. Threat: Enemy artillery targeting, EW/cyber attack, SOF. Unit: DIVARTY, 158 MEB.

--- PHASE II: WET GAP CROSSING (DECISIVE) ---
PRI 1: WGX — K2 (Chai Badan area). Single point of failure for entire division crossing. Loss stops COA 1. Req: 1x M-SHORAD BTRY, 2x MP CO. Threat: Enemy direct fire, indirect fire (1658 FA priority target), air attack, SOF assault. Mitigation: Integrated air defense, all-around security, continuous berm screen. Unit: 158 MEB, DIVARTY.
PRI 2: Division TAC — Essential C2 node for crossing operations. Req: 1x IN PLT, 1x M-LIDS, 1x M-SHORAD. Threat: Enemy artillery targeting, EW/cyber, SOF. Mitigation: Survivability, redundant comms, dispersion >100m. Unit: 158 MEB, 65 EN BN, DIVARTY.
PRI 3: AN/TPQ-53 Counterfire Radars — Repositioned PAAs 405-408 covering Pa Sak crossing areas. Req: 1x IFPC/M-LIDS. Unit: DIVARTY.
PRI 4: 2-11 FA HIMARS — Dispersed PAAs W of PL APPLE. Req: 1x IFPC/M-LIDS. Unit: DIVARTY.
PRI 4: Division Main CP — West of PL APPLE (rear area). Req: 1x IN CO, 1x IFPC. Unit: 158 MEB, DIVARTY, 65 EN BN.
PRI 5: FARPs — Aviation support essential for crossing security, lift, CAS. Req: 2x MP PLTs (perimeter), 1x ADA section per site, 1x EN SQD per site (survivability). Unit: 850 MP BN, 6-56 ADA, 65 EN BN.

--- PHASE III/IV: SEIZE OBJECTIVES / FPOL ---
PRI 1: Lanes DENVER / SEATTLE (1AD Passage Routes) — Through seized OBJ BRONCOS/SEAHAWKS to PL DATE. Critical for 1AD FPOL. Req: 1x MP CO, 1x EN CO, 1x M-SHORAD BTRY, 1x M-LIDS PLT. Threat: SOF interdiction, indirect fires, bypassed enemy, improvised obstacles. Unit: 158 MEB, DIVARTY, 65 EN BN.
PRI 2: Crossing Site — K2 (Chai Badan area). Required for 1AD heavy equipment crossing and sustained resupply. Req: 1x IFPC, 2x MP CO, 1x M-LIDS PLT. Unit: 158 MEB, DIVARTY.
PRI 3: AN/TPQ-53 Counterfire Radars — Repositioned PAAs 405-408. Req: 1x IFPC, 1x M-LIDS. Unit: DIVARTY.
PRI 4: DSA — DIV support area. Req: 1x IN PLT, 1x MP SQD, 1x IFPC/FS-LIDS. Unit: 158 MEB, DIVARTY.
PRI 5: Division Main CP — West of PL APPLE (rear area). Req: 1x IN CO, 1x IFPC. Unit: 158 MEB, DIVARTY, 65 EN BN.
PRI 6: Division TAC — Req: 1x IN PLT, 1x M-LIDS, 1x M-SHORAD. Unit: 158 MEB, 65 EN BN, DIVARTY.

======================================================================
  THREAT COA 1 — 165 BCG POSITIONAL DEFENSE
======================================================================
Mission: 165th BCG conducts a positional defense IVO Chai Badan IOT disrupt 25ID and prevent seizure of OBJ BRONCOS/SEAHAWKS through D+17.
Purpose: Delay 25ID and save time for 16 ACG and 163rd BCG to consolidate in Rear Defense Zone.
Key Tasks: Establish Reconnaissance Guard to ID/attrit 25ID HVTs W of Pa Sak River. Establish Annihilation Zones (AZ) at K2/K3. Execute EW (D/1658) to desynchronize 25ID WGX phases.
End State: 25ID delayed in Pa Sak Valley; 165th BCG retains 70%+ combat effectiveness; 16 ACG postured for offensive transition.

Defense Structure:
  Frontal Blocking Zone: 1657 Reconnaissance BN — Screen to attrite 25ID recon, identify main effort/bridging sites, force early deployment.
  Frontier Defense Zone (FDZ):
    1652 CA BN+ (Heavy — MBT 96/99) — Northern Sector/K2 Chai Badan. T: Disrupt and Fix. P: Prevent 25ID crossing via heavy armor.
    1654 CA BN+ (Medium — IFV-04, MBT 96) — Southern Sector/K3 Reservoir. T: Block. P: Deny 25ID access along RT 2256.
  Depth Defense Zone (DDZ):
    1653 CA BN+ (Heavy) — T: Destroy. P: Prevent 25ID establishing foothold from reaching OBJ BRONCOS/SEAHAWKS.
    1658 Artillery BN (PLZ-52 155mm / SR-4 122mm) — T: Suppress. P: Attrit 25ID fwd elements, mass fires on AZs at river line, counterfire vs DIVARTY.
    EW OSB — T: Electronic Attack (EA). P: Isolate 25ID lead elements from C2 and fire support via broad-spectrum jamming.
  Rear Defense Zone (RDZ):
    165th Operational Support BN — Sustainment and Engineer Support, maintain passes for 163rd BCG arrival, 3 DOS.
    1659 Air Defense Group (HQ-17A) — Protect 165th Main CP, SSB and Type 90 MRL from 25ID CAB/UAS.

ECOA Phases:
  PH I (Infil): 165 BCG crosses PL BLUE, establishes AA, 1657 Recce screens west bank Pa Sak.
  PH II (Establish Defense): Breakout from AA, 1657 pushes to FBZ edge, FDZ develops AZs, obstacles emplaced, DDG readied.
  PH III (Defense): Positional defense. 1657 withdraws, EW isolates 25ID at crossing, 155mm mass fires at crossing, ADA active. CH-91 UAS targets HPTs for 122mm rockets. O/O DDG committed to reestablish frontier defense line.
  PH IV (Transition): L/u with 163 BCG and 16 ACG. Establish secondary frontier. Prepare for future operations.

======================================================================
  COA 1 SYNC MATRIX SUMMARY
======================================================================
The sync matrix synchronizes all warfighting functions across phases:

MOVEMENT/MANEUVER:
  2/1AD: Occupy ATK POS Iron -> FPOL through 3/25ID on OBJ Cedar and Dogwood -> Seize OBJ Cat -> Seize OBJ Broncos -> BPT FPOL 1 AD elements -> Est hasty defense W of PL Date
  3/25ID: Occupy ATK POS Thunder -> Seize OBJ Cedar -> Assault across the Gap - Secure OBJ Dogwood -> Pass 1/2ID -> BPT FPOL 1AD elements -> Pass 1 AD
  1/2ID: Occupy ATK POS Indian -> Feint along AA Smash -> BPT seize OBJ Elm -> O/O movement to FPOL through 3/25ID -> Movement to OBJ Seahawks -> O/O FPOL through 2/1AD on OBJ Broncos -> BPT WGX -> Assault along AA HAMMER -> Seize OBJ Seahawks -> BPT FPOL 1AD elements -> Est hasty defense W of PL Date
  1-1 CAV: Recon to PL Purple -> O/O area recon towards PL Banana -> Coordinate w/ 1AD -> Pass 1 AD
  25 CAB: Air Assault/Establish ABF SUSHI & PORK -> Establish ABF STEAK/TACO -> Occupy ABF STEAK -> Jump AA EAST of PL Banana
  Reserve: Reinforce 3/25 ID during WGX -> Reinforce 2/1 AD seizure of OBJ CAT -> Reinforce 2/1 AD -> Destroy ENY Forces on bypassed OBJS

FIRES: Occupy and prepare PAA; plan C-Bat -> Establish PAA to support 1-1 CAV -> Support WGX w/ TCPs -> Disrupt on OBJ BRONCOS/SEAHAWKS -> Establish PAA to support passage

SUSTAINMENT: 25ID SPT BDE jump DSA to PL CIRCUS -> Configure o/c logpacs -> Establish FLE between PL APPLE and BANANA -> ID node sites fwd PL black -> Secure rear area

ENGINEER: 420EN establishes Crossing Sites 6 and 7 in vicinity of OBJ Cedar

158 MEB: Secure rear area -> Support WGX w/ traffic control -> Support WGX w/ traffic control and regulation -> Reinforce MSRs and ASRs

======================================================================
  COA EVALUATION CRITERIA (CDR APPROVED — FINAL)
======================================================================
Criteria 1: WGX Speed (Weight: 2) — The amount of time it takes to move the entire Division across the Wet Gap Crossing (WGX). Less time = more favorable.
Criteria 2: Tempo (Weight: 1) — Time it takes to seize both OBJ Broncos and OBJ Seahawks. Faster = more favorable.
Criteria 3: Force Attrition (Weight: 3) — Attrition of combat power. Lower attrition = more favorable.
Criteria 4: Concentration (Weight: 3) — The convergence of appropriate military capability in time and space to create decisive effects against the adversary while presenting multiple dilemmas. Higher combat power ratio at decisive points = more favorable.
Total Weight: 9. These are the ONLY 4 evaluation criteria.

END APPROVED COA 1 PRODUCTS
`;

// ═══════════════════════════════════════════════════════════════════
//  APPROVED COA 2 PRODUCTS — Dispersed WGX / Turning Movement
// ═══════════════════════════════════════════════════════════════════

const APPROVED_COA2_PRODUCTS = `
======================================================================
  25ID APPROVED COA 2 PRODUCTS — DISPERSED WET GAP CROSSING
  TURNING MOVEMENT — 3 CROSSING SITES (K2, K3, SITE CHARLIE)
  OPERATION PACIFIC PUGILIST — UNCLASSIFIED // FOUO TRAINING
======================================================================

────────────────────────────────────────────────────────────────
  COA 2 STATEMENT
────────────────────────────────────────────────────────────────

MISSION: NLT D+13, 25 ID ATTACKS to seize the passes vicinity 47PQS553976 (OBJ BRONCOS) and 47PQS557871 (OBJ SEAHAWKS) in order to ALLOW 1AD to interdict the 163 and 166 BCGs.

PURPOSE: Prevent 16 ACG from establishing a frontier defense zone along the Dong Phaya Yen Mountains setting the conditions for a reestablishment of Khorathidin sovereign territory.

KEY TASKS:
- Generate a rapid tempo through Chi Badan Mountains to prevent the enemy from targeting the Division with IDF
- Prevent enemy from massing against our wet gap crossing sites
- Create space East of the Dong Phaya Yen to enable 1AD generating combat power toward the East
- Generate tactical deception to delay the enemy from massing against our crossing sites

END STATE: 25ID seized OBJ BRONCO/SEAHAWK out to PL FIG with at least two Battalions. 16 ACG pushed East of PL FIG and unable to disrupt 1AD ability to maneuver out of the passes. Civilian population not disrupting 1AD movement.

────────────────────────────────────────────────────────────────
  CONCEPT STATEMENT
────────────────────────────────────────────────────────────────

Purpose: Allow 1AD to interdict the 163 and 162. 25ID will accomplish this by conducting a TURNING MOVEMENT.

DECISIVE OPERATION: Passing 2/1AD into their Area of Operations. This is decisive because it will force the DDG committal in an unexpected fashion.

ME (2/1AD) T: Seizes OBJ WASHINGTON P: To allow 1AD to interdict the 163 and 162.
SE1 (3/25) T1: Seize OBJ Washington P1: Trigger displacement of 165 DDG. T2: Pass 2/1AD P2: Allow FOM for DIV ME.
SE2 (1/2ID) T: Fix FDG 1 P: Prevent the 165 BCG from massing on DIV ME.
SE3 (1-1CAV) T: Counter Reconnaissance to PL BANANA P: Prevent attrition of BCTs.
SE4 (158MEB) T: Rear Area Security P: Deny enemy the ability to effect rear area operations.

RISK ASSUMPTION: The DIV assumes risk in 2/1AD Bypassing the FDG. The Division will mitigate this risk by withholding a Company of AH-64s in reserve.

RESERVE: 1-28IN

────────────────────────────────────────────────────────────────
  SCHEME OF MANEUVER — PHASES
────────────────────────────────────────────────────────────────

PHASE I (RECONNAISSANCE): D+13-D+15
  Begins: LD of Recon. Ends: FPOL of 3/25ID and 1/2ID at PL BIRCH (BHO).
  Main Effort: 1-1CAV.
  Critical Events: Terrain Focused Recon to PL BANANA, EST Screen along PL BANANA, Confirm Crossing Points, Deep Fires.
  Transition Criteria: Screen Est, Crossing Sites Confirmed, 3/25ID and 1/2ID occupied in ASLT POS, 50% 165 MRL destroyed, all C-FIRE RADAR destroyed.
  FSCMs: FSCL PL AQUA, CFL PL ASH (upon SP of CAV) O/O PL BIRCH, CFZs on all PAAs & crossing sites, NFAs on civ infrastructure.
  Priority of Fires: 1-1 CAV.
  Priority of Support: 1-1 CAV, DIVARTY, 3/25 ID, 2/1AD, 1/2ID.
  Priority of Supply: CL III(B), V, IX, VIII.

  FIRES PH I:
  - EFST 1: Suppress enemy ADA assets (HQ-17A/PGZ-09) — 2-11 FA GMLRS M30 + Corps 780 MI BN CEMA jam ADA radar
  - FS Task 4: Disrupt counter-fire radars (SLC-2E) and broad-spectrum jamming suites (Pole 21E, JN-1105A)
  - CEMA: Network intrusion against Azart-R2 terminals (Corps 780 MI BN cyber) — inject false info, degrade C2
  - FS Task 3: Disrupt enemy aerial recon assets — enable friendly freedom of maneuver

PHASE II (WET GAP CROSSING — 3 SITES SIMULTANEOUS): D+13-D+15 * DECISIVE *
  Begins: FPOL of 3/25ID and 1/2ID. Ends: FPOL of 2/1AD.
  Main Effort: 3/25.
  Critical Events: Seizure of Near Side, Far Side, and Exit Bank OBJs by 3/25 and 1/2. Destruction of turned FDG 2 by 25CAB. Fix of FDG 1 by 1/2ID. Division Releases OPCON of 1-1CAV back to 2/1AD.
  Transition Criteria: Exit Bank OBJs Seized. 2/1AD Occupied Far Side OBJs. Enemy CRG neutralized.
  3 CROSSING SITES: K2 (Chai Badan — ME/3/25), K3 (Pa Sak Dam — SE/2/1AD), SITE CHARLIE (south — ECOF/1/2ID).
  FSCMs: FSCL PL AQUA, CFL PL BANANA O/O PL LEMON, RFL 500m each crossing site, CFZs 153/154 active. Smoke CSR: REQUEST WAIVER (shortfall).
  Priority of Fires: 3/25 (ME), 1/2 ID, 2/1 AD.
  Priority of Support: 3/25 ID, 1/2ID, 2/1AD, DIVARTY.
  Priority of Supply: CL III(B), V, VIII, IX.

  FIRES PH II:
  - FS Task 1: Destroy enemy Fires enterprise and minelaying capabilities — 2-11 FA HIMARS + 45 FA BDE, 6x Pods M26 on CFZ ID 1658 FA POO
  - EFST 3: SMOKE — 3-7 FA 96 rds WP at K2 (4hr screen, PRIORITY site), 4-27 FA 96 rds WP at K3 (4hr screen), 1-37 FA 48 rds WP at CHARLIE (2hr screen ONLY, economy of force)
  - EFST 2: Neutralize enemy forces IVO far side K2/K3/CHARLIE — 155mm HE on EN DF positions at each crossing
  - CEMA (EFST 6 — Corps): Disrupt 16 ACG C2 architecture via OCO — Prevent 164 & 165 BCG commanders from issuing counter-attack orders during bridgehead establishment at PL BANANA

PHASE III (SEIZE OBJECTIVES — SEQUENTIAL): D+16-D+17
  Begins: FPOL of 2/1AD. Ends: Hasty Defense Est. on OBJs.
  Main Effort: 2/1AD.
  Critical Events: Seize OBJs WASHINGTON, GRANT, BRONCOS, AND SEAHAWKS. 1/2ID and 3/25ID Begin Destroying Enemy Formations in their AO.
  Transition Criteria: Hasty Defenses Est by 2/1AD.
  FSCMs: FSCL PL AQUA, CFL O/O PL CHERRY, RFL LANES DENVER/SEATTLE + DIV & BCT boundaries.
  Priority of Fires: 2/1 AD, 1/2 ID, 3/25.
  Priority of Support: 2/1AD, 1/2ID, 3/25 ID, DIVARTY.
  Priority of Supply: CL III(B), V, VIII, IX.

  FIRES PH III:
  - EFST 2: Neutralize enemy forces IVO OBJ BRONCOS — 3-7 FA + 2-11 FA, 155mm 200 rds + GMLRS 2x Pods M26
  - EFST 2: Neutralize enemy forces IVO OBJ SEAHAWKS — 4-27 FA + 2-11 FA, 155mm 200 rds + GMLRS 2x Pods M26
  - FS Task 2: Neutralize 1658 FA remnants / 1655 EN assets — 2-11 FA 3x Pods M26
  - FS Task 2: Destroy 1656 CA-BN — 1-25 AVN Hellfire + 2-11 FA 2x Pods M30 + CAS
  - CEMA (EFST 7 — Corps): Disrupt arriving Olvanan thrust maneuver groups via OCO — Prevent enemy from coordinating synchronized attacks while 1AD passes forward

PHASE IV (FOLLOW THROUGH / FPOL): D+18-D+20
  Begins: Hasty Def on OBJs SEAHAWKS and BRONCOS. Ends: O/O.
  Main Effort: 2/1AD.
  Critical Events: 1/2ID and 3/25 Destruction of all CO Sized Formations in AO. Lanes SEATTLE and DENVER Established, FPOL with 1 AD.
  FSCMs: FSCL PL AQUA, CFL O/O PL FIG, DIV CFL advances with 1AD, RFA LANES during FPOL.
  Priority of Fires: 2/1 AD, 1/2 ID, 3/25.

  FIRES PH IV:
  - Deep Fires for 1AD — 2-11 FA HIMARS 4x Pods M26 E of PL DATE vs 163/166 BCG
  - CF Posture — All FA / TPQ-53, 4x Pods M26 on EN arty remnants
  - FPOL Support — All DS FA BNs suppress LANES DENVER/SEATTLE for 1AD passage
  - Hasty DEF Fires — All FA BNs, FPF/TRP registered, mass vs EN CK ATK (Branch plan)

────────────────────────────────────────────────────────────────
  SCHEME OF FIRES (from COA 2 Statement)
────────────────────────────────────────────────────────────────

Priority of fires: PH I: 1-1 CAV; PH II: 3/25 (ME), 1/2 ID, 2/1 AD; PH III: 2/1 AD, 1/2 ID, 3/25; PH IV: No change.
FSCMs: FSCL PL AQUA. PH I: CFL PL ASH upon SP of CAV O/O BIRCH O/O PL BANANA O/O PL LEMON O/O PL CHERRY O/O FIG.
CFZs: Established over all PAAs and WGX sites.

Essential Fire Support Tasks:
  EFST 1: Suppress enemy ADA assets. Purpose: Allow freedom of maneuver for aerial assets.
  EFST 2: Neutralize enemy forces IVO OBJs. Purpose: To enable seizure of OBJs.
  EFST 3: Deny the enemy the ability to observe or affect our WGX and FPOLs. Purpose: To enable the Division to conduct a WGX and FPOLs unimpeded.
  EFST 4: Disrupt counter-fire radars (SLC-2E) and broad-spectrum jamming suites (Pole 21E, JN-1105A). Purpose: To protect crossing sites from enemy IDF from massing on pre-designated Annihilation Zones.

Fire Support Tasks:
  FS Task 1: Destroy enemy Fires enterprise and minelaying capabilities. Purpose: To enable freedom of maneuver.
  FS Task 2: Destroy enemy reserve. Purpose: To enable friendly freedom of maneuver.
  FS Task 3: Disrupt enemy aerial recon assets. Purpose: To enable friendly freedom of maneuver.

CEMA Considerations:
  Phase I: Network intrusion against Azart-R2 terminals — INDOPACOM CDR approved, executed by 780 MI BN (cyber). Purpose: Inject false info, degrade C2.
  Phase II: Disrupt the 16 ACG C2 architecture via OCO (EFST 6 Corps Task). Purpose: Prevent 164 & 165 BCG commanders from issuing counter-attack orders during bridgehead establishment.
  Phase III: Disrupt arriving Olvanan thrust maneuver groups via OCO (EFST 7 Corps Task). Purpose: Prevent enemy from coordinating synchronized attacks or establishing frontier defense zone while 1AD passes forward.

CAS: 8 sorties total. 4x F-35 pre-allocated SEAD. 2x A-10 WGX on-call (priority ME K2). 2x CDR reserve.
Airspace considerations: Unit airspace plan TBP.

────────────────────────────────────────────────────────────────
  HPTL — HIGH PAYOFF TARGET LIST (CDR DIRECTED)
────────────────────────────────────────────────────────────────

PRI 1: AIR DEFENSE — HQ-17A (6x) / PGZ-09 (18x) [1659 AD]
  Method: M31/M30 GMLRS, F-35 SEAD, Hellfire. Effect: Suppress/Destroy.
  Guidance: EFST 1 SEAD. Must suppress before ANY AVN ops across ALL 3 sites.
  PH I: DETECT (plan SEAD). PH II: *ENGAGE (EFST 1). PH III: ASSESS. PH IV: MONITOR.

PRI 2: FIRE SUPPORT — CF Radar SLC-2E (2x) [1658 FA]
  Method: GMLRS M31 QF. Effect: Destroy. Immediate engagement.
  Guidance: EFST 4. Blind EN arty. QF <2 min. Prevents CF cueing.
  PH I: DETECT. PH II: *ENGAGE (QF active). PH III: ENGAGE. PH IV: ENGAGE.

PRI 3: FIRE SUPPORT — MRL SR-4 (9x) + SP How PLZ-52 (27x) [1658 FA]
  Method: HIMARS GMLRS + 155mm massed + 45 FA BDE. Effect: Destroy (SR-4) / Suppress (PLZ-52).
  Guidance: EFST 4. SR-4 range 70-130km (DSA threat). PLZ-52 39km outranges us. Dispersed fires = must split CF response.
  PH I: DETECT. PH II: *ENGAGE (EFST 4). PH III: ENGAGE (CF). PH IV: ENGAGE.

PRI 4: C2 — Brigade/BN CPs, FDC vehicles [165 BCG HQ]
  Method: GMLRS M31, Cyber/EW. Effect: Disrupt.
  Guidance: Disrupt coordinated defense across 3 crossing sites.
  PH I: DETECT. PH II: ENGAGE if located. PH III: *ENGAGE pre-breakout. PH IV: MONITOR.

PRI 5: AERIAL RECON — Z-10 (6x), CH-91 UAS (4x), Y-8GX EW (2x) [165 BCG AVN / 1665 EW SQN]
  Method: 6-56 ADA M-SHORAD, 1-25 AVN air-to-air, D BTRY C-sUAS. Effect: Suppress/Destroy.
  Guidance: FS Task 3. Deny EN observation. Z-10 priority (armed recon + ISR). Continuous across all sites.
  PH I: DETECT. PH II: *ENGAGE (deny obs). PH III: ENGAGE. PH IV: MONITOR.

PRI 6: ENGINEER — Type 89 mine layer (4x), Z-8 mine helo (2x), DFM-1 mine rds [1655 EN BN / 1658 FA]
  Method: GMLRS M31, Hellfire, CAS GBU-39. Effect: Destroy. Immediate engagement.
  Guidance: FS Task 1. Prevent obstacle emplacement before crossing at ANY site.
  PH I: DETECT. PH II: *ENGAGE immediate. PH III: ENGAGE. PH IV: ---.

PRI 7: M2 RESERVE — ZTZ-99A (30x), ZBD-04A (40x), PLZ-05 (12x) [1656 CA-BN]
  Method: 1-25 AVN Hellfire, GMLRS DPICM, CAS CBU-105. Effect: Delay/Disrupt.
  Guidance: FS Task 2. Prevent CK ATK. 45-60 min response time from reserve positions. Only if moving toward a crossing site.
  PH I: DETECT. PH II: MONITOR. PH III: *ENGAGE if CK ATK. PH IV: ENGAGE.

────────────────────────────────────────────────────────────────
  AGM — ATTACK GUIDANCE MATRIX
────────────────────────────────────────────────────────────────

PRI 1 AD: HQ-17A/PGZ-09 — As Acq — Suppress/Destroy — Primary: Hellfire (standoff)/GMLRS M31 — Alt: F-35 SEAD/CAS — BDA: MQ-1C/SIGINT
PRI 2 FS: SLC-2E Radar — Immediate — Destroy — Primary: GMLRS M31 (QF) — Alt: Excalibur — BDA: TPQ-53 confirm
PRI 3 FS: SR-4/PLZ-52 — As Acq — Destroy/Suppress — Primary: GMLRS (SR-4)/QF 155mm (PLZ-52) — Alt: 45 FA BDE/CAS (A-10) — BDA: TPQ-53/MQ-1C
PRI 4 C2: 165 BCG CPs — As Acq — Disrupt — Primary: GMLRS M31 — Alt: Cyber/EW (125 MI) — BDA: SIGINT degrade
PRI 5 Recon: Z-10/CH-92A/Y-8GX — As Acq — Suppress/Destroy — Primary: 6-56 ADA M-SHORAD/D BTRY C-sUAS — Alt: 1-25 AVN air-to-air — BDA: ADA kill confirm
PRI 6 EN: Type 89/Z-8 mine — Immediate — Destroy — Primary: GMLRS M31/Hellfire — Alt: CAS GBU-39 — BDA: Scout/MQ-1C
PRI 7 RSV: 1656 CA-BN — As Acq — Delay/Disrupt — Primary: 1-25 AVN Hellfire — Alt: GMLRS DPICM/CAS CBU-105 — BDA: AH-64/MQ-1C

────────────────────────────────────────────────────────────────
  TSM — TARGET SYNCHRONIZATION MATRIX
────────────────────────────────────────────────────────────────

Target Priorities: 1. 1659 AD  2. SLC-2E  3. SR-4/PLZ-52  4. 165 BCG C2  5. Aerial Recon  6. Mine assets  7. Reserve
Collection Priorities: 1. 1658 FA positions  2. 1659 AD  3. 165 BCG reserve  4. Mine-laying activity
Efforts: ME 3/25ID@K2, SE 2/1AD@K3, ECOF 1/2ID@CHARLIE, AASLT 2-27 IN
CAS: 4x F-35 SEAD, 2x A-10 WGX (priority K2), 2x CDR reserve

PRI 1 AD (HQ-17A/PGZ-09): DETECT SIGINT MQ-1C/125MI TAI 201-203 -> DELIVER 2-11/F-35/1-25 AVN M31/GBU/Hellfire -> Trigger H-60 -> ASSESS Corridor clear
PRI 2 FS (SLC-2E Radar): DETECT TPQ-53 DIVARTY NAI 305-306 -> DELIVER 2-11 FA GMLRS QF -> Trigger Radar det -> ASSESS Radar silent
PRI 3 FS (SR-4/PLZ-52): DETECT TPQ-53 DIVARTY TAI 301-304 -> DELIVER 2-11/4-27/45 FA GMLRS/155 -> Trigger IDF det -> ASSESS <10 rds/hr
PRI 4 C2 (165 BCG CPs): DETECT SIGINT 125 MI NAI 310-312 -> DELIVER 2-11 FA GMLRS M31 -> Trigger C2 located -> ASSESS C2 degraded
PRI 5 Recon (Z-10/UAS): DETECT Radar/Visual 6-56 ADA NAI 401-403 -> DELIVER 6-56 ADA/D BTRY Stinger/LMADIS -> Trigger A/C detected -> ASSESS A/C downed
PRI 6 EN (Type 89/Z-8): DETECT Scout/UAS TF SABER TAI 306-308 -> DELIVER 1-25 AVN/2-11 FA Hellfire/GMLRS -> Trigger EN at gap -> ASSESS Route clear
PRI 7 RSV (1656 CA-BN): DETECT GEOINT MQ-1C TAI 305 -> DELIVER 1-25 AVN/CAS Hellfire/GBU -> Trigger Armor moves -> ASSESS Armor halted

────────────────────────────────────────────────────────────────
  FA ORGANIZATION FOR COMBAT — DISTRIBUTED BY CROSSING SITE
────────────────────────────────────────────────────────────────

25 DIVARTY: HQ — FFA HQ / CF HQ — Supports 25ID ALL sites. Distributed C2 across 3 sites.
2-11 FA: 27x HIMARS (9+9+9 distributed) — GS — Supports 25ID. DISTRIBUTED: 9x K2, 9x K3, 9x CHARLIE. Deep/CF/SEAD.
3-7 FA (COMP): 12x M119 + 6x M777 — DS — Supports 3/25ID — K2 (ME). SMOKE primary K2 (96 rds WP). DS 3/25 to OBJ BRONCOS.
1-37 FA (ATT): 18x M777A2 — DS — Supports 1/2ID — CHARLIE (ECOF). SMOKE CHARLIE (48 rds WP, 2hr only). DS 1/2ID blocking.
4-27 FA (ATT): 18x M109A7 SP — DS — Supports 2/1AD — K3 (SE). SMOKE K3 (96 rds WP). DS 2/1AD to OBJ SEAHAWKS.
6-56 ADA: M-SHORAD/Avenger — DivAD — Supports 25ID — Priority K2. HPT 5: Counter Z-10/CH-92A/Y-8GX. Distributed coverage.
D BTRY DIVARTY: LMADIS/CRAM — C-sUAS — Supports 25ID — ALL sites. Counter Gp 1-3 UAS across all 3 sites.
--- CORPS ---
45 FA BDE: ER-GMLRS — Reinforcing — I Corps>25ID — ALL sites. CF HQ following 25ID. PAAs 451-458.
17 FA BDE: ER-GMLRS — GS — I Corps — ALL sites. Force FA HQ. PAAs 171-174.

────────────────────────────────────────────────────────────────
  AMMO ANALYSIS — COA 2 DISPERSED GAP CROSSING
────────────────────────────────────────────────────────────────

GMLRS (2-11 FA: 27 HIMARS distributed 9/9/9 across 3 sites = 54/54/54 loaded):
  SEAD vs 1659 AD (M31+M30): PH II 10 rds = 10 total
  CF vs SLC-2E (QF): PH II 6 rds = 6 total (2 radars, 3 rds each)
  CF vs PLZ-52/SR-4: PH II 30 + PH III 18 + PH IV 6 = 54 total (QF ~6 rds/acq, dispersed response)
  Prep fires (3 sites): PH II 12 = 12 total (supplement 155mm at each site)
  Prep OBJ BRONCOS: PH III 12 = 12 total (H-30 before 3/25ID)
  Prep OBJ SEAHAWKS: PH III 12 = 12 total (H-15 before 2/1AD)
  Deep interdiction: PH III 12 + PH IV 24 = 36 total (interdict EN reserves, shape 1AD)
  TOTAL PLANNED: 142
  DYNAMIC RESERVE: 20 (CDR flex — distributed across sites)
  ON-HAND: 162 loaded. PLANNED: 142. REMAINING: 20 (12%). Better than COA 1 (12 rds) but still thin.

155mm CANNON (42x howitzers — DISTRIBUTED ACROSS 3 SITES):
  3-7 FA SMOKE K2 (WP): PH II 96 rds (<1 UBL) — 4hr screen, 24 rds/hr. PRIORITY site.
  4-27 FA SMOKE K3 (WP): PH II 96 rds (<1 UBL) — 4hr screen, 24 rds/hr. SP mobility helps.
  1-37 FA SMOKE CHARLIE (WP): PH II 48 rds (<0.5 UBL) — 2hr screen ONLY. Economy of force.
  ALL Prep fires 3 sites: PH II 300 rds (~2 UBL) — 100 rds per site, H-15.
  3-7 FA DS 3/25ID HE: PH II 50 + PH III 200 + PH IV 50 = 300 rds (~2 UBL) — OBJ BRONCOS prep + advance.
  4-27 FA DS 2/1AD HE: PH II 50 + PH III 200 + PH IV 100 = 350 rds (~2 UBL) — OBJ SEAHAWKS prep + hasty DEF.
  1-37 FA DS 1/2ID HE: PH II 50 + PH III 100 + PH IV 100 = 250 rds (~1.5 UBL) — Blocking positions + DEF.
  ALL Counterfire: PH II 150 + PH III 100 + PH IV 100 = 350 rds (~1 ea UBL) — Massed on TPQ-53 acquisitions.
  TOTAL 155mm: 1790 rds.
  SMOKE TOTAL: 240 rds vs 336/day CSR = 71% of daily allocation. MARGINAL. Request waiver. If denied, stagger crossings by 2hrs.

SMOKE DISTRIBUTION BY CROSSING SITE:
  K2 (ME): 3-7 FA (6x M777), 24 rds/hr, 4 hrs, 96 rds total, 100m x ~300m coverage, 81mm supplement. PRIORITY site.
  K3 (SE): 4-27 FA (M109), 24 rds/hr, 4 hrs, 96 rds total, 100m x ~300m coverage, 81mm supplement. SP mobility helps.
  CHARLIE (ECOF): 1-37 FA, 24 rds/hr, 2 hrs, 48 rds total, 100m x ~200m coverage, NO SUPPLEMENT. 2hr limit then cease.

CAS ALLOCATION: 4x F-35 SEAD, 2x A-10 WGX on-call (priority ME K2), 2x CDR reserve.

────────────────────────────────────────────────────────────────
  FSCMs & RESTRICTIONS
────────────────────────────────────────────────────────────────

FSCMs BY PHASE:
  FSCL: PL AQUA (static all phases).
  Corps CFL: PH I PL BANANA -> PH II PL BANANA O/O PL CHERRY -> PH III O/O PL FIG -> PH IV O/O PL BLUE.
  DIV CFL: PH I PL ASH (upon SP CAV) O/O PL BIRCH -> PH II PL BANANA O/O PL LEMON -> PH III PL CHERRY O/O PL DATE -> PH IV PL FIG (advances with 1AD).
  CSB: All DIV boundaries (all phases).
  RFL: PH I none -> PH II 500m radius EACH crossing site + DIV/BCT boundaries -> PH III LANES DENVER/SEATTLE + DIV/BCT boundaries -> PH IV LANES (FPOL).
  CFZ: PH I All PAAs + all 3 crossing sites -> PH II CFZ 153/154 active + CFZ on K2/K3/CHARLIE -> PH III As required -> PH IV None.
  NFA: Religious/govt/crit infra + Pa Sak Dam (K4) all phases. + crossing bridges PH II-III.

RESTRICTIONS:
  Cluster Munitions: >1% UXO W of PL BANANA = I Corps CDR approval. <1% W = DIV CDR. E of PL BANANA = All approved.
  White Phosphorus: PROHIBITED near civ pop centers. **NOT WAIVED for COA 2** — request CSR waiver for smoke.
  Unobserved Fires: O-8 CDR approval when in contact.
  ATACMS / ER-GMLRS: Corps retained. 10x ATACMS total. ER-GMLRS only 17/45 FA.
  Scatterable Mines: 15-day Corps only. DIV 4/48hr self-destruct. No FASCAM.
  Bridges (RTL): ALL bridges on RTL. I Corps CDR approval to destroy.
  River Velocity: WGX max 3 m/s. M1 bridging 1.8 m/s.
  Ammo / Smoke: 2 UBL OH max. Smoke CSR 336 rds/day vs 240 needed = MARGINAL. Request waiver. Pre-position 1 ATP per crossing site.
  Precision / GPS: PGM in populated areas. GPS degraded by EN EW 2-3hr windows.
  CAS: 8 sorties total. ATO T-24hr. 4x F-35 pre-allocated SEAD.
  ISR E of BANANA: Organic only PH I. Corps request for EAB ISR.
  **FRATRICIDE: 3 converging crossings = HIGH fratricide risk. Detailed FSCM deconfliction required between sites.**

────────────────────────────────────────────────────────────────
  SCHEME OF INTELLIGENCE
────────────────────────────────────────────────────────────────

Priority of effort: GEOINT, SIGINT, HUMINT to determine enemy operations PL GRAY to PL BLUE.
Priority of support: 3/4ID, 4CAB, 1/4ID(-), 2/4ID.
Priority of IC: Identify location/disposition of enemy forces PL GRAY-PL BLUE and elements vic OBJ EAGLE.
Gray Eagle Task 1: Identify disposition and composition of enemy units in OBJ EAGLE. Purpose: Gain better understanding of enemy forces.

Collection Priorities by Phase:
  PH I: Disposition of 1657 RECON, Traffic/Obstacles at Crossing Site, Disposition 1658 Fires, Disposition of FDGs.
  PH II: Disposition 1658 Fires bt PL BIRCH/Cherry, Disposition of FDGs, Disposition of DDG.
  PH III: Disposition of DDG, 16ACG reinforcements E of PL FIG.
  PH IV: Disposition of DDG, 16ACG reinforcements E of PL FIG.

────────────────────────────────────────────────────────────────
  SCHEME OF AIR AND MISSILE DEFENSE
────────────────────────────────────────────────────────────────

Priorities for Air Defense: WGX, DMAIN, DSA, Radars, HIMARS.
ADA Task 1 (M-SHORAD): Defend WGX. Purpose: Prevent enemy disruption of offensive operations.
ADA Task 2 (IFPC): Defend C2 and Sustainment nodes. Purpose: Prevent enemy from disrupting offensive operations.
ADA Task 3 (LIDS): Defend Radars and HIMARS. Purpose: Prevent disruption of counterfire and deep strike.

ADA Priority by Phase:
  PH I: DMAIN, DSA, FIRES. M-SHORAD attached to BCTs.
  PH II: WGX, DMAIN, FIRES. M-SHORAD attached to BCTs.
  PH III: RPOL, DMAIN, FIRES. M-SHORAD local to BCTs.
  PH IV: DMAIN, DSA, FIRES. M-SHORAD local to BCTs.

────────────────────────────────────────────────────────────────
  SCHEME OF PROTECTION
────────────────────────────────────────────────────────────────

Priority of Protection: WGX, DMAIN, Fires capabilities.
25ID Protection provides a layered protection strategy prioritizing critical crossing assets, C2 nodes, and fire support systems.
152 MEB: Secure rear area. Purpose: Enable FoM.
850MP BN: Control traffic for WGX. Purpose: Enable FoM.
476th CHEM: Conduct CBRN reconnaissance along crossing routes. Purpose: Detect possible CBRN threats.
184th OD: Conduct UXO disposal at crossing site. Purpose: Protect friendly units.
411CA: Conduct non-interference messaging. Purpose: Prevent civilian casualties.

Protection Priority by Phase:
  PH I: EN Priority SUR, MOB, C-MOB. MP area security.
  PH II: EN Priority SUR, MOB, C-MOB. MP TCPs. WGX Traffic Control.
  PH III: EN Priority MOB, SURV, C-MOB. MP Traffic.
  PH IV: EN Priority MOB, SURV, C-MOB. MP Traffic.

────────────────────────────────────────────────────────────────
  SCHEME OF ENGINEERING
────────────────────────────────────────────────────────────────

25ID ENG Recon Teams conduct engineer reconnaissance ISO 1-1CAV on WGX sites and OBS location/composition of enemy obstacles on AOA.
BCT EN BNs O/O reduce obstacles/clear routes IOT enable FoM for ME/SEs seizure of follow on OBJs.
158 MEB conducts rear area survivability operations to CPs, DSA, PAAs.
420EN BDE (DS) O/O conducts bridging operations IOT facilitate 25ID WGX and seizure of follow on OBJs.
Priority of Support: 1-1CAV, 2/1AD, 3/25ID, 1/2ID, DMAIN, DSA.
Priority of Effort: Mobility, Survivability, Counter-Mobility.

────────────────────────────────────────────────────────────────
  SCHEME OF SUSTAINMENT
────────────────────────────────────────────────────────────────

25DSB: Sustain division combat operations from DSA, establish FLE(s) as necessary. Control movements on ASR DIAMOND and ASR EMERALD.
Priority of support: 3/25ID, 2/1AD, 1/2ID, DIVARTY, then 1-1CAV.
Priority of supply: CL III, V, VIII, IX, I.
Priority of ground movement: DIVARTY, 1-1 CAV, 3/25 ID, 2/1 AD.
Supply Routes: ASR DIAMOND, ASR EMERALD, ASR RUBY.

Sustainment by Phase:
  PH I: EST FLE 1 on Near Side. Conduct resupply CL I and III(B) prior to LD. Priority: 1-1 CAV, DIVARTY, 3/25 ID, 2/1AD, 1/2ID.
  PH II: EST FLE 1 on Near Side. Priority: 3/25 ID, 1/2ID, 2/1AD, DIVARTY.
  PH III: EST FLE 2 on Far Side. Priority: 2/1AD, 1/2ID, 3/25 ID, DIVARTY.
  PH IV: DSA Jumps to FLE 2. Collapse FLE 1. Priority: 2/1AD, 1/2ID, 3/25 ID, DIVARTY.

────────────────────────────────────────────────────────────────
  SCHEME OF COMMAND AND CONTROL
────────────────────────────────────────────────────────────────

Location of Commander: 4ID CG Mobile command group located with 2/4ID.
DCG-M: Division TAC phase IIIb-c.
DCG-S: RCP throughout the operation.
CP Locations: DMAIN located vic DSA. Division TAC located vic ATK B.
C2 PACE: JBC-P, 4179 SATCOM, HF, FM.
Division-level PACE: Starshield, 5G, MILSATCOM, SC TEXT.

────────────────────────────────────────────────────────────────
  SYNC MATRIX SUMMARY
────────────────────────────────────────────────────────────────

DIVISION-LEVEL (D+13-D+20):
  PH I (D+13): Initiating Event: LD of Recon. 1-1CAV recon to PL BANANA, EST screen. 3/25 and 1/2ID occupy ASLT POS. 25 DIVARTY: 2xBTRY 2-11FA IPRTF, POF 1-1CAV.
  PH II (D+14-D+15): 3/25 and 1/2 seize Near Side/Far Side/Exit Bank OBJs. 25CAB destroy FDG 2, BPT neutralize FDG 1. 1/2ID fix FDG 1. AASLT 2x BN 3/25. 25 DIVARTY: EFST 1 suppress ADA, EFST 3 deny obs, POF 3/25 (ME).
  PH III (D+16): 2/1AD seize OBJ WASHINGTON/GRANT/BRONCOS/SEAHAWKS. 1/2ID and 3/25ID destroy enemy formations. 25CAB EST FARP E of PL BANANA. 25 DIVARTY: EFST 2 neutralize IVO OBJs, EFST 4 disrupt CF radars.
  PH IV (D+17+): 2/1AD hasty defense on OBJs. Lanes SEATTLE/DENVER established. FPOL with 1AD. DSA jumps to FLE 2.

  Transition Criteria PH I->II: Enemy MRL degraded 50%, Counter-fire destroyed, Screen est, Crossing sites confirmed, 3/25 and 1/2 occupy ASLT POS.
  Transition Criteria PH II->III: Exit Bank OBJ seized, 2/1AD occupied far side OBJ, Enemy CRG neutralized.
  Transition Criteria PH III->IV: Hasty defense established by 2/1AD.

2/1AD BCT-LEVEL:
  1-1 CAV: PH I screen PL Yellow (ME), clear PAAs. PH II released to 2/1AD. PH III screen E of OBJ. PH IV screen E boundary.
  1-35 AR (ME): Prepare -> Occupy ATK POS C -> Seize OBJ MADISON -> Fix OBJ MONROE.
  1-6 IN: Prepare -> Occupy ATK POS B -> Follow/assume SE -> Seize OBJ MADISON West.
  1-23 IN: Prepare -> Occupy SBF POS -> SBF -> Fix OBJ MONROE East.
  4-27 FA: Occupies PAAs -> DS 2/1AD through phases.
  47 BSB: BSA at ATK NORMAN -> FLE pushed to OBJ MADISON.

158 MEB: 1-158IN secure rear area. 850MP WGX traffic control. 411CA non-interference messaging (all phases).
25 DSB: CL I/III(B) resupply -> EST FLE 1 Near Side -> EST FLE 2 Far Side -> DSA jumps to FLE 2.

Risk by Phase:
  PH II: ME gets 1 Co detached — mitigated by ME gets priority of fires.
  PH III: Offensive ops against deliberate defense — mitigated by ATK aviation and overwhelming combined arms maneuver.
  PH IV: Enemy counterattack before friendly forces in position to fix — mitigated by commitment of friendly force reserve.

────────────────────────────────────────────────────────────────
  RISK TO MISSION
────────────────────────────────────────────────────────────────

Loss of tempo or unsuccessful execution of WGX reduces inability to project sufficient combat power to seize OBJ BRONCO/OBJ SEAHAWK.
DIV assumes risk in 2/1AD bypassing the FDG. Mitigated by withholding a Company of AH-64s in reserve.

────────────────────────────────────────────────────────────────
  KEY COA 2 vs COA 1 DIFFERENCES
────────────────────────────────────────────────────────────────

1. CROSSING: COA 2 uses 3 dispersed crossing sites (K2, K3, CHARLIE) vs COA 1 concentrated single site (K2).
2. MANEUVER: COA 2 is a TURNING MOVEMENT vs COA 1 PENETRATION.
3. HIMARS: COA 2 distributes 9/9/9 across 3 sites vs COA 1 massed 27 at single site.
4. SMOKE: COA 2 splits 96+96+48 = 240 rds across 3 sites vs COA 1 concentrated 400 rds at one site.
5. SMOKE CSR: COA 2 WP CSR is **NOT WAIVED** (240 vs 336 = MARGINAL, request waiver) vs COA 1 WP CSR IS WAIVED.
6. FRATRICIDE: COA 2 has **HIGH** fratricide risk from 3 converging crossings vs COA 1 lower risk at single site.
7. RESERVE: COA 2 reserve is 1-28IN vs COA 1 reserve is 1-27IN.
8. RISK: COA 2 assumes risk in 2/1AD bypassing the FDG. Mitigated by AH-64 company in reserve.
9. DECEPTION: COA 2 emphasizes tactical deception to delay enemy massing.
10. CEMA/CYBER: COA 2 has more emphasis on OCO — Corps EFSTs 6 and 7 for C2 disruption.
11. FA ORG: COA 2 distributed 155mm cannon DS to each crossing site vs COA 1 massed.
12. ECONOMY OF FORCE: COA 2 CHARLIE site gets only 2hr smoke screen and limited support.

======================================================================
END APPROVED COA 2 PRODUCTS
`;

// ═══════════════════════════════════════════════════════════════════
//  UNIT COMPOSITION & CAPABILITIES HANDBOOK — 25ID Equipment Data
// ═══════════════════════════════════════════════════════════════════

const UNIT_COMPOSITION_HANDBOOK = `
======================================================================
  25TH INFANTRY DIVISION — UNIT COMPOSITION & CAPABILITIES HANDBOOK
  Source: IPSR20_02_05 Unit Composition and Capabilities Handbook (AY26)
  THIS IS THE AUTHORITATIVE SOURCE FOR WHAT UNITS HAVE
======================================================================

This data covers ALL units in the 25ID Task Organization including organic, attached, OPCON, TACON, and DS units.
Use this data to answer ANY question about unit equipment, vehicles, personnel, weapons, or capabilities.

================================================================================
DIVISION HEADQUARTERS
================================================================================

UNIT TYPE: HHBN, DIVISION
Personnel: 498 (O-8, 154 OFF, 52 WO, 292 ENL)
Vehicles: 108 | Trailers: 80
Equipment:
  Center, Communication: 2
  Trailer, JLTV: 36
  Fuel System, MTRRS: 2
  Truck, Wrecker (W05013): 2
  Truck, Tanker: 2
  Truck, Wrecker (T63161): 1
  Trailer, Tank (Z05968): 4
  Trailer, Cargo (MTV): 8
  Trailer, Flat Bed (LMTV): 3
  Trailer, Generator: 4
  Control Station, UAS: 2
  Center, Communication (C18033): 1
  UAS, Group 3: 4
  Launcher, UAS: 2
  Transporter, UAS: 2
  Truck, Cargo (LMTV): 1
  Truck, Cargo (FMTV): 6
  JLTV, Utility: 14
  JLTV, GP: 20
  Stryker, Command (PoP): 2
  Stryker, Command: 2
  JLTV, Utility (w/Shelter): 4
  Power Plant, Medium: 8
  Power Plant, Large: 1
Crew Served Weapons:
  M249 (5.56mm): 48
  M240 (7.62mm): 10
  M2 (.50cal): 9
  MK19 (40mm): 2
Key Capabilities: Battle Staff, CUOPS-FUOPS-Plans, Signal. No field feeding, no recovery.

================================================================================
ARMORED BRIGADE COMBAT TEAM (2/1AD — attached)
================================================================================

UNIT TYPE: HHC, ARMORED BRIGADE COMBAT TEAM
Personnel: 195 (O-6, 44 OFF, 14 WO, 137 ENL)
Vehicles: 60 | Trailers: 31
Equipment:
  Stryker, NBC Recon: 3
  Control Station, UAS: 2
  Center, Communication: 1
  UAS, Group 3: 4
  Launcher, UAS: 2
  Transporter, UAS: 2
  Truck, Cargo (LMTV): 6
  Truck, Cargo (FMTV): 1
  JLTV, Utility: 17
  JLTV, GP: 15
  IFV, M2A4: 1
  AMPV, Command Post: 4
  JLTV, Utility (w/Shelter): 4
  Power Plant, Medium: 8
  Power Plant, Large: 1
Crew Served Weapons:
  M249 (5.56mm): 12
  M240 (7.62mm): 1
  M2 (.50cal): 3
Key Capabilities: Battle Staff, CUOPS-FUOPS-Plans, Signal. No field feeding.

UNIT TYPE: COMBINED ARMS BATTALION (INFANTRY) (ABCT) — for 1-6 IN, 2-35 IN
Personnel: 510 (O-5, 39 OFF, 0 WO, 471 ENL)
Vehicles: 103 | Trailers: 17
Equipment:
  IFV, M2A4: 32
  MBT, M1A2 SEPV3: 15
  AMPV, Medical Treat: 2
  AMPV, Medical Evac: 6
  AMPV, Mortar Carrier: 4
  AMPV, GP: 4
  AMPV, Command Post: 7
  Truck, Cargo (LMTV): 7
  JLTV, HGC: 5
  JLTV, GP: 13
  JLTV, Utility: 6
  Roller, Mine Clearing: 1
  Blade, Mine Clearing: 3
Crew Served Weapons:
  M249 (5.56mm): 6
  M250 (6.8mm): 36
  M240 (7.62mm): 71
  M2 (.50cal): 29
  MK19 (40mm): 5
  Javelin: 12
Key Capabilities: Combined Arms, fires & maneuver. No organic logistics.

UNIT TYPE: FORWARD SUPPORT COMPANY (INFANTRY) (ABCT) — for 1-6 IN FSC, 2-35 IN FSC
Personnel: 147 (O-3, 5 OFF, 1 WO, 141 ENL)
Vehicles: 52 | Trailers: 33
Equipment:
  Truck, HEMTT (ECHU): 3
  Truck, HEMTT (LHS): 5
  Truck, Tanker: 6
  Fuel System, Modular: 6
  Vehicle, Rec (M88A2): 6
  Truck, Wrecker (T63161): 2
  Truck, Transporter (PLS): 5
  AMPV, Command Post: 1
  JLTV, GP: 4
  JLTV, Utility: 4
  Truck, Cargo (FMTV): 7
  Truck, Cargo (LMTV): 2
  Kitchen, Assault: 3
  Kitchen, Containerized: 1
  Forward Repair System: 4
  Shop Equip, Maint: 4
  Shop, Armament Repair: 1
  Refrigerator, Container: 1
Crew Served Weapons:
  M249 (5.56mm): 17
  M240 (7.62mm): 7
  M2 (.50cal): 19
  MK19 (40mm): 2
Key Capabilities: Field Feeding, Maintenance, Recovery, Fuel.

UNIT TYPE: COMBINED ARMS BATTALION (ARMOR) (ABCT) — for 1-35 AR
Personnel: 436 (O-5, 39 OFF, 0 WO, 397 ENL)
Vehicles: 104 | Trailers: 17
Equipment:
  IFV, M2A4: 41
  MBT, M1A2 SEPV3: 14
  AMPV, Medical Treat: 2
  AMPV, Medical Evac: 8
  AMPV, Mortar Carrier: 6
  AMPV, GP: 4
  AMPV, Command Post: 8
  Truck, Cargo (LMTV): 7
  JLTV, GP: 13
  JLTV, Utility: 6
  Roller, Mine Clearing: 2
  Blade, Mine Clearing: 6
Crew Served Weapons:
  M249 (5.56mm): 6
  M250 (6.8mm): 18
  M240 (7.62mm): 101
  M2 (.50cal): 44
  MK19 (40mm): 4
  Javelin: 6
Key Capabilities: Combined Arms, heavy armor emphasis. No organic logistics.

UNIT TYPE: FORWARD SUPPORT COMPANY (ARMOR) (ABCT) — for 1-35 AR FSC
Personnel: 149 (O-3, 5 OFF, 1 WO, 143 ENL)
Vehicles: 54 | Trailers: 33
Equipment:
  Vehicle, Rec (M88A2): 6
  Truck, Wrecker (T63161): 2
  AMPV, Command Post: 1
  JLTV, GP: 4
  JLTV, Utility: 5
  Truck, Tanker: 6
  Fuel System, Modular: 6
  Truck, HEMTT (ECHU): 3
  Truck, HEMTT (LHS): 5
  Truck, Cargo (FMTV): 8
  Truck, Cargo (LMTV): 2
  Truck, Transporter (PLS): 5
  Kitchen, Assault: 3
  Kitchen, Containerized: 1
  Forward Repair System: 4
  Shop Equip, Maint: 4
  Shop, Armament Repair: 1
  Refrigerator, Container: 1
Crew Served Weapons:
  M249 (5.56mm): 18
  M240 (7.62mm): 6
  M2 (.50cal): 19
  MK19 (40mm): 3
Key Capabilities: Field Feeding, Maintenance, Recovery, Fuel.

UNIT TYPE: CAVALRY SQUADRON (ABCT) — for 1-1 CAV
Personnel: 456 (O-5, 37 OFF, 0 WO, 419 ENL)
Vehicles: 111 | Trailers: 17
Equipment:
  AMPV, Command Post: 1
  JLTV, GP: 13
  JLTV, Utility: 14
  Truck, Cargo (FMTV): 10
  Truck, HEMTT (ECHU): 5
  Truck, HEMTT (LHS): 5
  Truck, Tanker: 6
  Fuel System, Modular: 6
  Vehicle, Rec (M88A2): 6
  Truck, Wrecker (T63161): 2
  Roller, Mine Clearing: 1
  Blade, Mine Clearing: 3
Crew Served Weapons:
  M249 (5.56mm): 8
  M240 (7.62mm): 109
  M2 (.50cal): 31
  Javelin: 12
Key Capabilities: Recon & Security, combined arms. Has recovery, fuel, maintenance.
NOTE: Squadron uses M2A4 IFVs and M1A2 tanks per ABCT structure.

UNIT TYPE: FORWARD SUPPORT COMPANY (CAVALRY) (ABCT) — for 1-1 CAV FSC
Personnel: 163 (O-3, 5 OFF, 1 WO, 157 ENL)
Vehicles: 60 | Trailers: 37
Equipment:
  Truck, PLS (ECHU): 14
  Truck, Cargo (LMTV): 6
  Truck, Cargo (LWB): 11
  Truck, Cargo (FMTV): 21
  JLTV, Utility: 19
  JLTV, GP: 13
  Truck, HEMTT (ECHU): 5
  Truck, HEMTT (LHS): 16
  Truck, Tanker: 19
  Fuel System, Modular: 19
  Vehicle, Rec (M88A2): 4
  Truck, Wrecker (T63161): 3
  Kitchen, Assault: 4
  Kitchen, Containerized: 1
  Forward Repair System: 5
  Shop Equip, Maint: 5
  Shop, Armament Repair: 1
  Refrigerator, Container: 1
Crew Served Weapons:
  M249 (5.56mm): 19
  M240 (7.62mm): 8
  M2 (.50cal): 21
  MK19 (40mm): 2
Key Capabilities: Field Feeding, Maintenance, Recovery, Fuel, Signal.

UNIT TYPE: BRIGADE SUPPORT BATTALION (ABCT) (minus FSCs) — for 209 SPT BN
Personnel: 463 (O-5, 41 OFF, 10 WO, 412 ENL)
Vehicles: 186 | Trailers: 126
Equipment:
  Shelter, CBRN: 4
  Truck, Ambulance: 6
  AMPV, Medical Evac: 6
  AMPV, Medical Treat: 2
  Tank, Water (LHS) (2K): 10
  Truck, PLS (ECHU): 14
  Truck, Cargo (LMTV): 6
  Truck, Cargo (LWB): 11
  Truck, Cargo (FMTV): 21
  JLTV, Utility: 19
  JLTV, GP: 13
  Truck, HEMTT (ECHU): 5
  Truck, HEMTT (LHS): 16
  Truck, Tanker: 19
  Fuel System, Modular: 19
  Vehicle, Rec (M88A2): 4
  Truck, Wrecker (T63161): 3
  Truck, Forklift (L05024): 3
  Truck, Forklift (T73347): 5
  Recovery System, MCRS: 1
  Kitchen, Assault: 2
  Kitchen, Containerized: 1
  Refrigerator, Container: 1
Crew Served Weapons:
  M249 (5.56mm): 58
  M240 (7.62mm): 19
  M2 (.50cal): 27
  MK19 (40mm): 10
Key Capabilities: Full logistics — Field Feeding, Medical, Maintenance, Recovery, Fuel, Signal.

================================================================================
MOBILE BRIGADE COMBAT TEAM (3/25ID)
================================================================================

UNIT TYPE: HHC, MOBILE BRIGADE COMBAT TEAM
Personnel: 115 (O-6, 38 OFF, 13 WO, 64 ENL)
Vehicles: 35 | Trailers: 24
Equipment:
  Vehicle, ISV: 2
  Cmd Sys, Tactical: 4
  Truck, Utility (T56383): 20
  Truck, Cargo (LMTV): 5
  Center, Communication: 1
  Power Plant, Medium: 8
  Power Plant, Large: 1
Crew Served Weapons:
  M249 (5.56mm): 6
  M2 (.50cal): 1
Key Capabilities: Battle Staff, Signal. Light footprint, ISV-based mobility.

UNIT TYPE: INFANTRY BATTALION (MBCT) — for 2-27 IN, 2-3 IN, 5-20 IN
Personnel: 556 (O-5, 38 OFF, 0 WO, 518 ENL)
Vehicles: 112 | Trailers: 34
Equipment:
  Mortar, 81mm: 4
  Mortar, 120mm: 4
  Mortar, 60mm: 6
  Vehicle, ISV: 36
  Rifle, Recoilless (84mm): 10
  Truck, Utility (TOW): 4
  Truck, Ambulance: 8
  Truck, Cargo (LMTV): 10
  Truck, Utility (T56383): 48
  Truck, HEMTT (LHS): 5
  Truck, Tanker: 1
  Fuel System, Modular: 1
  Truck, Wrecker (W05013): 2
  Truck, Wrecker (T63161): 1
  Shelter, CBRN: 2
  Tank, Water (LHS) (2K): 2
Crew Served Weapons:
  M249 (5.56mm): 8
  M250 (6.8mm): 56
  M240 (7.62mm): 30
  M2 (.50cal): 7
  MK19 (40mm): 2
  Javelin: 35
Key Capabilities: Close combat, ISV-mobile, organic mortars (60/81/120mm), recoilless rifles, TOW.

UNIT TYPE: COMBAT LOGISTICS COMPANY (MBCT) — for IN BN CLCs
Personnel: 63 (O-3, 1 OFF, 1 WO, 61 ENL)
Vehicles: 26 | Trailers: 20
Equipment:
  Kitchen, Assault: 4
  Vehicle, ISV: 3
  Truck, Utility (T56383): 22
  Rifle, Recoilless (84mm): 2
  Truck, Utility (TOW): 4
  Truck, Cargo (LMTV): 3
  Forward Repair System: 1
  Shop Equip, Maint: 2
  Shop, Armament Repair: 1
Crew Served Weapons:
  M249 (5.56mm): 11
  M240 (7.62mm): 6
  M2 (.50cal): 8
  MK19 (40mm): 1
Key Capabilities: Dedicated battalion logistics. No medical, no recovery.

UNIT TYPE: MULTI-FUNCTIONAL RECON COMPANY (MFRC)
Personnel: 139 (O-3, 6 OFF, 5 WO, 128 ENL)
Vehicles: 36 | Trailers: 7
Equipment:
  Truck, Utility (T37588): 16
  Truck, Utility (T56383): 9
  Truck, Utility (T34704): 6
  Truck, Cargo (LMTV): 8
  Truck, Cargo (FMTV): 18
  Truck, HEMTT (ECHU): 8
  Truck, HEMTT (LHS): 19
  Truck, Tanker: 7
  Fuel System, Modular: 7
Crew Served Weapons:
  M249 (5.56mm): 9
  M250 (6.8mm): 4
  M240 (7.62mm): 1
  Javelin: 3
Key Capabilities: Reconnaissance, provides fuel/logistics capability organic to MBCT.

UNIT TYPE: LIGHT SUPPORT BATTALION (MBCT) (minus CLCs) — for 296 SPT BN
Personnel: 343 (O-5, 36 OFF, 10 WO, 297 ENL)
Vehicles: 132 | Trailers: 88
Equipment:
  Tank, Water (LHS) (2K): 8
  Truck, Ambulance: 10
  Shelter, CBRN: 6
  Kitchen, Assault: 3
  Kitchen, Containerized: 3
  Refrigerator, Container: 3
  Truck, Wrecker (W05013): 1
  Truck, Wrecker (T63161): 1
  Truck, Tractor: 5
  Semitrailer, Low Bed: 4
  Truck, Forklift (L05024): 2
  Truck, Forklift (T73347): 3
  Forward Repair System: 1
  Shop Equip, Welding: 2
  Shop Set, Metal Working: 2
Crew Served Weapons:
  M249 (5.56mm): 45
  M240 (7.62mm): 12
  M2 (.50cal): 21
  MK19 (40mm): 6
Key Capabilities: Full logistics — Field Feeding, Medical, Maintenance, Recovery, Fuel, Signal.

================================================================================
STRYKER BRIGADE COMBAT TEAM (1/2ID — attached)
================================================================================

UNIT TYPE: HHC, STRYKER BRIGADE COMBAT TEAM
Personnel: 228 (O-6, 45 OFF, 14 WO, 169 ENL)
Vehicles: 66 | Trailers: 36
Equipment:
  Stryker, NBC Recon: 3
  Stryker, Infantry (Y05002): 21
  Stryker, Infantry (J05041): 28
  Stryker, Comd (SNE/PoP): 3
  Stryker, Command: 2
  Stryker, Medical: 4
  Stryker, Mortar: 10
  Mortar, 81mm: 4
  Mortar, 60mm: 6
  M-ATV, OGPK: 6
  Detection System, Husky: 2
  Vehicle, Mine Protected: 1
  JLTV, Utility: 3
  JLTV, GP: 12
  Truck, Cargo (FMTV): 11
  Truck, Cargo (LWB): 2
Crew Served Weapons:
  M249 (5.56mm): 10
  M240 (7.62mm): 3
  M2 (.50cal): 9
Key Capabilities: Battle Staff, Signal. CBRN Recon capability.

UNIT TYPE: INFANTRY BATTALION (SBCT) — for 1-23 IN, 1-28 IN
Personnel: 634 (O-5, 36 OFF, 0 WO, 598 ENL)
Vehicles: 101 | Trailers: 24
Equipment:
  Truck, Tanker: 2
  Fuel System, Modular: 2
  Recovery System, MCRS: 1
  Truck, Wrecker (T63161): 3
  Forward Repair System: 2
  Shop Equip, Maint: 4
  Truck, Cargo (FMTV): 7
  JLTV, Utility: 8
  JLTV, GP: 2
  Truck, HEMTT (ECHU): 3
  Truck, HEMTT (LHS): 7
Crew Served Weapons:
  M249 (5.56mm): 4
  M250 (6.8mm): 54
  M240 (7.62mm): 59
  M2 (.50cal): 28
  MK19 (40mm): 14
  Javelin: 30
Key Capabilities: Close combat, Stryker-mounted infantry, organic recovery/maintenance/fuel.

UNIT TYPE: FORWARD SUPPORT COMPANY (IN) (SBCT) — for 1-23 IN FSC, 1-28 IN FSC
Personnel: 113 (O-3, 4 OFF, 1 WO, 108 ENL)
Vehicles: 40 | Trailers: 29
Equipment:
  Truck, Cargo (LWB): 11
  Truck, Cargo (FMTV): 35
  JLTV, Utility: 21
  JLTV, GP: 16
  JLTV, GP (PoP): 1
  Truck, HEMTT (ECHU): 14
  Truck, HEMTT (LHS): 26
  Kitchen, Assault: 3
  Kitchen, Containerized: 1
  Refrigerator, Container: 1
  Forward Repair System: 1 (note: combined from parent unit)
Crew Served Weapons:
  M249 (5.56mm): 14
  M240 (7.62mm): 5
  M2 (.50cal): 11
  MK19 (40mm): 2
Key Capabilities: Field Feeding, Maintenance, Recovery, Fuel, Signal.

UNIT TYPE: BRIGADE SUPPORT BATTALION (SBCT) (minus FSCs) — for 524 SPT BN
Personnel: 458 (O-5, 42 OFF, 10 WO, 406 ENL)
Vehicles: 192 | Trailers: 138
Equipment:
  Tank, Water (LHS) (2K): 10
  Vehicle, Medical (Stryker): 6
  Truck, Ambulance: 9
  Truck, Cargo (LWB): 11
  Truck, Cargo (FMTV): 35
  JLTV, Utility: 21
  JLTV, GP: 16
  Truck, HEMTT (ECHU): 14
  Truck, HEMTT (LHS): 26
  Truck, Tanker: 11
  Fuel System, Modular: 11
  Truck, Wrecker (T63161): 5
  Kitchen, Assault: 3
  Kitchen, Containerized: 1
  Refrigerator, Container: 1
  Shelter, CBRN: 7
  Truck, Forklift (L05024): 3
  Truck, Forklift (T73347): 8
  Semitrailer, Low Bed: 8
  Truck, Tractor: 8
  Recovery System, MCRS: 1
Crew Served Weapons:
  M249 (5.56mm): 60
  M240 (7.62mm): 15
  M2 (.50cal): 23
  MK19 (40mm): 8
Key Capabilities: Full logistics — Field Feeding, Medical, Maintenance, Recovery, Fuel, Signal.

================================================================================
DIVISION ARTILLERY
================================================================================

UNIT TYPE: HHB, DIVISION ARTILLERY
Personnel: 205 (O-6, 32 OFF, 11 WO, 162 ENL)
Vehicles: 59 | Trailers: 44
Equipment:
  Center, Communication: 1
  Comm, Satellite (SMART-T): 1
  Commo, JNN (WIN-T): 1
  JLTV, Utility: 15
  JLTV, HGC: 8
  JLTV, GP: 11
  Radar, Counterfire: 2
  Truck, Cargo (LMTV): 8
  Truck, Cargo (FMTV): 3
  Truck, Ambulance: 1
Crew Served Weapons:
  M240 (7.62mm): 9
  M2 (.50cal): 3
  MK19 (40mm): 4
Key Capabilities: Battle Staff, CUOPS-FUOPS-Plans, Signal, Medical, Maintenance.

UNIT TYPE: FIELD ARTILLERY BATTALION (HIMARS) (3x9) — for 2-11 FA (DIVARTY)
Personnel: 357 (O-5, 35 OFF, 1 WO, 321 ENL)
Vehicles: 142 | Trailers: 82
Equipment:
  HIMARS: 27
  Truck, HEMTT: 18
  Truck, Cargo (LMTV): 9
  Truck, Cargo (FMTV): 9
  JLTV, Utility: 1
  JLTV, GP: 3
  JLTV, Utility (w/Shelter): 3
  Truck, Tanker: 7
  Fuel System, Modular: 7
  Truck, Wrecker (T63161): 5
  Truck, Transporter (PLS): 4
  Forward Repair System: 4
  Shop Equip, Maint: 4
Crew Served Weapons:
  M249 (5.56mm): 6
  M240 (7.62mm): 46
  M2 (.50cal): 34
  MK19 (40mm): 29
Key Capabilities: Precision rocket/missile fires, HIMARS. Maintenance, Recovery, Fuel.

UNIT TYPE: FORWARD SUPPORT COMPANY (HIMARS) (3x9) — for 2-11 FA FSC
Personnel: 154 (O-3, 5 OFF, 2 WO, 147 ENL)
Vehicles: 61 | Trailers: 46
Equipment:
  Tank, Water (LHS) (2K): 2
  Truck, HEMTT (ECHU): 2
  Kitchen, Assault: 3 (note: from parent unit)
  Kitchen, Containerized: 1
  Shop, Armament Repair: 1
Crew Served Weapons:
  M249 (5.56mm): 19
  M240 (7.62mm): 10
  M2 (.50cal): 19
  MK19 (40mm): 4
Key Capabilities: Dedicated logistics for HIMARS BN. Field Feeding, Maintenance, Recovery, Fuel.

UNIT TYPE: FIELD ARTILLERY BATTALION (155T) with FSC — for 1-37 FA
Personnel: 588 (O-5, 50 OFF, 4 WO, 534 ENL)
Vehicles: 157 | Trailers: 97
Equipment:
  Howitzer, 155T: 18
  Stryker, Fire Support: 9
  Stryker, Medical: 3
  Stryker, Command (PoP): 1
  Stryker, Infantry (J05041): 8
  JLTV, Commo: 6
  Truck, Cargo (FMTV): 32
  Truck, Cargo (MHE): 18
  JLTV, Utility: 19
  JLTV, GP: 26
  Radar, LCMR: 4
  Radar, Counterfire: 2
  Truck, Wrecker (T63161): 3
  Truck, HEMTT (LHS): 7
  Truck, HEMTT (ECHU): 3
  Kitchen, Assault: 3
  Kitchen, Containerized: 1
  Refrigerator, Container: 1
Crew Served Weapons:
  M249 (5.56mm): 20
  M240 (7.62mm): 44
  M2 (.50cal): 44
  MK19 (40mm): 28
Key Capabilities: 155mm towed cannon fires, Stryker-mounted. Includes organic FSC.

UNIT TYPE: FIELD ARTILLERY BATTALION (155SP) with FSC — for 4-27 FA
Personnel: 648 (O-5, 55 OFF, 5 WO, 588 ENL)
Vehicles: 200 | Trailers: 91
Equipment:
  Howitzer, 155SP (H05013): 18
  Fire Support, M7A4: 13
  Carrier, Ammunition: 18
  Truck, PLS: 18
  AMPV, Command Post: 15
  JLTV, GP: 42
  JLTV, Utility: 51
  Truck, Cargo (LMTV): 9
  Truck, Cargo (FMTV): 7
  Radar, Counterfire: 2
  Vehicle, Rec (M88A2): 4
  Truck, Wrecker (T63161): 2
  Truck, Tanker: 3
  Fuel System, Modular: 3
  Truck, Transporter (PLS): 14
  Kitchen, Assault: 3
  Kitchen, Containerized: 1
  Refrigerator, Container: 1
Crew Served Weapons:
  M249 (5.56mm): 25
  M240 (7.62mm): 40
  M2 (.50cal): 54
  MK19 (40mm): 36
Key Capabilities: 155mm self-propelled cannon fires, M109-series. Includes organic FSC.

UNIT TYPE: FIELD ARTILLERY BATTALION (COMP) with FSC — for 3-7 FA
Personnel: 624 (O-5, 52 OFF, 4 WO, 568 ENL)
Vehicles: 177 | Trailers: 110
Equipment:
  Howitzer, 155T: 6
  Howitzer, 105T: 12
  JLTV, Utility: 51
  JLTV, GP: 42
  JLTV, GP (SNE/PoP): 7
  Truck, Cargo (FMTV): 17
  Truck, Cargo (MHE): 18
  Truck, Cargo (LMTV): 10
  Radar, LCMR: 4
  Radar, Counterfire: 2
  Truck, HEMTT (LHS): 6
  Truck, Wrecker (W05013): 2
  Truck, HEMTT (ECHU): 2
  Fuel System, Modular: 4
  Kitchen, Assault: 3
  Kitchen, Containerized: 1
  Refrigerator, Container: 1
Crew Served Weapons:
  M249 (5.56mm): 20
  M240 (7.62mm): 46
  M2 (.50cal): 32
  MK19 (40mm): 26
Key Capabilities: Composite cannon fires (155T + 105T), Stryker-mounted. Includes organic FSC.

UNIT TYPE: ADA BATTALION (DIVAD) — for 6-56 ADA
Personnel: 810 (O-5, 47 OFF, 15 WO, 748 ENL)
Vehicles: 322 | Trailers: 210
Equipment:
  Launcher, Patriot: 24
  Radar, Patriot: 4
  ECS, Patriot: 4
  Power Plant, Patriot: 4
  Truck, Antenna Mast: 4
  Radar, Sentinel: 16
  AD, FS-LIDS: 12
  Truck, Tractor (HEMTT): 28
  JLTV, Utility: 15
  JLTV, GP: 19
  JLTV, HGC: 17
  Truck, Cargo (LMTV): 18
  Truck, Cargo (FMTV): 11
  Truck, Cargo (MHE): 14
  Truck, Cargo (LWB): 11
  Truck, Cargo (LHS): 12
  Stryker, Medical: 6
  Truck, Tanker: 11
  Fuel System, Modular: 11
  Truck, Wrecker (T63161): 4
  Truck, PLS (ECHU): 12
  Truck, PLS (T55236): 26
  Truck, HEMTT (T59532): 9
  Fuel System, MTRRS: 5
Crew Served Weapons:
  M249 (5.56mm): 125
  M240 (7.62mm): 67
  M2 (.50cal): 36
  MK19 (40mm): 19
Key Capabilities: Division Air Defense. Patriot launchers, Sentinel radars, FS-LIDS. Full logistics.

UNIT TYPE: ADA BATTERY (C-sUAS) — for D/DIVARTY
Personnel: 114 (O-3, 5 OFF, 2 WO, 107 ENL)
Vehicles: 59 | Trailers: 25
Equipment:
  Launcher, Transporter: 6
  Radar, THAAD: 1
  Launch Unit, THAAD: 1
  Ops Station, THAAD: 1
  JLTV, GP: 3
  Center, Communication: 1
  Truck, HEMTT (T59532): 4
  Truck, PLS (T55236): 4
  Truck, HEMTT (LHS): 3
  Truck, Mobile Support: 2
Crew Served Weapons:
  M249 (5.56mm): 34
  M240 (7.62mm): 6
  M2 (.50cal): 9
  MK19 (40mm): 4
Key Capabilities: Counter-small UAS defense.

================================================================================
COMBAT AVIATION BRIGADE (25 CAB)
================================================================================

UNIT TYPE: HHC, COMBAT AVIATION BRIGADE
Personnel: 193 (O-6, 42 OFF, 21 WO, 130 ENL)
Vehicles: 44 | Trailers: 33
Equipment:
  UAS, Group 3: 8
  Launcher, UAS: 6
  Transporter, UAS: 6
  Truck, Cargo (LMTV): 14
  Truck, Cargo (FMTV): 10
  JLTV, Utility: 12
  JLTV, GP: 16
Crew Served Weapons:
  M249 (5.56mm): 6
  M2 (.50cal): 1
  MK19 (40mm): 2
Key Capabilities: Battle Staff, Signal, UAS capability. Field Feeding, Maintenance, Recovery, Fuel.

UNIT TYPE: ATTACK HELICOPTER BATTALION — for 1-25 AVN
Personnel: 400 (O-5, 33 OFF, 51 WO, 316 ENL)
Vehicles: 98 | Trailers: 67
Equipment:
  Helicopter, AH-64EV6: 24
  Control Station, UAS: 3
  Truck, Tanker: 11
  Fuel System, Modular: 6
  Crane, Wheeled: 1
  Crane, Self-propelled: 1
  Truck, HEMTT (LHS): 9
  Truck, HEMTT (ECHU): 1
  Truck, Wrecker (T63161): 1
  Truck, Wrecker (W05013): 1
  Truck, Forklift (L05024): 2
  Truck, Forklift (T73347): 2
  Towing System, Aircraft: 3
Crew Served Weapons:
  M249 (5.56mm): 34
  M240 (7.62mm): 14
  M2 (.50cal): 14
  MK19 (40mm): 5
Key Capabilities: 24x AH-64E attack helicopters. Maintenance, Recovery, Fuel.

UNIT TYPE: ASSAULT HELICOPTER BATTALION — for 2-25 AVN
Personnel: 433 (O-5, 32 OFF, 65 WO, 336 ENL)
Vehicles: 84 | Trailers: 60
Equipment:
  Helicopter, UH-60M: 24
  Helicopter, CH-47F: 8
  Truck, Tanker: 13
  Fuel System, Modular: 10
  Crane, Wheeled: 1
  Crane, Self-propelled: 1
  Truck, HEMTT (LHS): 9 (combined from pages)
  Truck, HEMTT (ECHU): 1
  Truck, Wrecker (T63161): 1
  Truck, Wrecker (W05013): 1
  Truck, Forklift (L05024): 2
  Truck, Forklift (T73347): 2
  Towing System, Aircraft: 3
Crew Served Weapons:
  M249 (5.56mm): 31
  M240 (7.62mm): 80
  M2 (.50cal): 13
  MK19 (40mm): 6
Key Capabilities: 24x UH-60M + 8x CH-47F. Air assault & air movement. Maintenance, Recovery, Fuel.

UNIT TYPE: ASSAULT HELICOPTER BATTALION - MEDEVAC — for 3-25 AVN
Personnel: 627 (O-5, 45 OFF, 94 WO, 488 ENL)
Vehicles: 108 | Trailers: 79
Equipment:
  Helicopter, CH-47: 8
  Helicopter, HH60M (MEDEVAC): 12
  Helicopter, UH-60M: 24
  Truck, Tanker: 18
  Fuel System, Modular: 11
  Crane, Wheeled: 1
  Crane, Self-propelled: 1
  Truck, HEMTT (ECHU): 1
  Truck, Wrecker (T63161): 1
  Truck, Wrecker (W05013): 1
  Truck, Forklift (L05024): 2
  Truck, Forklift (T73347): 2
  Towing System, Aircraft: 4
Crew Served Weapons:
  M249 (5.56mm): 33
  M240 (7.62mm): 81
  M2 (.50cal): 14
  MK19 (40mm): 7
Key Capabilities: 24x UH-60M + 12x HH-60M MEDEVAC + 8x CH-47. MEDEVAC, air assault, air movement.

UNIT TYPE: GRAY EAGLE UAS COMPANY (MQ-1C) — for D/25 AVN
Personnel: 105 (O-4, 2 OFF, 8 WO, 95 ENL)
Vehicles: 42 | Trailers: 27
Equipment:
  UAS, MQ-1C: 8
  Ground Control Station: 4
  Control Station, UAS (M05046): 1
  Truck, Cargo (MHE): 6
  Truck, Cargo (FMTV): 10
  Truck, Cargo (LMTV): 2
  JLTV, Utility: 5
  JLTV, GP: 4
  Truck, HEMTT (LHS): 2
  Truck, Wrecker (T63161): 1
  Truck, Tractor: 6
  Satellite, Ground Term: 2
  Towing System, Aircraft: 2
Crew Served Weapons:
  M249 (5.56mm): 17
  M2 (.50cal): 3
Key Capabilities: 8x MQ-1C Gray Eagle UAS. ISR/Strike. Maintenance, Recovery, Fuel.

UNIT TYPE: AVIATION SUPPORT BATTALION (CAB) — for 209 BSB (CAB)
Personnel: 533 (O-5, 28 OFF, 18 WO, 487 ENL)
Vehicles: 143 | Trailers: 111
Equipment:
  Truck, Ambulance: 2
  Truck, HEMTT (LHS): 12
  Truck, Cargo (LMTV): 15
  Truck, Cargo (FMTV): 21
  JLTV, Utility: 23
  JLTV, GP: 14
  Loader, Scoop Type: 1
  Crane, Wheeled: 2
  Crane, Self-propelled: 1
  Truck, Wrecker (W05013): 2
  Truck, Forklift (L05024): 4
  Truck, Forklift (T73347): 6
  Truck, Tractor: 20
  Tank, Water (LHS) (2K): 15
  Water Purification: 1
  Fuel System, Modular: 6
  Fuel System, 120K: 1
  Truck, Tanker: 8
  Truck, Wrecker (T63161): 1
  Truck, HEMTT (ECHU): 5
  Towing System, Aircraft: 4
Crew Served Weapons:
  M249 (5.56mm): 65
  M240 (7.62mm): 16
  M2 (.50cal): 18
  MK19 (40mm): 9
Key Capabilities: Full logistics for CAB — Field Feeding, Medical, Maintenance, Recovery, Fuel, Signal.

================================================================================
DIVISION SUSTAINMENT BRIGADE (25 DSB)
================================================================================

UNIT TYPE: DIVISION SUSTAINMENT BRIGADE (with SMC)
Personnel: 421 (O-6, 54 OFF, 29 WO, 338 ENL)
Vehicles: 109 | Trailers: 71
Equipment:
  Truck, Utility (T37588): 40
  Truck, Utility (T56383): 15
  Truck, Cargo (LMTV): 7
  Truck, Cargo (FMTV): 7
  Truck, Cargo (LWB): 6
  Truck, Transporter (PLS): 3
  Truck, Wrecker (W05013): 4
  Truck, Wrecker (T63161): 2
  Van, Expandable: 8
  Truck, Ambulance: 2
  Crane, Wheeled: 1
  Fuel System, MTRRS: 2
  Forward Repair System: 3
  Shop Equip, Maint: 7
  Recovery System, MCRS: 1
Crew Served Weapons:
  M249 (5.56mm): 48
  M240 (7.62mm): 12
  M2 (.50cal): 14
  MK19 (40mm): 7
Key Capabilities: C2 for sustainment units. Medical, Maintenance, Recovery, Fuel, Signal.

UNIT TYPE: DIVISION SUSTAINMENT SUPPORT BATTALION (LIGHT) — for 524 SPT BN (DSSB)
Personnel: 700 (O-5, 23 OFF, 8 WO, 669 ENL)
Vehicles: 310 | Trailers: 217
Equipment:
  Tank, Water (LHS) (2K): 30
  Supply System, Water: 2
  Water Purification: 4
  Water Distribution: 1
  Truck, PLS (ECHU): 80
  Truck, HEMTT (LHS): 21
  Truck, HEMTT (ECHU): 3
  Truck, Tanker: 38
  Fuel System, Modular (T20131): 50
  Fuel System, 120K: 2
  Fuel System, 300K: 1
  Fuel System, MTRRS: 2
  Distribution, Fuel (TFDS): 12
  M-ATV, OGPK: 7
  M-ATV, CROWS: 14
  Refrigerator, Container: 48
  Truck, Cargo (FMTV): 31
  Truck, Cargo (LMTV): 14
  Truck, Tractor: 23
  Truck, Wrecker (T63161): 5
  Truck, Forklift (L05024): 10
  Truck, Forklift (T73347): 10
  Handler, RTCH II: 2
  Crane, All Terrain: 1
  Semitrailer, Low Bed: 6
Crew Served Weapons:
  M249 (5.56mm): 86
  M240 (7.62mm): 48
  M2 (.50cal): 71
  MK19 (40mm): 29
Key Capabilities: Full distribution — supply, fuel, water, ammunition. Medical, Maintenance, Recovery.

UNIT TYPE: COMPOSITE SUPPLY COMPANY (DIVISION) — for QM companies
Personnel: 235 (O-3, 6 OFF, 4 WO, 225 ENL)
Vehicles: 98 | Trailers: 68
Equipment:
  Supply System, Water: 2
  Water Purification: 4
  WSDS, 100K: 1
  Tank, Water (LHS) (2K): 30
  Fuel System, 120K: 2
  Fuel System, 300K: 1
  Fuel System, Modular (T20131): 20
  Fuel System, MTRRS: 1
  Distribution, Fuel (TFDS): 12
  Refrigerator, Container: 48
  Handler, RTCH II: 2
  Truck, HEMTT (LHS): 12
  Truck, HEMTT (ECHU): 3
  Truck, Tractor: 18
  Truck, Tanker: 6
  Truck, Cargo (LMTV): 4
  Truck, Cargo (FMTV): 4
  Truck, Forklift (L05024): 6
  Truck, Forklift (T73347): 4
  Truck, Wrecker (T63161): 1
  Truck, Transporter (PLS): 2
  JLTV, Utility: 9
  JLTV, GP: 4
Crew Served Weapons:
  M249 (5.56mm): 27
  M240 (7.62mm): 16
  M2 (.50cal): 13
  MK19 (40mm): 6
Key Capabilities: Supply, fuel, water distribution. No field feeding, no medical.

UNIT TYPE: COMPOSITE TRUCK COMPANY (DIVISION) (LIGHT)
Personnel: 260 (O-3, 1 OFF, 1 WO, 258 ENL)
Vehicles: 135 | Trailers: 107
Equipment:
  Truck, PLS (ECHU): 80
  M-ATV, OGPK: 7
  M-ATV, CROWS: 14
  Truck, Cargo (FMTV): 22
  Truck, Cargo (LMTV): 2
  Truck, Tanker: 2
  Truck, Wrecker (T63161): 2
  Truck, Transporter (PLS): 1
  Forward Repair System: 1
Crew Served Weapons:
  M249 (5.56mm): 31
  M240 (7.62mm): 22
  M2 (.50cal): 49
  MK19 (40mm): 20
Key Capabilities: Transportation, convoy security. PLS-based distribution. Maintenance, Recovery, Fuel.

UNIT TYPE: FIELD FEEDING COMPANY (EAB) — for 569 QM CO (FF) if applicable
Personnel: 152 (O-3, 4 OFF, 1 WO, 147 ENL)
Vehicles: 40 | Trailers: 39
Equipment:
  Kitchen, Trailer: 16
  Kitchen, Assault: 4
  Refrigerator, Container: 8
  Truck, Cargo (LMTV): 33
  JLTV, Utility: 1
  JLTV, GP: 4
  Truck, Wrecker (W05013): 1
Crew Served Weapons:
  M249 (5.56mm): 23
  M240 (7.62mm): 3
  M2 (.50cal): 18
Key Capabilities: Field feeding operations for supported units.

================================================================================
MANEUVER ENHANCEMENT BRIGADE (158 MEB)
================================================================================

UNIT TYPE: HSC, MANEUVER ENHANCEMENT BRIGADE
Personnel: 244 (O-6, 65 OFF, 15 WO, 164 ENL)
Vehicles: 73 | Trailers: 48
Equipment:
  Center, Communication: 1
  JLTV, Utility: 14
  JLTV, GP: 6
  JLTV, Utility (w/Shelter): 4
  Truck, Cargo (LMTV): 10
  Truck, HEMTT (ECHU): 1
  Truck, HEMTT (LHS): 3
  Truck, Tanker: 1
  Fuel System, Modular: 1
  Truck, Wrecker (T63161): 1
  Truck, Wrecker (W05013): 1
  Truck, Transporter (PLS): 1
  Truck, Ambulance: 2
  Truck, Forklift (L05024): 3
  Semitrailer, Low Bed: 1
  Forward Repair System: 1
Crew Served Weapons:
  M249 (5.56mm): 25
  M240 (7.62mm): 1
  M2 (.50cal): 8
  MK19 (40mm): 5
Key Capabilities: Support area operations, maneuver support. C2 for attached EN, MP, CML, ORD units.

================================================================================
ENGINEERS (420 EN BDE — OPCON to 25ID)
================================================================================

UNIT TYPE: HHC, ENGINEER BRIGADE
Personnel: 125 (O-6, 30 OFF, 8 WO, 87 ENL)
Vehicles: 29 | Trailers: 16
Equipment:
  Fighting Vehicle, M2A3: 1
  Carrier, Command Post: 1
  Vehicle, Rec (M88A1): 1
  JLTV, Utility: 8
  JLTV, GP: 8
  Truck, Cargo (LMTV): 9
  Truck, Cargo (FMTV): 2
  Truck, Cargo (LWB): 1
  Truck, Wrecker (W05013): 1
  Truck, Wrecker (T63161): 1
  Truck, Transporter (PLS): 1
  Forward Repair System: 1
Crew Served Weapons:
  M249 (5.56mm): 13
  M2 (.50cal): 1
  MK19 (40mm): 2
Key Capabilities: C2 for 3-5 engineer battalions. Battle Staff, Maintenance, Recovery, Signal.

UNIT TYPE: ENGINEER BATTALION — for 65 EN BN, 253 EN BN
Personnel: 149 (O-5, 22 OFF, 5 WO, 122 ENL)
Vehicles: 51 | Trailers: 30
Equipment:
  JLTV, Utility: 10
  JLTV, GP: 8
  Truck, Cargo (LMTV): 9
  Truck, Cargo (FMTV): 2
  Truck, Cargo (LWB): 1
  Truck, HEMTT (LHS): 3
  Truck, HEMTT (ECHU): 3
  Truck, Ambulance: 2
  Truck, Tanker: 12
  Fuel System, Modular: 2
  Truck, Wrecker (W05013): 1
  Truck, Wrecker (T63161): 1
  Truck, Transporter (PLS): 1
  Forward Repair System: 1
  Shop, Armament Repair: 1
Crew Served Weapons:
  M249 (5.56mm): 22
  M240 (7.62mm): 11
  M2 (.50cal): 12
  MK19 (40mm): 1
Key Capabilities: Mobility, counter-mobility, survivability, general engineering. Medical, Maintenance, Recovery.

UNIT TYPE: ENGINEER BATTALION - WHEEL — for 40 EN BN
Personnel: 145 (O-5, 22 OFF, 5 WO, 118 ENL)
Vehicles: 50 | Trailers: 30
Equipment:
  (Same structure as Engineer Battalion but wheeled variant)
  JLTV, Utility: 10
  JLTV, GP: 8
  Truck, Cargo (LMTV): 9
  Truck, Cargo (FMTV): 2
  Truck, Cargo (LWB): 1
  Truck, HEMTT (LHS): 3
  Truck, HEMTT (ECHU): 3
  Truck, Ambulance: 2
  Truck, Tanker: 6
  Truck, Wrecker (W05013): 1
  Truck, Wrecker (T63161): 1
  Truck, Transporter (PLS): 1
  Forward Repair System: 1
  Shop, Armament Repair: 1
Crew Served Weapons:
  M249 (5.56mm): 21
  M240 (7.62mm): 10
  M2 (.50cal): 12
  MK19 (40mm): 1
Key Capabilities: Same as EN BN but wheeled platform. Medical, Maintenance, Recovery.

UNIT TYPE: COMBAT ENGINEER COMPANY - ARMOR (CEC-A) — for 40 EN BN elements
Personnel: 130 (O-3, 5 OFF, 0 WO, 125 ENL)
Vehicles: 43 | Trailers: 12
Equipment:
  Assault Breacher Vehicle (w/FWMP): 3
  Carrier, Bridge: 4
  Fighting Vehicle, M2A3: 9
  Carrier, Command Post: 1
  Truck, Tractor (LET): 4
  Semitrailer, Low Bed (S05083): 4
  Tractor, Low Speed (T05116): 2
  Tractor, Low Speed (T05115): 2
  Truck, Dump: 2
  JLTV, Utility: 4
  JLTV, GP: 2
  Excavator, HMEE: 3
  Loader, Skid Steer (III): 2
  Blade, Combat Dozer: 1
Crew Served Weapons:
  M249 (5.56mm): 6
  M250 (6.8mm): 12
  M240 (7.62mm): 22
  M2 (.50cal): 6
  MK19 (40mm): 5
  Javelin: 2
Key Capabilities: M/CM/S combat engineering for BCT. ABV, bridge laying, M2A3-mounted.

UNIT TYPE: COMBAT ENGINEER COMPANY - INFANTRY (CEC-I) — for 65 EN BN elements
Personnel: 139 (O-3, 6 OFF, 0 WO, 133 ENL)
Vehicles: 46 | Trailers: 31
Equipment:
  Detection System, Husky: 12
  Vehicle, Mine Resistant: 3
  Vehicle, Mine Protected: 6
  Vehicle, MMPV (II): 17
  Vehicle, Unmanned: 9
  Truck, HEMTT (LHS): 1
  Truck, HEMTT: 2
  JLTV, Utility: 1
  JLTV, GP: 2
  Truck, Cargo (LMTV): 1
  Crane, All Terrain: 1
  Semitrailer, 40-ton: 2
  Truck, Tractor (LET): 2
  Loader, Skid Steer (III): 2
Crew Served Weapons:
  M249 (5.56mm): 4
  M250 (6.8mm): 18
  M240 (7.62mm): 14
  M2 (.50cal): 6
  MK19 (40mm): 3
  Javelin: 3
Key Capabilities: M/CM/S combat engineering, mine detection/clearing, route clearance.

UNIT TYPE: COMBAT ENGINEER COMPANY - STRYKER (CEC-S)
Personnel: 143 (O-3, 6 OFF, 0 WO, 137 ENL)
Vehicles: 39 | Trailers: 16
Equipment:
  Stryker, Eng (w/Plow): 3
  Stryker, Eng (w/Roller): 3
  Stryker, Engineer: 6
  Stryker, Infantry: 1
  Launcher, MICLIC: 6
  Transporter, Bridge: 4
  JLTV, GP: 22
  JLTV, Utility: 2
  JLTV, HGC: 6
  Truck, Cargo (FMTV): 4
  Truck, Cargo (LMTV): 1
  Truck, Dump (MTV): 5
  Excavator, HMEE: 7
  Crane, All Terrain: 2
  Tractor, Low Speed: 4
  Semitrailer, Low Bed: 3
  Semitrailer, 40-ton: 2
  Truck, Tractor (LET): 2
  Truck, Tractor: 3
  Loader, Skid Steer (II): 1
Crew Served Weapons:
  M249 (5.56mm): 9
  M250 (6.8mm): 18
  M240 (7.62mm): 15
  M2 (.50cal): 15
  MK19 (40mm): 1
  Javelin: 3
Key Capabilities: M/CM/S combat engineering for SBCT. Stryker-mounted engineers.

UNIT TYPE: MULTIROLE BRIDGE COMPANY (MRBC)
Personnel: 187 (O-3, 5 OFF, 1 WO, 181 ENL)
Vehicles: 93 | Trailers: 67
Equipment:
  Bridge, Dry Support: 4
  Transporter, Bridge: 56
  Craft, Combat Assault: 20
  Boat, Bridge Erection: 14
  Crane, All Terrain: 1
  Excavator, HMEE: 4
  Excavator, Crawler: 1
  Loader, Skid Steer (III): 1
  Truck, Cargo (FMTV): 2
  Truck, Cargo (LMTV): 4
  Truck, Cargo (LWB): 2
  JLTV, Utility: 6
  JLTV, GP: 4
  Truck, Transporter (PLS): 1
  Truck, Wrecker (T63161): 2
  Truck, Tanker: 2
  Truck, HEMTT: 2
  Semitrailer, 40-Ton: 2
  Truck, Tractor (LET): 2
  Forward Repair System: 1
Crew Served Weapons:
  M249 (5.56mm): 22
  M2 (.50cal): 4
  MK19 (40mm): 1
Key Capabilities: Wet/dry gap crossing, bridge assembly/transport. 56x bridge transporters, 20x combat assault craft, 14x bridge erection boats.

================================================================================
MILITARY INTELLIGENCE
================================================================================

UNIT TYPE: MI BATTALION (IEW) (Division) — for 125 MI BN
Personnel: 359 (O-5, 27 OFF, 22 WO, 310 ENL)
Vehicles: 86 | Trailers: 44
Equipment:
  JLTV, GP: 63
  JLTV, Utility: 6
  JLTV, Utility (w/Shelter): 2
  Truck, Cargo (FMTV): 8
  Truck, Cargo (LMTV): 13
  Truck, Cargo (LWB): 1
  Commo, TROJAN: 1
  Truck, Wrecker (W05013): 1
Crew Served Weapons:
  M249 (5.56mm): 20
  M240 (7.62mm): 1
  M2 (.50cal): 4
  MK19 (40mm): 3
Key Capabilities: Multi-discipline intelligence analysis, PED, collection, limited interrogation. Signal.

================================================================================
CORPS FA BRIGADE (45 FA — reinforcing)
================================================================================

UNIT TYPE: HHB, FIELD ARTILLERY BRIGADE
Personnel: 167 (O-6, 39 OFF, 14 WO, 114 ENL)
Vehicles: 48 | Trailers: 36
Equipment:
  Center, Communication: 1
  Truck, Cargo (MHE): 45
  JLTV, Utility (w/Shelter): 10
  JLTV, GP: 36
  JLTV, Utility: 15
  JLTV, HGC: 9
  Truck, Ambulance: 1
  Shelter, CBRN: 1
Crew Served Weapons:
  M240 (7.62mm): 10
  M2 (.50cal): 1
  MK19 (40mm): 5
Key Capabilities: C2 for FA battalions. Battle Staff, CUOPS-FUOPS-Plans, Medical, Signal.
NOTE: 45 FA BDE battalions use same HIMARS (3x9) type as DIVARTY — 357 pers, 27x HIMARS each.

================================================================================
DIVISION SIGNAL
================================================================================

UNIT TYPE: DIVISION SIGNAL BATTALION — for 25 SC BN
Personnel: 251 (O-5, 27 OFF, 11 WO, 213 ENL)
Vehicles: 83 | Trailers: 63
Equipment:
  JLTV, Utility: 9
  JLTV, GP: 10
  Comm, Satellite (Phoenix): 1
  Truck, Cargo (LMTV): 1
Crew Served Weapons:
  M249 (5.56mm): 46
  M240 (7.62mm): 1
  MK19 (40mm): 4
Key Capabilities: Signal/communications support. EIOM of nodal and extension comms.

================================================================================
CIVIL AFFAIRS
================================================================================

UNIT TYPE: CIVIL AFFAIRS BATTALION (TAC) — for 411 CA BN
Personnel: 234 (O-5, 77 OFF, 0 WO, 157 ENL)
Vehicles: 56 | Trailers: 46
Equipment:
  JLTV, HGC: 9
  JLTV, Utility: 6
  JLTV, GP: 7
  Truck, Cargo (LMTV): 6
  Truck, Forklift (T73347): 3
  Truck, Wrecker (W05013): 1
  Truck, Tractor: 1
Crew Served Weapons:
  M240 (7.62mm): 51
  M2 (.50cal): 4
Key Capabilities: Civil Affairs operations. Battle Staff, CUOPS-FUOPS-Plans, Maintenance, Signal.

================================================================================
PSYOP
================================================================================

UNIT TYPE: HHSC, PSYOP BATTALION (TAC) — for 16 PSYOP BN
Personnel: 79 (O-5, 16 OFF, 0 WO, 63 ENL)
Vehicles: 20 | Trailers: 11
Equipment:
  JLTV, HGC: 22
  JLTV, Utility: 1
  JLTV, GP: 3
  Truck, Cargo (FMTV): 1
  Truck, Cargo (LMTV): 1
Crew Served Weapons:
  M240 (7.62mm): 4
  M2 (.50cal): 4
Key Capabilities: PSYOP C2 for maneuver support. Minimal logistics.

UNIT TYPE: PSYOP COMPANY (TAC)
Personnel: 98 (O-4, 8 OFF, 0 WO, 90 ENL)
Vehicles: 28 | Trailers: 21
Equipment:
  Truck, Forklift (L05024): 4
  Truck, Cargo (LMTV): 2
  Truck, Van: 1
  JLTV, GP: 5
Crew Served Weapons:
  M240 (7.62mm): 19
  M2 (.50cal): 2
Key Capabilities: Tactical PSYOP operations in support of BCTs and division.

================================================================================
OTHER UNITS
================================================================================

UNIT TYPE: MOVEMENT CONTROL TEAM — for MCT
Personnel: 21 (O-3, 3 OFF, 0 WO, 18 ENL)
Vehicles: 5 | Trailers: 5
Key Capabilities: Expedite, coordinate, supervise transportation support at ports/areas.

UNIT TYPE: MILITARY POLICE COMPANY (GS) — for MP Co
Personnel: 159 (O-3, 6 OFF, 0 WO, 153 ENL)
Vehicles: 35 | Trailers: 22
Crew Served Weapons:
  M249 (5.56mm): 46
  M2 (.50cal): 32
  MK19 (40mm): 17
Key Capabilities: MP support — all MP functions. Field Feeding, Medical.

UNIT TYPE: FIELD HOSPITAL (148-BED) — for 385 Field Hospital
Personnel: 411 (O-5, 161 OFF, 3 WO, 220 ENL)
Vehicles: 21 | Trailers: 23
Equipment:
  Container, Cargo: 31
  Shelter, Expandable (2S): 6
  Shelter, Expandable (1S): 7
  Set, Medical: 56 total across pages
  Truck, Ambulance: 8
  Truck, Cargo (LWB): 11
  Truck, Cargo (LMTV): 5
  Truck, Cargo (FMTV): 6
  JLTV, GP: 3
  JLTV, Utility: 11
  Truck, Forklift (L05024): 2
  Refrigerator, Container: 2
  Shelter, CBRN: 11
  Laundry, Containerized: 1
  Kitchen, Containerized: 1
Key Capabilities: 148-bed hospitalization (32-bed base + FRSD, ICW, MED, SURG, COSC, H&N detachments). Role III care.

UNIT TYPE: 3 ASOS (USAF)
NOTE: Air Support Operations Squadron is a USAF unit — not in Army handbook.
Provides TACP/ALO capabilities for joint fires integration.

================================================================================
PLANNING NOTES
================================================================================
1. FSC personnel/equipment are SEPARATE from their parent BN/SQ counts.
2. BSB personnel/equipment are listed MINUS the FSCs (FSCs shown separately).
3. The DSSB (Light) is the correct type for 25ID's DSSB.
4. Crew Served Weapons counts include weapons distributed across ALL subordinate elements.
5. The Cavalry Squadron (SBCT) uses similar equipment to Infantry Battalion (SBCT).
6. 45 FA BDE battalions use same HIMARS type as DIVARTY HIMARS entry.
======================================================================
END UNIT COMPOSITION & CAPABILITIES HANDBOOK
======================================================================
`;

// ═══════════════════════════════════════════════════════════════════
//  WARGAMING SUPPORT PACKAGE — Enemy Capabilities, Attrition, BDA
// ═══════════════════════════════════════════════════════════════════

const WARGAMING_SUPPORT_PACKAGE = `
======================================================================
  WARGAMING SUPPORT PACKAGE — ENEMY EQUIPMENT CAPABILITIES,
  ATTRITION METHODOLOGY, BDA FRAMEWORK
  FOR USE DURING COA ANALYSIS & WAR-GAMING
======================================================================

You are now supporting LIVE WARGAMING. Follow the ACTION → REACTION → COUNTERACTION format strictly.
When the staff announces a friendly action, you must:
1. STATE the friendly action clearly
2. REACT as the enemy would (based on enemy doctrine, capabilities, and disposition)
3. Assess COUNTERACTION — what can friendly forces do in response
4. CALCULATE losses on both sides using the attrition framework below
5. UPDATE running combat power estimates
6. FLAG any decision points (DPs) triggered
7. RECOMMEND adjustments to the scheme of maneuver/fires if needed

────────────────────────────────────────────────────────────────
  165 BCG (HEAVY) — EQUIPMENT & CAPABILITIES
  (Primary opposing force for 25ID WGX)
────────────────────────────────────────────────────────────────

ARMOR (3x Tank Battalions + 1x Mech Battalion):
  ZTZ-99A2 (MBT): 44 total in 165 BCG
    - 125mm smoothbore gun, autoloader, 8 rds/min
    - ERA + composite armor, ~700mm RHA equivalent vs KE frontal
    - Effective range: 2,000m (APFSDS), 5,000m (ATGM via gun tube)
    - Top speed: 80 km/h road, 60 km/h cross-country
    - Crew: 3. Weight: 54 tons.
    - VULNERABILITY: Side/rear armor ~200-300mm. Top attack (Javelin/Hellfire) defeats it.

  ZTZ-96B (MBT): 102 total in 165 BCG (bulk of armor)
    - 125mm smoothbore gun, autoloader, 8 rds/min
    - ERA + composite, ~500mm RHA equivalent vs KE frontal
    - Effective range: 2,000m (APFSDS), 4,000m (ATGM via gun tube)
    - Top speed: 65 km/h road, 45 km/h cross-country
    - Crew: 3. Weight: 42.5 tons.
    - VULNERABILITY: Inferior to M1A2 in armor and FCS. Side armor ~150-250mm.

  ZBD-04A (IFV): 110 total in 165 BCG
    - 30mm autocannon (effective to 2,000m) + HJ-10 ATGM (6,000m)
    - Amphibious (can swim 6 km/h)
    - Top speed: 75 km/h road. Carries 7 dismounts.
    - Weight: 24.5 tons. Aluminum + steel armor (14.5mm AP resistant front).
    - VULNERABILITY: RPG, 25mm+, any ATGM. Very thin armor.

ARTILLERY (1658 FA Battalion):
  PLZ-52 (155mm SP Howitzer): 27 total
    - Range: 39 km (standard), 53 km (RAP/BB)
    - Rate of fire: 8 rds/min burst, 2 rds/min sustained
    - OUTRANGES US M777 (24km) and M109A7 (30km)
    - Crew: 5. Weight: 45 tons. Self-propelled.
    - VULNERABILITY: Counterfire via GMLRS (84km range advantage). Relocates in 60 sec.

  SR-4 (122mm MRL): 9 total
    - Range: 20-70km (standard), up to 130km (extended range rockets)
    - 40-tube launcher, full salvo in 20 sec
    - Reload time: 8-10 minutes
    - Crew: 4. Wheeled (8x8). High mobility.
    - VULNERABILITY: Large signature during firing. Counterfire. 130km range threatens DSA.

  SLC-2E (Counter-fire Radar): 2 total
    - Detects incoming fire and back-plots origin to ~50m accuracy
    - Range: 70km detection
    - Enables rapid counterfire response
    - VULNERABILITY: GMLRS QF, electronic attack. CRITICAL to blind early.

AIR DEFENSE (1659 AD Battalion):
  HQ-17A (SHORAD SAM): 6 systems
    - Range: 1.5-15 km, altitude 10-10,000m
    - 8 missiles per launcher, radar guided
    - Track-while-scan, 10 targets simultaneously
    - Reaction time: 8-10 sec from detect to launch
    - VULNERABILITY: SEAD, ARM missiles, terrain masking. Must suppress before ANY AVN ops.

  PGZ-09 (35mm SPAAG): 18 systems
    - Effective range: 4 km (AA), 5 km (ground)
    - Rate of fire: 550 rds/min per barrel (dual 35mm)
    - Radar/optical fire control
    - VULNERABILITY: Direct fire, GMLRS, Hellfire.

RECONNAISSANCE & EW (1657 RECON BN + 1665 EW SQN):
  UAV, CH-91: 8 total (armed recon, 4hr endurance, 150km range)
  UAV, DJI Matrice: 18 total (commercial ISR, 30min endurance)
  UAV, H16-V12: 16 total (ISR/comms relay)
  EW, Pole 21E: 3 systems (broadband jammer, 30km effective)
  EW, JN-1105A: 3 systems (comm jammer)
  EW, SPR-2: 1 system (SIGINT/DF)
  RDR, BS 903A: 4 (battlefield surveillance radar)
  RDR, JY-17A: 4 (air surveillance)

AVIATION (from 16 ACG Aviation Brigade, if committed):
  WZ-10 (Attack Helicopter): 16 total (ACG level)
    - HJ-10 ATGM: 8 km range, fire-and-forget
    - 30mm cannon, TY-90 AAMs
    - Top speed: 270 km/h. Combat radius: 250 km.
    - VULNERABILITY: Stinger, M-SHORAD, AH-64 air-to-air.

  Z-10 (Armed Recon): 6 total
    - Similar armament, lighter
    - Used for recon and light attack

ENGINEER (1655 EN Battalion):
  Type 89 Mine Layer: 4 vehicles
    - Lays AT/AP mixed minefields at 4-8 km/h
    - Can emplace 1,000m minefield in 10-15 minutes
  Z-8 Mine Helicopter: 2 (airborne mine dispersal)
  DFM-1 Mine Rounds: Scatterable mines via 155mm artillery
  GBL-131 Mine Dispenser: 288 launch tubes, 2,880m minefield
  VULNERABILITY: Must be destroyed BEFORE they emplace obstacles at crossing sites.

RESERVE (1656 CA-BN — Combined Arms Battalion):
  ZTZ-99A (MBT): ~30
  ZBD-04A (IFV): ~40
  PLZ-05 (155mm SP): ~12
  Response time from reserve positions: 45-60 minutes
  VULNERABILITY: Delay/disrupt while moving. Most vulnerable in column on roads.

────────────────────────────────────────────────────────────────
  165 BCG TOTAL COMBAT POWER SUMMARY
────────────────────────────────────────────────────────────────

CATEGORY                  | QTY   | NOTES
MBT (ZTZ-96B)             | 102   | Bulk armor, 3x Tank BNs
MBT (ZTZ-99A2)            | 44    | Premium armor
IFV (ZBD-04A)             | 110   | Mech BN + support
APC (YW-534)              | 16    |
SPH (PLZ-52, 155mm)       | 27    | Outranges M777/M109
MRL (SR-4, 122mm)         | 9     | 130km extended range
CF Radar (SLC-2E)         | 2     | Counter-battery
SHORAD (HQ-17A)           | 6     | 15km SAM
SPAAG (PGZ-09)            | 18    | 35mm, 4km
ATGM (HJ-10 on ZBD-04A)  | 33    | 6km SACLOS
Mortar (120mm)            | 24    | 7.5km range
MANPADS (QW-18)           | 24    | 5km, IR guided
UAV (CH-91/DJI/H16)       | 42    | Mixed ISR/armed
EW Systems                | 14    | Jammer/SIGINT
PERSONNEL (estimated)     | ~5,000| BCG strength

────────────────────────────────────────────────────────────────
  25ID FRIENDLY COMBAT POWER REFERENCE
────────────────────────────────────────────────────────────────

CATEGORY                  | QTY   | NOTES
M1A2 SEPv3 (MBT)          | ~87   | 2/1AD + 3/25
M2A3 Bradley (IFV)         | ~152  | 2/1AD + 1/2ID
M109A7 (155mm SP)          | 18    | 4-27 FA
M777A2 (155mm towed)       | 18    | 1-37 FA
M119A3 (105mm)             | 12    | 3-7 FA (light)
M777 (155mm)               | 6     | 3-7 FA (composite)
HIMARS (M142)              | 27    | 2-11 FA
AH-64E Apache              | ~24   | 1-25 AVN
UH-60M Black Hawk          | ~24   | Assault
MQ-1C Gray Eagle           | ~12   | ISR/strike
Stryker variants           | ~120  | 3/25 SBCT
TPQ-53 (CF radar)          | 4     | DIVARTY
M-SHORAD                   | ~18   | 6-56 ADA

────────────────────────────────────────────────────────────────
  WEAPON ENGAGEMENT RANGES — QUICK REFERENCE
────────────────────────────────────────────────────────────────

FRIENDLY SYSTEM            | MAX EFFECTIVE | NOTES
M1A2 120mm APFSDS          | 3,000m        | First-round Pk ~0.85 at 2km
M2A3 25mm AP               | 2,000m        | Defeats IFV/APC armor
TOW-2B (Bradley)           | 3,750m        | Top-attack, defeats any armor
Javelin (dismount)         | 2,500m        | Top-attack, fire-and-forget
HIMARS GMLRS M31           | 84 km         | GPS-guided, CEP <10m
HIMARS M30 DPICM           | 70 km         | Area effect
M777 155mm HE              | 24 km (std)   | 30km Excalibur
M109A7 155mm               | 30 km (RAP)   | 40km Excalibur
AH-64 Hellfire             | 8 km          | Fire-and-forget (RF)
AH-64 30mm chain gun       | 1,500m        | Area suppression
Stinger (M-SHORAD)         | 8 km          | IR guided
Excalibur (155mm PGM)      | 40 km         | GPS, CEP <2m

ENEMY SYSTEM               | MAX EFFECTIVE | NOTES
ZTZ-99A2 125mm APFSDS      | 2,000m        | FRP Pk ~0.6 at 2km
ZTZ-96B 125mm APFSDS       | 2,000m        | FRP Pk ~0.5 at 2km
ZBD-04A 30mm               | 2,000m        | Defeats light armor
HJ-10 ATGM (ZBD-04A)      | 6,000m        | SACLOS, tandem HEAT
PLZ-52 155mm               | 39 km (53 RAP)| Outranges M777 by 15km
SR-4 122mm MRL             | 70-130 km     | Area fires, 40-tube salvo
HQ-17A SAM                 | 15 km / 10km alt | Radar-guided
PGZ-09 35mm SPAAG          | 4 km          | 1,100 rds/min combined
QW-18 MANPADS              | 5 km          | IR guided, shoulder-fired
WZ-10 HJ-10 ATGM          | 8 km          | Helicopter-launched

────────────────────────────────────────────────────────────────
  ATTRITION CALCULATION FRAMEWORK
────────────────────────────────────────────────────────────────

Use these guidelines to estimate losses during wargaming. All values are PER ENGAGEMENT or PER PHASE as noted.

DIRECT FIRE ENGAGEMENTS (Company-on-Company):
  Attacker advantage (3:1 or better, surprise): Attacker loses 5-15%, Defender loses 30-50%
  Even fight (1:1 to 2:1): Attacker loses 15-25%, Defender loses 20-35%
  Defender advantage (prepared defense): Attacker loses 20-40%, Defender loses 10-20%
  Hasty defense: Defender loses 15-25% (less prepared)

ARMOR-ON-ARMOR (M1A2 vs ZTZ-96B):
  M1A2 has significant FCS and armor advantage.
  At 2,000m: M1A2 Pk ~0.85, ZTZ-96B Pk vs M1A2 ~0.3 (frontal)
  Expected exchange ratio: 1 M1A2 lost per 3-4 ZTZ-96B destroyed
  At <1,000m: ZTZ-96B Pk improves to ~0.5, exchange ratio narrows to 1:2

ARTILLERY EFFECTS:
  155mm HE on troops in open: ~10-15% casualties per battalion volley (18 rds)
  155mm HE on troops in prepared positions: ~3-5% per volley
  GMLRS on point target (radar, C2): Pk ~0.85-0.95 per round
  GMLRS on area target (battery position): 6 rds = ~30-50% degradation
  MRL salvo (SR-4, 40 rds) on company position: ~15-25% casualties if caught in open
  Counterfire effectiveness: With SLC-2E, enemy achieves fires-on-target in ~3-5 minutes
  Without SLC-2E: Enemy CF degrades to ~10-15 minutes (60% less effective)

WET GAP CROSSING ATTRITION:
  Under effective enemy indirect fire: 10-20% vehicle losses per crossing attempt
  Under smoke/obscured: Reduces to 3-8% vehicle losses
  Enemy direct fire on crossing site: 20-40% vehicle losses (catastrophic)
  Bridge/ferry hit: 2-4 hour delay per bridge, potential loss of crossing capability

AVIATION ATTRITION:
  AH-64 vs armor (Hellfire standoff): 0.5-1 Apache lost per 8-12 kills
  AH-64 in HQ-17A envelope (15km): 10-20% attrition per sortie if not suppressed
  HQ-17A suppressed: Apache attrition drops to 2-5%
  CAS (A-10/F-35): Similar to above, dependent on SEAD

SMOKE EFFECTIVENESS:
  Full 4hr screen (96 rds WP): Reduces enemy observed fires by ~60-80%
  2hr screen (48 rds): Reduces by ~60-80% but only for 2 hours
  No smoke: Enemy can mass direct/indirect fires on crossing = CATASTROPHIC

────────────────────────────────────────────────────────────────
  BDA (BATTLE DAMAGE ASSESSMENT) METHODOLOGY
────────────────────────────────────────────────────────────────

For each engagement, assess three levels:

1. PHYSICAL DAMAGE ASSESSMENT (PDA):
   - Destroyed (D): System permanently rendered combat-ineffective
   - Severe (S): System combat-ineffective, requires depot-level repair (24-72hr)
   - Moderate (M): System degraded, field-repairable (4-12hr)
   - Light (L): Minor damage, operational within 1-2hr

2. FUNCTIONAL DAMAGE ASSESSMENT (FDA):
   - Mission Kill: System cannot perform primary mission (even if physically intact)
   - Mobility Kill: Cannot move but can still fire
   - Firepower Kill: Cannot fire but can still move
   - Communication Kill: Lost C2 connectivity

3. TARGET SYSTEM ASSESSMENT (TSA):
   - What percentage of the SYSTEM is degraded?
   - Example: Destroying 2 of 2 SLC-2E radars = 100% counterfire cueing eliminated
   - Example: Destroying 3 of 9 SR-4 MRLs = 33% MRL capability reduced

REPORTING FORMAT FOR WARGAMING:
  "[Time/Phase] [Engagement]: [Friendly Action] vs [Enemy Unit]
   Friendly Losses: X destroyed, Y damaged (Z% of force)
   Enemy Losses: X destroyed, Y damaged (Z% of force)
   Running Friendly CP: XX% | Running Enemy CP: XX%
   Assessment: [Continue/Adjust/Branch plan]
   Recommendation: [Specific adjustment if needed]"

────────────────────────────────────────────────────────────────
  FORCE RATIO ANALYSIS
────────────────────────────────────────────────────────────────

MINIMUM RATIOS FOR SUCCESS (US Army doctrine):
  Deliberate Attack: 3:1 attacker to defender
  Hasty Attack: 2.5:1
  Delay: 1:6 (1 friendly delays 6 enemy)
  Defend (prepared): 1:3 (1 friendly holds vs 3 enemy)
  Defend (hasty): 1:2

COMBAT POWER SCORING (simplified for wargaming):
  M1A2 SEPv3 = 10 points    | ZTZ-99A2 = 7 points  | ZTZ-96B = 5 points
  M2A3 Bradley = 5 points   | ZBD-04A = 3 points
  Stryker (ICV) = 3 points  | APC (YW-534) = 1 point
  AH-64E = 15 points        | WZ-10 = 10 points
  HIMARS = 8 points (fires) | PLZ-52 = 6 points    | SR-4 = 7 points (area)
  M777/M109 = 5 points      |

RUNNING ESTIMATE TRACKER:
  Start of each phase, state:
  - Friendly maneuver strength: ___% (of starting force)
  - Friendly fires capability: ___% (ammo remaining + systems operational)
  - Enemy maneuver strength: ___%
  - Enemy fires capability: ___%
  - Enemy AD capability: ___%
  - Crossing site status: [Open/Degraded/Denied]

────────────────────────────────────────────────────────────────
  ENEMY DEFENSIVE DOCTRINE — HOW THEY WILL REACT
────────────────────────────────────────────────────────────────

PER OLVANA BATTLE BOOK (ATP 7-100.3):
  Olvana employs SYSTEM WARFARE — targeting key subsystems to degrade the whole.
  KEY ENEMY REACTIONS TO EXPECT:

  1. COUNTER-RECONNAISSANCE: 1657 RECON BN will aggressively screen. Expect early contact.
  2. ANNIHILATION ZONES: Enemy pre-designates kill zones at crossing sites. They WANT us to cross there.
  3. MASSED FIRES: 1658 FA will mass 27x PLZ-52 + 9x SR-4 on identified crossing sites within 3-5 min of detection.
  4. COUNTERATTACK: 1656 CA-BN (reserve) commits within 45-60 min once crossing is confirmed. Expect 30x ZTZ-99A + 40x ZBD-04A.
  5. OBSTACLE REINFORCEMENT: 1655 EN will attempt to emplace mines at crossing approaches and exits.
  6. EW/CYBER: Pole 21E jammers will degrade GPS (2-3hr windows), affecting PGM accuracy. Azart-R2 C2 may resist initial cyber attack.
  7. AIR ATTACK: If ACG commits aviation, expect 6-16 WZ-10s with HJ-10 ATGMs (8km standoff). Must suppress HQ-17A first.

  FRONTIER DEFENSE GROUP (FDG) DOCTRINE:
  - Holds main defensive line with infantry + armor
  - Positions to force attacker into annihilation zones
  - Supported by depth defense group (counterattack force)
  - FDG will NOT withdraw easily — expects to hold and attrit the attacker
  - Transition to counterattack once attacker is fixed and attrited

  EXPECTED ENEMY DECISION POINTS:
  - DP1: Commit 1656 CA-BN reserve — triggered by confirmed WGX at 1+ sites
  - DP2: Request ACG aviation support — triggered by loss of FDG position
  - DP3: Withdraw DDG to secondary positions — triggered by >40% FDG losses
  - DP4: Commit 163/166 BCG reinforcements — triggered by 25ID seizing OBJs

────────────────────────────────────────────────────────────────
  DECISION SUPPORT MATRIX — KEY TRIGGERS
────────────────────────────────────────────────────────────────

FRIENDLY DECISION POINTS TO TRACK:
  DP1: Commit 2/1AD through crossing — Trigger: Exit bank OBJs seized, bridgehead secure
  DP2: Release 1-1CAV OPCON to 2/1AD — Trigger: Screen established, 2/1AD needs recon
  DP3: Commit reserve (1-27IN or 1-28IN) — Trigger: Enemy CK ATK threatens crossing site
  DP4: Request additional CAS/ATACMS — Trigger: Enemy reserve commits or >30% friendly losses
  DP5: Shift main effort — Trigger: One crossing site denied, redirect forces
  DP6: Transition PH II→III — Trigger: All transition criteria met

BRANCH PLANS TO CONSIDER:
  - Crossing site denied: Redirect forces to alternate site
  - Enemy CK ATK: Commit reserve + massed fires on CK ATK force
  - Smoke insufficient: Request engineer smoke + stagger crossings
  - Loss of CF radar: Fall back on MQ-1C for BDA, accept degraded CF
  - GPS degraded: Switch to terrain-referenced munitions, increase mortar use

======================================================================
END WARGAMING SUPPORT PACKAGE
`;

// ═══════════════════════════════════════════════════════════════════
//  INFORMATION COLLECTION PLAN — Phase I (D+10 through D+12)
//  Both COAs use the same ICP during Phase I
// ═══════════════════════════════════════════════════════════════════

const INFO_COLLECTION_PLAN_PH1 = `
======================================================================
  25th INFANTRY DIVISION — INFORMATION COLLECTION PLAN
  OPORD 12030-04 (PACIFIC PUGILIST) — PHASE I (D+10 through D+12)
  BOTH COAs USE THIS SAME COLLECTION PLAN DURING PHASE I
======================================================================

COMMANDER'S PRIORITY INTELLIGENCE REQUIREMENTS (PIR):

PIR 1 (DP 1, LTIOV: D+13):
  Q: Is the 16 ACG's Covering Group establishing its FBZ West of PL BANANA?
  Indicators: >= Plt-size Cover Group — ZBD-04AR / BS-903A / CH-1 UAV West of PL APPLE
  NAIs: 141-146
  Assets: DIVCAV (3-4 CAV) / 201 MI SIGINT

PIR 2 (DP 3, LTIOV: D+12):
  Q: Where can 25ID cross the Pa Sak River?
  Indicators: K2/K3 MLC, bank slope, enemy obstacle emplacement — engineer recon K5/K6 passes
  NAIs: 147-149 (K5/K6 passes)
  Assets: DIVCAV / 420 EN BN / 25 CAB (UAS)

PIR 3 (DP 2/5, LTIOV: D+14):
  Q: Will 16 ACG FDG establish deliberate DEF along PL DATE before BRONCOS/SEAHAWKS?
  Indicators: >= Co-size FDG — Type-96B MBT / ZBD-04A IFV / GBL-131 mines at PL DATE
  NAIs: 147-149, 153
  Assets: 25 CAB (UAS) / CFACC ISR / 201 MI

PIR 4 (DP 4, LTIOV: Continuous):
  Q: Is the Covering Group's Main Effort North (165 BCG) or South (164 BCG)?
  Indicators: Arty mass density N (PLZ-52) vs S (PLL-09); EW jamming axis identify ME
  NAIs: 153-154
  Assets: 25 CAB / SIGINT / ELINT / 17 FA / 45 FA BDE

PIR 5 (DP 5, LTIOV: Continuous):
  Q: When will the 71st ACG resume offensive operations?
  Indicators: 715 BCG OR rate at NONG BUA; 791 FA reposition S of PL BLUE; 71 ACG C2
  NAIs: 157, 619
  Assets: 2/3ID Rpts / DIVCAV / 125 MI BN SIGINT

PIR 6 (DP 6, LTIOV: D+15+):
  Q: What is location/rate of any Co+ element attempting to reinforce the CG?
  Indicators: Co+ element crossing PL DATE W — ZBD-04AR / VN17 IFV rate of advance
  NAIs: 158, 630-631
  Assets: 25 CAB (UAS) / CFACC ISR / 201 MI

────────────────────────────────────────────────────────────────
  HIGH-PAYOFF TARGETS (HPTs) BY DAY
────────────────────────────────────────────────────────────────

D+10 HPTs: ZBD-04AR | BS-903A Radar | CH-1 UAV | Type-96B MBT | PLZ-52 SPH
D+11 HPTs: ZBD-04AR | BS-903A Radar | CH-1 UAV | 165 BCG C2 Node | PLZ-52 SPH
D+12 HPTs: Type-96B MBT | PLZ-52 SPH | 165 BCG Arty Group | GBL-131 Minefield | PL DATE Engr Prep

────────────────────────────────────────────────────────────────
  ICSM — D+10 | Phase I: Occupy Attack Positions (0000-2300)
────────────────────────────────────────────────────────────────

DIV ACTION: Occupation of Attack Positions
ENEMY ACTION: ENY FRONTAL BLOCKING ZONE ESTABLISHING
COLLECTION FOCUS: IDENTIFY FBZ POSITION / CROSSING SITES / ATK POSITIONS

Collection Assets (D+10):
  IMINT: Satellite passes NAIs 141-149, 153-154
  FMV: MQ-1C — 165/164 BCG main body disposition
  COMINT: 16 ACG C2 nodes / 165 BCG HQ
  ELINT: Arty radar acquisition / ADA positioning
  HUMINT: Source ops / LOC force protection
  OSINT: Geo-ref / HVT / BDA

CAV TRP Tasks (D+10):
  TRP 1: T: ZONE RECON PL APPLE to PL BANANA, P: LOCATE 165 BCG FBZ (NAIs 141,142,143)
  TRP 2: T: ZONE RECON PL APPLE to PL BANANA, P: LOCATE 165 BCG FBZ (NAIs 144,145,146)
  TRP 3: T: ROUTE RECON AA6/AA7, P: PA SAK CROSSING APPROACH (NAIs 147,148,149)

Grey Eagle FMV Tasking (D+10):
  Window 1: ENY FBZ — NAIs 141-143 (PIR 1)
  Window 2: CROSSING — NAIs 147-149 (PIR 2)
  Window 3: ENY FBZ — NAIs 144-146 (PIR 1)
  Window 4: CROSSING — NAIs 148-149 (PIR 2)

HUMINT (D+10):
  HCT 1: Identify 165 BCG Commander / key C2 nodes
  HCT 2: Source ops — LOC activity MSR KANSAS
  HCT 3: Source ops — 71 ACG supply LOC activity

SCT / Screening (D+10):
  NAI 141 — 165 BCG advance W
  NAI 145 — HWY 205 Chai Badan
  NAI 149 — Pa Sak crossing approach

────────────────────────────────────────────────────────────────
  ICSM — D+11 | Phase I: Occupy Attack Positions (cont.)
────────────────────────────────────────────────────────────────

DIV ACTION: Occupation of Attack Positions (cont.) / Finalize WGX Plan
ENEMY ACTION: ENY FRONTAL BLOCKING ZONE ESTABLISHED
COLLECTION FOCUS: CONFIRM FBZ EXTENT / SUITABILITY OF ATK POSITIONS / CROSSING SITES

Collection Assets (D+11):
  IMINT: Satellite — NAIs 141-149, 153-154 updated overlay
  FMV: 165/164 BCG disposition W of Pa Sak
  COMINT: 16 ACG C2 / BCG HQ activity tracking
  ELINT: Arty radar / ADA system tracking
  HUMINT: Source ops / battle interrogation reporting
  OSINT: Geo-ref / BDA / HVT tracking

CAV TRP Tasks (D+11):
  TRP 1: T: AREA RECON, P: SUITABILITY OF ATK POS (NAIs 141,142,143,144)
  TRP 2: T: AREA RECON, P: SUITABILITY OF ATK POS (NAIs 145,146)
  TRP 3: T: ROUTE RECON AA6/AA7, P: PA SAK CROSSING CONFIRM (NAIs 147-149)

Grey Eagle FMV Tasking (D+11):
  Window 1: ENY FBZ EXTENT — NAIs 141-143 (PIR 1)
  Window 2: CROSSING SITES — NAIs 147-149 (PIR 2)
  Window 3: ENY FBZ EXTENT — NAIs 144-146 (PIR 1)

HUMINT (D+11):
  HCT 1: Identify 165 BCG Commander — C2 node confirm
  HCT 2: Identify 165 BCG Commander — continued
  HCT 3: 71 ACG supply LOC — reconstitution

SCT / Screening (D+11):
  NAI 141 — FBZ confirm
  NAI 145 — ATK POS suitability
  NAI 149 — Crossing bank assessment

────────────────────────────────────────────────────────────────
  ICSM — D+12 | Phase I: Pre-Combat Checks / Confirmation Brief
────────────────────────────────────────────────────────────────

DIV ACTION: Pre-Combat Checks / Confirmation Brief / Issue WGX Order
ENEMY ACTION: ENY FRONTIER DEFENSE GROUP MOVING TO PL DATE
COLLECTION FOCUS: CONFIRM ME DIRECTION (PIR 4) / WGX SITE FINAL (PIR 2) / FDG POSITION (PIR 3)

Collection Assets (D+12):
  IMINT: NAIs 147-149, 153-154 — FDZ positions / arty group
  FMV: FDG movement rate vs D+14 LTIOV / PIR 3 window
  COMINT: PIR 1 LTIOV / PIR 4 ME confirm NLT 2400
  ELINT: PLZ-52/PLL-09 mass N vs S — ME direction (PIR 4)
  HUMINT: Engineer recon / crossing site final assessment
  OSINT: Geo-ref / BDA

CAV TRP Tasks (D+12):
  TRP 1: T: SCREEN PL DATE, P: EARLY WARNING FDG MOVEMENT (PIR 3)
  TRP 2: T: ROUTE RECON AA6/AA7, P: WGX SITE FINAL CONFIRM (PIR 2)
  TRP 3: T: AREA RECON NAIs 153-154, P: ARTY GROUP LOCATION (PIR 4)

Grey Eagle FMV Tasking (D+12):
  Window 1: FDZ POSITION — NAIs 147-149 (PIR 3)
  Window 2: ARTY GROUP — NAIs 153-154 (PIR 4)
  Window 3: FDZ CONFIRM — NAIs 147-149 (PIR 3)

HUMINT (D+12):
  HCT 1: WGX FINAL — K5/K6 passes (PIR 2)
  HCT 2: 165/164 BCG Cmdr & C2 nodes track
  HCT 3: PIR 4 ME direction — C2 / comms signature

SCT / Screening (D+12):
  NAI 147 — FDZ screen
  NAI 153 — Arty group screen
  NAI 154 — Arty group screen
  71 ACG reconstitution — 715 BCG OR rate

────────────────────────────────────────────────────────────────
  KEY NAIs REFERENCE (Event Template)
────────────────────────────────────────────────────────────────

NAIs 141-146: 165 BCG FBZ positions (PL APPLE to PL BANANA)
NAIs 147-149: Pa Sak River crossing sites (K2, K3, K5/K6 passes)
NAI 153: FDG / Arty group positions near PL DATE
NAI 154: Arty group positions near PL DATE
NAI 157: 71 ACG reconstitution area (NONG BUA)
NAI 158: Reinforcement routes from PL DATE
NAIs 619, 630-631: Deep NAIs for 71 ACG / reinforcement tracking

CLASSIFICATION: UNCLASSIFIED // FOR TRAINING PURPOSES ONLY
25ID G2 ACE | OPORD 12030-04 (PACIFIC PUGILIST)
`;

// ═══════════════════════════════════════════════════════════════════
//  ROOM TYPES — 5 persistent rooms for COA wargaming
// ═══════════════════════════════════════════════════════════════════
export const ROOM_TYPES = {
  OVERALL: {
    id: "OVERALL",
    name: "OVERALL — CDR / Full Staff",
    shortName: "OVERALL",
    color: "#D4A843",
    icon: "★",
    desc: "Commander and full staff. Monitors all COA and Red Team rooms.",
    purpose: `You are in the OVERALL (Commander) room. The CDR (and any senior staff) will interact with you here. You have CROSS-ROOM AWARENESS — you can see recent activity from COA 1, COA 2, RED TEAM COA 1, and RED TEAM COA 2 rooms. When the CDR asks about a specific COA or about the enemy perspective, use the cross-room context provided to give informed answers. Synthesize across all rooms when asked for comparisons or status updates. Note: RED TEAM COA 1 shows enemy reactions to the concentrated crossing, RED TEAM COA 2 shows enemy reactions to the dispersed crossing — these are SEPARATE wargames with isolated enemy SITTEMPs.

COA COMPARISON CAPABILITY: When the CDR or staff requests a COA comparison, you will receive FUSED WARGAMING DATA from all 4 rooms (COA 1, COA 2, RED COA1, RED COA2) along with the Commander's 4 evaluation criteria (WGX Speed w:2, Tempo w:1, Force Attrition w:3, Concentration w:3). Produce a weighted decision matrix scoring each COA 0-1 per criterion, multiply by weight, and total. Base ALL scores on actual wargaming data — never fabricate.`,
  },
  COA1: {
    id: "COA1",
    name: "COA 1 — Concentrated Gap Crossing — WARGAMING",
    shortName: "COA 1",
    color: "#4A9EE8",
    icon: "▣",
    desc: "Develop COA 1: Single large crossing area to mass Division capabilities.",
    purpose: `You are in the COA 1 development room. Focus ALL analysis, wargaming, and products exclusively on COA 1 — CONCENTRATED GAP CROSSING.

COA 1 CONCEPT: Create a SINGLE large crossing area so that Division can mass and concentrate its capabilities at the crossing.

KEY QUESTIONS TO ADDRESS:
- Which BCTs cross first? What is the crossing order of march?
- Crossing site selection — where to concentrate the entire Division crossing?
- Smoke requirements for a single large crossing (massed obscuration)
- Engineer timeline for massing all 3x MRBC bridging assets at one site
- Sequential vs simultaneous seizure of OBJ BRONCOS and OBJ SEAHAWKS — CDR wants thorough analysis
- How does concentration enable mass but also create a lucrative target for 1658 FA (27x PLZ-52)?
- BN-sized Air Assault integration — where, when, what objective?
- Division Reconnaissance element — composition and mission
- Military deception plan to mask the single crossing point

COMMON REQUIREMENTS: Incorporate military deception, explore BN-sized Air Assault, create Division Reconnaissance element.

PHASE I INFORMATION COLLECTION PLAN (D+10 through D+12):
The ICP below applies to BOTH COAs during Phase I. Staff must be aware of all PIRs, NAIs, collection assets, and ICSM synchronization so they can refine during wargaming. Use this to inform ISR integration, fires targeting, and decision point triggers.
${INFO_COLLECTION_PLAN_PH1}`,
  },
  COA2: {
    id: "COA2",
    name: "COA 2 — Dispersed Gap Crossing — WARGAMING",
    shortName: "COA 2",
    color: "#3EAF5C",
    icon: "◆",
    desc: "Develop COA 2: Multiple crossing areas to prevent enemy concentration.",
    purpose: `You are in the COA 2 development room. Focus ALL analysis, wargaming, and products exclusively on COA 2 — DISPERSED GAP CROSSING.

COA 2 CONCEPT: Create MULTIPLE crossing areas to prevent the enemy from concentrating capabilities against any single crossing site.

KEY QUESTIONS TO ADDRESS:
- How many crossing sites? 2? 3? Which locations along the Pa Sak River?
- Which BCTs cross where? Task organization for each crossing site
- How to synchronize multiple simultaneous crossings? C2 challenges of dispersed operation
- Smoke distribution across multiple sites — can we obscure all of them?
- Engineer asset allocation — 3x MRBC split across sites or phased?
- Sequential vs simultaneous seizure of OBJ BRONCOS and OBJ SEAHAWKS — CDR wants thorough analysis
- How does dispersion complicate C2 and engineer support but prevent enemy massing fires?
- BN-sized Air Assault integration — where, when, what objective?
- Division Reconnaissance element — composition and mission
- Military deception plan to exploit multiple crossing points

COMMON REQUIREMENTS: Incorporate military deception, explore BN-sized Air Assault, create Division Reconnaissance element.

PHASE I INFORMATION COLLECTION PLAN (D+10 through D+12):
The ICP below applies to BOTH COAs during Phase I. Staff must be aware of all PIRs, NAIs, collection assets, and ICSM synchronization so they can refine during wargaming. Use this to inform ISR integration, fires targeting, and decision point triggers.
${INFO_COLLECTION_PLAN_PH1}`,
  },
  REDCELL1: {
    id: "REDCELL1",
    name: "RED TEAM — COA 1 WARGAME",
    shortName: "RED COA1",
    color: "#E05555",
    icon: "◎",
    desc: "Enemy perspective for COA 1 wargaming. Reacts to concentrated crossing.",
    purpose: `CRITICAL IDENTITY OVERRIDE: You are NOT a 25ID staff officer in this room. You ARE the ENEMY.

You are the RED TEAM for COA 1 WARGAMING. Think and plan as the enemy commander — specifically the 16 ACG Commander and 165 Heavy BCG CDR. Your job is to DEFEND against 25ID's COA 1 — CONCENTRATED GAP CROSSING at a single site.

COA 1 BLUE PLAN (what you are defending against):
- 25ID concentrates ALL three BCTs at a single crossing site (K2 Chai Badan)
- Massed engineer assets (3x MRBC) at one location
- Massed fires (54x 155mm + 27x HIMARS) supporting single crossing
- BN air assault to seize far bank bridgehead
- Sequential objective seizure: BRONCOS then SEAHAWKS

YOUR FORCES (165 Heavy BCG, ~95% strength):
- 3x Tank Battalions: 102x Type-96B, 44x Type-99A2
- 1x Mechanized Battalion: 44x ZBD-04A IFVs
- Reconnaissance Battalion
- 1658 FA Group: 27x PLZ-52 (39km range), 9x SR-4 MRL, 2x SLC-2E counter-battery radar
- 1659 AD Regiment: 18x PGZ-09 SPAAG, 6x HQ-17A SAM
- OS/SS Battalion (EW): DZ-9001, R-330zh Zhitel, JN-1105A GPS jammer, Pole-21E
- Covering Group forces forward of PL BANANA

YOUR ADVANTAGES VS COA 1:
- Single crossing = LUCRATIVE TARGET for massed 1658 FA fires (27x PLZ-52)
- Can concentrate ALL defensive fires on one location
- Predictable crossing site enables pre-registered fires
- GPS jamming at one location is more effective
- Counterattack with full tank reserve against single bridgehead

THINK ABOUT:
- Massing ALL FA on the single crossing site — annihilation zone at K2
- Counterattack timing — hit the bridgehead before it consolidates
- Where to position covering force to channel 25ID to the crossing
- Pre-registered targets at K2 and surrounding assembly areas
- EW effects concentrated on single C2 node

When humans ask questions, respond FROM THE ENEMY PERSPECTIVE reacting specifically to COA 1.`,
  },
  REDCELL2: {
    id: "REDCELL2",
    name: "RED TEAM — COA 2 WARGAME",
    shortName: "RED COA2",
    color: "#CC4444",
    icon: "◉",
    desc: "Enemy perspective for COA 2 wargaming. Reacts to dispersed crossing.",
    purpose: `CRITICAL IDENTITY OVERRIDE: You are NOT a 25ID staff officer in this room. You ARE the ENEMY.

You are the RED TEAM for COA 2 WARGAMING. Think and plan as the enemy commander — specifically the 16 ACG Commander and 165 Heavy BCG CDR. Your job is to DEFEND against 25ID's COA 2 — DISPERSED GAP CROSSING at multiple sites.

COA 2 BLUE PLAN (what you are defending against):
- 25ID crosses at 3 SEPARATE sites: K2 (ME), K3 (SE), CHARLIE (ECOF)
- Engineer assets distributed across sites (1x MRBC each)
- FA distributed 9/9/9 across three crossing sites
- Simultaneous assault to prevent enemy concentration
- WP NOT WAIVED, HIGH fratricide risk from distributed fires

YOUR FORCES (165 Heavy BCG, ~95% strength):
- 3x Tank Battalions: 102x Type-96B, 44x Type-99A2
- 1x Mechanized Battalion: 44x ZBD-04A IFVs
- Reconnaissance Battalion
- 1658 FA Group: 27x PLZ-52 (39km range), 9x SR-4 MRL, 2x SLC-2E counter-battery radar
- 1659 AD Regiment: 18x PGZ-09 SPAAG, 6x HQ-17A SAM
- OS/SS Battalion (EW): DZ-9001, R-330zh Zhitel, JN-1105A GPS jammer, Pole-21E
- Covering Group forces forward of PL BANANA

YOUR ADVANTAGES VS COA 2:
- 25ID combat power is DILUTED across 3 sites — defeat in detail
- Each crossing site has only 1x MRBC (single point of failure per site)
- Distributed FA means weaker fires at each individual site
- Can concentrate YOUR fires on weakest crossing (CHARLIE = economy of force, only 2hr smoke)
- 25ID C2 is complicated across 3 sites — exploit seams between BCTs
- Smoke allocation is MARGINAL (240 rds vs 336 CSR, NOT WAIVED)

THINK ABOUT:
- Which crossing site to PRIORITIZE destroying — CHARLIE is weakest (economy of force, limited smoke)
- Defeat in detail — can you mass against one site while fixing the others?
- Exploit C2 seams between the 3 separate crossing operations
- Counterattack the weakest bridgehead before reinforcement
- Where are the gaps in 25ID's dispersed smoke coverage?

When humans ask questions, respond FROM THE ENEMY PERSPECTIVE reacting specifically to COA 2.`,
  },
};

export const STAFF = {
  xo: {
    id: "xo", title: "25 ID XO / Chief of Staff", short: "XO",
    color: "#D4A843", icon: "⚔", wff: "Command & Control",
    desc: "Synchronizes 25 ID staff, manages MDMP timeline, drives warfighter process, facilitates wargame",
  },
  s2: {
    id: "s2", title: "25 ID G2 — Intelligence", short: "G2",
    color: "#E05555", icon: "◎", wff: "Intelligence",
    desc: "IPB, threat analysis, enemy COA development, SITTEMP, HVT/HPT nominations for 25 ID operations",
  },
  s3: {
    id: "s3", title: "25 ID G3 — Operations", short: "G3",
    color: "#4A9EE8", icon: "▣", wff: "Movement & Maneuver",
    desc: "COA development, scheme of maneuver, task organization of 25 ID BCTs, synchronization matrix, OPORD",
  },
  s4: {
    id: "s4", title: "25 ID G4 — Logistics", short: "G4",
    color: "#3EAF5C", icon: "◆", wff: "Sustainment",
    desc: "Sustainment estimate, CSS overlay, logistics sync, MSR/ASR planning, class I-IX for 25 ID and 25th DSB",
  },
  s6: {
    id: "s6", title: "25 ID G6 — Signal", short: "G6",
    color: "#9E6DC8", icon: "◇", wff: "C4I / Signal",
    desc: "Communications plan, PACE plan, network architecture, spectrum management for 25 ID",
  },
  fso: {
    id: "fso", title: "25 ID FSCOORD / FSO", short: "FSO",
    color: "#E08830", icon: "✦", wff: "Fires",
    desc: "Fire support plan, HPT/AGM, targeting, FSCMs, DIVARTY integration for 25 ID",
  },
  eng: {
    id: "eng", title: "25 ID Division Engineer", short: "ENG",
    color: "#2CC5A0", icon: "⬡", wff: "Protection / Engineering",
    desc: "Engineer estimate, obstacle plan, M/CM/S priorities, route clearance for 25 ID operations",
  },
};

export function buildSystemPrompt(role, loadedDocs, roomType, crossRoomContext) {
  const docList = loadedDocs ? `\n\nDOCTRINE CURRENTLY AVAILABLE IN THE WAR ROOM:\n${loadedDocs.join(", ")}\n` : "";

  // Room-specific instructions
  const roomConfig = ROOM_TYPES[roomType];
  const roomSection = roomConfig ? `\n\n══════ ROOM: ${roomConfig.name} ══════\n${roomConfig.purpose}\n` : "";
  const crossRoomHeaders = {
    OVERALL: "CROSS-ROOM AWARENESS (Live intel from COA 1, COA 2, RED COA1, and RED COA2 rooms):\nUse this to answer the Commander's questions and provide cross-COA comparisons.",
    COA1: "RED TEAM COA 1 INTEL FEED (Live enemy actions against COA 1 ONLY):\nThe enemy has taken these actions specifically against the CONCENTRATED crossing plan. Update your SITTEMP, adjust your COA 1 analysis, and factor enemy movements into your recommendations.",
    COA2: "RED TEAM COA 2 INTEL FEED (Live enemy actions against COA 2 ONLY):\nThe enemy has taken these actions specifically against the DISPERSED crossing plan. Update your SITTEMP, adjust your COA 2 analysis, and factor enemy movements into your recommendations.",
    REDCELL1: "BLUE FORCE COA 1 FEED (Live friendly COA 1 actions ONLY):\n25ID is executing a CONCENTRATED gap crossing. React to these specific movements. Determine counterattacks, fires shifts, reserve commitments against the single crossing site.",
    REDCELL2: "BLUE FORCE COA 2 FEED (Live friendly COA 2 actions ONLY):\n25ID is executing a DISPERSED gap crossing at multiple sites. React to these specific movements. Determine which site to prioritize, counterattack timing, and how to exploit the dispersed plan.",
  };
  const crossRoomHeader = crossRoomHeaders[roomType] || "CROSS-ROOM AWARENESS:";
  const crossRoomSection = crossRoomContext ? `\n\n${crossRoomHeader}\n\n${crossRoomContext}\n` : "";

  return `You are a highly experienced US Army ${role.title} serving on the 25th Infantry Division ("Tropic Lightning") staff at Schofield Barracks, HI. You are currently executing the Military Decision-Making Process (MDMP) as prescribed in FM 5-0 and FM 6-0.

${UNIT_CONTEXT}

YOUR POSITION: ${role.title}
YOUR WARFIGHTING FUNCTION: ${role.wff}
YOUR RESPONSIBILITIES: ${role.desc}
${docList}

${DOCTRINE_PACKAGE}

${ADDITIONAL_DOCTRINE}

${MAP_REFERENCE}

${APPROVED_MA_BRIEF}

${APPROVED_COA1_PRODUCTS}

${APPROVED_COA2_PRODUCTS}

${UNIT_COMPOSITION_HANDBOOK}

${WARGAMING_SUPPORT_PACKAGE}

DOCTRINAL FRAMEWORK:
- You operate IAW FM 5-0, FM 6-0, ADP 5-0, ADP 6-0
- Reference specific doctrinal publications in your outputs (FM, ATP, ADP, TC numbers)
- Use the doctrinal formats prescribed in FM 6-0 appendices for all products
- Apply risk management IAW ATP 5-19 (Risk Management)
- Use the DOCTRINE REFERENCE PACKAGE above as your primary doctrinal reference
- Apply the specific procedures, frameworks, and formats from the embedded doctrine

DOCTRINE GAP IDENTIFICATION:
- At the END of every substantial output, include a section called "DOCTRINE GAPS / RFIs"
- List any doctrinal references you would normally consult that are NOT available in the provided documents
- Format: "RECOMMEND loading [publication number] — [title] — needed for [specific purpose]"
- Example: "RECOMMEND loading ATP 3-21.10 — Infantry Rifle Company — needed for detailed company-level task organization"
- If you have all the doctrine you need, state "No additional doctrine required for this step"
- This helps the human staff know what to upload to improve the analysis

OUTPUT STANDARDS:
- Every output must be in proper military format with correct terminology
- Use OPORD/WARNO/FRAGO formats from FM 6-0 Appendix C/D
- Running estimates follow FM 6-0 Chapter 9 format
- Provide BLUF (Bottom Line Up Front) at the start of lengthy analyses
- Include classification markings (assume UNCLASSIFIED // FOUO for training)
- Use DTG format for all times (DDHHMMZ MON YY)
- Grid coordinates in MGRS format when referencing locations
- Always reference 25th ID task organization and organic capabilities
- Tailor all recommendations to 25 ID's specific capabilities as a light/Stryker division

RESPONSE LENGTH:
- When answering human staff QUESTIONS in chat: LIMIT your response to 200 WORDS maximum
- End with "Request additional analysis if needed" so the human can ask for more detail
- Use judgment — simple questions get shorter answers, complex ones can use the full 200 words
- EXCEPTION: Major MDMP step products (Receipt of Mission, Mission Analysis, COA Development, etc.) should be LONG, comprehensive, fully integrated analyses. These are formal staff products — no word limit.
- The 200-word limit applies ONLY to conversational Q&A with human staff members

ANALYSIS LOGIC CHAIN (for equipment, capabilities, and recommendations):
1. DOCTRINE — what does the FM/ATP say about how this should work?
2. TASK ORGANIZATION — what units/equipment does 25ID have per the OPORD?
3. REALITY-TO-SCENARIO DELTA — what differs from standard doctrinal organization?
4. UNIT COMPOSITION & CAPABILITIES HANDBOOK — cross-reference for ground truth on actual equipment types, quantities, and capabilities for specific units in this scenario
5. RECOMMENDATION — based on scenario ground truth, NOT generic doctrinal assumptions
6. If you are unsure about unit-specific data, ASK the human staff before answering
The Unit Composition and Capabilities Handbook is the AUTHORITATIVE source for what units have. Doctrine tells you how to employ it. Never recommend based on doctrine alone when scenario-specific data is available.

RISK ASSESSMENT REQUIREMENTS (ATP 5-19):
- Apply composite risk management throughout
- Assess: tactical risk, accidental risk, and residual risk
- Use the risk assessment matrix: likelihood × severity = risk level
- Propose specific controls for each identified hazard
- Provide risk decision recommendation (accept/mitigate/avoid)

ITERATION & REFINEMENT:
- CRITICAL — QUESTIONS vs DIRECTIVES: When a human asks a follow-up question, that is a QUESTION — NOT a directive to change your position. Think about it, provide your reasoning, and DEFEND your analysis if you believe it is correct. Do NOT automatically change your recommendation just because someone questioned it. A good staff officer explains their reasoning and engages in professional debate.
- Only change your official recommendation when the human EXPLICITLY directs it (e.g., "make that the recommendation", "change it to X", "go with option B", "update the product"). A question like "what about X?" or "have you considered Y?" is an invitation to DISCUSS, not an order to change.
- HOLD YOUR GROUND: If your analysis is sound, say so and explain why. Present both sides. The human staff wants to learn from you AND challenge you — that back-and-forth is how good decisions get made. If the human raises a valid point that changes the calculus, acknowledge it and explain how it affects your assessment — but don't cave just to be agreeable.
- When a human DOES direct a change, mark it clearly: "REVISED per CDR/staff guidance: [changes]" and update your position going forward.
- Always be ready to produce a second or third iteration of any product
- LEARN FROM CORRECTIONS: When a human provides a factual correction (wrong grid, wrong unit, wrong capability), treat it as ground truth. Do NOT repeat the same factual error. Acknowledge concisely ("Roger, correcting") and move forward.
- Do NOT fabricate data. If you are unsure about a number, grid coordinate, unit capability, or equipment count — state what you know and ASK for clarification rather than generating a plausible-sounding answer.

COORDINATION:
- Reference other 25 ID staff sections' inputs when available
- Flag coordination requirements with specific staff sections
- Identify information gaps and recommend how to fill them
- State assumptions explicitly and recommend validation methods

When a human asks you a question or provides guidance, respond as a professional 25 ID staff officer would — directly, concisely, with doctrinal backing. You are here to help the real 25 ID staff plan and execute. Your job is to provide a parallel analysis they can use, challenge, and refine.
${roomSection}${crossRoomSection}`;
}

export const MDMP_STEPS = [
  {
    id: "receipt", num: 1, title: "Receipt of Mission",
    lead: ["xo"], support: ["s2","s3","s4","s6","fso","eng"],
    outputs: ["Initial Timeline", "WARNO #1", "Staff Task List", "Initial Allocation of Time"],
    prompt: (docs) => `STEP 1 — RECEIPT OF MISSION (FM 5-0, Ch 9)

SCENARIO PACKAGE (HARDCODED — VERIFIED ACCURATE):
${SCENARIO_PACKAGE}

ADDITIONAL DOCUMENTS UPLOADED BY USER:
${docs}

You are on the 25th Infantry Division staff. The I Corps OPORD 12030-04 (PACIFIC PUGILIST) has been received at 110700MAR2030 (D+10). 25ID must begin MDMP immediately. Perform the following:
1. Issue initial timeline with 1/3 - 2/3 rule applied (25ID LD is 130700MAR2030)
2. Draft Warning Order #1 (doctrinal format per FM 5-0 Appendix D) for 25 ID subordinate units (1/2ID SBCT, 2/1AD ABCT, 3/25ID MBCT, 25 CAB, DIVARTY, 158 MEB, 25 DSB, and all attachments)
3. Develop staff task list for all WfFs
4. Identify immediate RFIs to I Corps
5. Identify what 25 ID organic and attached capabilities are relevant to this mission — especially the wet gap crossing requirement

Provide output in strict doctrinal format. Be specific with timelines, task assignments to 25 ID units, and coordination requirements. Reference the W500 scenario details by name, grid, and unit designation.`,
  },
  {
    id: "mission_analysis", num: 2, title: "Mission Analysis",
    lead: ["s2","s3"], support: ["s4","s6","fso","eng","xo"],
    outputs: ["Restated Mission","IPB Products","Specified/Implied/Essential Tasks","CCIRs/PIRs/FFIRs","Initial ISR Plan","Running Estimates","WARNO #2"],
    prompt: (docs, prev) => `STEP 2 — MISSION ANALYSIS (FM 5-0, Ch 9; ATP 5-0.1)

SCENARIO PACKAGE (HARDCODED — VERIFIED ACCURATE):
${SCENARIO_PACKAGE}

ADDITIONAL DOCUMENTS UPLOADED BY USER:
${docs}

PREVIOUS STEP OUTPUTS:
${prev}

25th Infantry Division staff conducting Mission Analysis for OPORD 12030-04 (PACIFIC PUGILIST). The division must reorient from defensive to offensive operations, attack east from PL APPLE through PL DATE, conduct a WET GAP CROSSING of the Pa Sak River, and destroy 165 BCG covering force — all within 5 days (D+13 to D+17).

YOUR SPECIFIC TASKS BASED ON YOUR ROLE:
- If G2: Conduct full IPB (ATP 2-01.3) of AO from PL APPLE to PL FIG. Develop SITTEMP overlays for 165 BCG (in 25ID zone) and 164 BCG (in 3DIV zone). Nominate initial HVTs from 165 BCG (146x MBTs, 110x IFVs, 27x SPH PLZ-52, 9x MRL SR-4, 1658 FA, 1659 AD). Develop division PIRs tied to I Corps PIRs 1, 3, 5 (165 BCG). Consider 25ID ISR: 125 MI BN (IEW), D/25 AVN (UAS), BCT organic scouts, 8 CAS sorties allocated Phase II.
- If G3: Develop restated mission for 25ID. Identify specified tasks (7 from OPORD), implied tasks (e.g., passage of 2/3ID through 25ID zone, coordination with 3DIV at boundary, engineer recon PL APPLE to PL FIG). Identify essential tasks. Determine constraints (cluster munitions rules, bridge destruction requires I Corps CDR approval, no 155mm smoke in Phase I). Propose division CCIRs/FFIRs. Consider 25ID task org: 1/2ID SBCT, 2/1AD ABCT, 3/25ID MBCT, 25 CAB, DIVARTY, 158 MEB, 25 DSB plus all attachments.
- If G4: Running estimate for sustainment. 25 DSB (524 SPT BN, 325 LSB, 365 SPT BN ATT). MSR KANSAS primary. 385 FH (32 bed) DS to 25ID. CL IV command-controlled. 3 DOS requirement. Priority CL III/V/VIII/IX.
- If G6: Running estimate for signal. PACE: StarShield/5G/MILSATCOM/SC TACSAT. LOS limitations in AO. Corps TAC co-locates with 25ID MCP. Accept TACON of Relay Team 1 for LOS to PAAs 187/188. Enemy EW threat: R-330zh Zhitel, JN-1105A, DCK-006-EW UAS.
- If FSO: Running estimate for fires. DIVARTY: 2-11 FA (HIMARS 3x9), 3-7 FA (DS 3/25), 1-37 FA (DS 1/2ID), 4-27 FA (DS 2/1AD). 45 FA follows 25ID to PAAs 453-458. 25ID gets 8 CAS sorties Phase II. 155mm smoke for wet gap crossing. EFSTs 5 and 6 apply in Phase II.
- If ENG: Running estimate for engineer. 420 EN BDE DS to 25ID for wet gap crossing (Phase II). 65 EN BN (CEC-I), 40 EN BN (CEC-A). Pa Sak River: 50-100m wide, 5-20m deep. Determine MLC PL APPLE to PL FIG. Engineer work line PL TAN, o/o PL BANANA.

All outputs must be tailored to 25ID's W500 task organization. Reference specific units, grids, and control measures from the scenario package. Identify risks using ATP 5-19 format. State assumptions clearly.`,
  },
  {
    id: "coa_development", num: 3, title: "COA Development",
    lead: ["s3"], support: ["s2","s4","s6","fso","eng","xo"],
    outputs: ["Friendly COA Statements","COA Sketches (described)","Enemy MLCOA/MDCOA","Broad Concept of Operations per COA"],
    prompt: (docs, prev) => `STEP 3 — COA DEVELOPMENT (FM 5-0, Ch 9)

SCENARIO PACKAGE (HARDCODED — VERIFIED ACCURATE):
${SCENARIO_PACKAGE}

ADDITIONAL DOCUMENTS UPLOADED BY USER:
${docs}

PREVIOUS ANALYSIS:
${prev}

25th Infantry Division developing Courses of Action for OPORD 12030-04 (PACIFIC PUGILIST). Generate MINIMUM 3 distinct COAs. Each COA must accomplish all 7 specified tasks, especially the WET GAP CROSSING of the Pa Sak River and seizure of OBJ BRONCOS and OBJ SEAHAWKS.

YOUR SPECIFIC TASKS:
- If G3: Develop 3 distinct COAs employing 25ID's BCTs and enablers. Available maneuver forces:
  * 1/2ID SBCT (Stryker — 1-23 IN, 2-3 IN, 5-20 IN) — best for rapid advance, recon
  * 2/1AD ABCT (Armor — 1-6 IN, 1-35 AR, 1-37 AR, 1-1 CAV) — best for breach, assault through defense
  * 3/25ID MBCT (Medium — 1-28 IN, 2-27 IN, 2-35 IN) — organic, versatile
  * 25 CAB (1-25 AVN ATK, 2-25 AVN AHB, 3-25 AVN AHB-M, D/25 AVN UAS)
  * DIVARTY (2-11 FA HIMARS, 3-7 FA DS 3/25, 1-37 FA DS 1/2ID, 4-27 FA DS 2/1AD, 6-56 ADA)
  * 158 MEB, 65 EN BN, 40 EN BN, 420 EN BDE (DS Phase II)
  For each COA: statement, concept by phase (I: occupy attack positions, II: advance PL APPLE to PL DATE including WGX, III: FPOL of 1AD), task organization, decisive/shaping/sustaining ops, decision points, and scheme of maneuver through AAs (AA5a, AA6a, AA6b).
  Consider: Which BCT crosses the Pa Sak first? Which seizes OBJ BRONCOS vs OBJ SEAHAWKS? Where is the main effort — northern (AA6a) or central (AA6b) pass? Where does the reserve position?
- If G2: Refine enemy MLCOA (TCOA 1: Mobile Defense) and MDCOA (TCOA 2: Penetration) at division level. Template 165 BCG positions along Pa Sak River (north and south of Pa Sak Reservoir). Identify enemy decision points. Template 1658 FA positions. Assess enemy timeline: 165 BCG has until D+17 to delay. CDR COL Haoyu Chen (164 BCG) is aggressive/innovative. Identify enemy vulnerabilities: fuel in 48hrs, CL V in 72hrs.
- If FSO: Develop fire support concept for each COA. How does DIVARTY (2-11 FA HIMARS, 3 FA BNs) support the WGX? How to integrate 45 FA (counterfire HQ following 25ID)? SEAD/DEAD for 1659 AD (PGZ-09, HQ-17A)? Smoke plan for crossing? 155mm smoke available Phase II only.
- If ENG: Develop engineer concept for each COA. 420 EN BDE DS for WGX — where to cross? Pa Sak: 50-100m wide, 5-20m deep, 14 bridges. K2 (Chai Badan crossings), K3 (Pa Sak Dam bridge). Assault vs deliberate crossing. Gap crossing site selection factors.
- If G4: Sustainment concept for each COA. MSR KANSAS as main. CSA COURAGE to CSA COURAGE 2 transition. CL III/V consumption rates during high-tempo offense. 385 FH (32 bed) positioning.
- If G6: Signal concept for each COA. MCP positioning (must have LOS to PAAs 187/188 and AA HUSKIES with max 1 relay). Corps TAC co-locates with 25ID MCP. EW threats from 165 BCG OS/SS BN.

For each COA address: main effort, supporting efforts, reserve, decisive/shaping/sustaining operations. All task organizations must use actual 25ID W500 subordinate units by designation. Reference terrain by key terrain number (K1-K9), control measures (PLs, OBJs, LANEs), and AAs.`,
  },
  {
    id: "coa_analysis", num: 4, title: "COA Analysis (Wargame)",
    lead: ["xo"], support: ["s2","s3","s4","s6","fso","eng"],
    outputs: ["Wargame Results by COA","Synchronization Matrix","Decision Support Template","Updated Running Estimates","Risk Assessment per COA"],
    prompt: (docs, prev) => `STEP 4 — COA ANALYSIS / WARGAME (FM 5-0, Ch 9)

SCENARIO PACKAGE (HARDCODED — VERIFIED ACCURATE):
${SCENARIO_PACKAGE}

ADDITIONAL DOCUMENTS UPLOADED BY USER:
${docs}

PREVIOUS OUTPUTS (COAs from Step 3):
${prev}

25th Infantry Division wargaming COAs for OPORD 12030-04 (PACIFIC PUGILIST). Use action-reaction-counteraction method, belt technique, wargaming through each phase.

CRITICAL WARGAME EVENTS TO ANALYZE:
1. Phase I (D+10-D+12): Movement to attack positions west of PL APPLE. Contact with 774 SOF recon teams? 71 ACG spoiling attack on AA5?
2. Phase II early: Attack from PL APPLE to PL BANANA. Destruction of 165 BCG covering force elements west of Pa Sak River. 1658 FA (27x PLZ-52, 9x SR-4) engaging from east bank.
3. Phase II critical: WET GAP CROSSING of Pa Sak River (50-100m, 5-20m deep). 420 EN BDE in DS. Enemy reaction — does 165 BCG counterattack the crossing? GPS denial window (2-3hrs)?
4. Phase II continuation: Advance PL BANANA to PL DATE through Dong Phaya Yen passes. Defender advantage at K5 (AA6a), K6 (AA6b), K7 (AA7). Seizure of OBJ BRONCOS and OBJ SEAHAWKS.
5. Phase III: Establish LANES DENVER and SEATTLE. FPOL of 1AD. 25ID attaches TCF to 130 MEB (DP4).

YOUR SPECIFIC TASKS:
- If XO: Facilitate. Track sync matrix across all WfFs. Record decision points for DST. Ensure each COA is wargamed through all 3 phases. Track combat power ratios at each critical event.
- If G2: PLAY THE ENEMY (165 BCG CDR and 16 ACG CDR). React to 25ID actions using TCOA 1 and TCOA 2 templates. How does 165 BCG react to the WGX? Does 1658 FA mass fires on crossing sites? Does 165 BCG counterattack with tank BNs? What does 160 AV (Air Firepower Strike Group) do in Annihilation Zones? When does 774 SOF disrupt rear area?
- If G3: Execute 25ID friendly actions phase by phase with specific units (1/2ID, 2/1AD, 3/25ID, 25 CAB). Identify branches: What if the WGX is contested? What if 166 BCG arrives before D+17? What if 3-15 IN (2/3ID) is destroyed and AA5 becomes unprotected?
- If FSO: Sync fires at each critical event. DIVARTY counterfire vs 1658 FA during WGX. HIMARS (2-11 FA) targeting priorities. 45 FA following to PAAs 453-458. Smoke plan. CAS integration (8 sorties). Deconflict with 17 FA and FSCL at PL AQUA.
- If ENG: WGX execution timeline. 420 EN BDE assets. Assault vs deliberate crossing. Bridge classification along routes. MLC determination PL APPLE to PL FIG.
- If G4: Sustainment sync. CL III/V consumption. Casualty estimates. MEDEVAC to 385 FH. DSA repositioning. MSR KANSAS throughput. When does CSA COURAGE 2 activate?
- If G6: Comms plan through each phase. MCP displacement. Relay Team 1 emplacement. Enemy EW effects on crossing. PACE degradation triggers.

RISK ASSESSMENT per COA (ATP 5-19): tactical risks, accidental risks (heat casualties HIGH RISK, wet gap crossing), risk to mission vs force, residual risk after controls, overall risk level.

Build SYNCHRONIZATION MATRIX with columns: Phase/Time, Decision Point, Maneuver (by 25ID unit), Intelligence (125 MI, ISR), Fires (DIVARTY/45 FA), Sustainment (25 DSB), Protection (158 MEB, ADA), Signal (G6), Engineer (65/40 EN, 420 EN).`,
  },
  {
    id: "coa_comparison", num: 5, title: "COA Comparison",
    lead: ["xo","s3"], support: ["s2","s4","s6","fso","eng"],
    outputs: ["Decision Matrix","Weighted Criteria Analysis","Staff Recommendation","Advantages/Disadvantages Summary"],
    prompt: (docs, prev) => `STEP 5 — COA COMPARISON (FM 5-0, Ch 9)

SCENARIO PACKAGE (HARDCODED — VERIFIED ACCURATE):
${SCENARIO_PACKAGE}

ADDITIONAL DOCUMENTS UPLOADED BY USER:
${docs}

PREVIOUS WARGAME RESULTS:
${prev}

25th Infantry Division comparing COAs for OPORD 12030-04 (PACIFIC PUGILIST). Use weighted decision matrix.

═══ COMMANDER'S EVALUATION CRITERIA — USE ONLY THESE 4 ═══

1. WGX Speed (Weight: 2): The amount of time it takes to move the entire Division across the Wet Gap Crossing (WGX). Measured by time from first unit starting to cross to last unit complete. Less time = more favorable. Compare across COAs: least time = 1, greatest time = 0.

2. Tempo (Weight: 1): Time it takes to seize both OBJ Broncos and OBJ Seahawks. Measured by rate of objective seizure, enemy reaction time compression, maintaining offensive initiative from PL APPLE through PL FIG. Higher tempo/faster operational pace = more favorable.

3. Force Attrition (Weight: 3): Attrition of combat power. Measured by personnel and equipment losses as percentage of starting combat power. Higher remaining combat power ratio = more favorable.

4. Concentration (Weight: 3): The convergence of appropriate military capability in time and space to create decisive effects against the adversary while presenting multiple dilemmas. Measured by combat power ratio at decisive points during critical phases. Sufficient combat power concentrated at decisive points to achieve local superiority while maintaining economy of force elsewhere. Compare across COAs: higher ratio = 1, smaller ratio = 0.

Total Weight: 9 points. Score each COA 0.0 to 1.0 per criterion. Weighted = Score × Weight. Show the math. Justify each score with specific reference to wargame results and scenario details. Do NOT use any other criteria — ONLY these 4.`,
  },
  {
    id: "coa_approval", num: 6, title: "COA Approval",
    lead: ["xo","s3"], support: ["s2"],
    outputs: ["Commander's Decision Brief","Refined COA","Final Planning Guidance"],
    prompt: (docs, prev) => `STEP 6 — COA APPROVAL (FM 5-0, Ch 9)

SCENARIO PACKAGE (HARDCODED — VERIFIED ACCURATE):
${SCENARIO_PACKAGE}

ADDITIONAL DOCUMENTS UPLOADED BY USER:
${docs}

PREVIOUS ANALYSIS (Steps 1-5):
${prev}

Prepare the 25th Infantry Division Commander's Decision Brief for MG [CDR, 25ID] (call sign: LIGHTNING 06). This brief will be presented NLT 120700MAR2030 (D+11) per the I Corps timeline.

BRIEF FORMAT:
1. Intelligence Update (G2): Current disposition of 165 BCG, 164 BCG, 16 ACG main body timeline. Update to TCOA 1/TCOA 2. Any changes since D+10. 774 SOF activity in rear area.
2. Restated Mission for 25ID (G3)
3. COA Briefs (G3): Each COA with 25ID task organization using actual unit designations (1/2ID SBCT, 2/1AD ABCT, 3/25ID MBCT, 25 CAB, DIVARTY, 158 MEB, 25 DSB). Scheme of maneuver by phase. WGX plan for each COA.
4. Wargame Results Summary: Key findings, critical events, branches/sequels identified
5. Decision Matrix: Weighted scores, comparative analysis
6. Staff Recommendation: Recommended COA with justification. Risk assessment (tactical, accidental, residual).
7. Recommended CDR Guidance: Planning guidance for OPORD production. Key decisions the CDR must make:
   - Main effort BCT (which BCT leads the WGX?)
   - WGX site selection (K2 Chai Badan vs K3 Pa Sak Dam bridge vs other)
   - Reserve composition and positioning
   - Acceptable risk level for the WGX
   - Deception plan alignment with I Corps IO objective
8. Key Decision Points for DST (division level)
9. Outstanding RFIs to I Corps

Include recommended WARNO #2 content to push to subordinate BCTs immediately after CDR approval.`,
  },
  {
    id: "orders_production", num: 7, title: "Orders Production",
    lead: ["s3"], support: ["s2","s4","s6","fso","eng","xo"],
    outputs: ["OPORD Base Order","Annex B (Intelligence)","Annex C (Operations)","Annex D (Fires)","Annex F (Sustainment)","Annex H (Signal)","Annex G (Engineer)"],
    prompt: (docs, prev) => `STEP 7 — ORDERS PRODUCTION (FM 5-0, Ch 9; FM 6-0 Appendix C)

SCENARIO PACKAGE (HARDCODED — VERIFIED ACCURATE):
${SCENARIO_PACKAGE}

ADDITIONAL DOCUMENTS UPLOADED BY USER:
${docs}

PREVIOUS OUTPUTS (CDR-approved COA from Steps 1-6):
${prev}

Produce the 25th Infantry Division OPORD (subordinate to I Corps OPORD 12030-04, PACIFIC PUGILIST). Must be complete NLT 120700MAR2030 (D+11) for subordinate brigade OPORD development.

YOUR TASKS:
- If G3: Base OPORD (5-paragraph format per FM 6-0 Appendix C).
  * Task Organization: 1/2ID SBCT, 2/1AD ABCT, 3/25ID MBCT, 25 CAB, DIVARTY, 158 MEB, 25 DSB, and all attachments (65 EN, 40 EN, 125 MI, 411 CA, 16 PSYOP, 3 ASOS, 385 FH, 6-56 ADA).
  * Mission: Derived from restated mission.
  * Execution: Concept of ops by phase. Scheme of maneuver assigning specific BCTs to AAs, objectives, and tasks. Tasks to subordinate units for each BCT and enabler. Coordinating instructions including WGX execution, FPOL procedures, boundaries with 3DIV (GBR) and 2/3ID.
  * Reference I Corps control measures: PLs (APPLE through GRAPE), OBJs (BRONCOS, SEAHAWKS), LANEs (DENVER, SEATTLE), ROUTEs.
- If G2: Annex B (Intelligence).
  * AOI, weather effects (heat index 100-105F, 7SM vis, 61-82% moon illum), terrain effects on ops.
  * 165 BCG threat template in 25ID zone: 3x Tank BNs (102x Type-96B, 44x Type-99A2), Mech BN (44x ZBD-04A), Recon BN, 1658 FA (27x PLZ-52, 9x SR-4), 1659 AD (18x PGZ-09, 6x HQ-17A), OS/SS BN (EW systems).
  * Division ISR plan: 125 MI BN, D/25 AVN UAS, BCT scouts, 8 CAS allocated.
  * Division PIRs, NAIs, TAIs specific to 25ID zone.
- If FSO: Annex D (Fires).
  * DIVARTY scheme of fires by phase: 2-11 FA (HIMARS 3x9 launchers), 3-7 FA (DS 3/25ID), 1-37 FA (DS 1/2ID), 4-27 FA (DS 2/1AD), 6-56 ADA (DivAD), D BTRY (C-sUAS).
  * HPT list derived from 165 BCG composition. AGM/attack guidance.
  * Division FSCMs (CFLs, RFAs, targets). Smoke plan for WGX (155mm smoke allocated Phase II).
  * Integration with 45 FA (counterfire HQ following 25ID to PAAs 453-458).
  * Target block assignments: 25ID = AB, 1/2ID = AC, 2/1AD = AD, 3/25ID = AE, CAB = AF, DIVARTY = AG.
  * CSR compliance for all munitions.
- If G4: Annex F (Sustainment).
  * 25 DSB: 524 SPT BN (DSSB), 325 LSB, 365 SPT BN (CSSB ATT), 569 QM CO (FF), 18 TRANS DET (MCT).
  * MSR/ASR plan: MSR KANSAS (main), ASR GEORGIA. DSA positioning by phase.
  * Class I-IX priorities. CL IV command-controlled (72hr advance request, 24hr emergency).
  * Medical: 385 FH (32 bed) DS positioning. MEDEVAC plan. Heat casualty planning (HIGH RISK).
  * Maintenance: OR thresholds by BCT. Recovery plan for WGX.
- If G6: Annex H (Signal).
  * PACE: StarShield (PLEO) / 5G Cell / MILSATCOM / SC TACSAT.
  * MCP positioning requirements (LOS to PAAs 187/188 and AA HUSKIES, max 1 relay).
  * Corps TAC co-location plan. Relay Team 1 integration.
  * COMSEC plan. Spectrum management. MIJI reporting (60 min).
  * Enemy EW mitigation: DZ-9001, R-330zh Zhitel, JN-1105A, DCK-006-EW countermeasures.
  * Cellular comms prohibited unless in scheme of signal support.
- If ENG: Annex G (Engineer).
  * WGX plan: 420 EN BDE (DS Phase II) integration. Crossing site selection. Assault vs deliberate. Timeline.
  * 65 EN BN (CEC-I) and 40 EN BN (CEC-A) task organization to BCTs.
  * M/CM/S priorities by phase (Phase I: SURV-MOB-CM, Phase II: MOB-SURV-CM, Phase III: MOB-SURV-CM).
  * Route classification (MLC) PL APPLE to PL FIG. Bridge data.
  * Obstacle plan. Mines: anti-vehicular self-destruct only. Bridge destruction requires I Corps CDR approval.
  * Engineer work line: PL TAN, o/o PL BANANA.
- If XO: Quality Control.
  * Verify sync across all annexes — fires support maneuver, sustainment supports the scheme, signal enables C2, engineer enables mobility.
  * Verify all 7 specified tasks from I Corps are addressed.
  * Verify timeline compliance (25ID LD: 130700MAR, breakout objectives: 180700MAR).
  * Identify conflicts, gaps, and coordination requirements.
  * Prepare for I Corps Combined Arms Rehearsal at 121300MAR.

All products in proper doctrinal format. Classification: UNCLASSIFIED // FOUO — TRAINING. DTG format. MGRS grids. Reference 25ID W500 task organization throughout.`,
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// COA EVALUATION CRITERIA — COMMANDER'S INTENT (W500)
// Used for COA Comparison in the OVERALL room
// ═══════════════════════════════════════════════════════════════════════════════

export const COA_EVAL_CRITERIA = [
  {
    id: "wgx_speed",
    num: 1,
    title: "WGX Speed",
    weight: 2,
    definition: "The amount of time it takes to move the entire Division across the Wet Gap Crossing (WGX).",
    unitOfMeasure: "The time between the first unit starting to cross the WGX and the last unit complete crossing the Gap.",
    benchmark: "Less time is more favorable. Compare across COAs, the COA with the least estimated time to cross = 1, the COA with the greatest estimated time to cross = 0.",
    scoringGuide: "Score 0.0 to 1.0. Fastest crossing time = 1.0, slowest = 0.0. Interpolate proportionally for intermediate values."
  },
  {
    id: "tempo",
    num: 2,
    title: "Tempo",
    weight: 1,
    definition: "Time it takes to seize both OBJ Broncos and OBJ Seahawks.",
    unitOfMeasure: "Rate of objective seizure, enemy reaction time compression, maintaining offensive initiative from PL APPLE through PL FIG.",
    benchmark: "Higher tempo/faster operational pace = more favorable.",
    scoringGuide: "Score 0.0 to 1.0. Fastest objective seizure = 1.0, slowest = 0.0."
  },
  {
    id: "force_attrition",
    num: 3,
    title: "Force Attrition",
    weight: 3,
    definition: "Attrition of combat power.",
    unitOfMeasure: "Personnel and equipment losses as percentage of starting combat power.",
    benchmark: "Higher remaining combat power ratio = more favorable.",
    scoringGuide: "Score 0.0 to 1.0. Lowest attrition (highest remaining combat power) = 1.0, highest attrition = 0.0."
  },
  {
    id: "concentration",
    num: 4,
    title: "Concentration",
    weight: 3,
    definition: "The convergence of appropriate military capability in time and space to create decisive effects against the adversary while presenting multiple dilemmas.",
    unitOfMeasure: "Combat power ratio at decisive points during critical phases.",
    benchmark: "Sufficient combat power concentrated at decisive points to achieve local superiority while maintaining economy of force elsewhere. Compare across COAs, higher ratio = 1, smaller ratio = 0.",
    scoringGuide: "Score 0.0 to 1.0. Best concentration at decisive points = 1.0, worst = 0.0."
  },
];

export const COA_EVAL_CRITERIA_TEXT = COA_EVAL_CRITERIA.map(c =>
  `CRITERION ${c.num}: ${c.title} (Weight: ${c.weight})\n  Definition: ${c.definition}\n  Unit of Measure: ${c.unitOfMeasure}\n  Benchmark: ${c.benchmark}\n  Scoring: ${c.scoringGuide}`
).join("\n\n");

export const TOTAL_CRITERIA_WEIGHT = COA_EVAL_CRITERIA.reduce((sum, c) => sum + c.weight, 0);

export function buildCoaComparisonPrompt(fusedWargamingData) {
  return `STEP 5 — COA COMPARISON (FM 5-0, Ch 9) — COMMANDER'S EVALUATION CRITERIA

═══════════════════════════════════════════════════════════════════════════════
  CDR'S COA EVALUATION CRITERIA — 25th INFANTRY DIVISION
  OPERATION PACIFIC PUGILIST — W500
  Total Weight: ${TOTAL_CRITERIA_WEIGHT} points
═══════════════════════════════════════════════════════════════════════════════

${COA_EVAL_CRITERIA_TEXT}

═══════════════════════════════════════════════════════════════════════════════
  FUSED WARGAMING DATA — ALL ROOMS
═══════════════════════════════════════════════════════════════════════════════

${fusedWargamingData}

═══════════════════════════════════════════════════════════════════════════════
  INSTRUCTIONS
═══════════════════════════════════════════════════════════════════════════════

You are the 25ID XO synthesizing COA COMPARISON for the Commander using ONLY the CDR's 4 evaluation criteria above and the fused wargaming data from all rooms.

PRODUCE THE FOLLOWING:

1. BLUF — One-sentence bottom line: which COA scores higher and by how much.

2. WEIGHTED DECISION MATRIX — Format as a table:
   | Criterion | Weight | COA 1 Score (0-1) | COA 1 Weighted | COA 2 Score (0-1) | COA 2 Weighted | Rationale |
   Score each COA 0.0 to 1.0 per the benchmark guidance. Weighted = Score × Weight.
   Show TOTALS at bottom.

3. CRITERION-BY-CRITERION ANALYSIS — For each of the 4 criteria:
   a. What does the wargaming data tell us about COA 1 vs COA 2 for this criterion?
   b. Cite specific data points from the wargaming (crossing times, attrition estimates, combat power ratios, CL III/V throughput, etc.)
   c. Justify the score with evidence, not assumptions

4. ADVANTAGES / DISADVANTAGES SUMMARY
   COA 1 — Top 3 advantages, Top 3 disadvantages
   COA 2 — Top 3 advantages, Top 3 disadvantages

5. RISK COMPARISON (ATP 5-19)
   Tactical risk, accidental risk, residual risk for each COA

6. STAFF RECOMMENDATION
   - Recommend COA 1 or COA 2 with specific justification tied to the weighted scores
   - State what makes the recommended COA superior on the criteria that MATTER MOST (Force Attrition w:3 and Concentration w:3)
   - Identify the #1 risk to the recommended COA and propose a mitigation

CRITICAL: Base ALL scores on the ACTUAL WARGAMING DATA provided above — not on generic doctrinal assumptions. If data is missing for a criterion, state "INSUFFICIENT DATA" and explain what wargaming data is needed. Do NOT fabricate scores.

This is a formal staff product — no word limit. Be comprehensive, precise, and cite sources from the wargaming data.`;
}

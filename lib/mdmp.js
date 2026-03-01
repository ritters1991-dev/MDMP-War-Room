// ═══════════════════════════════════════════════════════════════════════════════
// MDMP WAR ROOM — 25th Infantry Division Staff — W500 SCENARIO HARDCODED
// ═══════════════════════════════════════════════════════════════════════════════

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
  Condensed from FM 5-0, FM 6-0, FM 3-0, FM 3-94, and WfF pubs
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

  END DOCTRINE REFERENCE PACKAGE
======================================================================
`;

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

export function buildSystemPrompt(role, loadedDocs) {
  const docList = loadedDocs ? `\n\nDOCTRINE CURRENTLY AVAILABLE IN THE WAR ROOM:\n${loadedDocs.join(", ")}\n` : "";

  return `You are a highly experienced US Army ${role.title} serving on the 25th Infantry Division ("Tropic Lightning") staff at Schofield Barracks, HI. You are currently executing the Military Decision-Making Process (MDMP) as prescribed in FM 5-0 and FM 6-0.

${UNIT_CONTEXT}

YOUR POSITION: ${role.title}
YOUR WARFIGHTING FUNCTION: ${role.wff}
YOUR RESPONSIBILITIES: ${role.desc}
${docList}

${DOCTRINE_PACKAGE}

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

RISK ASSESSMENT REQUIREMENTS (ATP 5-19):
- Apply composite risk management throughout
- Assess: tactical risk, accidental risk, and residual risk
- Use the risk assessment matrix: likelihood × severity = risk level
- Propose specific controls for each identified hazard
- Provide risk decision recommendation (accept/mitigate/avoid)

ITERATION & REFINEMENT:
- When a human challenges your analysis or asks you to refine, take their feedback seriously
- Provide a revised product that incorporates their guidance
- Clearly mark what changed: "REVISED per CDR/staff guidance: [changes]"
- If you disagree with guidance, state your professional military judgment but comply
- Always be ready to produce a second or third iteration of any product

COORDINATION:
- Reference other 25 ID staff sections' inputs when available
- Flag coordination requirements with specific staff sections
- Identify information gaps and recommend how to fill them
- State assumptions explicitly and recommend validation methods

When a human asks you a question or provides guidance, respond as a professional 25 ID staff officer would — directly, concisely, with doctrinal backing. You are here to help the real 25 ID staff plan and execute. Your job is to provide a parallel analysis they can use, challenge, and refine.`;
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

EVALUATION CRITERIA (weight 1-5):
1. Mission Accomplishment (5): Can 25ID seize OBJ BRONCOS and OBJ SEAHAWKS by D+17? Can it destroy 165 BCG covering force? Can it execute WGX successfully?
2. Casualties / Risk to Force (4): Expected losses during WGX, advance through passes, contact with 165 BCG (146x MBTs, 110x IFVs). Heat casualties (heat index 100-105F).
3. Speed / Tempo (4): Can 25ID maintain tempo to prevent 16 ACG main body (163/166 BCGs) from establishing frontier defense before D+17? 6-day window is critical.
4. Flexibility (3): Branches/sequels available. What if WGX fails? What if 166 BCG arrives early? What if 3DIV (GBR) is delayed?
5. Simplicity (3): Complexity of the WGX plan. Number of passage-of-lines required. Coordination requirements with 3DIV (GBR) and 2/3ID at boundaries.
6. Sustainment Feasibility (3): MSR KANSAS throughput. CL III/V consumption rates. 385 FH capacity (32 beds). CSA transition timeline.
7. Future Positioning (2): Sets conditions for 1AD FPOL through LANES DENVER and SEATTLE. 25ID posture after Phase II for Phase III operations.
8. Deception Potential (2): Supports I Corps IO objective (convince 16 ACG that corps COG is on AA7, best opportunity on AA6).

Score each COA 1-10 per criterion from your WfF perspective. Show the math (score × weight). Justify each score with specific reference to wargame results and scenario details. Identify biggest advantage and disadvantage per COA.

Staff recommendation must be specific to 25ID's W500 capabilities — Stryker (1/2ID), Armor (2/1AD), Medium Infantry (3/25ID), Aviation (25 CAB), and HIMARS (2-11 FA) employment.`,
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

// BBG 7.3 Knowledge Base - Changelog BBG 7.3
// Source: FR_changelog_fetch.txt
// Auto-generated from official BBG website data

export const knowledgeChangelog = `
Civ VI BBG 7.3 Changelog

Game Mechanics

Techs and Civics

Victory Conditions

Districts

Improvements

Resources

Military Units

Governments

Policies

Civ VI BBG 7.3 Changelog

Game Mechanics

Global Changes

All cities other than your capital start with +1 amenity bonus.
• Happy cities receive +8% yields (from +10%)
• Ecstatic cities receive +16% yields (from +20%)
• Reduced the trade route gold bonus from efficiency points 2x to 1.5x
• Dark age threshold increased by 3 era score

Combat

• +2 Combat Strength per turn of fortification up to a maximum of +4CS (from +3CS per turn up to a maximum of +6CS)
• Land units no longer provide support bonus in water
• Melee ancient era unit (Warrior and UUs, Scout and UU, Galley and UU, WarCart and Sabum) get -5 against city center until a classical technology is reached
• The combat damage formula no longer includes RNG
• A game option has been added to disable settler stealing. If enabled, settlers will simply be sent back to the nearest city (like great people)

Congress

• Unit Production Congress: Modified to +50% cost in production / gold / faith (from +100%) or -25% cost in production / gold / faith (from -50%)
• Border Control Treaty: Vote A - Can purchase tiles at a 50% Gold discount (from culture bomb when completing districts)
• Trade Treaty: Vote A - Now should correctly give +4 gold to players sending trade routes to the target and the target gets +1 trade route. Previously this was the text, but firaxis had it coded that the target got the +4 gold as well as the trade route and other players received nothing.
Vote B - changed to "-4 gold on Trade Routes sent to/from target player" (note: this can result in negative gpt trade routes)
• Combat strength resolution: Down to -+3 strength (from -+5)

Diplomatic Favor

Conquering a Capital now gives +2 Diplomatic Favor instead of -2

Disasters

• Droughts and Tornados removed entirely
• Meteors removed on all disaster settings except for disaster 4
• Reduced odds of completely pillaging a district and improvement on disasters
• Natural disasters won't kill civilian units other than rare circumstances with natural wonders
• Production yields from floods reduced to compensate the Watermill change
• Forest Fire: +1 Food for Woods fires. +1 Production for Rainforest fires (from +1 food and +1 production for all forest fires)
• Disaster level 0 now prevents all disasters from occurring (from just a low percentage)
• Disaster level 1 now gives the disaster frequency that level 0 used to have
• Flood yields reduced by 25%.

Specialists

Working specialist slots are buffed in the following manner:
• Campus: 3 science, 4 science w/ Research Labs (from 2s, 3s @ Labs)
• Theater Square: 3 culture, 4 culture w/ Broadcast Center (from 2c, 3c @ Broadcast)
• Commercial Hub: unchanged
• Harbor: 1 food + 3 gold, 2 food + 3 gold w/ Seaport (from 1f+2g, 2f+2g @ Seaport)
• Holy Site: 3 faith, 4 faith w/ Tier 3 building (from 2fm 3f @ Tier 3)
• Industrial Zone: 4 production always (from 2p, 3p @ Powerplant)
• Encampment: 2 production + 2 gold, 3 production + 2 gold w/ Military Academy (from 1p+2g, 2p+2g @ Academy)

Spies

• When a spy is captured, you gain +1 spy capacity. This is because in multiplayer, especially team games, there is no way of getting your spy back unlike if it is killed.
• Spy production scales with techs/civics (from previous number of copies). Spies are now stackable (Fixed a bug where Wu Zetian could not faith buy spies when there was an opponent spy already in the city).
• "Neutralize Governor" and "Sabotage Production" mission duration increased to 6 turns [from 4]
• +1 spy capacity at Military Science

Tribal Huts

• Relic Reward: the possibility of relics are delayed until turn 15 (from start of game)
• Free governor title is now only possible starting turn 25
• Free technology is now only possible starting turn 31

Techs and Civics

Technologies

All technologies after the Classical Era cost 5% more science.
Era Gate for technologies is increased to 30% (from 20% base game). This is a mechanic when you are researching technologies of an era ahead of the current game era whereby the cost of those technologies is increased.
Tech Tree Changes
• Advanced Ballistics moved to a Modern Era technology, no dependencies changed.
• Steam Power now requires Scientific Theory
• Steel eureka changed to "Own a Renaissance Wall" (from Build a Coal Mine and Ironclad)
• Robotics now has Composites and Telecommunications as added tech prerequisites
• Guidance Systems eureka changed to Kill a unit with a Fighter [from kill a Fighter]

Civics

Civics Tree Changes
• Nationalism inspiration changed to "Own a Level 3 Land Unit" (from Start a war using a Casus Belli)
• Craftsmanship inspiration: Improve 2 tiles [from 3]
• Foreign Trade inspiration: Own 1 scout [from discover a new continent]
• Humanism inspiration: Own 2 amphitheaters [from recruit a Great Artist]

Victory Conditions

The default "Legacy BBG" setting on game setup changes several victory conditions for viability in multiplayer. These settings may be adjusted by changing "Legacy BBG" to "Custom" or set to default Firaxis settings by changing this to "Standard"

Legacy BBG Settings

This is the default setting for online competitive multiplayer when using BBG. This setting changes the below victory conditions as described.
Cultural Victory
• Base tourism from wonders adjusted to 5 (from 2).
• Number of tourism needed to gain a tourist lowered to 150 per player (from 200).
• Computer boosts tourism by 50% (from 25%).
Great Work Update:
Great works of Art are locked to their location for only 2 turns when moved or created. Art by the same artist no longer receives a penalty when in the same Art Museum.
• Writing: 4 culture and 2 tourism each (from 2 culture / 2 tourism), additional +2 tourism at Opera and Ballet
• Art: 4 culture and 4 tourism each (from 3 culture / 3 tourism), additional +50% tourism at Steam Power
• Music: 12 culture and 8 tourism each (from 4 culture / 4 tourism)
• Artifact: 6 culture and 8 tourism each (from 3 culture / 3 tourism)
• Relic: 4 faith and 4 tourism (from 4 faith / 8 tourism)
• Rock Bands: Potential album sales results reduced by 20% to be 80% of the default value
• Cristo Redentor: Back to +100% tourism for Seaside Resorts (from +75%)
• Cultural Hegemony: +25% Global Tourism (from +0%)
Science Victory
If a spaceport is pillaged, the booster projects in launched do not grant extra light years per turn towards Exoplanet Expedition
Diplomatic Victory
• First world congress is in Medieval Era
• First vote for Diplomatic Victory points is in Medieval Era
• Diplomatic point penalty from grievances is removed
Score Victory Score is often used in determining placement in CPL Free for All (FFA) games. The following changes have been made to the scoring system:
• Points for era score are removed
• Each Civic = 4 points (from 3)
• Each Technology = 3 points (from 2)
• Each City = 2 points (from 5)
• Each Population = 2 points (from 1)
• Each World Wonder = 4 points (from 15)
• Each Great Person = 3 points (from 5)
• Each Foreign city following your religion = 1 point (from 2)
• Each District = 2 points unchanged
• Each Unique District = 4 points unchanged
• Each Building = 1 point unchanged
• Founding a Religion = 10 points unchanged

Custom Settings

Below are the options available when choosing "Custom" settings for each victory condition.
Culture Victory
Standard - default Firaxis settings
Early - great works and Artifacts provide more tourism
Earliest - default Legacy BBG setting - Great Works and Artifacts provide more tourism and tourism per tourist is reduced by 25%
Science Victory
Standard - default Firaxis settings, default Legacy BBG setting
Early - cheaper space projects and lowered cost for future era techs
Earliest - even cheaper space projects and even lowered cost for future era techs
Diplomatic Victory
Standard - default Firaxis settings
Early - first congress in Medieval Era, first vote for diplo points in Renaissance Era
Earliest - default Legacy BBG setting - first congress and first vote for diplo points in Medieval Era
Conquest / Domination Victory
Standard - default Firaxis settings, default Legacy BBG setting - can only be on or off, no option for early or earliest due to the nature of domination victories
Territorial Victory
This is a new victory type that may optionally be added to your game when playing with BBG. The game is won by having a certain percentage of the world's emerged land tiles, in your territory. This percentage varies based on the setting chosen below.
**Note** This victory type was bugged at one point by having Rome in the game and/or Torres del Paine. The bug results in Rome randomly winning the game. At the time of the writing of these patch notes, it is believed that this bug has been fixed. You may want to turn Rome off
Standard - 66% of emerged land tiles
Early - 60% of emerged land tiles
Earliest - 50% of emerged land tiles
Off - default Legacy BBG setting
Religious Victory
Standard - default Firaxis settings, default Legacy BBG setting, religious pressure extends 12 tiles (from 10)
Early - religious pressure extends 12 tiles
Earliest - religious pressure extends 13 tiles
Score Victory
Standard - default Firaxis settings, default Legacy BBG setting, 250 turns online speed / 500 standard speed
Early - 175 turns online speed / 350 standard speed
Earliest - 150 turns online speed / 300 standard speed

Districts

District Cost and Discount Mechanic

Unique District Cost : Production cost is set to 55% of a standard district cost (from 50%)
Discount District Costs : Production discount on specialty districts via the district discount mechanic is reduced to -35% (from -40%). Government Plaza and Diplomatic Quarter are reduced to -20% (from -25%).

City Center

• Watermill : food on farm resources removed, farms in this city receive +1 production. Watermill and Palgum can be built anywhere (from only cities adjacent to a river)
• Sewer : +1 amenity (from +0 amenity)
• Flood Barrier : moved to Steam Power (from Computers)
• Ancient Walls :+1CS (from +3) +75 outer defense (from +100)
• Medieval Walls :+5CS (from +3) +75 outer defense (from +100)
• Renaissance Walls : +75 outer defense (from +100)
• Steel Walls : +300 outer defense (from +400)

Aerodrome

Aerodrome yields +1 production to incoming international trade route and +1 production to incoming domestic trade route (like encampment)
• Hangar : Cost changed to 320 production (from 380, std speed). +1 Aluminum when it is revealed (from +0)
• Airport : Cost changed to 400 production (from 480, std speed). +1 Aluminum and +1 Uranium when it is revealed (from +0).

Campus

UD campus replacements (Seowon and Observatory) now get +2 adjacency from geothermal fissures

Commercial Hub

+1 adjacency from city centers (from +0)
• Market :
+2 gold (from +3 to balance the adjacency change on comm hub)
• Bank :
+6 gold (from +5)
+2 Great Merchant point (from +1)
Trade routes from cities with bank yield +2 gold.
Trade routes to cities with bank yield +1 gold.
• Stock Exchange :
+8 gold (from +4)
Powered yield : +12 gold (from +7)
+3 Great Merchant point (from +1)
Trade route from cities with Stock Exchange yield +4 gold.
Trade route to cities with Stock Exchange yield +2 gold.

Dam and Canal

Production cost is now the same as Aqueduct, 36 base. (from 81).
Canal moved to Buttress (from Steam Power)

Encampment

• Barracks, Stable, and Replacements : +2 production (from +2 production for units). Barracks give +2 iron per turn and Stables give +2 horses
• Armory : +2 Great General points (from +1), and gives +1 niter
• Military Academy : +2 Great General points (from +1), and +2 oil once revealed

Entertainment Complex

• Entertainment Complex : +2 amenities (from +1)
• Arena : +3 tourism and no longer requires conservation (from +1)
• Stadium : +6 tourism / +15 when powered (from +2/+5)

Government Plaza

• Audience Chamber : +3 food (from +0), +1 amenity (from +2), +3 housing (from +4) in all cities with a governor.
• Warlord's Throne : completely replaced with - gives +25% production to naval and land military units, +2 of each unlocked strategic per turn, reduces unit maintenance by -1 gold and increases strategics stockpile by 30 (in normal speed)
• Foreign Ministry : receive +2 influence per turn and 2 envoys
• Grand Master's Chapel : can buy units with faith, only in the player's founded cities
• Intelligence Agency : +50% production toward spies

Harbor

1 Housing removed from Lighthouse and added to Harbor
• Shipyard : +1 coal once revealed (from +0). Now grants production to Fishery tiles
• Seaport : +3 great admiral points (from +1)

Industrial Zone

• Workshop : cost = 160 production (from 195) and +4 production (from +3)
• Factory : cost = 290 production (from 330)
• Coal Power Plant : cost = 330 production (from 300)
• Oil Power Plant : +6 production (from +3), unlocked at Refining (from Electricity)
• Nuclear Power Plant : +8 production (from +4) +6 science (from +3)

Neighborhood

Production cost reduced to 40 base. (from 54).
• Shopping Mall : +20 tourism (from +4), +10 gold / +10 additional gold when powered (from +2/+2)

Preserve

Preserve yield +1 food to incoming domestic trade route and +1 faith to incoming international trade route.
Fixed a bug that prevented preserves from being discounted like other districts.
They can now be discounted.
Grove : +1 Food and Faith on tiles with Charming or less appeal, +1 Culture on Tiles with Charming appeal, +2 Food/Faith/Culture on tiles with Breathtaking appeal
Sanctuary : +1 Science and Gold if the tile is Charming or less appeal, +1 production if the tile is Charming, +2 Science/Gold/Production if the tile is Breathtaking Appeal

Water Park

• Ferris Wheel : +6 tourism (from +2)
• Aquatics Center : +6 tourism from each wonder building in this city on or adjacent to the coast (from +2)

Improvements

Yields from pillaging Districts and Improvements reduced:
• -20% on Districts.
• -30% on Improvements.
All improvements correctly give tourism at flight equal to their culture value unless stated otherwise, this is a fix to a Firaxis bug.
• Fishing Boats : give +1 production.
• Fisheries : moved to Celestial Navigation (from Liang promote). +1 Housing (from +0.5)
• Fort : Now gives +1 vision and unlocked at Military Engineering (from Siege Tactics). Vision also includes unique forts (Pa, Great Wall, Alcazar)
• Lumber Mill : +1 production at Ballistics and Synthetic Materials (from Steel and Cybernetics).
• Plantations : gives +1 production if built on a flat tile. Food bonus delayed to Medieval Faires (from Feudalism)
• Geothermal Plant : moved to Chemistry (from Synthetic Materials; +3 power (from +4), additional +3 power and +1 science at Synthetic Materials)
• Quarry : +1 production at Military Engineering (from Gunpowder), +2 production at Rocketry (from +1 Rocketry and +1 Predictive Systems)
• Railroads : cost 1 iron (from 1 iron 1 coal), unlocked at Scientific Theory (from Steam Power)
• Seaside Resorts : minimum appeal of charming (from breathtaking), can be built on hills, tourism and gold equal to 150% of appeal (from 100%)

Resources

• Jade : +1 production, but can no longer spawn on plains (from +0, plains and grassland)
• Mercury : +1 food / +1 science (from +0/+1)
• Pearls : +1 production / +1 faith (from +0/+1)
• Spices : +1 food / +1 gold (from +2/+0)
• Tea : +1 food / +1 science (from +0/+1)
• Cocoa and Diamonds : Reduce base gold value to 2 (from 3)
• Marble yield buffed: 1 culture -> 1 culture 2 gold
• Cotton yield buffed: 3 gold -> 4 gold

Military Units

Prebuild System Nerf

Units now become obsolete when the unit +2 is unlocked. (ex: heavy chariot is obsolete at cuirassiers, warriors obsolete at men at arms, swords obsolete at musketmen, quadriremes obsolete at battleships)

Unique Unit (UU) Prebuild Nerf

To stay consistent with the above change, UU's also obsolete when you unlock unit+2 (for example it was previously possible to build/buy Mandekalu Cavalry even after unlocking tanks)

Anti-Cavalry

Thrust promotion is +10 Combat Strength vs Melee (from +5)
• Pikemen : cost adjusted to 200 standard speed (from 180)
• Pike and Shot : cost adjusted to 290 standard speed (from 250)
• AT Crew : 80 combat strength (from 75)
• Modern AT : 90 combat strength (from 85)

Light Cavalry

• Courser : cost adjusted to 180 standard speed (from 200)
• Cavalry : cost adjusted to 310 standard speed (from 330)
• Helicopter : require 1 oil to maintain (from 1 aluminum), 5 movement (from 4)

Heavy Cavalry

Knight : cost adjusted to 200 standard speed (from 220)
Modern Armor : Gets +1 movement. +5 when defending inside friendly territory and +5 when attacking outside of friendly territory

Melee

Melee Units receive +10 Combat Strength vs Anti-Cavalry (from +5)
• Swordsmen : require 7 iron online speed (from 10), Sword replacement UUs require 5 iron.
• Man at Arms : require 7 iron online speed (from 10)
• Musketmen : require 7 niter online speed (from 10), production reduced to 220 (from 240)
• Line Infantry : require 7 niter online speed (from 10), production reduced to 330, same as cuirassier (from 360)
• Infantry : 80 combat strength (from 75), 3 movement (from 2), require 1 niter to maintain (from 1 oil).
• Mechanized Infantry : 90 combat strength (from 85), movement increased to 5 (from 3), and now ignores ZOC

Ranged

Ranged units no longer receive support bonus.
• Machine Gun : 3 movement (from 2), now considered a Modern Era unit due to change in Advanced Ballistics location on the Technology Tree.

Recon

• Skirmisher : Combat Strength adjusted to 25/35 (from 20/30), 3 base vision (Warakaq 25/40)
• Rangers : Combat Strength adjusted to 55/65 (from 45/60), 3 base vision (Highlander 65/70)
• Spec Ops : Combat Strength adjusted to 65/75 (from 55/65), 3 base vision
• Skirmishers, Rangers, Spec Ops, and Warak'aq get +5 melee combat strength
Promotion Changes:
Tier 2 (left, Sentry): see through woods/jungle and +1 sight
Tier 3 (left, spyglass): now called "Endurance", +2 PM
Tier 3 (right, ambush): +15 strength (from +20)

Siege

Siege units no longer receive support bonus.
All siege units get +10 in defense against ranged units.
• Artillery and Rocket Artillery : +5 ranged strength against city centers

Giant Death Robot

Uranium maintenance reduced to 2 (from 3).
Melee 140 strength (from 130)
Anti-Air 120 strength, +20 with future tech (from 100 + 30)
Receives bonus from Fascism

Air Units

Priority target removed for fighter class air units
• All Air Units reduced by -5 combat strength
• Aircraft Carrier : Gets +25 combat strength defending vs planes if adjacent to a unit with AA strength

Naval Melee

Embolon promotion reduced to +5CS (from +7)
• Destroyer : 90 combat strength (from 85), 6 movement (from 4).

Naval Ranged

Naval Ranged units no longer receive support bonus.
Line of Battle promotion reduced to +5CS (from +7)
• Battleship : 75 ranged combat strength (from 70)
• Missile Cruiser : 4 range (from 3)

Naval Raider

Naval Raider units no longer receive support bonus.
• Privateer : moved to Exploration (from Mercantilism)
• Submarine : no resource maintenance (from 1 oil), 4 movement (from 3)

Naval Carrier

Aircraft Carrier :
• 5 movement (from 3)
• 80 combat strength (from 65)

Nuclear Devices

• Manhattan Project : cost increased to 750 online speed (from 500), 1500 standard speed (from 1000)
• Nuclear Device : 600 production online speed (from 400), uranium cost = 7 (from 5)
• Thermonuclear Device : 750 production online speed (from 500), uranium cost = 20 (from 10)

Support Units

• Battering Ram / Siege Tower : Obsolete at Military Science (from Civil Engineering)

• Military Engineer
• 3 movement (from 2)
• 3 charges (from 2)
• Can build roads without using a charge
• Railroads moved to Scientific Theory (from Steam Power)
• Tunnels moved to Military Science (from Chemistry)
• Military Engineers can use a charge to complete 50% of a city's flood barrier production (from 20%)

• Medic : Moved to Military Science (from Sanitation), grants +1 movement to melee, anti-cav, and ranged units (from +0)

• Anti-Air Gun : Unlocked at Steel (from Advanced Ballistics)

• Mobile SAM : +125 Anti-air combat strength (from +100). This is enough to defend nuclear missiles. -5 Anti-air combat strength vs all planes (total = +110 from +100). +2 movement (from 2 to 4)

Governments

Autocracy : Additionally, Monuments give +1 Production and +1 Food if the city has a specialty district

Merchant Republic : 1 Military, 2 Economic, 1 Diplomatic, and 2 Wild slots (from 1/2/2/1)

Monarchy : removed +2 Diplo Favor from Renaissance Walls. Add +2 Culture for each Renaissance Walls.

Communism :
• 2 Military, 3 Economic, 1 Diplomatic, 2 Wild Slots (from 3/3/1/1)
• +1 Production per citizen (from 0.6)
• Collectivization :+4 production (from +2) and +4 Gold (from +0) per domestic trade route
• Negative tourism modifier increased to 50% (from 40%)

Fascism : combat bonus works on defense

Corporate Libertarianism : remove -10% science malus, add +5 Aluminum/Oil/Uranium per turn

Digital Democracy : remove -3 combat strength malus, add +2 tourism per specialty district

Synthetic Technocracy : remove -10% tourism malus, add +50% production toward Spaceports, Industrial Zones, Campuses, Harbors, and also buildings inside those districts.

Policies

• +100% prod towards support units card moved from Communism tech to Ideology
• Bastions : +0 city ranged strength (from +5)
• Communications Office : +2 loyalty per governor promotion (from +1)
• Discipline : Combat bonus against barbarian buffed to +10 (from +5)
• Limes : never gets obsolete, +50% production toward walls (from 100%)
• Medina Quarter : +1 Housing per District (from +2 Housing in cities with 3 specialty districts)
• Military First : Unlocked at Mobilization (from Rapid Deployment)
• Praetorium : +20% production on conquered cities with a governor and +4 loyalty for governors (from +2).
• Rationalism , Grand Opera , Simultaneum and Free Market : Require 13 pop (from 15), and adjacency bonus of +3 (from +4)
• Retinues and Force Modernization : -50% of resource cost to both produce and upgrade units (from upgrade only)

All Strategic Resource policy cards now give a base +2 of the resource, in addition to the normal +1 by worked resource.

All Melee and Ranged unit production policy cards now also include Recon units.

3 new cards to boost Siege Unit production:
• Siegecraft : Available at Military Tradition, +50% production towards ancient, classical and medieval era siege units.
• Hard-shell Explosives : Available at Medieval Faires, +50% production towards siege units from renaissance era and before.
• Trench Warfare : Available at Scorched Earth, +50% production towards all siege units
• Colonial Offices : +15% faster growth, +10% Production and 3 Loyalty per turn for cities 8 tiles away from your capital. [Obsolete at Colonialism]
• Sovereign Trade : Open borders with all city states (obsolete at Ideology, as Ideology gives open borders with all city states), unlocked at Civil Service.
• Gunboat Diplomacy : +4 points Influence points per turn toward earning Envoys and +1 Gold from each of your Envoys at city-states. (removed the open borders with city states but merged the card with Merchant Confederation). Merchant Confederation is now obsolete at Ideology
• Raj : +1 Prod, Food and +2 Science, Culture, Faith and Gold for Trade Route to city-states. (old bonus removed)
• New military policy card unlocked at Military Training: Grants +10 regeneration per turn for land units outside of friendly territory
`;

export default knowledgeChangelog;

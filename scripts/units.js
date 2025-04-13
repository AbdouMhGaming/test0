/**
 * War of Ages - Units Module
 * Defines unit types, stats, and abilities for each historical era
 */

// Unit base stats by era
const unitBaseStats = {
    ancient: {
        health: 100,
        attack: 10,
        defense: 5,
        speed: 50,
        attackRange: 30,
        attackSpeed: 2
    },
    medieval: {
        health: 120,
        attack: 15,
        defense: 8,
        speed: 45,
        attackRange: 40,
        attackSpeed: 1.8
    },
    industrial: {
        health: 150,
        attack: 25,
        defense: 12,
        speed: 60,
        attackRange: 80,
        attackSpeed: 1.5
    },
    modern: {
        health: 180,
        attack: 35,
        defense: 20,
        speed: 70,
        attackRange: 120,
        attackSpeed: 1.2
    },
    future: {
        health: 200,
        attack: 50,
        defense: 30,
        speed: 90,
        attackRange: 150,
        attackSpeed: 1
    }
};

// Unit definitions by era
const unitDefinitions = {
    ancient: [
        {
            name: "Spearman",
            description: "Basic infantry unit with spears",
            cost: 50,
            size: 10,
            health: 100,
            attack: 10,
            defense: 5,
            speed: 50,
            attackRange: 20,
            attackSpeed: 2,
            abilities: []
        },
        {
            name: "Archer",
            description: "Ranged unit with bows",
            cost: 75,
            size: 8,
            health: 70,
            attack: 15,
            defense: 3,
            speed: 45,
            attackRange: 150,
            attackSpeed: 2.5,
            abilities: []
        },
        {
            name: "Horseman",
            description: "Fast cavalry unit",
            cost: 100,
            size: 12,
            health: 120,
            attack: 12,
            defense: 4,
            speed: 80,
            attackRange: 30,
            attackSpeed: 1.8,
            abilities: ["Charge"]
        },
        {
            name: "Catapult",
            description: "Siege weapon with area damage",
            cost: 200,
            size: 15,
            health: 80,
            attack: 30,
            defense: 2,
            speed: 25,
            attackRange: 200,
            attackSpeed: 4,
            abilities: ["Area Damage"]
        },
        {
            name: "Champion",
            description: "Elite heavy infantry",
            cost: 150,
            size: 12,
            health: 150,
            attack: 18,
            defense: 10,
            speed: 40,
            attackRange: 30,
            attackSpeed: 1.5,
            abilities: ["Inspire"]
        }
    ],
    medieval: [
        {
            name: "Swordsman",
            description: "Basic infantry unit with swords",
            cost: 60,
            size: 10,
            health: 120,
            attack: 15,
            defense: 8,
            speed: 45,
            attackRange: 25,
            attackSpeed: 1.8,
            abilities: []
        },
        {
            name: "Crossbowman",
            description: "Ranged unit with crossbows",
            cost: 90,
            size: 8,
            health: 85,
            attack: 20,
            defense: 5,
            speed: 40,
            attackRange: 180,
            attackSpeed: 3,
            abilities: []
        },
        {
            name: "Knight",
            description: "Heavy cavalry unit",
            cost: 120,
            size: 14,
            health: 150,
            attack: 25,
            defense: 15,
            speed: 70,
            attackRange: 35,
            attackSpeed: 2,
            abilities: ["Charge"]
        },
        {
            name: "Trebuchet",
            description: "Advanced siege weapon",
            cost: 250,
            size: 16,
            health: 100,
            attack: 40,
            defense: 3,
            speed: 20,
            attackRange: 250,
            attackSpeed: 5,
            abilities: ["Area Damage"]
        },
        {
            name: "Paladin",
            description: "Elite holy warrior",
            cost: 180,
            size: 13,
            health: 180,
            attack: 22,
            defense: 18,
            speed: 60,
            attackRange: 35,
            attackSpeed: 1.7,
            abilities: ["Heal", "Inspire"]
        }
    ],
    industrial: [
        {
            name: "Rifleman",
            description: "Basic infantry with rifles",
            cost: 80,
            size: 10,
            health: 150,
            attack: 25,
            defense: 12,
            speed: 60,
            attackRange: 150,
            attackSpeed: 1.5,
            abilities: []
        },
        {
            name: "Grenadier",
            description: "Infantry with explosive weapons",
            cost: 100,
            size: 11,
            health: 140,
            attack: 35,
            defense: 10,
            speed: 55,
            attackRange: 100,
            attackSpeed: 2,
            abilities: ["Area Damage"]
        },
        {
            name: "Cavalry",
            description: "Mounted unit with firearms",
            cost: 150,
            size: 14,
            health: 170,
            attack: 30,
            defense: 15,
            speed: 90,
            attackRange: 120,
            attackSpeed: 1.8,
            abilities: ["Charge"]
        },
        {
            name: "Cannon",
            description: "Artillery unit",
            cost: 300,
            size: 16,
            health: 120,
            attack: 50,
            defense: 8,
            speed: 30,
            attackRange: 300,
            attackSpeed: 3,
            abilities: ["Area Damage"]
        },
        {
            name: "Officer",
            description: "Command unit that boosts nearby allies",
            cost: 200,
            size: 12,
            health: 160,
            attack: 20,
            defense: 20,
            speed: 65,
            attackRange: 100,
            attackSpeed: 1.5,
            abilities: ["Command", "Rally"]
        }
    ],
    modern: [
        {
            name: "Soldier",
            description: "Modern infantry with assault rifles",
            cost: 100,
            size: 10,
            health: 180,
            attack: 35,
            defense: 20,
            speed: 70,
            attackRange: 200,
            attackSpeed: 1.2,
            abilities: []
        },
        {
            name: "Sniper",
            description: "Long-range specialist",
            cost: 150,
            size: 9,
            health: 120,
            attack: 60,
            defense: 10,
            speed: 60,
            attackRange: 400,
            attackSpeed: 3,
            abilities: ["Stealth"]
        },
        {
            name: "Tank",
            description: "Armored vehicle with heavy firepower",
            cost: 300,
            size: 18,
            health: 300,
            attack: 50,
            defense: 40,
            speed: 80,
            attackRange: 250,
            attackSpeed: 2,
            abilities: ["Crush"]
        },
        {
            name: "Helicopter",
            description: "Flying unit with missiles",
            cost: 350,
            size: 16,
            health: 200,
            attack: 45,
            defense: 15,
            speed: 120,
            attackRange: 300,
            attackSpeed: 1.5,
            abilities: ["Air Superiority"]
        },
        {
            name: "Commander",
            description: "Special forces leader",
            cost: 250,
            size: 12,
            health: 220,
            attack: 40,
            defense: 25,
            speed: 75,
            attackRange: 180,
            attackSpeed: 1.3,
            abilities: ["Command", "Call Support"]
        }
    ],
    future: [
        {
            name: "CyberSoldier",
            description: "Enhanced human with cybernetic implants",
            cost: 150,
            size: 10,
            health: 200,
            attack: 50,
            defense: 30,
            speed: 90,
            attackRange: 250,
            attackSpeed: 1,
            abilities: ["Regeneration"]
        },
        {
            name: "Drone",
            description: "Autonomous flying unit",
            cost: 200,
            size: 8,
            health: 150,
            attack: 40,
            defense: 20,
            speed: 150,
            attackRange: 350,
            attackSpeed: 1.2,
            abilities: ["Surveillance"]
        },
        {
            name: "Mech",
            description: "Piloted robotic combat suit",
            cost: 400,
            size: 20,
            health: 400,
            attack: 70,
            defense: 50,
            speed: 70,
            attackRange: 300,
            attackSpeed: 1.8,
            abilities: ["Jump Jets", "Missile Barrage"]
        },
        {
            name: "EnergyTank",
            description: "Hover tank with energy weapons",
            cost: 450,
            size: 18,
            health: 350,
            attack: 65,
            defense: 60,
            speed: 100,
            attackRange: 320,
            attackSpeed: 1.5,
            abilities: ["Shield", "EMP Blast"]
        },
        {
            name: "Hacker",
            description: "Tech specialist who disrupts enemy systems",
            cost: 300,
            size: 9,
            health: 180,
            attack: 30,
            defense: 25,
            speed: 85,
            attackRange: 400,
            attackSpeed: 2,
            abilities: ["Hack", "System Crash", "Drone Swarm"]
        }
    ]
};

// Building definitions by era
const buildingDefinitions = {
    ancient: [
        {
            name: "Town Center",
            description: "Main building that produces villagers",
            cost: 400,
            width: 60,
            height: 60,
            health: 500,
            productionType: "villager",
            productionAmount: 1,
            productionInterval: 30,
            isMainBuilding: true
        },
        {
            name: "Barracks",
            description: "Trains military units",
            cost: 150,
            width: 50,
            height: 50,
            health: 300,
            productionType: "military",
            productionAmount: 0,
            productionInterval: 0,
            isMainBuilding: false
        },
        {
            name: "Farm",
            description: "Produces food",
            cost: 100,
            width: 40,
            height: 40,
            health: 150,
            productionType: "food",
            productionAmount: 5,
            productionInterval: 10,
            isMainBuilding: false
        },
        {
            name: "Mine",
            description: "Produces gold",
            cost: 120,
            width: 40,
            height: 40,
            health: 200,
            productionType: "gold",
            productionAmount: 10,
            productionInterval: 15,
            isMainBuilding: false
        },
        {
            name: "Temple",
            description: "Researches technologies",
            cost: 200,
            width: 45,
            height: 45,
            health: 250,
            productionType: "research",
            productionAmount: 5,
            productionInterval: 20,
            isMainBuilding: false
        }
    ],
    medieval: [
        {
            name: "Castle",
            description: "Main building that produces villagers",
            cost: 500,
            width: 70,
            height: 70,
            health: 700,
            productionType: "villager",
            productionAmount: 1,
            productionInterval: 25,
            isMainBuilding: true
        },
        {
            name: "Barracks",
            description: "Trains military units",
            cost: 180,
            width: 50,
            height: 50,
            health: 350,
            productionType: "military",
            productionAmount: 0,
            productionInterval: 0,
            isMainBuilding: false
        },
        {
            name: "Mill",
            description: "Produces food",
            cost: 120,
            width: 40,
            height: 40,
            health: 200,
            productionType: "food",
            productionAmount: 8,
            productionInterval: 10,
            isMainBuilding: false
        },
        {
            name: "Blacksmith",
            description: "Upgrades weapons and armor",
            cost: 150,
            width: 45,
            height: 45,
            health: 250,
            productionType: "upgrade",
            productionAmount: 1,
            productionInterval: 60,
            isMainBuilding: false
        },
        {
            name: "Market",
            description: "Trades resources",
            cost: 200,
            width: 50,
            height: 50,
            health: 300,
            productionType: "gold",
            productionAmount: 15,
            productionInterval: 15,
            isMainBuilding: false
        }
    ],
    industrial: [
        {
            name: "Factory",
            description: "Main building that produces workers",
            cost: 600,
            width: 80,
            height: 80,
            health: 800,
            productionType: "worker",
            productionAmount: 1,
            productionInterval: 20,
            isMainBuilding: true
        },
        {
            name: "Barracks",
            description: "Trains military units",
            cost: 220,
            width: 60,
            height: 60,
            health: 400,
            productionType: "military",
            productionAmount: 0,
            productionInterval: 0,
            isMainBuilding: false
        },
        {
            name: "Workshop",
            description: "Builds vehicles and artillery",
            cost: 300,
            width: 70,
            height: 70,
            health: 450,
            productionType: "vehicle",
            productionAmount: 0,
            productionInterval: 0,
            isMainBuilding: false
        },
        {
            name: "Mine",
            description: "Produces resources",
            cost: 180,
            width: 50,
            height: 50,
            health: 300,
            productionType: "gold",
            productionAmount: 20,
            productionInterval: 12,
            isMainBuilding: false
        },
        {
            name: "Laboratory",
            description: "Researches technologies",
            cost: 250,
            width: 55,
            height: 55,
            health: 350,
            productionType: "research",
            productionAmount: 10,
            productionInterval: 15,
            isMainBuilding: false
        }
    ],
    modern: [
        {
            name: "Headquarters",
            description: "Main command center",
            cost: 800,
            width: 90,
            height: 90,
            health: 1000,
            productionType: "personnel",
            productionAmount: 1,
            productionInterval: 15,
            isMainBuilding: true
        },
        {
            name: "Barracks",
            description: "Trains infantry units",
            cost: 300,
            width: 60,
            height: 60,
            health: 500,
            productionType: "infantry",
            productionAmount: 0,
            productionInterval: 0,
            isMainBuilding: false
        },
        {
            name: "Vehicle Factory",
            description: "Builds tanks and vehicles",
            cost: 400,
            width: 80,
            height: 80,
            health: 600,
            productionType: "vehicle",
            productionAmount: 0,
            productionInterval: 0,
            isMainBuilding: false
        },
        {
            name: "Airfield",
            description: "Builds aircraft",
            cost: 500,
            width: 100,
            height: 100,
            health: 450,
            productionType: "aircraft",
            productionAmount: 0,
            productionInterval: 0,
            isMainBuilding: false
        },
        {
            name: "Research Center",
            description: "Develops advanced technologies",
            cost: 350,
            width: 70,
            height: 70,
            health: 400,
            productionType: "research",
            productionAmount: 15,
            productionInterval: 10,
            isMainBuilding: false
        }
    ],
    future: [
        {
            name: "Command Nexus",
            description: "Central AI command structure",
            cost: 1000,
            width: 100,
            height: 100,
            health: 1200,
            productionType: "drone",
            productionAmount: 1,
            productionInterval: 10,
            isMainBuilding: true
        },
        {
            name: "Cybernetics Lab",
            description: "Creates enhanced soldiers",
            cost: 400,
            width: 70,
            height: 70,
            health: 600,
            productionType: "cyborg",
            productionAmount: 0,
            productionInterval: 0,
            isMainBuilding: false
        },
        {
            name: "Mech Factory",
            description: "Builds mechs and robots",
            cost: 600,
            width: 90,
            height: 90,
            health: 800,
            productionType: "mech",
            productionAmount: 0,
            productionInterval: 0,
            isMainBuilding: false
        },
        {
            name: "Energy Core",
            description: "Generates power and resources",
            cost: 500,
            width: 60,
            height: 60,
            health: 500,
            productionType: "energy",
            productionAmount: 30,
            productionInterval: 8,
            isMainBuilding: false
        },
        {
            name: "Quantum Lab",
            description: "Researches future technologies",
            cost: 700,
            width: 80,
            height: 80,
            health: 550,
            productionType: "research",
            productionAmount: 25,
            productionInterval: 12,
            isMainBuilding: false
        }
    ]
};

// Get units for a specific era
function getEraUnits(era) {
    return unitDefinitions[era] || [];
}

// Get buildings for a specific era
function getEraBuildings(era) {
    return buildingDefinitions[era] || [];
}

// Get unit abilities
function getUnitAbilities(unitType, era) {
    const units = getEraUnits(era);
    const unit = units.find(u => u.name === unitType);
    return unit ? unit.abilities : [];
}

// Apply ability effects
function applyAbilityEffect(ability, unit, target) {
    switch (ability) {
        case "Charge":
            // Increase damage for this attack
            return { damage: unit.attack * 1.5 };
        
        case "Area Damage":
            // Deal damage to target and nearby units
            return { areaEffect: true, radius: 50, damage: unit.attack * 0.7 };
        
        case "Inspire":
            // Boost nearby friendly units
            return { buff: true, radius: 100, attackBoost: 5, duration: 10 };
        
        case "Heal":
            // Heal target unit
            return { heal: true, amount: 20 };
        
        case "Command":
            // Increase nearby units' effectiveness
            return { buff: true, radius: 150, attackBoost: 3, defenseBoost: 3, duration: 15 };
        
        case "Rally":
            // Increase nearby units' speed
            return { buff: true, radius: 120, speedBoost: 20, duration: 10 };
        
        case "Stealth":
            // Unit becomes harder to detect
            return { stealth: true, duration: 10 };
        
        case "Crush":
            // Deal extra damage to buildings
            return { buildingDamageMultiplier: 2 };
        
        case "Air Superiority":
            // Deal extra damage to air units
            return { airDamageMultiplier: 2 };
        
        case "Call Support":
            // Call in temporary reinforcements
            return { summon: true, unitType: "Soldier", count: 3, duration: 20 };
        
        case "Regeneration":
            // Slowly heal over time
            return { regen: true, amount: 5, interval: 3 };
        
        case "Surveillance":
            // Reveal hidden units in an area
            return { reveal: true, radius: 200, duration: 15 };
        
        case "Jump Jets":
            // Quickly move to a new location
            return { teleport: true, maxDistance: 200, cooldown: 20 };
        
        case "Missile Barrage":
            // Fire multiple missiles at targets in an area
            return { areaEffect: true, radius: 150, damage: unit.attack * 0.4, count: 5 };
        
        case "Shield":
            // Temporary damage absorption
            return { shield: true, amount: 100, duration: 10 };
        
        case "EMP Blast":
            // Disable enemy units temporarily
            return { disable: true, radius: 100, duration: 5 };
        
        case "Hack":
            // Take control of an enemy unit temporarily
            return { control: true, duration: 8 };
        
        case "System Crash":
            // Disable all enemy buildings in an area
            return { disableBuildings: true, radius: 150, duration: 10 };
        
        case "Drone Swarm":
            // Summon temporary drones
            return { summon: true, unitType: "Drone", count: 5, duration: 15 };
        
        default:
            return {};
    }
}
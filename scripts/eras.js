/**
 * War of Ages - Eras Module
 * Defines historical eras, their technologies, and progression mechanics
 */

// Era definitions
const eras = [
    {
        id: "ancient",
        name: "Ancient Era",
        period: "3000 BCE - 500 CE",
        description: "The dawn of civilization and organized warfare. Command legions, chariots, and early siege weapons.",
        background: "assets/images/backgrounds/ancient-era.jpg",
        color: "#8d5524",
        unlockRequirement: null // Starting era
    },
    {
        id: "medieval",
        name: "Medieval Era",
        period: "500 - 1500 CE",
        description: "The age of knights, castles, and feudal warfare. Lead armies of knights, archers, and siege engines.",
        background: "assets/images/backgrounds/medieval-era.jpg",
        color: "#5a189a",
        unlockRequirement: {
            victories: 3,
            research: 500
        }
    },
    {
        id: "industrial",
        name: "Industrial Era",
        period: "1500 - 1900 CE",
        description: "The revolution of gunpowder and machinery. Command riflemen, artillery, and early mechanized units.",
        background: "assets/images/backgrounds/industrial-era.jpg",
        color: "#023e8a",
        unlockRequirement: {
            victories: 5,
            research: 1000
        }
    },
    {
        id: "modern",
        name: "Modern Era",
        period: "1900 - 2000 CE",
        description: "The age of global warfare. Deploy tanks, aircraft, and specialized infantry in complex battlefields.",
        background: "assets/images/backgrounds/modern-era.jpg",
        color: "#0a9396",
        unlockRequirement: {
            victories: 8,
            research: 2000
        }
    },
    {
        id: "future",
        name: "Future Era",
        period: "2000 CE - Beyond",
        description: "The battlefield of tomorrow. Control drones, mechs, and cyber units with advanced technologies.",
        background: "assets/images/backgrounds/future-era.jpg",
        color: "#7209b7",
        unlockRequirement: {
            victories: 12,
            research: 3000
        }
    }
];

// Technology trees by era
const techTrees = {
    ancient: [
        {
            id: "bronze-working",
            name: "Bronze Working",
            description: "Improves unit attack by 10%",
            cost: 100,
            researchTime: 30,
            effects: {
                unitAttackMultiplier: 1.1
            },
            prerequisites: []
        },
        {
            id: "wheel",
            name: "The Wheel",
            description: "Increases unit movement speed by 15%",
            cost: 120,
            researchTime: 35,
            effects: {
                unitSpeedMultiplier: 1.15
            },
            prerequisites: []
        },
        {
            id: "writing",
            name: "Writing",
            description: "Increases research production by 20%",
            cost: 150,
            researchTime: 40,
            effects: {
                researchMultiplier: 1.2
            },
            prerequisites: []
        },
        {
            id: "iron-working",
            name: "Iron Working",
            description: "Improves unit attack by 15% and defense by 10%",
            cost: 200,
            researchTime: 50,
            effects: {
                unitAttackMultiplier: 1.15,
                unitDefenseMultiplier: 1.1
            },
            prerequisites: ["bronze-working"]
        },
        {
            id: "mathematics",
            name: "Mathematics",
            description: "Improves catapult range by 25%",
            cost: 180,
            researchTime: 45,
            effects: {
                unitRangeMultiplier: {
                    unitType: "Catapult",
                    value: 1.25
                }
            },
            prerequisites: ["writing"]
        }
    ],
    medieval: [
        {
            id: "feudalism",
            name: "Feudalism",
            description: "Increases gold production by 20%",
            cost: 200,
            researchTime: 40,
            effects: {
                goldProductionMultiplier: 1.2
            },
            prerequisites: []
        },
        {
            id: "steel",
            name: "Steel",
            description: "Improves unit attack by 20% and defense by 15%",
            cost: 250,
            researchTime: 50,
            effects: {
                unitAttackMultiplier: 1.2,
                unitDefenseMultiplier: 1.15
            },
            prerequisites: []
        },
        {
            id: "guilds",
            name: "Guilds",
            description: "Reduces unit cost by 15%",
            cost: 300,
            researchTime: 60,
            effects: {
                unitCostMultiplier: 0.85
            },
            prerequisites: ["feudalism"]
        },
        {
            id: "plate-armor",
            name: "Plate Armor",
            description: "Improves knight defense by 30%",
            cost: 350,
            researchTime: 70,
            effects: {
                unitDefenseMultiplier: {
                    unitType: "Knight",
                    value: 1.3
                }
            },
            prerequisites: ["steel"]
        },
        {
            id: "engineering",
            name: "Engineering",
            description: "Improves building health by 25% and trebuchet range by 20%",
            cost: 400,
            researchTime: 80,
            effects: {
                buildingHealthMultiplier: 1.25,
                unitRangeMultiplier: {
                    unitType: "Trebuchet",
                    value: 1.2
                }
            },
            prerequisites: ["guilds"]
        }
    ],
    industrial: [
        {
            id: "gunpowder",
            name: "Gunpowder",
            description: "Improves rifleman attack by 25%",
            cost: 400,
            researchTime: 60,
            effects: {
                unitAttackMultiplier: {
                    unitType: "Rifleman",
                    value: 1.25
                }
            },
            prerequisites: []
        },
        {
            id: "steam-power",
            name: "Steam Power",
            description: "Increases production rate by 30%",
            cost: 450,
            researchTime: 70,
            effects: {
                productionMultiplier: 1.3
            },
            prerequisites: []
        },
        {
            id: "metallurgy",
            name: "Metallurgy",
            description: "Improves all unit defense by 20%",
            cost: 500,
            researchTime: 80,
            effects: {
                unitDefenseMultiplier: 1.2
            },
            prerequisites: ["gunpowder"]
        },
        {
            id: "ballistics",
            name: "Ballistics",
            description: "Improves cannon accuracy and damage by 30%",
            cost: 550,
            researchTime: 90,
            effects: {
                unitAttackMultiplier: {
                    unitType: "Cannon",
                    value: 1.3
                }
            },
            prerequisites: ["metallurgy"]
        },
        {
            id: "military-science",
            name: "Military Science",
            description: "Unlocks officer abilities and improves all unit attack by 15%",
            cost: 600,
            researchTime: 100,
            effects: {
                unitAttackMultiplier: 1.15,
                unlockAbilities: ["Command", "Rally"]
            },
            prerequisites: ["steam-power", "ballistics"]
        }
    ],
    modern: [
        {
            id: "combustion",
            name: "Combustion",
            description: "Increases tank and helicopter speed by 25%",
            cost: 600,
            researchTime: 80,
            effects: {
                unitSpeedMultiplier: {
                    unitTypes: ["Tank", "Helicopter"],
                    value: 1.25
                }
            },
            prerequisites: []
        },
        {
            id: "radio",
            name: "Radio",
            description: "Increases unit vision range by 30%",
            cost: 650,
            researchTime: 85,
            effects: {
                visionRangeMultiplier: 1.3
            },
            prerequisites: []
        },
        {
            id: "advanced-ballistics",
            name: "Advanced Ballistics",
            description: "Improves all ranged unit attack by 25%",
            cost: 700,
            researchTime: 90,
            effects: {
                rangedUnitAttackMultiplier: 1.25
            },
            prerequisites: ["radio"]
        },
        {
            id: "composite-materials",
            name: "Composite Materials",
            description: "Improves all unit defense by 25%",
            cost: 750,
            researchTime: 95,
            effects: {
                unitDefenseMultiplier: 1.25
            },
            prerequisites: ["combustion"]
        },
        {
            id: "satellites",
            name: "Satellites",
            description: "Reveals the entire map and improves commander abilities",
            cost: 800,
            researchTime: 100,
            effects: {
                revealMap: true,
                abilityEffectMultiplier: {
                    unitType: "Commander",
                    value: 1.5
                }
            },
            prerequisites: ["advanced-ballistics", "composite-materials"]
        }
    ],
    future: [
        {
            id: "ai-systems",
            name: "AI Systems",
            description: "Improves all unit targeting and attack by 30%",
            cost: 800,
            researchTime: 100,
            effects: {
                unitAttackMultiplier: 1.3
            },
            prerequisites: []
        },
        {
            id: "nanotechnology",
            name: "Nanotechnology",
            description: "Enables unit self-repair and improves defense by 30%",
            cost: 850,
            researchTime: 110,
            effects: {
                unitDefenseMultiplier: 1.3,
                enableSelfRepair: true
            },
            prerequisites: []
        },
        {
            id: "quantum-computing",
            name: "Quantum Computing",
            description: "Improves hacker abilities by 50% and research rate by 40%",
            cost: 900,
            researchTime: 120,
            effects: {
                abilityEffectMultiplier: {
                    unitType: "Hacker",
                    value: 1.5
                },
                researchMultiplier: 1.4
            },
            prerequisites: ["ai-systems"]
        },
        {
            id: "fusion-power",
            name: "Fusion Power",
            description: "Doubles energy production and improves energy weapons by 40%",
            cost: 950,
            researchTime: 130,
            effects: {
                energyProductionMultiplier: 2,
                energyWeaponMultiplier: 1.4
            },
            prerequisites: ["nanotechnology"]
        },
        {
            id: "singularity",
            name: "Technological Singularity",
            description: "The ultimate technology. Improves all aspects of your civilization by 50%",
            cost: 1000,
            researchTime: 150,
            effects: {
                allMultiplier: 1.5
            },
            prerequisites: ["quantum-computing", "fusion-power"]
        }
    ]
};

// Era progression mechanics
function checkEraUnlockRequirements(eraId, playerStats) {
    const era = eras.find(e => e.id === eraId);
    if (!era || !era.unlockRequirement) {
        return true; // No requirements or era not found
    }
    
    const requirements = era.unlockRequirement;
    
    // Check victories
    if (requirements.victories && playerStats.victories < requirements.victories) {
        return false;
    }
    
    // Check research
    if (requirements.research && playerStats.totalResearch < requirements.research) {
        return false;
    }
    
    return true;
}

// Get technologies for a specific era
function getEraTechnologies(era) {
    return techTrees[era] || [];
}

// Check if a technology can be researched
function canResearchTechnology(techId, era, researchedTechs) {
    const technologies = getEraTechnologies(era);
    const tech = technologies.find(t => t.id === techId);
    
    if (!tech) {
        return false;
    }
    
    // Check prerequisites
    if (tech.prerequisites && tech.prerequisites.length > 0) {
        for (const prereq of tech.prerequisites) {
            if (!researchedTechs.includes(prereq)) {
                return false;
            }
        }
    }
    
    return true;
}

// Apply technology effects
function applyTechnologyEffects(techId, era, gameState) {
    const technologies = getEraTechnologies(era);
    const tech = technologies.find(t => t.id === techId);
    
    if (!tech) {
        return gameState;
    }
    
    const effects = tech.effects;
    let updatedState = { ...gameState };
    
    // Apply unit attack multiplier
    if (effects.unitAttackMultiplier) {
        if (typeof effects.unitAttackMultiplier === 'object') {
            // Apply to specific unit type
            updatedState.units = updatedState.units.map(unit => {
                if (unit.type === effects.unitAttackMultiplier.unitType) {
                    return {
                        ...unit,
                        attack: unit.attack * effects.unitAttackMultiplier.value
                    };
                }
                return unit;
            });
        } else {
            // Apply to all units
            updatedState.units = updatedState.units.map(unit => ({
                ...unit,
                attack: unit.attack * effects.unitAttackMultiplier
            }));
        }
    }
    
    // Apply unit defense multiplier
    if (effects.unitDefenseMultiplier) {
        if (typeof effects.unitDefenseMultiplier === 'object') {
            // Apply to specific unit type
            updatedState.units = updatedState.units.map(unit => {
                if (unit.type === effects.unitDefenseMultiplier.unitType) {
                    return {
                        ...unit,
                        defense: unit.defense * effects.unitDefenseMultiplier.value
                    };
                }
                return unit;
            });
        } else {
            // Apply to all units
            updatedState.units = updatedState.units.map(unit => ({
                ...unit,
                defense: unit.defense * effects.unitDefenseMultiplier
            }));
        }
    }
    
    // Apply unit speed multiplier
    if (effects.unitSpeedMultiplier) {
        if (typeof effects.unitSpeedMultiplier === 'object') {
            // Apply to specific unit types
            updatedState.units = updatedState.units.map(unit => {
                if (effects.unitSpeedMultiplier.unitTypes.includes(unit.type)) {
                    return {
                        ...unit,
                        speed: unit.speed * effects.unitSpeedMultiplier.value
                    };
                }
                return unit;
            });
        } else {
            // Apply to all units
            updatedState.units = updatedState.units.map(unit => ({
                ...unit,
                speed: unit.speed * effects.unitSpeedMultiplier
            }));
        }
    }
    
    // Apply unit range multiplier
    if (effects.unitRangeMultiplier) {
        updatedState.units = updatedState.units.map(unit => {
            if (unit.type === effects.unitRangeMultiplier.unitType) {
                return {
                    ...unit,
                    attackRange: unit.attackRange * effects.unitRangeMultiplier.value
                };
            }
            return unit;
        });
    }
    
    // Apply research multiplier
    if (effects.researchMultiplier) {
        updatedState.resources = {
            ...updatedState.resources,
            researchRate: (updatedState.resources.researchRate || 1) * effects.researchMultiplier
        };
    }
    
    // Apply gold production multiplier
    if (effects.goldProductionMultiplier) {
        updatedState.resources = {
            ...updatedState.resources,
            goldRate: (updatedState.resources.goldRate || 1) * effects.goldProductionMultiplier
        };
    }
    
    // Apply unit cost multiplier
    if (effects.unitCostMultiplier) {
        // This would be applied when calculating unit costs
        updatedState.unitCostMultiplier = (updatedState.unitCostMultiplier || 1) * effects.unitCostMultiplier;
    }
    
    // Apply building health multiplier
    if (effects.buildingHealthMultiplier) {
        updatedState.buildings = updatedState.buildings.map(building => ({
            ...building,
            health: building.health * effects.buildingHealthMultiplier,
            maxHealth: building.maxHealth * effects.buildingHealthMultiplier
        }));
    }
    
    // Apply production multiplier
    if (effects.productionMultiplier) {
        updatedState.resources = {
            ...updatedState.resources,
            production: updatedState.resources.production * effects.productionMultiplier
        };
    }
    
    // Apply ranged unit attack multiplier
    if (effects.rangedUnitAttackMultiplier) {
        updatedState.units = updatedState.units.map(unit => {
            if (unit.attackRange > 50) { // Arbitrary threshold for "ranged" units
                return {
                    ...unit,
                    attack: unit.attack * effects.rangedUnitAttackMultiplier
                };
            }
            return unit;
        });
    }
    
    // Apply vision range multiplier
    if (effects.visionRangeMultiplier) {
        // This would be applied to the game's vision system
        updatedState.visionRangeMultiplier = (updatedState.visionRangeMultiplier || 1) * effects.visionRangeMultiplier;
    }
    
    // Apply ability effect multiplier
    if (effects.abilityEffectMultiplier) {
        // This would be applied when calculating ability effects
        updatedState.abilityEffectMultipliers = updatedState.abilityEffectMultipliers || {};
        updatedState.abilityEffectMultipliers[effects.abilityEffectMultiplier.unitType] = 
            (updatedState.abilityEffectMultipliers[effects.abilityEffectMultiplier.unitType] || 1) * 
            effects.abilityEffectMultiplier.value;
    }
    
    // Enable self-repair
    if (effects.enableSelfRepair) {
        updatedState.enabledAbilities = updatedState.enabledAbilities || [];
        updatedState.enabledAbilities.push("SelfRepair");
    }
    
    // Apply energy production multiplier
    if (effects.energyProductionMultiplier) {
        updatedState.resources = {
            ...updatedState.resources,
            energyRate: (updatedState.resources.energyRate || 1) * effects.energyProductionMultiplier
        };
    }
    
    // Apply energy weapon multiplier
    if (effects.energyWeaponMultiplier) {
        updatedState.units = updatedState.units.map(unit => {
            // Apply to units with energy weapons (future era units)
            if (gameState.selectedEra === 'future') {
                return {
                    ...unit,
                    attack: unit.attack * effects.energyWeaponMultiplier
                };
            }
            return unit;
        });
    }
    
    // Apply all multiplier (affects everything)
    if (effects.allMultiplier) {
        // Apply to all stats
        updatedState.units = updatedState.units.map(unit => ({
            ...unit,
            attack: unit.attack * effects.allMultiplier,
            defense: unit.defense * effects.allMultiplier,
            speed: unit.speed * effects.allMultiplier,
            health: unit.health * effects.allMultiplier,
            maxHealth: unit.maxHealth * effects.allMultiplier
        }));
        
        updatedState.buildings = updatedState.buildings.map(building => ({
            ...building,
            health: building.health * effects.allMultiplier,
            maxHealth: building.maxHealth * effects.allMultiplier
        }));
        
        updatedState.resources = {
            ...updatedState.resources,
            production: updatedState.resources.production * effects.allMultiplier,
            goldRate: (updatedState.resources.goldRate || 1) * effects.allMultiplier,
            researchRate: (updatedState.resources.researchRate || 1) * effects.allMultiplier
        };
    }
    
    return updatedState;
}

// Get era by ID
function getEraById(eraId) {
    return eras.find(era => era.id === eraId);
}

// Get all eras
function getAllEras() {
    return eras;
}
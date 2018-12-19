function parseMonsters(monstersToParse, spells) {
    return monstersToParse.map(x => {
        return {
            challengeRating: x.cr,
            name: x.name,
            size: x.size, // Parse m-> Medium
            type: x.type, // filter out (aarakocra)
            alignment: x.alignment,
            armorClass: x.ac,
            hitPoints: x.hp, // parse hp from hitDice
            hitDice: "xxx",
            speed: x.speed,
            abilities: {
                strength: x.str,
                dexterity: x.dex,
                constitution: x.con,
                intelligence: x.int,
                wisdom: x.wis,
                charisma: x.cha,
            },
            saves: [], // parse
            skills: [], //parse
            resistances: {
                // parse
                damageVulnerabilities: [],
                damageResistance: [],
                damageImmunities: [],
                conditionImmunities: [],
            },
            features: [], // parse from trait
            spellCasting: null,
            actions: [], // from x.action
            legendaryActions: [], // from x.legendary
            senses: x.senses,
            languages: x.languages,
            environment: x.environment,
            source: "", // parse from trait[source]
        };
    });
}

module.exports = parseMonsters;

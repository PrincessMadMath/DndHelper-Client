function parseMonsters(monstersToParse) {
    return monstersToParse.map(x => {
        return {
            challengeRating: x.cr,
            name: x.name,
            size: parseSize(x.size),
            type: parseType(x.type),
            alignment: x.alignment,
            armorClass: x.ac,
            ...parseHP(x.hp),
            speed: x.speed,
            abilities: {
                strength: x.str,
                dexterity: x.dex,
                constitution: x.con,
                intelligence: x.int,
                wisdom: x.wis,
                charisma: x.cha,
            },
            saves: parseSaves(x.save),
            skills: parseSkills(x.skill),
            resistances: parseResistances(
                x.resist,
                x.vulnerable,
                x.immune,
                x.conditionImmune
            ),
            features: parseFeatures(x.trait),
            spellCasting: parseSpellCasting(x.trait),
            innateSpellcasting: parseInnateSpellCasting(x.trait),
            actions: parseActions(x.action),
            legendaryActions: parseLegendaryActions(x.legendary),
            lairActions: parseLairActions(x.action),
            senses: x.senses,
            languages: x.languages,
            environment: x.environment,
            source: parseSource(x.trait),
        };
    });
}

function parseSize(size) {
    switch (size) {
        case "T":
            return "Tiny";

        case "S":
            return "Small";

        case "M":
            return "Medium";

        case "L":
            return "Large";

        case "H":
            return "Huge";

        case "G":
            return "Gargantuan";

        default:
            console.log(`Unknown size: ${size}`);
            break;
    }
}

function parseType(type) {
    // humanoid (dwarf)
    const typeRegex = /(.*)\((.*)\)/g;
    const typeRegexResult = typeRegex.exec(type);

    if (typeRegexResult === null) {
        return {
            name: type,
            details: null,
        };
    }

    return {
        name: typeRegexResult[1].trim(),
        details: typeRegexResult[2].trim(),
    };
}

function parseHP(hp) {
    // 26 (4d8+4)
    const regex = /(\d+) \((.*)\)/g;
    const regexResult = regex.exec(hp);

    if (regexResult === null) {
        return {
            hitPoints: hp,
            hitDice: "",
        };
    }

    return {
        hitPoints: parseInt(regexResult[1]),
        hitDice: regexResult[2],
    };
}

function parseSaves(saveTxt) {
    if (saveTxt === "") {
        return [];
    }

    const saves = saveTxt.split(",");

    return saves.map(x => {
        const split = x.trim().split(" ");
        return {
            ability: split[0],
            modifier: split[1],
        };
    });
}

function parseSkills(skillTxt) {
    if (skillTxt === "") {
        return [];
    }

    const skills = skillTxt.split(",");

    return skills.map(x => {
        const split = x.trim().split(" ");
        return {
            ability: split[0],
            modifier: split[1],
        };
    });
}

function parseResistances(resist, vulnerable, immune, conditionImmune) {
    // acid, cold, fire, lightning; bludgeoning, piercing, and slashing from nonmagical attacks

    return {
        damageResistance: innerResistanceParse(resist),
        damageVulnerabilities: innerResistanceParse(vulnerable),
        damageImmunities: innerResistanceParse(immune),
        conditionImmunities: innerResistanceParse(conditionImmune),
    };
}

function innerResistanceParse(txt) {
    if (txt === "") {
        return [];
    }

    const splitWithWeapon = txt.split(";");

    if (splitWithWeapon[1] === undefined) {
        return splitWithWeapon[0].split(",").map(x => x.trim());
    }

    return [
        ...splitWithWeapon[0].split(",").map(x => x.trim()),
        splitWithWeapon[1],
    ];
}

function parseFeatures(trait) {
    if (!Array.isArray(trait)) {
        return [];
    }

    return trait
        .filter(x => {
            if (
                x.name === "Source" ||
                x.name === "Spellcasting" ||
                x.name === "Innate Spellcasting"
            ) {
                return false;
            }

            return true;
        })
        .map(x => {
            let featureText = x.text;

            if (Array.isArray(featureText)) {
                featureText = featureText.join("\n\n");
            }

            return {
                name: x.name,
                desc: featureText,
            };
        });
}

function parseSpellCasting(trait) {
    if (!Array.isArray(trait)) {
        return null;
    }

    const spellCastingTrait = trait.filter(x => {
        if (x.name === "Spellcasting") {
            return true;
        }

        return false;
    })[0];

    if (spellCastingTrait === undefined) {
        return null;
    }

    if (!Array.isArray(spellCastingTrait.text)) {
        // TODO Chelicerae
        return {
            desc: spellCastingTrait.text,
        };
    }

    const details = spellCastingTrait.text
        .slice(1)
        .filter(x => {
            if (x === "" || x.startsWith("*")) {
                return false;
            }

            return true;
        })
        .map(x => {
            // 2nd level (at will): arcane lock, knock
            const regex = /(.*):(.*)/g;
            const regexResult = regex.exec(x);

            return {
                details: regexResult[1],
                spells: regexResult[2]
                    .split(",")
                    .map(x => x.trim().replace("*", "")),
            };
        });

    return {
        desc: spellCastingTrait.text[0],
        details: details,
    };
}

function parseInnateSpellCasting(trait) {
    if (!Array.isArray(trait)) {
        return null;
    }

    const spellCastingTrait = trait.filter(x => {
        if (x.name === "Innate Spellcasting") {
            return true;
        }

        return false;
    })[0];

    if (spellCastingTrait === undefined) {
        return null;
    }

    if (!Array.isArray(spellCastingTrait.text)) {
        // TODO: Special parsing
        // The deep roth&#233;'s spellcasting ability is Charisma. It can innately cast dancing lights at will, requiring no components.
        // The lamia's innate spellcasting ability is Charisma (spell save DC 13). It can innately cast the following spells, requiring no material components. At will: disguise self (any humanoid form), major image 3/day each: charm person, mirror image, scrying, suggestion 1/day: geas
        return {
            desc: spellCastingTrait.text,
            details: [],
        };
    }

    const details = spellCastingTrait.text
        .slice(1)
        .filter(x => {
            if (x === "") {
                return false;
            }

            return true;
        })
        .map(x => {
            const sanitize = x.replace("&#8226;", "");
            // At will: calm emotions, sleep
            // 3/day each: cure wounds (as a 5th-level spell), lesser restoration
            const regex = /(.*):(.*)/g;
            const regexResult = regex.exec(sanitize);

            return {
                details: regexResult[1],
                spells: regexResult[2].split(",").map(x =>
                    x
                        .trim()
                        .replace("*", "")
                        .replace(".", "")
                ),
            };
        });

    return {
        desc: spellCastingTrait.text[0],
        details: details,
    };
}

function parseActions(action) {
    if (action === undefined) {
        return [];
    }

    if (!Array.isArray(action)) {
        action = [action];
    }

    return action
        .filter(x => {
            if (x === "Lair Actions") {
                return false;
            }

            return true;
        })
        .map(x => {
            let actionText = x.text;

            if (Array.isArray(actionText)) {
                actionText = actionText.join("\n\n");
            }

            return {
                name: x.name,
                desc: actionText,
            };
        });
}

function parseLegendaryActions(action) {
    if (action === undefined) {
        return [];
    }

    if (!Array.isArray(action)) {
        action = [action];
    }

    return action.map(x => {
        let actionText = x.text;

        if (Array.isArray(actionText)) {
            actionText = actionText.join("\n\n");
        }

        return {
            name: x.name,
            desc: actionText,
        };
    });
}

function parseLairActions(action) {
    if (action === undefined) {
        return [];
    }

    if (!Array.isArray(action)) {
        action = [action];
    }

    const lairActions = action.filter(x => {
        if (x.name === "Lair Actions") {
            return true;
        }

        return false;
    })[0];

    if (lairActions === undefined) {
        return [];
    }

    return {
        desc: lairActions.text.join("\n\n"),
    };
}

function parseSource(trait) {
    if (trait === undefined) {
        return [];
    }

    if (!Array.isArray(trait)) {
        trait = [trait];
    }

    const source = trait.filter(x => {
        if (x.name === "Source") {
            return true;
        }

        return false;
    })[0];

    // "Mordenkainen's Tome of Foes, p. 130"

    let sources = source.text;
    if (!Array.isArray(source.text)) {
        sources = [sources];
    }

    const sanitizeSources = sources.map(x =>
        x.replace(",", "").replace("p.", "")
    );

    return sanitizeSources.map(x => {
        const sourceRegex = /(.*) (\d+)/g;
        const sourceRegexResult = sourceRegex.exec(x);

        if (sourceRegexResult === null) {
            return {
                name: x.trim(),
            };
        }

        return {
            name: sourceRegexResult[1].trim(),
            page: sourceRegexResult[2].trim(),
        };
    });
}

module.exports = parseMonsters;

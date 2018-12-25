function parseSpells(spellsToParse) {
    return spellsToParse
        .filter(x => {
            // If includes "Ritual Only" or "*"
            const filterOutRegex = /(Ritual Only)|\*/g;
            const shouldKeep = !filterOutRegex.test(x.name);

            return shouldKeep;
        })
        .map(x => {
            return {
                level: x.level,
                name: x.name,
                type: parseType(x.school, x.level, x.ritual),
                school: parseSchool(x.school),
                castingTime: x.time,
                range: x.range,
                canBeRitual: x.ritual === "YES" ? true : false,
                duration: x.duration,
                component: parseComponent(x.components, x.duration),
                description: parseDescription(x.text),
                higherLevel: parseHigherLevel(x.text),
                sources: parseSource(x.text),
                class: x.classes.split(",").map(x => x.trim()),
            };
        });
}

function parseType(school, level, canBeRitual) {
    const schoolText = parseSchool(school);
    const ritualText = canBeRitual === "YES" ? " (ritual)" : "";

    let outputText = "unknown";

    switch (level) {
        case 0:
            outputText = `${schoolText} cantrip ${ritualText}`;
            break;
        case 1:
            outputText = `1st-level ${schoolText.toLowerCase()} ${ritualText}`;
            break;
        case 2:
            outputText = `2nd-level ${schoolText.toLowerCase()} ${ritualText}`;
            break;
        case 3:
            outputText = `3rd-level ${schoolText.toLowerCase()} ${ritualText}`;
            break;
        case 4:
            outputText = `4th-level ${schoolText.toLowerCase()} ${ritualText}`;
            break;
        case 5:
            outputText = `5th-level ${schoolText.toLowerCase()} ${ritualText}`;
            break;
        case 6:
            outputText = `6th-level ${schoolText.toLowerCase()} ${ritualText}`;
            break;
        case 7:
            outputText = `7th-level ${schoolText.toLowerCase()} ${ritualText}`;
            break;
        case 8:
            outputText = `8th-level ${schoolText.toLowerCase()} ${ritualText}`;
            break;
        case 9:
            outputText = `9th-level ${schoolText.toLowerCase()} ${ritualText}`;
            break;

        default:
            return "Unknown";
    }

    return outputText.trim();
}

function parseSchool(school) {
    switch (school) {
        case "A":
            return "Abjuration";
        case "C":
            return "Conjuration";
        case "D":
            return "Divination";
        case "EN":
            return "Enchantment";
        case "EV":
            return "Evocation";
        case "I":
            return "Illusion";
        case "N":
            return "Necromancy";
        case "I":
            return "Illusion";
        case "T":
            return "Transmutation";
        default:
            return "Unknown";
    }
}

function parseComponent(components, duration) {
    // TODO: Add required materials list

    const requiredConcentration = duration
        .toLowerCase()
        .includes("concentration");
    const doesRequiredSomatic = components.toLowerCase().includes("s");
    const doesRequiredVerbal = components.toLowerCase().includes("v");
    const doesRequiredMaterial = components.toLowerCase().includes("m");

    const materialRegex = /\((.*)\)/g;
    const materialRegexResult = materialRegex.exec(components);
    const requiredMaterials =
        materialRegexResult != null ? materialRegexResult[1] : null;

    const doesRequireGoldRegex = /gp/g;
    const doesRequireGold = doesRequireGoldRegex.test(components);

    return {
        concentration: requiredConcentration,
        somatic: doesRequiredSomatic,
        verbal: doesRequiredVerbal,
        material: doesRequiredMaterial,
        requiredMaterials: requiredMaterials,
        doesRequireGold: doesRequireGold,
    };
}

function parseDescription(description) {
    let afterDescription = false;
    description = description.filter(x => {
        if (afterDescription) {
            return false;
        }

        if (x.startsWith("Source") || x.startsWith("At Higher Levels")) {
            afterDescription = true;
            return false;
        }

        return true;
    });

    return description.join("\n\n");
}

function parseSource(description) {
    let isSourceDescription = false;

    description = description.filter(x => {
        if (x.startsWith("Source")) {
            isSourceDescription = true;
        }

        if (x === "") {
            isSourceDescription = false;
        }

        return isSourceDescription;
    });

    const source = description
        .map(x => x.replace("Source:", "").trim())
        .map(x => {
            const sourceRegex = /(.*), p. (\d+)/g;
            const sourceRegexResult = sourceRegex.exec(x);
            return {
                name: sourceRegexResult[1],
                page: sourceRegexResult[2],
            };
        });

    return source;
}

function parseHigherLevel(description) {
    for (const element of description) {
        if (element.startsWith("At Higher Levels:")) {
            return element.replace("At Higher Levels:", "").trim();
        }
    }

    return null;
}

module.exports = parseSpells;

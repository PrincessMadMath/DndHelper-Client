function parseSpells(spellsToParse) {
    return spellsToParse.map(x => {
        return {
            level: x.level,
            name: x.name,
            type: parseType(x.school, x.level, x.ritual), //
            school: parseSchool(x.school),
            castingTime: x.time,
            range: x.range,
            canBeRitual: x.ritual === "YES" ? true : false,
            duration: x.duration,
            component: "", // parse component
            description: "", // parse description
            higherLevel: "", // parse higher level
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
    const requiredSomatic = components.toLowerCase().includes("S");
    const requiredVerbal = components.toLowerCase().includes("V");
    const requiredMaterial = components.toLowerCase().includes("M");

    return {
        concentration: requiredConcentration,
        somatic: requiredSomatic,
        verbal: requiredVerbal,
        material: requiredMaterial,
        requiredGold: 0,
    };
}

module.exports = parseSpells;

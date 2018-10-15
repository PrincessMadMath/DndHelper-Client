import getDurationForLevel from "./duration";
import getTargetForLevel, { getSingleTarget } from "./target";
import monsters from "../../../data/monsters.json";
import { getNumericChallengeRating } from "../../../utils/CrComparator";

const effects = [
    {
        name: "sleep",
        description:
            "Targets fall asleep for the duration, or until shaken or slapped. If they sleep for more than 5 min, it counts as a short rest. If they sleep for more than an hour, it counts as a long rest.",
        parameters: ["target", "Duration"],
        paramFuncs: [getTargetForLevel, getDurationForLevel],
        niceness: "negative",
        level: {
            base: 1,
            parameterWeights: [1, 1],
            parameterBases: [0, -3],
        },
    },
    {
        name: "coma",
        description:
            "Targets fall in a dreamless slumber for the duration. They cannot be woken up by any means. This counts as a long rest when they wake up.",
        parameters: ["target", "Duration"],
        paramFuncs: [getTargetForLevel, getDurationForLevel],
        level: {
            base: 0,
            parameterWeights: [1, 0.8],
            parameterBases: [0, 0],
        },
    },
    {
        name: "summon_monster",
        description:
            "Summons a monsters next to",
        parameters: ["target", "monster"],
        paramFuncs: [getSingleTarget, getMonsterForLevel],
        level: {
            base: 0,
            // add ignored params
            parameterWeights: [1, 1],
            parameterBases: [0, 0],
        },
    },
];

function getMonsterForLevel(level) {
    let potentialMonster = monsters.filter(m => Math.abs(getNumericChallengeRating(m.challengeRating) - (level+0.5)*2) < 1 );
    return potentialMonster[Math.floor(Math.random() * potentialMonster.length)].name
}

export function generateSurgeForLevel(effect, level) {
    let assignableLevel = level - effect.level.base;
    // Todo: Handle negative
    let distributions = levelDistributions(
        assignableLevel,
        effect.level.parameterBases,
        effect.level.parameterWeights
    );
    let surge = { ...effect };

    surge.paramValues = distributions.map((d, i) => effect.paramFuncs[i](d));

    return surge;
}

// TODO refactor this shit
function levelDistributions(assignableLevel, minLevelPerParam, weights) {
    let availableLevel =
        assignableLevel - minLevelPerParam.reduce((a, v) => (v > 0 ? a + v : a), 0);
    if (availableLevel < 0) {
        console.error("Cannot generate spell for this level");
        // panic!!
    }
    let paramCount = minLevelPerParam.length;
    let splits = new Array(paramCount - 1);
    for (let i = 0; i < splits.length; i++) {
        splits[i] = Math.random() * availableLevel;
    }
    splits.sort();
    let last = 0;
    let levelDistrib = new Array(paramCount);
    for (let i = 0; i < splits.length; i++) {
        let toAdd = minLevelPerParam[i] >= 0 ? minLevelPerParam[i] : -minLevelPerParam[i];

        levelDistrib[i] = Math.max((splits[i] - last) / weights[i] + toAdd, 0);
        last = splits[i];
    }

    let toAdd =
        minLevelPerParam[paramCount - 1] >= 0
            ? minLevelPerParam[paramCount - 1]
            : -minLevelPerParam[paramCount - 1];
    levelDistrib[paramCount - 1] = Math.max(
        (availableLevel - last) / weights[paramCount - 1] + toAdd,
        0
    );

    return levelDistrib;
}

export default effects;

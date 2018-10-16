import randomDuration from "./duration";
import randomTarget, { randomSingleTarget } from "./target";
import randomMonsterEncounter, { randomMonster } from "./monsters";

let surgeConfig = {
    level: 0,
    hasTarget: true,
    hasCaster: true,
};

export class Parameter {
    constructor(name, affectsLevel, valueFunction, levelWeight, levelBonus) {
        this.name = name;
        this.affectsLevel = affectsLevel;
        this.valueFunction = valueFunction;
        this.levelWeight = levelWeight;
        this.levelBonus = levelBonus;
    }
}

const effects = [
    {
        name: "sleep",
        description:
            "Targets fall asleep for the duration, or until shaken or slapped. If they sleep for more than 5 min, it counts as a short rest. If they sleep for more than an hour, it counts as a long rest.",
        parameters: [
            new Parameter("target", true, randomTarget, 1.1, 0),
            new Parameter("duration", true, randomDuration, 1, 2),
        ],
        niceness: "negative",
        baseLevel: 0,
    },
    {
        name: "coma",
        description:
            "Targets fall in a dreamless slumber for the duration. They cannot be woken up by any means. This counts as a long rest when they wake up.",
        parameters: [
            new Parameter("target", true, randomTarget, 1, 0),
            new Parameter("duration", true, randomDuration, 0.8, 0),
        ],
        baseLevel: 0,
    },
    {
        name: "summon_encounter",
        description: "An encounter! Multiple random monsters appear next to the target",
        parameters: [
            new Parameter("target", false, randomSingleTarget),
            new Parameter("monster(s)", true, randomMonsterEncounter, 1.5, 0),
        ],
        baseLevel: 1,
    },
    {
        name: "summon_monster",
        description: "Summons a single monsters next to the target",
        parameters: [
            new Parameter("target", false, randomSingleTarget),
            new Parameter("monster", true, randomMonster, 1, 0),
        ],
        baseLevel: 0,
    },
    {
        name: "illusions_monster",
        description: "Creates the illusion of a monsters next to the target",
        parameters: [
            new Parameter("target", false, randomSingleTarget),
            new Parameter("monster", true, randomMonster, 1, 2),
        ],
        baseLevel: 0,
    },
];

export function generateSurge(effect, surgeConfig) {
    // We want to distribute available level from the surge config amongst the parameters
    let levelAffectingParameters = effect.parameters.filter(p => p.affectsLevel);
    let assignableLevel = surgeConfig.level - effect.baseLevel;

    if (assignableLevel < 0) {
        console.log(
            "Cannot generate surge " +
                effect.name +
                ". Available Level too low"
        , surgeConfig);
        //Todo: maybe interpolate negatively only on parameters with bonii
        return null;
    }

    // Distribute assignable level randomly
    let levelParamCount = levelAffectingParameters.length;
    let splits = new Array(levelParamCount - 1);
    for (let i = 0; i < splits.length; i++) {
        splits[i] = Math.random() * assignableLevel;
    }
    splits.sort();
    let last = 0;

    let levelDistrib = new Array(levelParamCount);
    for (let i = 0; i < splits.length; i++) {
        let param = levelAffectingParameters[i];
        levelDistrib[i] = (splits[i] - last) / param.levelWeight + param.levelBonus;
        last = splits[i];
    }

    levelDistrib[levelParamCount - 1] =
        (assignableLevel - last) / levelAffectingParameters[levelParamCount - 1].levelWeight + levelAffectingParameters[levelParamCount - 1].levelBonus;
    let surge = {
        effect: effect,
        config: surgeConfig,
        values: new Array(effect.parameters.length),
    };
    // todo: compute target niceness

    let levelIndex = 0;
    for (let i = 0; i < effect.parameters.length; i++) {
        let paramSurgeConfig = { ...surgeConfig };
        if (effect.parameters[i].affectsLevel) {
            paramSurgeConfig.level = levelDistrib[levelIndex];
            levelIndex++;
        }
        try {
            surge.values[i] = effect.parameters[i].valueFunction(paramSurgeConfig);
        } catch {
            console.log(
                "Cannot generate surge " +
                    effect.name +
                " with config: ",surgeConfig,
                    ". Param " +
                    effect.parameters[i].name +
                    " could not be generated with config ", paramSurgeConfig
            );
            return null;
        }
    }
    return surge;
}

export default effects;

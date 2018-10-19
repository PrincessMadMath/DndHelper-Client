import getAreaForLevel from "./area";
import { niceness } from "./effects";
import { randomInList } from "../../../utils/utils";

const targetType = Object.freeze({ ally: 1, enemy: 2, allyNEnemy: 3 });

export function getTargetType(effectNiceness, desiredNiceness) {
    if (desiredNiceness === niceness.goodNBad || desiredNiceness === niceness.fluff) {
        return randomInList([targetType.ally, targetType.enemy, targetType.allyNEnemy]);
    }
    // desired good or bad
    if (effectNiceness === desiredNiceness) {
        return targetType.ally;
    }
    return targetType.enemy;
}

export default function getTargetForLevel({ level, target }) {
    if (level < 2) {
        return "a random " + targetTypeToString(target, false);
    }
    if (level < 7) {
        return Math.round(level) + " random " + targetTypeToString(target, true);
    }
    return (
        "all " +
        targetTypeToString(target, true) +
        " " +
        getAreaForLevel(level) +
        " around the caster"
    );
}

export function randomSingleTarget({ target }) {
    return "a random " + targetTypeToString(target, false);
}

function targetTypeToString(target, plural) {
    // Handle casters and targets? is target an enemy?
    if (target === targetType.ally) {
        return plural ? "allies" : "ally";
    }
    if (target === targetType.enemy) {
        return plural ? "enemies" : "enemy";
    }
    return plural ? "characters or monsters" : "character or monster";
}

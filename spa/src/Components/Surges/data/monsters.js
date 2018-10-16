import monsters from "../../../data/monsters";
import { getNumericChallengeRating } from "../../../utils/CrComparator";
import { lerp, randomBetween, randomInList, sum } from "../../../utils/utils";

export default function randomMonsterEncounter({ level }) {
    // Spell level maps to char level
    let charLevel = Math.max(level * 2 - 0.51, 0);
    // Assuming party of 4 (may want to add that in config)
    let maxEncounterXp =
        randomBetween(
            getEncounterXpPerCharacterLevel(charLevel),
            getEncounterXpPerCharacterLevel(charLevel)
        ) * 4;

    let potentialMonsters = monsters.filter(
        m => monsterCrToExp[getNumericChallengeRating(m.challengeRating)] < maxEncounterXp
    );
    let monsterList = [];

    while (potentialMonsters.length > 0) {
        monsterList.push(randomInList(potentialMonsters));
        potentialMonsters = monsters.filter(m => encounterXp([...monsterList, m]) < maxEncounterXp);
    }

    return monsterList.map(m => m.name).join(", ") + " xp: " + encounterXp(monsterList);
}

export function randomMonster({ level }) {
    // Spell level maps to char level
    let charLevel = Math.max(level * 2 - 0.51, 0);
    let maxEncounterXp = randomBetween(
        getEncounterXpPerCharacterLevel(charLevel),
        getEncounterXpPerCharacterLevel(charLevel)
    );

    let maxMonsterXp = 0;
    let potentialMonsters = [];
    for (let i = 0; i < monsters.length; i++) {
        let monsterXP = monsterCrToExp[getNumericChallengeRating(monsters[i].challengeRating)];
        if (monsterXP > maxMonsterXp && monsterXP < maxEncounterXp) {
            maxMonsterXp = monsterXP;
            potentialMonsters = [monsters[i]];
        } else if (monsterXP === maxMonsterXp) {
            potentialMonsters.push(monsters[i]);
        }
    }
    return randomInList(potentialMonsters).name + " xp: " + maxMonsterXp;
}

function encounterXp(monsterList) {
    return (
        sum(monsterList.map(m => monsterCrToExp[getNumericChallengeRating(m.challengeRating)])) *
        getEncounterMonsterCountMultiplier(monsterList.length)
    );
}

const monsterCrToExp = {
    0: 5,
    0.125: 25,
    0.25: 50,
    0.5: 100,
    1: 200,
    2: 450,
    3: 700,
    4: 1100,
    5: 1800,
    6: 2300,
    7: 2900,
    8: 3900,
    9: 5000,
    10: 5900,
    11: 7200,
    12: 8400,
    13: 10000,
    15: 13000,
    16: 15000,
    17: 18000,
    18: 20000,
    19: 22000,
    20: 25000,
    21: 33000,
    22: 41000,
    23: 50000,
    24: 62000,
    25: 75000,
    26: 90000,
    27: 105000,
    28: 120000,
    29: 135000,
    30: 155000,
};

function getEncounterXpPerCharacterLevel(level) {
    let levelFloor = Math.floor(level);
    let minXp, maxXp;
    if (level > 20) {
        minXp =
            encounterXpPerCharacterLevel.easy[20] +
            (encounterXpPerCharacterLevel.easy[20] - encounterXpPerCharacterLevel.easy[19]) *
                (level - 20);
        maxXp =
            encounterXpPerCharacterLevel.medium[20] +
            (encounterXpPerCharacterLevel.medium[20] - encounterXpPerCharacterLevel.medium[19]) *
                (level - 20);
    } else {
        minXp = encounterXpPerCharacterLevel.easy[levelFloor];
        maxXp = encounterXpPerCharacterLevel.medium[levelFloor];
    }

    return lerp(level - levelFloor, minXp, maxXp);
}

const encounterXpPerCharacterLevel = {
    easy: {
        0: 5,
        1: 25,
        2: 50,
        3: 75,
        4: 125,
        5: 250,
        6: 300,
        7: 350,
        8: 450,
        9: 550,
        10: 600,
        11: 800,
        12: 1000,
        13: 1100,
        14: 1250,
        15: 1400,
        16: 1600,
        17: 2000,
        18: 2100,
        19: 2400,
        20: 2800,
    },
    medium: {
        0: 15,
        1: 50,
        2: 100,
        3: 150,
        4: 250,
        5: 500,
        6: 600,
        7: 750,
        8: 900,
        9: 1100,
        10: 1200,
        11: 1600,
        12: 2000,
        13: 2200,
        14: 2500,
        15: 2800,
        16: 3200,
        17: 3900,
        18: 4200,
        19: 4900,
        20: 5700,
    },
    hard: {
        0: 25,
        1: 75,
        2: 150,
        3: 225,
        4: 375,
        5: 750,
        6: 900,
        7: 1100,
        8: 1400,
        9: 1600,
        10: 1900,
        11: 2400,
        12: 3000,
        13: 3400,
        14: 3800,
        15: 4300,
        16: 4800,
        17: 5900,
        18: 6300,
        19: 7300,
        20: 8500,
    },
    deadly: {
        0: 50,
        1: 100,
        2: 200,
        3: 400,
        4: 500,
        5: 1100,
        6: 1400,
        7: 1700,
        8: 2100,
        9: 2400,
        10: 2800,
        11: 3600,
        12: 4500,
        13: 5100,
        14: 5700,
        15: 6400,
        16: 7200,
        17: 8800,
        18: 9500,
        19: 10900,
        20: 12700,
    },
};

function getEncounterMonsterCountMultiplier(monsterCount) {
    if (monsterCount < 2) {
        return 1;
    }
    if (monsterCount < 3) {
        return 1.5;
    }
    if (monsterCount < 6) {
        return 2;
    }
    if (monsterCount < 10) {
        return 2.5;
    }
    if (monsterCount < 14) {
        return 3;
    }
    return 4;
}

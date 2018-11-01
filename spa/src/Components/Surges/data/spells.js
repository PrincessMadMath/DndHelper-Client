import spells from "../../../data/spells";
import { randomInList } from "../../../utils/utils";

export default function randomSpell({ level }) {
    const roundedLevel = Math.round(level);
    let potentialSpellList = spells.filter(
        sp => sp.level === roundedLevel || (sp.level < level && (sp.higherLevel || sp.description.includes("slot level")))
    );
    let spell = randomInList(potentialSpellList);
    const atLevel =
        roundedLevel !== spell.level ? " as if cast with a level " + roundedLevel + " slot" : "";
    return spell.name + atLevel + " (spell base level: " + spell.level + ")";
}

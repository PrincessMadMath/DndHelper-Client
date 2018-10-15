import getAreaForLevel from "./area";

export default function getTargetForLevel(level) {
    if(level < 7 ){
        return (Math.round(level) + 1) + " random entities"
    }
    return "everyone "+ getAreaForLevel(level) + " around the caster"
}

export function getSingleTarget() {
    let rand = Math.random();
    if(rand < 0.3){
        return "the caster"
    }
    if(rand < 0.6) {
        return "the target"
    }
    return "a random character"
}

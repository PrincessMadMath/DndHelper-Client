/**
 * Duration scale:
 * +-------+-----------------+
 * | Level | Duration        |
 * +-------+-----------------+
 * | 0     | Until next turn |
 * +-------+-----------------+
 * | 1     | Two turns       |
 * +-------+-----------------+
 * | 2     | Five turns      |
 * +-------+-----------------+
 * | 3     | a minute        |
 * +-------+-----------------+
 * | 4     | 5 minutes       |
 * +-------+-----------------+
 * | 5     | Half an hour    |
 * +-------+-----------------+
 * | 6     | 2 hours         |
 * +-------+-----------------+
 * | 7     | one day         |
 * +-------+-----------------+
 * | 8     | one week        |
 * +-------+-----------------+
 * | 9     | one month       |
 * +-------+-----------------+
 * | 10    | permanently     |
 * +-------+-----------------+
 */

export default function getDurationForLevel(level){
    if(level < 0.5){
        return "Until next turn"
    }
    if(level <= 1){
        return "For 2 turns"
    }
    if(level <= 2){
        return "For " + Math.round((level - 1) * 3 + 2) + " turns"
    }
    if(level < 2.9){
        return "For " + Math.round((level - 2) * 5 + 5) + " turns"
    }
    if(level < 3.3) {
        return "For a minute"
    }
    if(level < 4) {
        return "For "+ Math.round((level - 3) * 5) + " minutes";
    }
    if(level < 5.5) {
        return "For " + Math.round((level - 4) * 30 + 5) + " minutes";
    }
    if(level < 6.5) {
        return "For 2 hours"
    }
    if(level < 7.5) {
        return "For one day"
    }
    if(level < 8.5) {
        return "For one week"
    }
    if(level < 9.5) {
        return "For one month"
    }
    return "Forever"
}

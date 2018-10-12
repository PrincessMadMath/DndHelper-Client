/**
 * Splits target word in word components, and treats word independently to match the query
 * Better explained with example:
 * query: ymw
 * matches Yuan-ti Mind Whisperer
 * -       -    -
 * It would also get matched by queries such as: yutmiwhis.
 *
 * Todo: Find dynamic programming solution to this
 * @return {boolean}
 */
export default function WordMatch(query, item) {
    if (!!!query) {
        return true;
    }

    let itemParts = item
        .trim()
        .replace(/\W/g, ",")
        .toLowerCase()
        .split(",");

    const trimmedQuery = query.replace(/\W/g, "").toLowerCase();

    // iterate on all chars to find potential start index
    for (let i = 0; i < itemParts.length; i++) {
        for (let j = 0; j < itemParts[i].length; j++) {
            if (trimmedQuery[0] === itemParts[i][j] && attempt(trimmedQuery, itemParts, i, j)) {
                return true;
            }
        }
    }
}

function attempt(query, itemParts, startPartIndex, startCharIndex) {
    let partIndex = startPartIndex;
    let partCharIndex = startCharIndex;

    // We want to match every single char in the query
    for (let i = 0; i < query.length; i++) {
        let char = query[i];
        if (char === itemParts[partIndex][partCharIndex]) {
            partCharIndex++;
        } else {
            // if the char didn't match or there are no more chars in the part at partIndex
            // attempt from the start of any next part that starts with the given char
            for (let j = partIndex + 1; j < itemParts.length; j++) {
                if (char === itemParts[j][0] && attempt(query.slice(i), itemParts, j, 0)) {
                    return true;
                }
            }
            return false;
        }
    }
    return true;
}

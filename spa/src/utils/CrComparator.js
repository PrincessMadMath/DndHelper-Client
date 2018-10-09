export default function crCompareFunc(a, b) {
    return getNumericChallengeRating(a) - getNumericChallengeRating(b);
};

function getNumericChallengeRating(cr) {
    if (cr === "1/8") {
        return 0.125;
    }

    if (cr === "1/4") {
        return 0.25;
    }

    if (cr === "1/2") {
        return 0.5;
    }

    let crNum = Number.parseInt(cr, 10);

    if (isNaN(cr)) {
        return 100;
    }

    return crNum;
}

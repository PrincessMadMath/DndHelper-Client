export function sum(arr){
    return arr.reduce((a, v) => a+v, 0);
}

export function randomBetween(a,b) {
    return Math.random() * Math.abs(b - a) + Math.min(a, b);
}

export function randomInList(arr){
    return arr[Math.floor(Math.random() * arr.length)]
}

export function lerp(ratio, start, end){
    return ratio * (end-start) + start;
}

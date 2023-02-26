function toNext(str) {
    const lastI = str.lastIndexOf("I");
    if (lastI === -1) {
        return "I".repeat(str.length + 1);
    } else {
        return str.substring(0, lastI) + "M" + "I".repeat(str.length - lastI - 1);
    }
}

function* allMIs(maxLength) {
    let last = "";
    while (last.length < maxLength) {
        last = toNext(last);
        yield last;
    }
}

const arrayM = makeMArray(12);

function applyI(numbers){
    return numbers.reverse();
}

const permutations = {
    I: numbers => numbers.reverse(),
    M: numbers => permute(numbers, arrayM)
};

function applyString(str, numbers) {
    let result = [...numbers];
    for (const c of str) {
        result = permutations[c](result);
    }
    return result;
}

const A = range(12, 0);
let map = {};
for (const str of allMIs(13)) {
    if (isClean(str, 12)) {
        const res = applyString(str, A);
        map[res] = str;
        let cycles = getCycles(res);
        console.log(str + 
            "   " + 
            res + 
            "   " + 
            Math.max.apply(null, cycles.map(c => c.length)) +
            "   " + 
            getInvariants(cycles) + 
            "   " + 
            cycles.length +
            "   " +
            cycles.map(c => c.join(",")).join("  ") + 
            "   " + 
            map[getPermutationInverseRaw(res)]);
    }
}

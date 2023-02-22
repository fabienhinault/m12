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

const A = range(12, 1);
for (const str of allMIs(5)) {
    if (isClean(str, 12)) {
        const res = applyString(str, A);
        console.log(str + "   " + res + "   " + getPermutationInverse(res));
    }
}

function toNext(str) {
    const lastI = str.lastIndexOf("I");
    if (lastI === -1) {
	// all strings from "IIII..." to "IMIM..." are dirty
        return "IM".repeat(str.length + 1).substring(0, str.length + 1) ;
    } else {
        return str.substring(0, lastI) + "M" + 
            "IM".repeat(str.length).substring(0, str.length - lastI - 1);
    }
}

function* allMIs(last, maxLength) {
    last = toNext(last);
    while (last.length < maxLength) {
        yield last;
        last = toNext(last);
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

function compute(startString, intMaxSize) {
    for (const str of allMIs(startString, intMaxSize)) {
        if (isClean(str, 12)) {
            let name = getNameFromAction(str); 
            console.log(name);
            const res = applyString(str, A);
            let cycles = getCycles(res);
            if (map[res] === undefined){
                map[res] = ({
                    rawNumbers:res, 
                    miString: str,
                    name: name,
                    cycles: cycles,
                    maxLengthCycle: Math.max.apply(null, cycles.map(c => c.length)),
                    invariants: getInvariants(cycles),
                    inverse: getPermutationInverseRaw(res)
                });
            }
        }
    }
}
let start = Date.now();
compute("", 23);
console.log(Date.now() - start);


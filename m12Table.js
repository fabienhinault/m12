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
    for (const str of allMIs(startString, intMaxSize, 12)) {
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
compute("", 24);
console.log(Date.now() - start);


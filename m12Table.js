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

let map01 = {};

function storeO1data(raw) {
    const current = raw.currentNumbers;
    if (map01[current] === undefined) {
        const mem = raw.memory;
        let iLastI = mem.lastIndexOf("I");
        let targets = [];
        while (iLastI !== -1) {
            targets.push(mem[iLastI - 1][0])
            iLastI = [...mem].splice(0, iLastI - 1).lastIndexOf("I");
        }

        map01[current] = {
            start: current,
            targets: targets,
            done: []

        };
    }
}

function compute01solverDataFromNumbers3(rawNumbers) {
    for (let i = 1; i < 11; i++) {
        for (let jj = 1; jj < 11; jj++) {
            for (let kkk = 1; kkk < 11; kkk++) {
                let raw = new MnesicRawNumbers(rawNumbers, frame12);
                raw.applyString("M".repeat(i) + "I").applyString("M".repeat(jj) + "I").applyString("M".repeat(kkk) + "I")
                if (raw.currentNumbers[0] !== 0) {
                    raw.msToLast(0).I().msTo2nd(1);
                    storeO1data(raw);
                }
            }
        }
    }
}
function compute01solverDataFromNumbers(rawNumbers) {
    for (let i = 1; i < 11; i++) {
        for (let jj = 1; jj < 11; jj++) {
            let raw = new MnesicRawNumbers(rawNumbers, frame12);
            raw.applyString("M".repeat(i) + "I").applyString("M".repeat(jj) + "I").msToLast(0).I().msTo2nd(1);
            storeO1data(raw);
        }
    }
}

function computeMore01solverData(){
    for (const v of Object.values(map01)) {
        if (!v.done[2]) {
            compute01solverDataFromNumbers(v.start);
            v.done[2] = true;
        }
    }
}
function computeMore01solverData3(){
    for (const v of Object.values(map01)) {
        if (!v.done[3]) {
            compute01solverDataFromNumbers3(v.start);
            v.done[3] = true;
        }
    }
}

function compute01solverData() {
    compute01solverDataFromNumbers(range(12));
    computeMore01solverData();
    computeMore01solverData();
}

let graph = [];
function computeGraph01() {
    for (const n of Object.values(frame12.map01)) {
        console.log(n);
        for (let first = 2; first < 12; first++) {
            for (let second = 2; second < 12; second++) {
                if (first !== second) {
                    console.log("first == " + first + " second == " + second);
                    let raw = new MnesicRawNumbers(n.start, frame12);
                    raw.msToLast(first).I().msToLast(second).I().msToLast(0).I().msTo2nd(1);
                    graph.push({start:n.start, first:first, second:second, end:raw.currentNumbers});
                }
            }
        }
    }
}

let start = Date.now();
//compute01solverData();
//compute01solverDataFromNumbers3(range(12));
//computeMore01solverData3();
// compute("", 24);
computeGraph01();
console.log(Date.now() - start);
//console.log(map01);
//console.log(Object.keys(map01).length);



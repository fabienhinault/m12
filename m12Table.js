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
let map = frame12.map;

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

function computeByComplexity(intMinSize, intMaxSize) {
    const g12 = new MiComplexityGenerator(frame12);
    for (const str of g12.allMIs(intMinSize, intMaxSize)) {
        if (isClean(str, 12)) {
            let name = getNameFromAction(str); 
            console.log(name);
            const res = applyString(str, A);
            if (map[res].altMiString === undefined){
                map[res] = ({
                    ...map[res],
                    altMiString: str,
                    altName: name,
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


function computeGraph0123() {
    for (const n of Object.values(frame12.map01).filter(o => arrayStartsWith(o.start, [0,1,2,3]) && !frame12.equalsRawGoal(o.start))) {
        console.log(n);
        const nbMoves = 3;

        for (let first = 2; first < 12; first++) {
            for (let second = 2; second < 12; second++) {
                for (let third = 2; third < 12; third++) {
                    if (first !== second && first !== third && second !== third) {
                        console.log("first == " + first + " second == " + second, third);
                        let raw = new MnesicRawNumbers(n.start, frame12);
                        raw.msToLast(first).I().msToLast(second).I().msToLast(third).I().msToLast(0).I().msTo2nd(1);
                        if (frame12.equalsRawGoal(raw.currentNumbers)) {
                            graph.push({start:n.start, moves:[first, second, third], end:raw.currentNumbers});
                        }
                    }
                }
            }
        }
    }
}

function groupByMove(acc, current){
    if (acc[current.move] === undefined) {
        acc[current.move] = {move:current.move, starts:[current.start]};
    } else{
        acc[current.move].starts.push(current.start);
        acc[current.move].starts.sort();
    }
    return acc;
}

function maxStartsLength(acc, current) {
    if (!acc || acc.starts.length < current.starts.length) {
        return current;
    }
    return acc;
}

function getMaxMove(predicate, target) {
    const byMove = frame12.graph01
        .filter(o => predicate(o) && arrayStartsWith(o.end, target))
        .map(o => {
            return {start: o.start, move:[o.first, o.second]};})
        .reduce(groupByMove, {});
    return Object.values(byMove).reduce(maxStartsLength, null);
}
function compute01HumanSolverData1234() {
    const solution = [];
    for (let index = 4; index < 12; index++) {
        console.log(index);
        for (let ith = 4; ith < 12; ith++) {
            const predicate = (o => arrayStartsWith(o.start, [0,1, 2, 3]) && o.start[index] === ith);
            const maxs = getMaxMove(predicate, [0,1,2,3,4]);
            console.log(ith);
            console.log(maxs);
        }
    }
}

function compute01HumanSolverData() {
    const solution = [];
    for (let index = 2; index < 12; index++) {
        console.log(index);
        for (let ith = 2; ith < 12; ith++) {
            const predicate = (o => arrayStartsWith(o.start, [0,1]) && o.start[index] === ith);
            const maxs = getMaxMove(predicate, [0,1,2]);
            console.log(ith);
            console.log(maxs);
        }
    }
}


let start = Date.now();
//compute01solverData();
//compute01solverDataFromNumbers3(range(12));
//computeMore01solverData3();
// compute("", 24);
//computeByComplexity(1, 3);
//computeGraph01();
computeGraph0123();
//compute01HumanSolverData();
//compute01HumanSolverData1234();
console.log(Date.now() - start);
//console.log(map01);
//console.log(Object.keys(map01).length);


// 𝑓 ⿔㨆

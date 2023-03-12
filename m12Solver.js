function solveByDepth(rawNumbers, maxDepth){
    let lookedNumbers = {};
    let lookedMistrings = {};

}

function toNextByDepth(str, maxDepth, pruneCondition) {
    if (str.length < maxDepth || pruneCondition(str)) {
        return str + "I";
    } else {
        const lastI = str.lastIndexOf("I");
        if (lastI > -1) {
            return str.substring(0, lastI) + "M";
        }
    }
}

class MapSolver {
    constructor(map) {
        this.map = map;
    }
    init(rawNumbers) {
        this.solution = this.map[getPermutationInverseRaw(rawNumbers)].miString;
    }
    getIterator() {
        return this.solution[Symbol.iterator]();
    }
}

function solve(rawNumbers, solver, maxChange){
    let currentNumbers = {...rawNumbers};
    let iChange = 0;
    solver.init(rawNumbers);
    const iterator = solver.getIterator();
    while (!frame12.equalsRawGoal(currentNumbers) && iChange < maxChange){
        const c = iterator.next();
        console.log(c);
        currentNumbers = frame12[c.value](currentNumbers);
        console.log(currentNumbers);
        iChange++;
    }
}

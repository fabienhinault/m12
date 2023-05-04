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

class MapAllSolver {
    constructor(map) {
        this.map = map;
    }
    init(rawNumbers) {
        this.solution = this.map[getPermutationInverseRaw(rawNumbers)].miString;
        this.iterator = this.getIterator();
    }
    getIterator() {
        return this.solution[Symbol.iterator]();
    }
    getNext(rawNumbers) {
        return this.iterator.next().value;
    }

}

class Map01SolverStateGoalNth {
    constructor(goalNumber, goalIndex) {
        this.goalNumber = goalNumber;
        this.goalIndex = goalIndex;
    }
    getNext(rawNumbers) {
        return "M";
    }
    isDone(rawNumbers) {
        return this.goalNumber === rawNumbers[this.goalIndex];
    }
}

class Map01SolverStateOneOp {
    constructor(opString) {
        this.done = false;
        this.opString = opString
    }
    getNext(rawNumbers) {
        this.done = true;
        return this.opString;
    }
    isDone(rawNumbers) {
        return this.done;
    }
}

class Map01Solver {
    constructor(map01) {
        this.map01 = map01;
        this.stateQueue = [];
    }
    init(rawNumbers) {
        if (rawNumbers[0] !== 0) {
            this.stateQueue.push(new Map01SolverStateGoalNth(0, rawNumbers.length -1));
            this.stateQueue.push(new Map01SolverStateOneOp("I"));
        }
        this.stateQueue.push(new Map01SolverStateGoalNth(1, 1));
    }
    getNext(rawNumbers) {
        if (this.stateQueue.length > 0 && this.stateQueue[0].isDone(rawNumbers)) {
            this.stateQueue.splice(0, 1);
        }
        if (this.stateQueue.length === 0) {
            this.buildMap01Queue(rawNumbers);
        }
        return this.stateQueue[0].getNext(rawNumbers);
    }
    buildMap01Queue(rawNumbers) {
        const solution = this.map01[rawNumbers].targets;
        for (const last of solution) {
            this.stateQueue.push(new Map01SolverStateGoalNth(last, rawNumbers.length -1));
            this.stateQueue.push(new Map01SolverStateOneOp("I"));
            if (last === 0) {
                this.stateQueue.push(new Map01SolverStateGoalNth(1, 1));
            }
        }
    }
}

/*
 * from 1,2:
 * 5
2 
move: Array [ 4, 2 ]
when 3 is 6th, move 5, then 3, goes to 1,2,3 at 24/90

10 
2 
move: Array [ 3, 2 ]
when 3 is 11th, move 4, then 3 goes to 1,2,3 at 24/90

else: 3, then the third goes to 1,2,3 at 16/90

from 1,2,3,4

5 
move: Array [ 9, 8 ]
if the fifth number is 6, then 10 followed by 9

10 
move: Array [ 9, 7 ]
if the fifth number is 11, then 10 followed by 8
*/

function solve(rawNumbers, solver, maxChange){
    let currentNumbers = [...rawNumbers];
    let iChange = 0;
    solver.init(rawNumbers);
    while (!frame12.equalsRawGoal(currentNumbers) && iChange < maxChange){
        const c = solver.getNext(currentNumbers);
        console.log(c);
        currentNumbers = frame12[c](currentNumbers);
        console.log(currentNumbers);
        iChange++;
    }
    return frame12.equalsRawGoal(currentNumbers);
}

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



function toNext(str) {
    const lastI = str.lastIndexOf("I");
    if (lastI === -1) {
        return "I".repeat(str.length + 1);
    } else {
        return str.substring(0, lastI) + "M" + "I".repeat(str.length - lastI - 1);
    }
}

function solve(rawNumbers, solver, maxChange){
    let currentNumbers = {...rawNumbers};
    let iChange = 0;
    const goal = range(12, 0);
    const frame = new Frame(12)
    while (currentNumbers !== goal && ichange < maxChange){
        currentNumbers = frame[solver.next()](currentNumbers);
        iChange++;
    }
}

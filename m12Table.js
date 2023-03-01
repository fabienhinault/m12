function toNext(str) {
    const lastI = str.lastIndexOf("I");
    if (lastI === -1) {
	// all strings from "IIII..." to "IMIM..." are dirty
        return "IM".repeat(str.length + 1).substring(0, str.length + 1) ;
    } else {
        return str.substring(0, lastI) + "M" + "I".repeat(str.length - lastI - 1);
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

let db;
const request = indexedDB.open("m12DB");
request.onerror = (event) => {
  console.error(`Database error: ${event.target.errorCode}`);
};

request.onsuccess = (event) => {
  db = event.target.result;
   const objectStore = db
      .transaction("m12Store", "readwrite")
      .objectStore("m12Store");
    const start = Date.now();
    for (const str of allMIs("M".repeat(21), 23)) {
        console.log(getNameFromAction(str));
        if (isClean(str, 12)) {
            const res = applyString(str, A);
            let cycles = getCycles(res);
            objectStore.add({
                rawNumbers:res, 
                miString: str,
                cycles: cycles,
                maxLengthCycle: Math.max.apply(null, cycles.map(c => c.length)),
                invariants: getInvariants(cycles),
                inverse: getPermutationInverseRaw(res)
            });
        }
    }
    console.log(Date.now() - start);
};

request.onupgradeneeded = (event) => {
  const db = event.target.result;

  // Create an objectStore to hold information about our customers. We're
  // going to use "ssn" as our key path because it's guaranteed to be
  // unique - or at least that's what I was told during the kickoff meeting.
  const objectStore = db.createObjectStore("m12Store", { keyPath: "rawNumbers" });

};

function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}
function permute(array, permutation) {
    return permutation.map(permutationIndex => array[permutationIndex]);
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function pick(array) {
    return array[getRandomInt(0, array.length)];
}
function makeMArray(n) {
    let result = [];
    for (let i = 0; i < n/2; i++) {
        result[2 * i] = i;
	const j = (2 * i) + 1;
	if (j < n) {
            result[j] = n - 1 - i;
	}
    }
    return result;
}

function makeMInvArray(n){
    let result = [];
    for (let i = 0; i < n/2; i++) {
        result[i] = 2 * i;
        const j = (2 * i) + 1;
        if (j < n) {
            result[n - 1 - i] = j;
        }
    }
    return result;
}

function getCleanedLasts(lasts, n) {
    const identityMs = 'M'.repeat(n - 1);
    let result;
    let newResult = lasts;
    do {
        result = newResult;
        newResult = result.replaceAll("II", "").replaceAll(identityMs, "");
    } while (newResult !== result);
    return result;
}

function isClean(str, n) {
    return str.indexOf('M'.repeat(n - 1)) === -1 && str.indexOf("II") === -1;
}

// function updateSolutionPush(pushed, solution, cleanedLasts) {
//     const previousLast = cleanedLasts[cleanedLasts.length - 1] || '';
//     if (previousLast != pushed) {
// 
// 
// }
// 
// function updateSolutionPop(solution, lasts) {
// }
function getComplementModulo(i, n) {
    let result = (n - i) % n;
    if (result < 0) {
        result += n;
    }
    return result;
}


function getIsInverseLength(isLength) {
    return getComplementModulo(isLength, 2);
}

function getMsInverseLength(n, msLength) {
    return getComplementModulo(msLength, n- 1);
}

function getGroupInverse(n, group) {
    if (group.charAt(0) === 'M') {
        return 'M'.repeat(getMsInverseLength(n, group.length));
    } else { // 'I'
        return 'I'.repeat(getIsInverseLength(group.length));
    }
}

function getSolution(n, lasts) {
    return getCleanedLasts(lasts, n)
        .split(/(?<=M)(?=I)/)
        .map(s => s.split(/(?<=I)(?=M)/))
        .flat()
        .map(g => getGroupInverse(n, g))
        .reverse()
        .join('');
}


// export {range, permute, getRandomInt, pick, makeMArray, makeMInvArray, getComplementModulo, getIsInverseLength, getMsInverseLength, getGroupInverse, getSolution};

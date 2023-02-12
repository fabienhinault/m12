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

// function getcleanedLasts(lasts, n) {
//     return lasts.replaceAll("II", "").replaceAll("","");
// }
// 
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
    const groups = lasts.split(/(?<=M)(?=I)/).map(s => s.split(/(?<=I)(?=M)/)).flat();
    return groups.map(g => getGroupInverse(n, g)).reverse().join('');
}

document.addEventListener('DOMContentLoaded', function() {
    const N = Number(new URL(window.location.toLocaleString()).searchParams.get('n')) || 12;
    const arrayM = makeMArray(N);
    const arrayMInv = makeMInvArray(N);
    const buttonI = document.querySelector('#I');
    const buttonM = document.querySelector('#M');
    const buttonShuffle = document.querySelector('#shuffle');
    const inputShuffle = document.querySelector('#input_shuffle');
    const buttonReset = document.querySelector('#reset');
    const buttonUndo = document.querySelector('#undo');
    const buttonSolution = document.querySelector('#btn_solution');
    const spanSolution = document.querySelector('#solution');
    const divNumbers = document.querySelector('#numbers');
    const buttons = [buttonShuffle, buttonReset];


    let numbers = range(N, 1);
    let lasts = [];
    let solution = [];
    divNumbers.innerHTML = numbers.join(' ');
    let inverses = {
        'I': a => a.reverse(),
        'M': a => permute(a, arrayMInv)
    };

function pushLasts(last) {
    lasts.push(last);
}

function popLasts() {
    return lasts.pop();
}

function setNumbers(newNumbers) {
    numbers = newNumbers;
    divNumbers.innerHTML = numbers.join(' ');
}

function I() {
    lasts.push('I');
    setNumbers(numbers.reverse());
}

function M() {
    lasts.push('M');
    setNumbers(permute(numbers, arrayM));
}

function undo() {
    setNumbers(inverses[lasts.pop()](numbers));
}

function shuffle() {
    let nShuffle = Number(inputShuffle.value);
    if (!nShuffle) {
        shuffleDefault();
    } else {
        shuffleNTimes(nShuffle);
    }
}

function shuffleDefault() {
    shuffleNTimes(getRandomInt(10,100));
}
function shuffleNTimes(nbTimes) {
    for(let iTime = 0; iTime < nbTimes; iTime++){
        pick([I,M])();
    }
}
function reset() {
    setNumbers(range(12, 1));
    lasts=[];
}

function showSolution() {
    spanSolution.innerHTML = getSolution(N, lasts.join(''));
}
    

    buttonI.onclick = I;
    buttonM.onclick = M; 
    buttonShuffle.onclick = shuffle;
    buttonReset.onclick = reset;
    buttonUndo.onclick = undo;
    buttonSolution.onclick = showSolution;
});

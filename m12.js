// import {range, permute, getRandomInt, pick, makeMArray, makeMInvArray, getComplementModulo, getIsInverseLength, getMsInverseLength, getGroupInverse, getSolution} from 'libm12';

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

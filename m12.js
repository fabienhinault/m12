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
    let showSolution = false;
    divNumbers.innerHTML = numbers.join(' ');
    let inverses = {
        'I': a => a.reverse(),
        'M': a => permute(a, arrayMInv)
    };

function dispatchLastsChanged() {
    return document.dispatchEvent(new CustomEvent("lasts changed", {detail: {lasts: lasts}}));
}

function pushLasts(last) {
    lasts.push(last);
    return dispatchLastsChanged();
}

function popLasts() {
    let popped = lasts.pop();
    dispatchLastsChanged();
    return popped;
}

function setLasts(newlasts) {
    lasts = newLasts
    return dispatchLastsChanged();
}

function setNumbers(newNumbers) {
    numbers = newNumbers;
    return document.dispatchEvent(new CustomEvent("numbers changed", {detail: {numbers: newNumbers}}));
}

function updateSolution() {
    solution = getSolution(N, lasts.join(''));
    return document.dispatchEvent(new CustomEvent("solution changed", {detail: {solution: solution}}));
}

function I() {
    pushLasts('I');
    setNumbers(numbers.reverse());
}

function M() {
    pushLasts('M');
    setNumbers(permute(numbers, arrayM));
}

function undo() {
    setNumbers(inverses[popLasts](numbers));
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
    setLasts([]);
}

function toggleSolution() {
    showSolution = !showSolution;
    if (showSolution) {
        toggleOnSolution();
        updateSolution(); 
    } else {
        spanSolution.innerHTML = '' 
        toggleOffSolution();
    }
}    

function toggleOffSolution() {
    document.removeEventListener('solution changed', updateSpanSolution);
}

function updateSpanSolution(evt) {
    spanSolution.innerHTML = evt.detail.solution;
}

function toggleOnSolution() {
    document.addEventListener('solution changed', updateSpanSolution);
}

    buttonI.onclick = I;
    buttonM.onclick = M; 
    buttonShuffle.onclick = shuffle;
    buttonReset.onclick = reset;
    buttonUndo.onclick = undo;
    buttonSolution.onclick = toggleSolution;
    

    document.addEventListener('numbers changed',
        evt => {
            let numbers = evt.detail.numbers;
            divNumbers.innerHTML = numbers.join(' ');
        });          

    document.addEventListener('lasts changed',
        evt => {
            updateSolution();
        });
});

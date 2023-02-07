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

document.addEventListener('DOMContentLoaded', function() {
    const N = Number(new URL(window.location.toLocaleString()).searchParams.get('n')) || 12;
    const arrayM = makeMArray(N);
    const arrayMInv = makeMInvArray(N);
    const buttonI = document.querySelector('#I');
    const buttonM = document.querySelector('#M');
    const buttonShuffle = document.querySelector('#shuffle');
    const buttonReset = document.querySelector('#reset');
    const buttons = [buttonShuffle, buttonReset];


    let numbers = range(N, 1);
    let divNumbers = document.querySelector('#numbers');
    let last;
    divNumbers.innerHTML = numbers.join(' ');
    let inverses = {
        'I': a => a.reverse(),
        'M': a => permute(a, arrayMInv)};

function I() {
    last = 'I';
    numbers = numbers.reverse();
    divNumbers.innerHTML = numbers.join(' ');
}
function M() {
    last = 'M';
    numbers = permute(numbers, arrayM);
    divNumbers.innerHTML = numbers.join(' ');
    }
function undo() {
    numbers = inverses[last](numbers);
    divNumbers.innerHTML = numbers.join(' ');
}
function shuffle() {
    const nbTimes = getRandomInt(10,100);
    for(let iTime = 0; iTime < nbTimes; iTime++){
        pick([I,M])();
    }
}
function reset() {
    numbers = range(12, 1);
    divNumbers.innerHTML = numbers.join(' ');
}

    document.querySelector('#I').onclick = I;
    document.querySelector('#M').onclick = M; 
    document.querySelector('#shuffle').onclick = shuffle;
    document.querySelector('#reset').onclick = reset;
    document.querySelector('#undo').onclick = undo;
});

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

document.addEventListener('DOMContentLoaded', function() {
    let buttonI = document.querySelector('#I');
    let buttonM = document.querySelector('#M');
    let buttonShuffle = document.querySelector('#shuffle');
    let buttonReset = document.querySelector('#reset');
    let buttons = [buttonShuffle, buttonReset];


    let numbers = range(12, 1);
    let divNumbers = document.querySelector('#numbers');
    let last;
    divNumbers.innerHTML = numbers.join(' ');
    let inverses = {
        'I': a => a.reverse(),
        'M': a => permute(a, [0, 2, 4, 6, 8, 10, 11, 9, 7, 5, 3, 1])};

function I() {
    last = 'I';
    numbers = numbers.reverse();
    divNumbers.innerHTML = numbers.join(' ');
}
function M() {
    last = 'M';
    numbers = permute(numbers, [0, 11, 1, 10, 2, 9, 3, 8, 4, 7, 5, 6]);
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

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

    class gameState{};
    class gameStatePlay extends gameState {
        function onEnter() {
            buttonI.onClick = I;
            buttonM.onClick = M;
            buttons.forEach(b => b.removeAttr("disabled"));
        }
    }
    class gameStateProgram extends gameState {
        function onEnter() {
            buttons.forEach(b => b.attr('disabled', 'disabled'));
        }
    let numbers = range(12, 1);
    let divNumbers = document.querySelector('#numbers');
    divNumbers.innerHTML = numbers.join(' ');
function beginAddProgrammed() {

function I() {
    numbers = numbers.reverse();
    divNumbers.innerHTML = numbers.join(' ');
}
function M() {
        numbers = permute(numbers, [0, 11, 1, 10, 2, 9, 3, 8, 4, 7, 5, 6]);
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
});

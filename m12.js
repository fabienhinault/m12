// import {range, permute, getRandomInt, pick, makeMArray, makeMInvArray, getComplementModulo, getIsInverseLength, getMsInverseLength, getGroupInverse, getSolution} from 'libm12';

document.addEventListener('DOMContentLoaded', function() {
    const model = new Model(
        Number(new URL(window.location.toLocaleString()).searchParams.get('n')) || 12,
        document);

    let showSolution = false;
    let addingShortcut = false;

    const buttonI = document.querySelector('#I');
    const buttonM = document.querySelector('#M');
    const buttonPlus = document.querySelector('#plus');
    const buttonSaveShortcut = document.querySelector('#save_shortcut');
    const inputShortcut = document.querySelector('#input_shortcut');
    const buttonShuffle = document.querySelector('#shuffle');
    const inputShuffle = document.querySelector('#input_shuffle');
    const spanDefShortcut = document.querySelector('#def_shortcut');
    const buttonReset = document.querySelector('#reset');
    const buttonUndo = document.querySelector('#undo');
    const buttonSolution = document.querySelector('#btn_solution');
    const spanSolution = document.querySelector('#solution');
    const divNumbers = document.querySelector('#numbers');
    const buttons = [buttonShuffle, buttonReset, buttonUndo, buttonPlus];

    function toggleOnAddShortcut() {
        addingShortcut = true;
        buttonI.onClick = plusI;
        buttonM.onClick = plusM;
        buttons.forEach(b => b.disabled = true);
        spanDefShortcut.style["visibility"] = "visible";
    }

    function toggleOffAddShortcut() {
        addingShortcut = false;
        buttonI.onClick = () => model.I();
        buttonM.onClick = () => model.M();
        buttons.forEach(b => b.disabled = false);
        spanDefShortcut.style["visibility"] = "collapse";
    }

    function plusI() {
        model.currentShortcut.add("I");
    }

    function plusM() {
        model.currentShortcut.add("M");
    }

    function saveShortcut() {
        model.saveCurrentShortcut(inputShortcut.value);
        toggleOffAddShortcut();
    }
function toggleSolution() {
    showSolution = !showSolution;
    if (showSolution) {
        toggleOnSolution();
        model.updateSolution(); 
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

    buttonI.onclick = () => model.I();
    buttonM.onclick = () => model.M(); 
    buttonShuffle.onclick = () => model.shuffle(Number(inputShuffle.value));
    buttonReset.onclick = () => model.reset();
    buttonUndo.onclick = () => model.undo();
    buttonSolution.onclick = () => toggleSolution();
    buttonPlus.onclick = toggleOnAddShortcut();
    buttonSaveShortcut.onclick = saveShortcut();

    document.addEventListener('numbers changed',
        evt => {
            let numbers = evt.detail.numbers;
            divNumbers.innerHTML = numbers.join(' ');
        });          

    model.reset();
    toggleOffAddShortcut();
});

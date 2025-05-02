// import {range, permute, getRandomInt, pick, makeMArray, makeMInvArray, getComplementModulo, getIsInverseLength, getMsInverseLength, getGroupInverse, getSolution} from 'libm12';

document.addEventListener('DOMContentLoaded', async function() {
    const N = Number(new URL(window.location.toLocaleString()).searchParams.get('n'));
    let frame;
    if (N > 0 && N !== 12) {
        frame = new Frame(N);
    } else {
        frame = frame12;
    }
    const model = new Model(frame, document);

    let gameWidth = greatestMultipleLessThan(model.N, Math.min(516, window.screen.width));
    let tileSideWithMargin = gameWidth / model.N;
    let tileSidePx = tileSideWithMargin - 2;
    let bigButtonWidth = Math.floor(tileSideWithMargin * model.N  / 2) - 2;
    let transitionDurationMillis = 1000;
    let lastPush = 0;
    const white = getNumberBackgroundColor(0);
    const blue = getNumberBackgroundColor(model.N - 1);
    const backColors = range(model.N).map(getNumberBackgroundColor);

    const divGameContainer = document.querySelector('#game_container');
    const divNumbersHeader = document.querySelector('#numbers-header');
    const divNumbersFooter = document.querySelector('#numbers-footer');
    const divInfos = document.querySelector('#infos');
    const buttonI = document.querySelector('#I');
    const buttonM = document.querySelector('#M');

    const buttonShuffle = document.querySelector('#shuffle');
    const divTime = document.querySelector('#time');
    const divTitle = document.querySelector('#title');
    const divNumbers = document.querySelector('#numbers');
    let tiles = [];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function initBigButton(button) {
    button.style.width = bigButtonWidth + "px";
    button.firstChild.style.width = bigButtonWidth * 0.8 + "px";
    button.style.height = (2 * tileSidePx + 2) + "px";
    button.firstChild.style.height = (2 * tileSidePx + 2) + "px";
}

function initControl(control) {
    control.style.width = tileSidePx + "px";
    control.style.height = tileSidePx + "px";
}

function initDivTime() {
    divTime.style.width = (gameWidth - 2) + "px";
    divTime.style.height = tileSidePx + "px";
    divTime.style.lineHeight = tileSidePx + "px";
}

function initDivTitle() {
    divTitle.style.width = (gameWidth - 2) + "px";
    divTitle.style.height = tileSidePx + "px";
    divTitle.style.lineHeight = tileSidePx + "px";
}

function initDivInfos() {
    divInfos.style.width = tileSidePx + "px";
    divInfos.style.backgroundColor = getNumberBackgroundColor(1);
    divInfos.style.height = tileSidePx + "px";
    divInfos.style.lineHeight = tileSidePx + "px";
}

function initView() {
    divGameContainer.style.width = gameWidth + "px";
    initNumbersBorder(divNumbersHeader);
    initNumbersBorder(divNumbersFooter);
    initBigButton(buttonI);
    initBigButton(buttonM);
    initControl(buttonShuffle);

    initDivTime();
    initDivTitle();
    initDivInfos();
}

function getNumberBackgroundColor(i) {
    const pct = 98 - (i - 1) / (model.N - 2) * 35;
    return `hsl(240, 100%, ${pct}%)`;
}

function createNumberDiv(i) {
    const div = document.createElement("div");
    div.style.width = tileSidePx + "px";
    div.style.backgroundColor = backColors[i - 1];
    div.style.transition = `left ${transitionDurationMillis}ms`
    div.className = "tile";
    return div;
}

function initNumbersBorder(divBorder) {
    divBorder.style.height = `${Math.floor(tileSidePx / 2) + 2}px`;
    divBorder.style.width = (gameWidth -2) + "px";
}

function initNumbersDiv(numbers, div) {
    div.style.height = tileSideWithMargin + "px";
    div.innerHTML = "";
    for (let i of numbers) {
        const subdiv = createNumberDiv(i);
        subdiv.appendChild(document.createTextNode(i));
        subdiv.style.height = tileSidePx + "px";
        subdiv.className = "tile";
        subdiv.id = "tile-" + i;
        subdiv.style.lineHeight = tileSidePx + "px";
        if (i > model.N / 2) {
            subdiv.style.color = "white";
        }
        tiles[i] = subdiv;
        div.appendChild(subdiv);
    }
}
async function updateNumbersDiv() {
    const last = model.lasts.at(-1);
    if (last === 'M') {
        updateNumbersDivM(model.previousNumbers, model.numbers);
    } else {
        updateNumbersDivI(model.numbers);
    }
}
 
async function updateNumbersDivI(numbers) {
    const verticalTransitionDuration = 0.1 * transitionDurationMillis;
    const horizontalTransitionDuration = 0.8 * transitionDurationMillis;
    for (let index = 0; index < numbers.length; index++) {
        let number = numbers[index];
        const tile = tiles[number];
        tile.style.transition = `left ${horizontalTransitionDuration}ms, top ${verticalTransitionDuration}ms`;
        tile.style.left = `${index * tileSideWithMargin}px`;
    }
}


async function updateNumbersDivM(oldNumbers, numbers) {
    const verticalTransitionDuration = 0.1 * transitionDurationMillis;
    const horizontalTransitionDuration = 0.8 * transitionDurationMillis;
    if (transitionDurationMillis >= 200) {
        for (let index = 1; index < Math.floor(numbers.length / 2); index++) {
            let number = oldNumbers[index];
            const tile = tiles[number];
            tile.style.transition = `left ${horizontalTransitionDuration}ms, top ${verticalTransitionDuration}ms`;
            tile.style.top = `${tileSidePx / 2}px`;
        }
        for (let index = Math.floor(numbers.length / 2); index < numbers.length; index++) {
            let number = oldNumbers[index];
            const tile = tiles[number];
            tile.style.transition = `left ${horizontalTransitionDuration}ms, top ${verticalTransitionDuration}ms`;
            tile.style.top = `${-tileSidePx / 2}px`;
        }
        await sleep(verticalTransitionDuration);
    }
    for (let index = 0; index < numbers.length; index++) {
        let number = numbers[index];
        const tile = tiles[number];
        tile.style.left = `${index * tileSideWithMargin}px`;
    }
    await sleep(horizontalTransitionDuration);
    for (let number of numbers) {
        const tile = tiles[number];
        tile.style.top = 0;
    }
}

function startChrono(evt) {
    model.chrono.start();
    document.removeEventListener('numbers changed', startChrono);
    document.addEventListener('solved', 
        evt => {
            divTime.innerHTML = formatDuration(evt.detail.time);
        });
}

function shuffle() {
    model.shuffle(100);
    updateNumbersDivI(model.numbers);
}

function updateTransitionDuration() {
    transitionDurationMillis = Math.min(transitionDurationMillis, Date.now() - lastPush);
    lastPush = Date.now();
}

function M() {
    updateTransitionDuration();
    const oldNumbers = model.numbers;
    model.M();
    updateNumbersDivM(oldNumbers, model.numbers);
}

function I() {
    updateTransitionDuration();
    model.I();
    updateNumbersDivI(model.numbers);
}

    document.documentElement.style.setProperty('--white', white);
    document.documentElement.style.setProperty('--blue', blue);
    buttonI.onclick = async () => I();
    buttonM.onclick = async () => M(); 
    buttonShuffle.onclick = shuffle;

    document.addEventListener('keypress',
        async evt => {
            const key = evt.key.toUpperCase();
            // M for right index
            if (['J', 'M'].includes(key)) {
                M();
            }
            // I for left index
            if (['F', 'I'].includes(key)) {
                I();
            }
        }
    );
    model.reset();
    document.addEventListener('numbers changed',
        async evt => {
            updateNumbersDiv(model.numbers, divNumbers);
        }
    );
    initView();
    initNumbersDiv(model.numbers, divNumbers);
    await updateNumbersDivI(model.numbers);
});

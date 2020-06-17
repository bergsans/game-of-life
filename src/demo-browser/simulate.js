const { nextState } = require('../simulation');
const { 
    pentadecathlon,
    tumbler,
    gliderGun
} = require('./patterns');
const {
    convertStringToPattern,
    injectPattern
} = require('./pattern-methods');
const {
    drawGrid,
    drawAliveCells
} = require('./render');

const controlButton = document.querySelector('#control');
const canvas = document.querySelector('#simulation-canvas');
const genCount = document.querySelector('#gen-count');
const ctx = canvas.getContext('2d');

const formattedPentadecathlon = convertStringToPattern(pentadecathlon);
const formattedTumbler = convertStringToPattern(tumbler);
const formattedGliderGun = convertStringToPattern(gliderGun);

const eventHandler = {
    tempCounter: 0,
    isPlaying: false,
    gridY: -1,
    gridX: -1
};

const initialState = {
    generation: 0,
    w: window.innerWidth,
    h: window.innerHeight,
    grid: startingPatterns(createEmptyGrid(window.innerWidth, window.innerHeight))
};

function createEmptyGrid(w, h, size = 20) {
    return Array.from(
        { length: Math.ceil(h / size) },
        (_) => Array.from(
            { length: Math.ceil(w / size) }, 
            (__) => false
        )
    );
}

function toggleSimulationStatus() {
    eventHandler.isPlaying = !eventHandler.isPlaying;
    controlButton.src = eventHandler.isPlaying
        ? 'stop2.png'
        : 'play2.png';
}

function toggleCell(event) {
    const { clientX, clientY } = event;
    eventHandler.gridY = Math.floor(clientY / 20);
    eventHandler.gridX = Math.floor(clientX / 20);
}

function updateWorld(gameOfLife) {
    const { gridX, gridY } = eventHandler;
    if(gridY > 0 && gridX > 0) {
        gameOfLife.grid[gridY][gridX] = !gameOfLife.grid[gridY][gridX];
        eventHandler.gridX = -1;
        eventHandler.gridY = -1;
    }
    return gameOfLife;
}

function startingPatterns(grid) {
    return [
        { 
            pattern: formattedPentadecathlon,
            x: 23,
            y: 31
        },
        {
            pattern: formattedTumbler,
            x: 4,
            y: 18
        },
        {
            pattern: formattedGliderGun,
            x: 2,
            y: 2
        }
    ]
        .reduce((newGrid, { pattern, x, y }) => injectPattern(newGrid, pattern, x, y), grid);
}



function simulationLoop(state) {
    const { w, h, grid } = state; 
    canvas.setAttribute('width', w);
    canvas.setAttribute('height', h);
    drawGrid(ctx, w, h);
    drawAliveCells(state.grid, ctx, w, h);
    if(eventHandler.isPlaying) {
        if(eventHandler.tempCounter % 4 === 0) {
            state.grid = nextState(grid);
            state.generation++;
            genCount.innerHTML = state.generation.toString();
        } 
    eventHandler.tempCounter++;
    } else {
        state.generation = 0;
        genCount.innerHTML = state.generation.toString();
        state = updateWorld(state);
    }
    requestAnimationFrame(() => simulationLoop(state));
};
requestAnimationFrame(() => simulationLoop(initialState));

controlButton.addEventListener('click', toggleSimulationStatus)
canvas.addEventListener('click', toggleCell)

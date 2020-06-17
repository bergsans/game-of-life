const { nextState } = require('../simulation');

function convertStringToPattern(string) {
    return string
        .split('\n')
        .filter((line) => line.length !== 0)
        .map((line) => line.split('').map((v) => v === '.' ? false : true));
}

function simulate(grid, nIterations = 1) {
    let counter = 0;
    while(true) {
        if(typeof nIterations === 'number' && counter >= nIterations) {
            return grid;
        } 
        grid = nextState(grid);
        counter++;
    }
}

const tumbler = `
.......
.oo.oo.
.oo.oo.
..o.o..
o.o.o.o
o.o.o.o
oo...oo
`;
const formattedTumbler = convertStringToPattern(tumbler);

function injectPattern(grid, pattern, atX, atY) {
    console.log(pattern,atX, atY)
    for(let y = 0; y < pattern.length; y++) {
        for(let x = 0; x < pattern[0].length; x++) {
           grid[y + atY][x + atX] = pattern[y][x]; 
        }
    }
    return grid;
}

function createEmptyGrid(w, h) {
    return Array.from(
        { length: h },
        (_) => Array.from(
            { length: w }, 
            (__) => false
        )
    );
}

const print = (array) => console.log(
    array
        .map(
            (row) => row
                .map((cell) => cell ? 'o' : '.')
                .join('')
            )
        .join('\n')
);

const info = `


Conway's GAME OF LIFE
=====================

Demo of oscillator named Tumbler.

Press ctrl+c to quit.


`;

let grid = injectPattern(createEmptyGrid(12, 12), formattedTumbler, 2, 2);

setInterval(() => {
    console.clear();
    console.log(info);
    print(grid);
    grid = simulate(grid);
}, 1000/10);


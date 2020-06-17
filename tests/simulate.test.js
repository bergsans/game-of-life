const { nextState } = require('../src/simulation');

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


test('Blinker oscillator: 2 iterations (back to start)', () => {
    const grid = [
        [false, false, false, false, false],
        [false, false, true, false, false],
        [false, false, true, false, false],
        [false, false, true, false, false],
        [false, false, false, false, false],
    ];
    expect(simulate(grid, 2)).toEqual(grid);
});

test('Blinker oscillator: 3 iterations (not back to start)', () => {
    const grid = [
        [false, false, false, false, false],
        [false, false, true, false, false],
        [false, false, true, false, false],
        [false, false, true, false, false],
        [false, false, false, false, false],
    ];
    expect(simulate(grid, 3)).not.toEqual(grid);
});

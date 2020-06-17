const { nextState } = require('../src/simulation');

// Test sentences borrowed from Wikipedia.

test('Any live cell with fewer than two live neighbours dies, as if by underpopulation #1', () => {
    const grid = [
        [false, false, false],
        [false, true, false],
        [false, false, false]
    ];
    const expectedState = [
        [false, false, false],
        [false, false, false],
        [false, false, false]
    ];
    expect(nextState(grid)).toEqual(expectedState);
});

test('Any live cell with fewer than two live neighbours dies, as if by underpopulation #2', () => {
    const grid = [
        [false, false, false],
        [false, true, true],
        [false, false, false]
    ];
    const expectedState = [
        [false, false, false],
        [false, false, false],
        [false, false, false]
    ];
    expect(nextState(grid)).toEqual(expectedState);
});


test('Any live cell with two or three live neighbours lives on to the next generation. #2', () => {
    const grid = [
        [false, true, false],
        [false, true, true],
        [false, true, false]
    ];
    const expectedState = [
        [false, true, true],
        [true, true, true],
        [false, true, true]
    ];
    expect(nextState(grid)).toEqual(expectedState);
});

test('Blinker oscillator', () => {
    const grid = [
        [false, false, false, false, false],
        [false, false, true, false, false],
        [false, false, true, false, false],
        [false, false, true, false, false],
        [false, false, false, false, false],
    ];
    const expectedState = [
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, true, true, true, false],
        [false, false,false, false, false],
        [false, false, false, false, false],
    ];
    expect(nextState(grid)).toEqual(expectedState);
});

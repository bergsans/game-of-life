const { isNeighbourAlive } = require('../src/neighbours-alive');

test('Out of range #1', () => {
    const world = [
        [ false, false, false ],
        [ false, false, false ],
        [ false, false, false ]
    ];
    expect(isNeighbourAlive(world, -1, -1)).toBe(false);
});

test('Out of range #2', () => {
    const world = [
        [ false, false, false ],
        [ false, false, false ],
        [ false, false, false ]
    ];
    expect(isNeighbourAlive(world, 4, 4)).toBe(false);
});

test('No live neighbour', () => {
    const world = [
        [ false, false, false ],
        [ false, false, false ],
        [ false, false, false ]
    ];
    expect(isNeighbourAlive(world, 0, 0)).toBe(false);
});

test('Live neighbour', () => {
    const world = [
        [ true, false, false ],
        [ false, false, false ],
        [ false, false, false ]
    ];
    expect(isNeighbourAlive(world, 0, 0)).toBe(true);
});

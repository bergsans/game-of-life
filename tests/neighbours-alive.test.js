const { neighboursAlive } = require('../src/neighbours-alive');

test('Neighbours alive?', () => {
    const world = [
        [ true, false, false ],
        [ false, false, false ],
        [ false, false, false ]
    ];
    expect(neighboursAlive(world, 1, 1)).toEqual(1);
});

test('Neighbours alive?', () => {
    const world = [
        [ true, false, false ],
        [ false, false, false ],
        [ false, true, false ]
    ];
    expect(neighboursAlive(world, 1, 1)).toEqual(2);
});


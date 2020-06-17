const { neighboursAlive } = require('./neighbours-alive');
const ALIVE = true;
const DEAD = false;
const SPECIAL_STATES = [
    {
        ssState: DEAD,
        ssNeighboursAlive: 3,
    },
    {
        ssState: ALIVE,
        ssNeighboursAlive: 2,
    },
    {
        ssState: ALIVE,
        ssNeighboursAlive: 3,
    }
];

// If not a special state return false (and false is the same as DEAD)
function nextCellState(state, neighboursAlive) {
    return SPECIAL_STATES.some(
        ({ ssState, ssNeighboursAlive }) => ssState === state && 
            ssNeighboursAlive === neighboursAlive
    );
}

function nextState(grid) {
    return grid.map(
        (row, y) => row.map(
            (cell, x) => nextCellState(cell, neighboursAlive(grid, x, y))
        )
    );
}

module.exports = {
    nextState
};

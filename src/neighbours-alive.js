/*
 * Starting from north we move clockwise, allowing vertical, 
 * horisontal and diagonal movements. Used for declarative reasons. 
 */
const POSSIBLE_DIRECTIONS = {
    north:     [  0, -1 ],
    northEast: [  1, -1 ],
    east:      [  1,  0 ],
    southEast: [  1,  1 ],
    south:     [  0,  1 ],
    southWest: [ -1,  1 ],
    west:      [ -1,  0 ],
    northWest: [ -1, -1 ]
};
const dirs = Object.values(POSSIBLE_DIRECTIONS);

function isInRange(w, h, x, y) {
    return x >= 0 &&
        x < w &&
        y >= 0 &&
        y < h;
}

const height = (grid) => grid.length;
const width = (grid) => grid[0].length;

function isNeighbourAlive(grid, x, y) {
    return isInRange(
            width(grid), 
            height(grid), 
            x, 
            y
        ) && 
        grid[y][x];
}

function neighboursAlive(world, x, y) {
    return dirs.reduce(
        (aliveNeighbours, [ diffX, diffY ]) => isNeighbourAlive(
                world, 
                x + diffX, 
                y + diffY
            )
                ? aliveNeighbours + 1 
                : aliveNeighbours
        , 0
    );
}

module.exports = {
    isNeighbourAlive,
    neighboursAlive
};

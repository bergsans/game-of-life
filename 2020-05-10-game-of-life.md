# Game of Life implemented with JavaScript

I've made my first implementation of Game of Life using JavaScript. A very rewarding task for a junior developer. You are free to [test a Desktop browser demonstration](https://herebeseaswines.net/game-of-life/) or clone and test my [node.js implementation available at GitHub](https://github.com/claes-magnus/game-of-life). 

In this post, I will shortly explain the logic related to the implementation, excluding the rendering and state-management of the demos.

[Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) is a simulation by the late mathematician [John Conway](https://en.wikipedia.org/wiki/John_Horton_Conway) (1937 - 2020). It became known to the public 1970 as a 'mathematical puzzle'  when it appeared in the Scientific American. Game of Life continues to fascinate new generations. 

Conway constructed Game of Life as a project, researching [cellular automaton](https://en.wikipedia.org/wiki/Cellular_automaton), a field investigating surfaces manifested as grids with a set of cells who each have a finite number of states (true or false, for instance). 

A cellular automaton is a 'world' in the sense that given rules, the rules (can) change the state of cells over time from generation to generation.

What is Game of Life? It's called a zero-player game since you only configure an initial 'board' with alive (and implicitly) dead cells. Given a few simple rules [amazing patterns can emerge](https://www.youtube.com/watch?v=C2vgICfQawE). Game of Life is [Turing complete](https://en.wikipedia.org/wiki/Turing_completeness), meaning it's possible to make patterns that can act as a Turing machine and in theory solve any computation. The universality of the rules has been tested and [machines have been built](https://www.youtube.com/watch?v=8unMqSp0bFY) using them.

What are [the rules](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)?

-   Any live cell with fewer than two live neighbours dies, as if by underpopulation.
-   Any live cell with two or three live neighbours lives on to the next generation.
-   Any live cell with more than three live neighbours dies, as if by overpopulation.
-   Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

You can also phrase the rules like so:
-   Any live cell with two or three live neighbours survives.
-   Any dead cell with three live neighbours becomes a live cell.
-   All other live cells die in the next generation. Similarly, all other dead cells stay dead.

Game of Life is played on a rectangular grid of square cells. A cell is neighbour with another cell if it is next to it.

Starting from the north we travel clockwise, allowing vertical, horizontal, and diagonal movements. 

```
const POSSIBLE_DIRECTIONS = {
  north:   [  0, -1 ],
  northEast: [  1, -1 ],
  east:    [  1,  0 ],
  southEast: [  1,  1 ],
  south:   [  0,  1 ],
  southWest: [ -1,  1 ],
  west:    [ -1,  0 ],
  northWest: [ -1, -1 ]
};
```

However, I have this object only for declarative reasons. What I want are the values.

For each cell, I need to investigate its neighbour relation and their state. Therefore,

```
const dirs = Object.values(POSSIBLE_DIRECTIONS);
```

Based on all the possible directions, I ask which neighbours are alive?

```
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
```

How do we know if a neighbour is alive? In my implementation, the state of a cell - if it is alive or dead - is represented by a boolean value:

```
const ALIVE = true;
const DEAD = false;
```

Given a world, a grid, and a position to look at, I investigate this state by first checking if
the position is in range of the grid. 

At position 0,0 looking west would mean looking outside the grid. This is a design choice, some implement Game of Life so that looking west from position 0,0 would mean a cell positioned to far right on the grid. In my implementation, this is outside the tip of the world - in emptiness, and thus false:

```
function isInRange(w, h, x, y) {
  return x >= 0 &&
    x < w &&
    y >= 0 &&
    y < h;
}

```

A cell must be in range and be alive to be 'true'.

```
function isNeighbourAlive(grid, x, y) {
  return isInRange(
      width(grid), 
      height(grid), 
      x, 
      y
    ) && 
    grid[y][x];
}
```

The `width` and `height` are simple helpers:

```
const height = (grid) => grid.length;
const width = (grid) => grid[0].length;
```

The function (quoted again) provide the answer to the question of how many living neighbours a cell has, starting from 0.

```
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
```

What is important is the transition from a state to the next. If we have a grid, a world,
filled with cells (each either alive or dead, true or false) we determine the next state of the 'world'
by determining the next state of each cell.

```
function nextState(grid) {
  return grid.map(
    (row, y) => row.map(
      (cell, x) => nextCellState(cell, neighboursAlive(grid, x, y))
    )
  );
}
```

I choose to concentrate on next generation living cells. Based on the current state (alive and dead) three possible
states leading to life in the next generation emerge:

```
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
```

All other possible states lead to death.

Therefore, given the current state and the number of alive neighbours,
I check if one of the three special cases above is true. Otherwise, I conclude, following the rules of Game of Life, the cell at hand will die (if it dies it's status is false).  

```
function nextCellState(state, neighboursAlive) {
  return SPECIAL_STATES.some(
    ({ ssState, ssNeighboursAlive }) => ssState === state && 
      ssNeighboursAlive === neighboursAlive
  );
}
```

This is my implementation of the logic. I used a functional programming-like approach, as you see. The performance is not the best, but it's good enough given a small grid. My aim has been to solve this problem with readable code, nothing else.

The logic only handles the manipulation of state transition in a cell, given the state of its neighbours, moving from one generation to the next. 

In my view, what we do with this - how we iterate numerous generations, the 'game loop' - should not part of the logic. 

In my demos, I deliberately slowed down the transition so the 'evolution' would appear pleasant for the eye. 


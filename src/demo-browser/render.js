function drawGrid(ctx, w, h, cellSize = 20) {
    ctx.fillStyle = '#2e3440';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#4c566a';
    ctx.lineWidth = '1';
    for(let x = 0; x < w; x += cellSize) {
        for(let y = 0; y < h; y += cellSize) {
            ctx.beginPath();
            ctx.rect(x, y, cellSize, cellSize);
            ctx.stroke();
        }
    }
}

function drawAliveCells(grid, ctx) {
    ctx.fillStyle = '#bf616a';
    for(let y = 0; y < grid.length; y++) {
        for(let x = 0; x < grid[0].length; x++) {
            if(grid[y][x]) {
                const tempY = (y * 20) + 1;
                const tempX = (x * 20) + 1;
                ctx.fillRect(tempX, tempY, 18, 18);
            }
        }
    }
}

module.exports = {
    drawAliveCells,
    drawGrid
};

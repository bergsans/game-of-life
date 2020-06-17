function convertStringToPattern(string) {
    return string
        .split('\n')
        .filter((line) => line.length !== 0)
        .map((line) => line.split('').map((v) => v === '.' ? false : true));
}


function injectPattern(grid, pattern, atX, atY) {
    for(let y = 0; y < pattern.length; y++) {
        for(let x = 0; x < pattern[0].length; x++) {
           grid[y + atY][x + atX] = pattern[y][x]; 
        }
    }
    return grid;
}

module.exports = {
    convertStringToPattern,
    injectPattern
};

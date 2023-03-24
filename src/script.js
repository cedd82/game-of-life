const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const clearBtn = document.getElementById("clearBtn");

// const numRows = 50;
// const numCols = 50;
// const cellSize = 16;

const numRows = 100;
const numCols = 100;
const cellSize = 8;
let grid = new Array(numRows).fill(null).map(() => new Array(numCols).fill(false));
let interval;

function drawGrid() {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            ctx.beginPath();
            ctx.rect(col * cellSize, row * cellSize, cellSize, cellSize);
            ctx.fillStyle = grid[row][col] ? "#000000" : "#ffffff";
            ctx.fill();
            ctx.strokeStyle = "#ccc";
            ctx.stroke();
        }
    }
}

function updateGrid() {
    const newGrid = JSON.parse(JSON.stringify(grid));

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const aliveNeighbors = countAliveNeighbors(row, col);

            if (grid[row][col] && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
                newGrid[row][col] = false;
            } else if (!grid[row][col] && aliveNeighbors === 3) {
                newGrid[row][col] = true;
            }
        }
    }

    grid = newGrid;
    drawGrid();
}

function countAliveNeighbors(row, col) {
    let count = 0;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;

            const newRow = (row + i + numRows) % numRows;
            const newCol = (col + j + numCols) % numCols;

            if (grid[newRow][newCol]) {
                count++;
            }
        }
    }

    return count;
}

function populateInitialCells() {
    clearGrid();

    for (let row = 0;    row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            grid[row][col] = Math.random() > 0.5;
        }
    }

    drawGrid();
}

function startGame() {
    populateInitialCells();
    interval = setInterval(updateGrid, 100);
}

function stopGame() {
    clearInterval(interval);
}

function clearGrid() {
    stopGame();
    grid = new Array(numRows).fill(null).map(() => new Array(numCols).fill(false));
    drawGrid();
}

// Event listeners
startBtn.addEventListener("click", startGame);
stopBtn.addEventListener("click", stopGame);
clearBtn.addEventListener("click", clearGrid);


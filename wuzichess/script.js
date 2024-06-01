document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const resetButton = document.getElementById("reset");
    let cells = [];
    let currentPlayer = "black";

    function initBoard() {
        cells = [];
        board.innerHTML = '';
        for (let i = 0; i < 15; i++) {
            cells[i] = [];
            for (let j = 0; j < 15; j++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.addEventListener("click", handleCellClick);
                cells[i][j] = cell;
                board.appendChild(cell);
            }
        }
    }

    function handleCellClick(event) {
        const cell = event.target;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        if (cell.classList.contains("black") || cell.classList.contains("white")) {
            return;
        }

        cell.classList.add(currentPlayer);
        if (checkWin(row, col, currentPlayer)) {
            alert(`${currentPlayer === "black" ? "Black" : "White"} wins!`);
            board.removeEventListener("click", handleCellClick);
        } else {
            currentPlayer = currentPlayer === "black" ? "white" : "black";
        }
    }

    function checkWin(row, col, player) {
        return (
            checkDirection(row, col, player, 1, 0) || // Horizontal
            checkDirection(row, col, player, 0, 1) || // Vertical
            checkDirection(row, col, player, 1, 1) || // Diagonal \
            checkDirection(row, col, player, 1, -1)   // Diagonal /
        );
    }

    function checkDirection(row, col, player, rowDir, colDir) {
        let count = 1;
        for (let i = 1; i < 5; i++) {
            const newRow = row + i * rowDir;
            const newCol = col + i * colDir;
            if (newRow >= 0 && newRow < 15 && newCol >= 0 && newCol < 15 && cells[newRow][newCol].classList.contains(player)) {
                count++;
            } else {
                break;
            }
        }
        for (let i = 1; i < 5; i++) {
            const newRow = row - i * rowDir;
            const newCol = col - i * colDir;
            if (newRow >= 0 && newRow < 15 && newCol >= 0 && newCol < 15 && cells[newRow][newCol].classList.contains(player)) {
                count++;
            } else {
                break;
            }
        }
        return count >= 5;
    }

    resetButton.addEventListener("click", initBoard);

    initBoard();
});

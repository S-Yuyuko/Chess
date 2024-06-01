// chess.js
const board = document.getElementById('chessboard');
const initialBoardSetup = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

const pieces = {
    'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
    'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'
};

let selectedPiece = null;
let turn = 'white'; // White moves first

function createBoard() {
    board.innerHTML = ''; // Clear existing board
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const square = document.createElement('div');
            square.className = 'square ' + ((i + j) % 2 === 0 ? 'white' : 'black');
            square.dataset.row = i;
            square.dataset.col = j;
            square.addEventListener('click', handleSquareClick);
            if (initialBoardSetup[i][j] !== ' ') {
                const piece = document.createElement('div');
                piece.className = 'piece';
                piece.textContent = pieces[initialBoardSetup[i][j]];
                piece.dataset.type = initialBoardSetup[i][j];
                piece.dataset.color = initialBoardSetup[i][j] === initialBoardSetup[i][j].toLowerCase() ? 'black' : 'white';
                square.appendChild(piece);
            }
            board.appendChild(square);
        }
    }
}

function handleSquareClick(event) {
    const square = event.currentTarget;
    const piece = square.querySelector('.piece');

    if (selectedPiece) {
        // Try to move the selected piece
        const targetColor = piece ? piece.dataset.color : null;
        if (!piece || targetColor !== selectedPiece.dataset.color) {
            movePiece(selectedPiece.parentNode, square);
        }
        selectedPiece.classList.remove('selected');
        selectedPiece = null;
    } else if (piece && piece.dataset.color === turn) {
        // Select a piece
        selectedPiece = piece;
        selectedPiece.classList.add('selected');
    }
}

function movePiece(fromSquare, toSquare) {
    const piece = fromSquare.querySelector('.piece');
    if (validateMove(piece, fromSquare, toSquare)) {
        // Capture opponent piece if present
        const targetPiece = toSquare.querySelector('.piece');
        if (targetPiece) {
            toSquare.removeChild(targetPiece);
        }
        toSquare.appendChild(piece);
        turn = turn === 'white' ? 'black' : 'white';
    }
}

function validateMove(piece, fromSquare, toSquare) {
    // Add basic validation logic for each piece
    const fromRow = parseInt(fromSquare.dataset.row);
    const fromCol = parseInt(fromSquare.dataset.col);
    const toRow = parseInt(toSquare.dataset.row);
    const toCol = parseInt(toSquare.dataset.col);

    switch (piece.dataset.type.toLowerCase()) {
        case 'p': // Pawn
            const direction = piece.dataset.color === 'white' ? -1 : 1;
            if (fromCol === toCol && !toSquare.querySelector('.piece')) {
                if (toRow === fromRow + direction) return true;
                if ((fromRow === 1 && piece.dataset.color === 'black' || fromRow === 6 && piece.dataset.color === 'white') && toRow === fromRow + 2 * direction) return true;
            } else if (Math.abs(fromCol - toCol) === 1 && toRow === fromRow + direction && toSquare.querySelector('.piece')) {
                return true;
            }
            break;
        case 'r': // Rook
            if (fromRow === toRow || fromCol === toCol) return true;
            break;
        case 'n': // Knight
            if (Math.abs(fromRow - toRow) === 2 && Math.abs(fromCol - toCol) === 1 || Math.abs(fromRow - toRow) === 1 && Math.abs(fromCol - toCol) === 2) return true;
            break;
        case 'b': // Bishop
            if (Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol)) return true;
            break;
        case 'q': // Queen
            if (fromRow === toRow || fromCol === toCol || Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol)) return true;
            break;
        case 'k': // King
            if (Math.abs(fromRow - toRow) <= 1 && Math.abs(fromCol - toCol) <= 1) return true;
            break;
    }
    return false;
}

createBoard();

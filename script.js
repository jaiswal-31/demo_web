const board = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;

const gameBoard = document.getElementById("gameBoard");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function createBoard() {
  gameBoard.innerHTML = "";
  board.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.setAttribute("data-index", index);
    div.textContent = cell;
    div.addEventListener("click", handleMove, { once: true });
    gameBoard.appendChild(div);
  });
}

function handleMove(e) {
  if (!gameActive) return;

  const index = e.target.getAttribute("data-index");
  if (board[index]) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell)) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin(player) {
  return winningCombos.some(combo => {
    return combo.every(index => board[index] === player);
  });
}

function resetGame() {
  board.fill("");
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
}

resetBtn.addEventListener("click", resetGame);

createBoard();

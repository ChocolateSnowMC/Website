const BOARD_SIZE = 10;
let board = [];
let timerInterval = null;
let timerCount = 0;
let started = false;

// Initialize the game board
function initBoard() {
	board = Array.from({length: BOARD_SIZE}, () => Array.from({length: BOARD_SIZE}, () => Math.random() < 0.5));
	drawBoard();
}

// Draw the game board
function drawBoard() {
	let html = '';
	for (let i = 0; i < BOARD_SIZE; i++) {
		for (let j = 0; j < BOARD_SIZE; j++) {
			html += `<div class="cell ${board[i][j] ? 'on' : ''}" data-row="${i}" data-col="${j}"></div>`;
		}
	}
	document.getElementById('board').innerHTML = html;
	let cells = document.getElementsByClassName('cell');
	for (let i = 0; i < cells.length; i++) {
		cells[i].addEventListener('click', handleClick);
	}
}

// Handle cell clicks
function handleClick() {
	if (!started) {
		return;
	}
	let row = parseInt(this.getAttribute('data-row'));
	let col = parseInt(this.getAttribute('data-col'));
	board[row][col] = !board[row][col];
	if (row > 0) {
		board[row - 1][col] = !board[row - 1][col];
	}
	if (row < BOARD_SIZE - 1) {
		board[row + 1][col] = !board[row + 1][col];
	}
	if (col > 0) {
		board[row][col - 1] = !board[row][col - 1];
	}
	if (col < BOARD_SIZE - 1) {
		board[row][col + 1] = !board[row][col + 1];
	}
	drawBoard();
	if (checkWin()) {
		clearInterval(timerInterval);
		alert(`You won in ${formatTime(timerCount)}`);
		started = false;
		document.getElementById('start').textContent = 'Start Game';
	}
}

// Check if the game has been won
function checkWin() {
	for (let i = 0; i < BOARD_SIZE; i++) {
		for (let j = 0; j < BOARD_SIZE; j++) {
			if (board[i][j]) {
				return false;
			}
		}
	}
	return true;
}

// Start the game
function startGame() {
	initBoard();
	started = true;
	document.getElementById('start').textContent = 'Reset Game';
	timerCount = 0;
	updateTimer();
	timerInterval = setInterval(() => {
		timerCount++;
		updateTimer();
	}, 1000);
}

// Format the time as mm:ss
function formatTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Update the timer display
function updateTimer() {
	let minutes = Math.floor(timerCount / 60);
	let seconds = timerCount % 60;
	let timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	document.querySelector('.timer').textContent = timeString;
}

// Start the game when the Start Game button is clicked
document.getElementById('start').addEventListener('click', () => {
	if (!started) {
		startGame();
	} else {
		initBoard();
		started = false;
		document.getElementById('start').textContent = 'Start Game';
		clearInterval(timerInterval);
		document.querySelector('.timer').textContent = '00:00';
	}
});
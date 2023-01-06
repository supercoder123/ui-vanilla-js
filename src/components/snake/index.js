import { createGrid } from './grid';
import { GridDimensions, GridStates } from './constants';
import { generateSnake, getElementIndex, resetGrid } from './utils';

import '../../styles.css';
import './styles.css';


// game state
let [GRID, GRIDELEMENTS] = createGrid(GridDimensions.ROWS, GridDimensions.COLS);
let snake;
let frameID = -1;
let gameOver = false;
let appleX;
let appleY;
let lastTimestamp = 0;
let SNAKESPEED = 10;
let score = 0;

// directions
const down = (x, y) => [x + 1, y];
const up = (x, y) => [x - 1, y];
const left = (x, y) => [x, y - 1];
const right = (x, y) => [x, y + 1];

// default direction
let direction = down;

document.addEventListener('keydown', (e) => {
//   e.preventDefault();
  if (!gameOver) {
    updateGridData();
    drawGameElements();
  }
  switch (e.code) {
    case 'KeyW':
    case 'ArrowUp':
      if (direction !== down) {
        direction = up;
      }
      break;
    case 'KeyS':
    case 'ArrowDown':
      if (direction !== up) {
        direction = down;
      }
      break;
    case 'KeyA':
    case 'ArrowLeft':
      if (direction !== right) {
        direction = left;
      }
      break;
    case 'KeyD':
    case 'ArrowRight':
      if (direction !== left) {
        direction = right;
      }
      break;
  }
});

function updateGridData() {
  let [snakeX, snakeY] = snake[0];
  let [newSnakeX, newSnakeY] = direction(snakeX, snakeY);
  if (
    noEdgeCollision(newSnakeX, newSnakeY) &&
    noSnakeCollision(newSnakeX, newSnakeY)
  ) {
    for (let i = snake.length - 2; i >= 0; i--) {
      snake[i + 1] = snake[i];
    }
    snake[0] = [newSnakeX, newSnakeY];
    if (newSnakeX === appleX && newSnakeY === appleY) {
      [appleX, appleY] = getApplePosition();
      snake.push([snake[snake.length - 1][0], snake[snake.length - 1][1]]);
      score += 10;
      document.getElementById('score').innerText = score.toString();
      increaseSpeed(score);
    }
  } else {
    gameOver = true;
    window.cancelAnimationFrame(frameID);
  }
  for (let i = 0; i < snake.length; i++) {
    GRID[snake[i][0]][snake[i][1]] = GridStates.DRAW;
  }
  GRID[appleX][appleY] = GridStates.APPLE;
}

function increaseSpeed(score) {
  if (score > 100) {
    SNAKESPEED = 30;
  } else if (score > 50) {
    SNAKESPEED = 20;
  }
}

function drawGameElements() {
  if (GRID) {
    for (let i = 0; i < GridDimensions.ROWS; i++) {
      for (let j = 0; j < GridDimensions.COLS; j++) {
        /** Draw Snake */
        GRIDELEMENTS[getElementIndex(i, j)].style.backgroundColor =
          GRID[i][j] === GridStates.DRAW ? '#845EC2' : 'white';
        

        /** Draw Apple */
        if (GRID[i][j] === GridStates.APPLE) {
          GRIDELEMENTS[getElementIndex(appleX, appleY)].style.backgroundColor = 'red';
        }
      }
    }
  }
}

function getApplePosition() {
  const x = Math.round(Math.random() * (GridDimensions.ROWS - 1));
  const y = Math.round(Math.random() * (GridDimensions.COLS - 1));
  if (noSnakeCollision(x, y)) {
    return [x, y];
  } else {
    return getApplePosition();
  }
}

function noEdgeCollision(x, y) {
  return x < GridDimensions.ROWS && x >= 0 && y >= 0 && y < GridDimensions.COLS;
}

function noSnakeCollision(x, y) {
  for (let i = 0; i < snake.length; i++) {
    if (snake[i][0] === x && snake[i][1] === y) {
      return false;
    }
  }
  return true;
}

function updateGame() {
  resetGrid(GRID);
  updateGridData();
  drawGameElements();
}

const gameLoop = (timestamp) => {
  frameID = window.requestAnimationFrame(gameLoop);
  let elapsed = (timestamp - lastTimestamp) / 1000;
  if (elapsed < 1 / SNAKESPEED) return;
  lastTimestamp = timestamp;
  updateGame();
};

function initGame() {
  [GRID, GRIDELEMENTS] = createGrid(GridDimensions.ROWS, GridDimensions.COLS);
  snake = generateSnake(5, 6, 3);
  [appleX, appleY] = getApplePosition();
  direction = down;
  gameOver = false;
  frameID = window.requestAnimationFrame(gameLoop);
  score = 0;
  SNAKESPEED = 10;
  document.getElementById('score').innerText = score.toString();
}

document.getElementById('new-game').addEventListener('click', () => {
  initGame();
});

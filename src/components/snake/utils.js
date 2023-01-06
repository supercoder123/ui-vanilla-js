import { GridDimensions, GridStates } from './constants';

export function getElementIndex(x, y) {
  return x * GridDimensions.COLS + y;
}

export function generateSnake(x, y, length) {
  return Array(length).fill([x, y]);
}

export function resetGrid(GRID) {
  for (let i = 0; i < GridDimensions.ROWS; i++) {
    for (let j = 0; j < GridDimensions.COLS; j++) {
      GRID[i][j] = GridStates.BLANK;
    }
  }
}

import { Board, Player } from './gameLogic';

const DIRECTIONS = [
  [0, 1],   // horizontal
  [1, 0],   // vertical
  [1, 1],   // diagonal down-right
  [1, -1],  // diagonal down-left
];

export function checkWin(board: Board, row: number, col: number, player: Player): boolean {
  const size = board.length;

  for (const [dr, dc] of DIRECTIONS) {
    let count = 1;

    // Forward
    let r = row + dr;
    let c = col + dc;
    while (r >= 0 && r < size && c >= 0 && c < size && board[r][c] === player) {
      count++;
      r += dr;
      c += dc;
    }

    // Backward
    r = row - dr;
    c = col - dc;
    while (r >= 0 && r < size && c >= 0 && c < size && board[r][c] === player) {
      count++;
      r -= dr;
      c -= dc;
    }

    if (count >= 5) return true;
  }

  return false;
}

export function hasWon(board: Board, player: Player): boolean {
  const size = board.length;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] === player && checkWin(board, r, c, player)) {
        return true;
      }
    }
  }
  return false;
}

export function isBoardFull(board: Board): boolean {
  return board.every(row => row.every(cell => cell !== 0));
}

export function getWinningLine(board: Board, player: Player): [number, number][] | null {
  const size = board.length;

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col] !== player) continue;

      for (const [dr, dc] of DIRECTIONS) {
        const line: [number, number][] = [[row, col]];
        let count = 1;

        // Forward
        let r = row + dr;
        let c = col + dc;
        while (r >= 0 && r < size && c >= 0 && c < size && board[r][c] === player) {
          line.push([r, c]);
          count++;
          r += dr;
          c += dc;
        }

        // Backward
        r = row - dr;
        c = col - dc;
        while (r >= 0 && r < size && c >= 0 && c < size && board[r][c] === player) {
          line.unshift([r, c]);
          count++;
          r -= dr;
          c -= dc;
        }

        if (count >= 5) return line;
      }
    }
  }

  return null;
}

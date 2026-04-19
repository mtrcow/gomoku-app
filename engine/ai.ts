import { Board, CellValue, Player, copyBoard } from './gameLogic';
import { checkWin } from './winChecker';

type Difficulty = 'easy' | 'medium' | 'hard';

const AI_DEPTHS: Record<Difficulty, number> = {
  easy: 2,
  medium: 4,
  hard: 6,
};

// Score patterns for evaluation
const PATTERN_SCORES: Record<string, number> = {
  '_____': 0,
  'B____': 1,
  'BB___': 10,
  'BBB__': 100,
  'BBBB_': 1000,
  'BBBBB': 100000,
  'W____': -1,
  'WW___': -10,
  'WWW__': -100,
  'WWWW_': -1000,
  'WWWWW': -100000,
  'BWBB_': 1,
  'B_W_B': 1,
};

// Evaluate a line of 5 cells
function evaluateLine(cells: CellValue[]): number {
  const key = cells.map(v => v === 0 ? '_' : v === 1 ? 'B' : 'W').join('');
  return PATTERN_SCORES[key] ?? 0;
}

// Get all possible moves within a window around existing pieces
function getCandidateMoves(board: Board, boardSize: number): [number, number][] {
  const candidates = new Set<string>();
  const radius = 2;

  for (let r = 0; r < boardSize; r++) {
    for (let c = 0; c < boardSize; c++) {
      if (board[r][c] !== 0) {
        for (let dr = -radius; dr <= radius; dr++) {
          for (let dc = -radius; dc <= radius; dc++) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < boardSize && nc >= 0 && nc < boardSize && board[nr][nc] === 0) {
              candidates.add(`${nr},${nc}`);
            }
          }
        }
      }
    }
  }

  return Array.from(candidates).map(s => {
    const [r, c] = s.split(',').map(Number);
    return [r, c] as [number, number];
  });
}

function evaluateBoard(board: Board, size: number): number {
  let score = 0;

  // Check all horizontal lines
  for (let r = 0; r < size; r++) {
    for (let c = 0; c <= size - 5; c++) {
      const line = board[r].slice(c, c + 5);
      score += evaluateLine(line);
    }
  }

  // Check all vertical lines
  for (let c = 0; c < size; c++) {
    for (let r = 0; r <= size - 5; r++) {
      const line = Array.from({ length: 5 }, (_, i) => board[r + i][c]);
      score += evaluateLine(line);
    }
  }

  // Check all diagonal lines (top-left to bottom-right)
  for (let r = 0; r <= size - 5; r++) {
    for (let c = 0; c <= size - 5; c++) {
      const line = Array.from({ length: 5 }, (_, i) => board[r + i][c + i]);
      score += evaluateLine(line);
    }
  }

  // Check all diagonal lines (top-right to bottom-left)
  for (let r = 0; r <= size - 5; r++) {
    for (let c = 4; c < size; c++) {
      const line = Array.from({ length: 5 }, (_, i) => board[r + i][c - i]);
      score += evaluateLine(line);
    }
  }

  return score;
}

function evaluateMove(board: Board, row: number, col: number, player: Player, size: number): number {
  const opponent: Player = player === 1 ? 2 : 1;
  let moveScore = 0;

  // Check if this move wins
  const testBoard = copyBoard(board);
  testBoard[row][col] = player;
  if (checkWin(testBoard, row, col, player)) {
    return 1000000;
  }

  // Check if opponent can win next
  testBoard[row][col] = opponent;
  if (checkWin(testBoard, row, col, opponent)) {
    return -900000;
  }

  // Count threats
  const directions = [[0, 1], [1, 0], [1, 1], [1, -1]] as [number, number][];

  for (const [dr, dc] of directions) {
    let playerCount = 0;
    let opponentCount = 0;
    let playerOpen = 0;
    let opponentOpen = 0;

    for (let dir = -1; dir <= 1; dir += 2) {
      let pr = row + dr * dir;
      let pc = col + dc * dir;
      let localPlayer = 0;
      let localOpponent = 0;

      while (pr >= 0 && pr < size && pc >= 0 && pc < size) {
        const val = testBoard[pr][pc];
        if (val === player) localPlayer++;
        else if (val === opponent) localOpponent++;
        else break;
        pr += dr * dir;
        pc += dc * dir;
      }

      if (localPlayer > 0) playerOpen++;
      if (localOpponent > 0) opponentOpen++;
      playerCount = Math.max(playerCount, localPlayer);
      opponentCount = Math.max(opponentCount, localOpponent);
    }

    if (playerCount >= 4) moveScore += 50000;
    else if (playerCount === 3 && playerOpen >= 2) moveScore += 5000;
    else if (playerCount === 2 && playerOpen >= 2) moveScore += 500;
    else if (playerCount === 2 && playerOpen === 1) moveScore += 50;

    if (opponentCount >= 4) moveScore -= 80000;
    else if (opponentCount === 3 && opponentOpen >= 2) moveScore -= 8000;
    else if (opponentCount === 2 && opponentOpen >= 2) moveScore -= 800;
    else if (opponentCount === 2 && opponentOpen === 1) moveScore -= 80;
  }

  return moveScore;
}

function minimax(
  board: Board,
  depth: number,
  alpha: number,
  beta: number,
  isMaximizing: boolean,
  aiPlayer: Player,
  size: number,
  candidateMoves: [number, number][]
): number {
  const opponent: Player = aiPlayer === 1 ? 2 : 1;

  // Quick check for terminal states
  for (const [r, c] of candidateMoves) {
    const testBoard = copyBoard(board);
    testBoard[r][c] = isMaximizing ? aiPlayer : opponent;
    if (checkWin(testBoard, r, c, isMaximizing ? aiPlayer : opponent)) {
      return isMaximizing ? 1000000 + depth : -1000000 - depth;
    }
  }

  if (depth === 0) {
    return evaluateBoard(board, size);
  }

  // Get fresh candidates for current board state
  const candidates = candidateMoves.length > 0
    ? candidateMoves
    : getCandidateMoves(board, size);

  if (candidates.length === 0) {
    return evaluateBoard(board, size);
  }

  // For hard difficulty, sort moves by immediate evaluation
  const sortedMoves = candidates
    .map(([r, c]) => ({
      move: [r, c] as [number, number],
      score: evaluateMove(board, r, c, isMaximizing ? aiPlayer : opponent, size),
    }))
    .sort((a, b) => isMaximizing ? b.score - a.score : a.score - b.score)
    .slice(0, 15) // Limit to top 15 moves for performance
    .map(item => item.move);

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const [r, c] of sortedMoves) {
      const newBoard = copyBoard(board);
      newBoard[r][c] = aiPlayer;
      const evalScore = minimax(newBoard, depth - 1, alpha, beta, false, aiPlayer, size, sortedMoves);
      maxEval = Math.max(maxEval, evalScore);
      alpha = Math.max(alpha, evalScore);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const [r, c] of sortedMoves) {
      const newBoard = copyBoard(board);
      newBoard[r][c] = opponent;
      const evalScore = minimax(newBoard, depth - 1, alpha, beta, true, aiPlayer, size, sortedMoves);
      minEval = Math.min(minEval, evalScore);
      beta = Math.min(beta, evalScore);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

export function getBestMove(board: Board, aiPlayer: Player, difficulty: Difficulty): [number, number] | null {
  const size = board.length;

  // Check if board is empty — place near center
  let hasPieces = false;
  outer: for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] !== 0) {
        hasPieces = true;
        break outer;
      }
    }
  }

  if (!hasPieces) {
    const center = Math.floor(size / 2);
    return [center, center];
  }

  const depth = AI_DEPTHS[difficulty];
  const candidates = getCandidateMoves(board, size);

  if (candidates.length === 0) return null;
  if (candidates.length === 1) return candidates[0];

  let bestMove: [number, number] = candidates[0];
  let bestScore = -Infinity;

  for (const [r, c] of candidates) {
    const newBoard = copyBoard(board);
    newBoard[r][c] = aiPlayer;
    const score = minimax(newBoard, depth - 1, -Infinity, Infinity, false, aiPlayer, size, candidates);
    if (score > bestScore) {
      bestScore = score;
      bestMove = [r, c];
    }
  }

  return bestMove;
}

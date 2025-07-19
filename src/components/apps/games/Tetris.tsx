import React, { useState, useEffect, useCallback, useRef } from 'react';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const BLOCK_SIZE = 30;

const TETROMINOES = [
  // I
  [
    [1, 1, 1, 1]
  ],
  // O
  [
    [1, 1],
    [1, 1]
  ],
  // T
  [
    [0, 1, 0],
    [1, 1, 1]
  ],
  // S
  [
    [0, 1, 1],
    [1, 1, 0]
  ],
  // Z
  [
    [1, 1, 0],
    [0, 1, 1]
  ],
  // J
  [
    [1, 0, 0],
    [1, 1, 1]
  ],
  // L
  [
    [0, 0, 1],
    [1, 1, 1]
  ]
];

const COLORS = ['#00f5ff', '#ffff00', '#8000ff', '#00ff00', '#ff0000', '#0000ff', '#ff8000'];

interface Piece {
  shape: number[][];
  x: number;
  y: number;
  color: number;
}

const Tetris: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [board, setBoard] = useState<number[][]>(() => 
    Array(BOARD_HEIGHT).fill(0).map(() => Array(BOARD_WIDTH).fill(0))
  );
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);

  const createPiece = useCallback((): Piece => {
    const shapeIndex = Math.floor(Math.random() * TETROMINOES.length);
    return {
      shape: TETROMINOES[shapeIndex],
      x: Math.floor(BOARD_WIDTH / 2) - 1,
      y: 0,
      color: shapeIndex + 1
    };
  }, []);

  const isValidMove = useCallback((piece: Piece, dx: number, dy: number, rotation?: number[][]) => {
    const shape = rotation || piece.shape;
    const newX = piece.x + dx;
    const newY = piece.y + dy;

    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const boardX = newX + x;
          const boardY = newY + y;

          if (boardX < 0 || boardX >= BOARD_WIDTH || boardY >= BOARD_HEIGHT) {
            return false;
          }

          if (boardY >= 0 && board[boardY][boardX]) {
            return false;
          }
        }
      }
    }
    return true;
  }, [board]);

  const rotatePiece = useCallback((shape: number[][]) => {
    const rotated = shape[0].map((_, index) =>
      shape.map(row => row[index]).reverse()
    );
    return rotated;
  }, []);

  const clearLines = useCallback(() => {
    setBoard(currentBoard => {
      const newBoard = [...currentBoard];
      let linesCleared = 0;

      for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
        if (newBoard[y].every(cell => cell !== 0)) {
          newBoard.splice(y, 1);
          newBoard.unshift(Array(BOARD_WIDTH).fill(0));
          linesCleared++;
          y++; // Check the same line again
        }
      }

      if (linesCleared > 0) {
        setLines(l => l + linesCleared);
        setScore(s => s + linesCleared * 100 * level);
        setLevel(l => Math.floor((lines + linesCleared) / 10) + 1);
      }

      return newBoard;
    });
  }, [level, lines]);

  const placePiece = useCallback((piece: Piece) => {
    setBoard(currentBoard => {
      const newBoard = currentBoard.map(row => [...row]);
      
      for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
          if (piece.shape[y][x]) {
            const boardY = piece.y + y;
            const boardX = piece.x + x;
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              newBoard[boardY][boardX] = piece.color;
            }
          }
        }
      }
      
      return newBoard;
    });
  }, []);

  const resetGame = useCallback(() => {
    setBoard(Array(BOARD_HEIGHT).fill(0).map(() => Array(BOARD_WIDTH).fill(0)));
    setCurrentPiece(null);
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setLevel(1);
    setLines(0);
  }, []);

  const startGame = useCallback(() => {
    setGameStarted(true);
    setCurrentPiece(createPiece());
  }, [createPiece]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!gameStarted && e.key === ' ') {
      startGame();
      return;
    }

    if (gameOver && e.key === 'r') {
      resetGame();
      return;
    }

    if (!currentPiece || !gameStarted || gameOver) return;

    switch (e.key) {
      case 'ArrowLeft':
        if (isValidMove(currentPiece, -1, 0)) {
          setCurrentPiece(p => p ? { ...p, x: p.x - 1 } : null);
        }
        break;
      case 'ArrowRight':
        if (isValidMove(currentPiece, 1, 0)) {
          setCurrentPiece(p => p ? { ...p, x: p.x + 1 } : null);
        }
        break;
      case 'ArrowDown':
        if (isValidMove(currentPiece, 0, 1)) {
          setCurrentPiece(p => p ? { ...p, y: p.y + 1 } : null);
        }
        break;
      case 'ArrowUp':
        const rotated = rotatePiece(currentPiece.shape);
        if (isValidMove(currentPiece, 0, 0, rotated)) {
          setCurrentPiece(p => p ? { ...p, shape: rotated } : null);
        }
        break;
    }
  }, [gameStarted, gameOver, currentPiece, isValidMove, rotatePiece, startGame, resetGame]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (!gameStarted || gameOver || !currentPiece) return;

    const dropInterval = setInterval(() => {
      if (isValidMove(currentPiece, 0, 1)) {
        setCurrentPiece(p => p ? { ...p, y: p.y + 1 } : null);
      } else {
        placePiece(currentPiece);
        clearLines();
        
        const newPiece = createPiece();
        if (!isValidMove(newPiece, 0, 0)) {
          setGameOver(true);
        } else {
          setCurrentPiece(newPiece);
        }
      }
    }, Math.max(100, 500 - (level - 1) * 50));

    return () => clearInterval(dropInterval);
  }, [gameStarted, gameOver, currentPiece, level, isValidMove, placePiece, clearLines, createPiece]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, BOARD_WIDTH * BLOCK_SIZE, BOARD_HEIGHT * BLOCK_SIZE);

    // Draw board
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      for (let x = 0; x < BOARD_WIDTH; x++) {
        if (board[y][x]) {
          ctx.fillStyle = COLORS[board[y][x] - 1];
          ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
        }
      }
    }

    // Draw current piece
    if (currentPiece) {
      ctx.fillStyle = COLORS[currentPiece.color - 1];
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const drawX = (currentPiece.x + x) * BLOCK_SIZE;
            const drawY = (currentPiece.y + y) * BLOCK_SIZE;
            ctx.fillRect(drawX, drawY, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
          }
        }
      }
    }

    // Draw grid
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    for (let x = 0; x <= BOARD_WIDTH; x++) {
      ctx.beginPath();
      ctx.moveTo(x * BLOCK_SIZE, 0);
      ctx.lineTo(x * BLOCK_SIZE, BOARD_HEIGHT * BLOCK_SIZE);
      ctx.stroke();
    }
    for (let y = 0; y <= BOARD_HEIGHT; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * BLOCK_SIZE);
      ctx.lineTo(BOARD_WIDTH * BLOCK_SIZE, y * BLOCK_SIZE);
      ctx.stroke();
    }
  }, [board, currentPiece]);

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <div className="text-white text-xl font-bold">Tetris</div>
      
      <div className="flex gap-8 text-white">
        <div>Score: {score}</div>
        <div>Level: {level}</div>
        <div>Lines: {lines}</div>
      </div>
      
      <canvas
        ref={canvasRef}
        width={BOARD_WIDTH * BLOCK_SIZE}
        height={BOARD_HEIGHT * BLOCK_SIZE}
        className="border border-white/30 bg-black"
      />

      {!gameStarted && !gameOver && (
        <div className="text-center text-white">
          <div>Press SPACE to start</div>
          <div className="text-sm text-white/70 mt-2">
            Arrow keys: Move/Rotate • Down: Drop faster
          </div>
        </div>
      )}

      {gameOver && (
        <div className="text-center text-white">
          <div className="text-red-400 font-bold">Game Over!</div>
          <div>Final Score: {score}</div>
          <div>Lines Cleared: {lines}</div>
          <div className="text-sm text-white/70 mt-2">Press R to restart</div>
        </div>
      )}
    </div>
  );
};

export default Tetris;
import React, { useState, useEffect, useCallback, useRef } from 'react';

type Board = number[][];

const SIZE = 4;

const createEmptyBoard = (): Board =>
  Array.from({ length: SIZE }, () => Array(SIZE).fill(0));

const addRandomTile = (board: Board): Board => {
  const empty: [number, number][] = [];
  board.forEach((row, r) => row.forEach((val, c) => { if (val === 0) empty.push([r, c]); }));
  if (empty.length === 0) return board;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  const newBoard = board.map(row => [...row]);
  newBoard[r][c] = Math.random() < 0.9 ? 2 : 4;
  return newBoard;
};

const slideRow = (row: number[]): number[] => {
  const filtered = row.filter(v => v !== 0);
  const merged: number[] = [];
  let i = 0;
  while (i < filtered.length) {
    if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
      merged.push(filtered[i] * 2);
      i += 2;
    } else {
      merged.push(filtered[i]);
      i++;
    }
  }
  while (merged.length < SIZE) merged.push(0);
  return merged;
};

const rotateBoard = (board: Board): Board => {
  const n = board.length;
  return board[0].map((_, c) => board.map(row => row[c]).reverse());
};

const moveLeft = (board: Board): Board => board.map(slideRow);

const move = (board: Board, direction: 'left' | 'right' | 'up' | 'down'): Board => {
  let b = board.map(r => [...r]);
  const rotations: Record<string, number> = { left: 0, up: 1, right: 2, down: 3 };
  let rots = rotations[direction];
  for (let i = 0; i < rots; i++) b = rotateBoard(b);
  b = moveLeft(b);
  for (let i = 0; i < (4 - rots) % 4; i++) b = rotateBoard(b);
  return b;
};

const boardsEqual = (a: Board, b: Board) =>
  a.every((row, r) => row.every((val, c) => val === b[r][c]));

const canMove = (board: Board) =>
  ['left', 'right', 'up', 'down'].some(d => !boardsEqual(board, move(board, d as any)));

const getScore = (board: Board) => board.flat().reduce((s, v) => s + v, 0);

const tileColors: Record<number, string> = {
  0: 'bg-white/5',
  2: 'bg-blue-400/20 text-blue-200',
  4: 'bg-blue-400/30 text-blue-100',
  8: 'bg-cyan-400/40 text-cyan-100',
  16: 'bg-cyan-500/50 text-white',
  32: 'bg-teal-400/50 text-white',
  64: 'bg-teal-500/60 text-white',
  128: 'bg-violet-400/50 text-white',
  256: 'bg-violet-500/60 text-white',
  512: 'bg-purple-400/60 text-white',
  1024: 'bg-purple-500/70 text-white',
  2048: 'bg-amber-400/70 text-white',
};

const Game2048: React.FC = () => {
  const [board, setBoard] = useState<Board>(() => addRandomTile(addRandomTile(createEmptyBoard())));
  const [gameOver, setGameOver] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((dir: 'left' | 'right' | 'up' | 'down') => {
    if (gameOver) return;
    setBoard(prev => {
      const newBoard = move(prev, dir);
      if (boardsEqual(prev, newBoard)) return prev;
      const withTile = addRandomTile(newBoard);
      if (!canMove(withTile)) setGameOver(true);
      return withTile;
    });
  }, [gameOver]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const map: Record<string, string> = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down' };
      if (map[e.key]) { e.preventDefault(); handleMove(map[e.key] as any); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleMove]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    const absDx = Math.abs(dx), absDy = Math.abs(dy);
    if (Math.max(absDx, absDy) < 30) return;
    if (absDx > absDy) handleMove(dx > 0 ? 'right' : 'left');
    else handleMove(dy > 0 ? 'down' : 'up');
    touchStart.current = null;
  };

  const restart = () => { setBoard(addRandomTile(addRandomTile(createEmptyBoard()))); setGameOver(false); };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-refos-window p-4"
      ref={containerRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="flex items-center justify-between w-full max-w-xs mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">2048</h2>
          <p className="text-white/60 text-sm">Score: {getScore(board)}</p>
        </div>
        <button onClick={restart} className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors">
          New Game
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 w-full max-w-xs aspect-square">
        {board.flat().map((val, i) => (
          <div key={i} className={`flex items-center justify-center rounded-lg font-bold transition-all duration-150 ${tileColors[val] || 'bg-amber-500/80 text-white'} ${val > 64 ? 'text-lg' : 'text-xl'}`}>
            {val > 0 ? val : ''}
          </div>
        ))}
      </div>

      {gameOver && (
        <div className="mt-4 text-center">
          <p className="text-white/80 font-semibold mb-2">Game Over!</p>
          <button onClick={restart} className="px-4 py-2 bg-blue-500/30 hover:bg-blue-500/40 text-white rounded-lg transition-colors">
            Play Again
          </button>
        </div>
      )}

      <p className="text-white/40 text-xs mt-4">Swipe or use arrow keys</p>
    </div>
  );
};

export default Game2048;

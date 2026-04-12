import React, { useState, useEffect, useCallback, useRef } from 'react';

const COLORS = [
  { name: 'Red', bg: 'bg-red-500/40', border: 'border-red-400/60', glow: 'shadow-red-500/30' },
  { name: 'Blue', bg: 'bg-blue-500/40', border: 'border-blue-400/60', glow: 'shadow-blue-500/30' },
  { name: 'Green', bg: 'bg-green-500/40', border: 'border-green-400/60', glow: 'shadow-green-500/30' },
  { name: 'Yellow', bg: 'bg-yellow-500/40', border: 'border-yellow-400/60', glow: 'shadow-yellow-500/30' },
];

const ColorTap: React.FC = () => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerInput, setPlayerInput] = useState<number[]>([]);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [activeColor, setActiveColor] = useState<number | null>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout[]>([]);

  const clearTimeouts = () => { timeoutRef.current.forEach(clearTimeout); timeoutRef.current = []; };

  const showSequence = useCallback((seq: number[]) => {
    setIsShowingSequence(true);
    clearTimeouts();
    seq.forEach((color, i) => {
      const t1 = setTimeout(() => setActiveColor(color), i * 600);
      const t2 = setTimeout(() => setActiveColor(null), i * 600 + 400);
      timeoutRef.current.push(t1, t2);
    });
    const t3 = setTimeout(() => setIsShowingSequence(false), seq.length * 600);
    timeoutRef.current.push(t3);
  }, []);

  const startGame = useCallback(() => {
    const first = [Math.floor(Math.random() * 4)];
    setSequence(first);
    setPlayerInput([]);
    setScore(0);
    setGameState('playing');
    setTimeout(() => showSequence(first), 500);
  }, [showSequence]);

  const nextRound = useCallback((prevSeq: number[]) => {
    const next = [...prevSeq, Math.floor(Math.random() * 4)];
    setSequence(next);
    setPlayerInput([]);
    setTimeout(() => showSequence(next), 600);
  }, [showSequence]);

  const handleTap = (colorIdx: number) => {
    if (isShowingSequence || gameState !== 'playing') return;
    setActiveColor(colorIdx);
    setTimeout(() => setActiveColor(null), 200);

    const newInput = [...playerInput, colorIdx];
    setPlayerInput(newInput);

    const pos = newInput.length - 1;
    if (newInput[pos] !== sequence[pos]) {
      setBestScore(s => Math.max(s, score));
      setGameState('gameover');
      return;
    }

    if (newInput.length === sequence.length) {
      setScore(s => s + 1);
      nextRound(sequence);
    }
  };

  useEffect(() => () => clearTimeouts(), []);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-refos-window p-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-white">Simon Says</h2>
        <p className="text-white/60 text-sm">Round: {score} {bestScore > 0 && `• Best: ${bestScore}`}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full max-w-[240px] mb-6">
        {COLORS.map((color, i) => (
          <button
            key={i}
            onClick={() => handleTap(i)}
            className={`aspect-square rounded-2xl border-2 transition-all duration-200 ${color.bg} ${color.border} ${
              activeColor === i ? `scale-95 brightness-150 shadow-lg ${color.glow}` : 'hover:scale-105'
            } ${isShowingSequence ? 'pointer-events-none' : ''}`}
            style={{ touchAction: 'manipulation' }}
          />
        ))}
      </div>

      {gameState === 'idle' && (
        <button onClick={startGame} className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors">
          Start Game
        </button>
      )}

      {gameState === 'gameover' && (
        <div className="text-center">
          <p className="text-white/80 font-semibold mb-2">Game Over! Score: {score}</p>
          <button onClick={startGame} className="px-4 py-2 bg-blue-500/30 hover:bg-blue-500/40 text-white rounded-lg transition-colors">
            Try Again
          </button>
        </div>
      )}

      {isShowingSequence && <p className="text-white/50 text-sm">Watch the pattern...</p>}
      {!isShowingSequence && gameState === 'playing' && <p className="text-white/40 text-xs">Your turn — tap the colors</p>}
    </div>
  );
};

export default ColorTap;

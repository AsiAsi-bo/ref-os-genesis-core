import React, { useState, useEffect, useCallback } from 'react';

const EMOJIS = ['🌟', '🎮', '🚀', '💎', '🔥', '🎵', '⚡', '🌈'];

interface Card { id: number; emoji: string; flipped: boolean; matched: boolean; }

const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

const MemoryMatch: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [locked, setLocked] = useState(false);

  const initGame = useCallback(() => {
    const pairs = shuffle([...EMOJIS, ...EMOJIS]);
    setCards(pairs.map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false })));
    setFlipped([]);
    setMoves(0);
    setWon(false);
    setLocked(false);
  }, []);

  useEffect(() => { initGame(); }, [initGame]);

  const handleFlip = (id: number) => {
    if (locked) return;
    const card = cards[id];
    if (card.flipped || card.matched) return;

    const newFlipped = [...flipped, id];
    setCards(prev => prev.map(c => c.id === id ? { ...c, flipped: true } : c));
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      setLocked(true);
      const [a, b] = newFlipped;
      if (cards[a].emoji === cards[id].emoji) {
        setTimeout(() => {
          setCards(prev => {
            const updated = prev.map(c => c.id === a || c.id === b ? { ...c, matched: true } : c);
            if (updated.every(c => c.matched)) setWon(true);
            return updated;
          });
          setFlipped([]);
          setLocked(false);
        }, 300);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => c.id === a || c.id === b ? { ...c, flipped: false } : c));
          setFlipped([]);
          setLocked(false);
        }, 800);
      }
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-refos-window p-4">
      <div className="flex items-center justify-between w-full max-w-xs mb-4">
        <div>
          <h2 className="text-xl font-bold text-white">Memory</h2>
          <p className="text-white/60 text-sm">Moves: {moves}</p>
        </div>
        <button onClick={initGame} className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors">
          New Game
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2 w-full max-w-xs">
        {cards.map(card => (
          <button
            key={card.id}
            onClick={() => handleFlip(card.id)}
            className={`aspect-square rounded-xl text-2xl flex items-center justify-center transition-all duration-300 transform ${
              card.flipped || card.matched
                ? 'bg-white/15 border-white/30 scale-100 rotate-0'
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:scale-105'
            } border backdrop-blur-sm ${card.matched ? 'opacity-60' : ''}`}
            style={{ touchAction: 'manipulation' }}
          >
            {card.flipped || card.matched ? card.emoji : '?'}
          </button>
        ))}
      </div>

      {won && (
        <div className="mt-4 text-center">
          <p className="text-white font-semibold mb-2">🎉 You won in {moves} moves!</p>
          <button onClick={initGame} className="px-4 py-2 bg-blue-500/30 hover:bg-blue-500/40 text-white rounded-lg transition-colors">
            Play Again
          </button>
        </div>
      )}

      <p className="text-white/40 text-xs mt-4">Tap to flip cards</p>
    </div>
  );
};

export default MemoryMatch;


import React, { useState } from 'react';
import Snake from './games/Snake';
import Pong from './games/Pong';
import Tetris from './games/Tetris';
import Breakout from './games/Breakout';
import GameBuilder from './games/GameBuilder';
import Game2048 from './games/Game2048';
import FlappyBird from './games/FlappyBird';
import MemoryMatch from './games/MemoryMatch';
import ColorTap from './games/ColorTap';
import { Wrench, Tablet } from 'lucide-react';

type GameType = 'menu' | 'snake' | 'pong' | 'tetris' | 'breakout' | 'marios' | 'freakpostor' | 'builder' | '2048' | 'flappy' | 'memory' | 'simon';

const Game: React.FC = () => {
  const [activeGame, setActiveGame] = useState<GameType>('menu');

  const games = [
    { id: 'snake', name: 'Snake', description: 'Classic snake game', icon: '🐍' },
    { id: 'pong', name: 'Pong', description: 'The original arcade game', icon: '🏓' },
    { id: 'tetris', name: 'Tetris', description: 'Falling blocks puzzle', icon: '🧱' },
    { id: 'breakout', name: 'Breakout', description: 'Break all the bricks', icon: '🧨' },
    { id: 'marios', name: "Mario's Madness", description: 'FNF Mario mod', icon: '🍄' },
    { id: 'freakpostor', name: 'Freakpostor', description: 'FNF Among Us mod', icon: '👻' },
  ];

  const touchGames = [
    { id: '2048', name: '2048', description: 'Swipe to merge tiles', icon: '🔢', touch: true },
    { id: 'flappy', name: 'Flappy Bird', description: 'Tap to fly', icon: '🐤', touch: true },
    { id: 'memory', name: 'Memory Match', description: 'Find matching pairs', icon: '🃏', touch: true },
    { id: 'simon', name: 'Simon Says', description: 'Repeat the pattern', icon: '🎨', touch: true },
  ];

  const renderGame = () => {
    switch (activeGame) {
      case 'snake':
        return <Snake />;
      case 'pong':
        return <Pong />;
      case 'tetris':
        return <Tetris />;
      case 'breakout':
        return <Breakout />;
      case 'builder': return <GameBuilder />;
      case '2048': return <Game2048 />;
      case 'flappy': return <FlappyBird />;
      case 'memory': return <MemoryMatch />;
      case 'simon': return <ColorTap />;
      case 'marios':
        return (
          <div className="w-full h-full bg-black rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src="https://fridaynightfunkin.gg/fnf-marios-madness/"
              title="FNF Mario's Madness"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        );
      case 'freakpostor':
        return (
          <div className="w-full h-full bg-black rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src="https://fridaynightfunkin.gg/fnf-freakpostor/"
              title="FNF Freakpostor"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        );
      default:
        return (
          <div className="p-6 overflow-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Choose a Game</h2>
              <p className="text-white/70">Select from our collection of retro games</p>
            </div>
            
            {/* Build Your Own Game Button */}
            <div className="max-w-2xl mx-auto mb-6">
              <button
                onClick={() => setActiveGame('builder')}
                className="w-full bg-gradient-to-r from-refos-primary to-purple-600 hover:from-refos-primary/90 hover:to-purple-600/90 text-white p-4 rounded-lg transition-all border border-white/20 hover:border-white/40 flex items-center justify-center gap-3"
              >
                <Wrench className="w-6 h-6" />
                <div>
                  <div className="text-lg font-semibold">Build Your Own Game</div>
                  <div className="text-sm text-white/70">Create a custom platformer</div>
                </div>
              </button>
            </div>
            
            {/* Touch-Friendly Games */}
            <div className="max-w-2xl mx-auto mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Tablet className="w-4 h-4 text-white/60" />
                <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider">iPad & Touch Friendly</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {touchGames.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => setActiveGame(game.id as GameType)}
                    className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-xl transition-colors border border-cyan-400/20 hover:border-cyan-400/40"
                    style={{ touchAction: 'manipulation' }}
                  >
                    <div className="text-3xl mb-2">{game.icon}</div>
                    <div className="text-sm font-semibold mb-0.5">{game.name}</div>
                    <div className="text-xs text-white/50">{game.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Classic Games */}
            <div className="max-w-2xl mx-auto mb-2">
              <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-3">Classic Games</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {games.map((game) => (
                <button
                  key={game.id}
                  onClick={() => setActiveGame(game.id as GameType)}
                  className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-lg transition-colors border border-white/20 hover:border-white/40"
                >
                  <div className="text-3xl mb-2">{game.icon}</div>
                  <div className="text-lg font-semibold mb-1">{game.name}</div>
                  <div className="text-sm text-white/70">{game.description}</div>
                </button>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col bg-refos-window">
      {/* Header */}
      <div className="p-4 border-b border-refos-window/30 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">RefGames</h1>
          <p className="text-white/70 text-sm">Retro games collection</p>
        </div>
        
        {activeGame !== 'menu' && (
          <button
            onClick={() => setActiveGame('menu')}
            className="px-4 py-2 bg-refos-primary hover:bg-refos-primary/80 text-white rounded transition-colors"
          >
            Back to Menu
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {renderGame()}
      </div>
    </div>
  );
};

export default Game;

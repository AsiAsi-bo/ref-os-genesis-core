
import React, { useState } from 'react';

const Game: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'marios' | 'freakpostor'>('marios');

  return (
    <div className="h-full flex flex-col bg-refos-window">
      {/* Header */}
      <div className="p-4 border-b border-refos-window/30">
        <h1 className="text-xl font-semibold text-white">RefGames</h1>
        <p className="text-white/70 text-sm">Play Friday Night Funkin' mods</p>
        
        {/* Tab Navigation */}
        <div className="flex mt-3 space-x-2">
          <button
            onClick={() => setActiveTab('marios')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              activeTab === 'marios' 
                ? 'bg-refos-primary text-white' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Mario's Madness
          </button>
          <button
            onClick={() => setActiveTab('freakpostor')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              activeTab === 'freakpostor' 
                ? 'bg-refos-primary text-white' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Freakpostor
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <div className="w-full h-full bg-black rounded-lg overflow-hidden">
          {activeTab === 'marios' ? (
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
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;

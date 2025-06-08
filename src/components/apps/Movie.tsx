
import React, { useState } from 'react';

const Movie: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'youtube' | 'fnf'>('youtube');

  return (
    <div className="h-full flex flex-col bg-refos-window">
      {/* Header */}
      <div className="p-4 border-b border-refos-window/30">
        <h1 className="text-xl font-semibold text-white">RefMovies</h1>
        <p className="text-white/70 text-sm">Watch content from Damilola Mike Bamiloye & Play FNF Mario's Madness</p>
        
        {/* Tab Navigation */}
        <div className="flex mt-3 space-x-2">
          <button
            onClick={() => setActiveTab('youtube')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              activeTab === 'youtube' 
                ? 'bg-refos-primary text-white' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            YouTube Channel
          </button>
          <button
            onClick={() => setActiveTab('fnf')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              activeTab === 'fnf' 
                ? 'bg-refos-primary text-white' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            FNF Mario's Madness
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <div className="w-full h-full bg-black rounded-lg overflow-hidden">
          {activeTab === 'youtube' ? (
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/videoseries?list=UU_x5XG1OV2P6uZZ5FSM9Ttw"
              title="Damilola Mike Bamiloye YouTube Channel"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Movie;

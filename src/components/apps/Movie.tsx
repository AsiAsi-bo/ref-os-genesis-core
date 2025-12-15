
import React from 'react';

const Movie: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-refos-window">
      {/* Header */}
      <div className="p-3 border-b border-refos-window/30">
        <h1 className="text-xl font-semibold text-white">RefMovies</h1>
        <p className="text-white/70 text-sm">Stream movies and shows</p>
      </div>

      {/* Embedded Movie Site */}
      <div className="flex-1">
        <iframe
          width="100%"
          height="100%"
          src="https://moviezunveiled.lovable.app"
          title="RefMovies Streaming"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default Movie;


import React from 'react';

const Movie: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-refos-window">
      {/* Header */}
      <div className="p-4 border-b border-refos-window/30">
        <h1 className="text-xl font-semibold text-white">RefMovies</h1>
        <p className="text-white/70 text-sm">Watch content from Damilola Mike Bamiloye</p>
      </div>

      {/* YouTube Channel Embed */}
      <div className="flex-1 p-4">
        <div className="w-full h-full bg-black rounded-lg overflow-hidden">
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
        </div>
      </div>
    </div>
  );
};

export default Movie;

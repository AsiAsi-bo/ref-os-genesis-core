import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat, Music, Heart, ListMusic } from 'lucide-react';

interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  liked: boolean;
}

const sampleTracks: Track[] = [
  { id: 1, title: 'Digital Sunrise', artist: 'Ref Audio', album: 'System Sounds', duration: '3:42', liked: false },
  { id: 2, title: 'Neon Lights', artist: 'Synthwave OS', album: 'Cyber Dreams', duration: '4:15', liked: true },
  { id: 3, title: 'Boot Sequence', artist: 'Ref Audio', album: 'System Sounds', duration: '2:58', liked: false },
  { id: 4, title: 'Midnight Code', artist: 'Binary Beats', album: 'Late Night Dev', duration: '5:01', liked: true },
  { id: 5, title: 'Cloud Nine', artist: 'Ethereal', album: 'Floating', duration: '3:33', liked: false },
  { id: 6, title: 'Pixel Rain', artist: 'Chiptune Master', album: '8-Bit World', duration: '2:47', liked: false },
  { id: 7, title: 'Quantum Loop', artist: 'Binary Beats', album: 'Late Night Dev', duration: '4:22', liked: true },
  { id: 8, title: 'Startup Melody', artist: 'Ref Audio', album: 'System Sounds', duration: '1:30', liked: false },
];

const MusicPlayer: React.FC = () => {
  const [tracks, setTracks] = useState(sampleTracks);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [progress, setProgress] = useState([30]);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const track = tracks[currentTrack];

  const toggleLike = (id: number) => {
    setTracks(tracks.map(t => t.id === id ? { ...t, liked: !t.liked } : t));
  };

  const nextTrack = () => setCurrentTrack((currentTrack + 1) % tracks.length);
  const prevTrack = () => setCurrentTrack((currentTrack - 1 + tracks.length) % tracks.length);

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white">
      {/* Now Playing */}
      <div className="flex-shrink-0 p-6 flex items-center gap-5 border-b border-white/10">
        <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
          <Music className="h-10 w-10 text-white/80" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold truncate">{track.title}</h2>
          <p className="text-sm text-white/60">{track.artist} — {track.album}</p>
          <div className="mt-2">
            <Slider value={progress} onValueChange={setProgress} max={100} className="w-full" />
            <div className="flex justify-between text-[10px] text-white/40 mt-1">
              <span>1:12</span>
              <span>{track.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex-shrink-0 flex items-center justify-center gap-4 py-3 border-b border-white/10">
        <button onClick={() => setShuffle(!shuffle)} className={`p-1.5 rounded ${shuffle ? 'text-purple-400' : 'text-white/50 hover:text-white'}`}>
          <Shuffle size={16} />
        </button>
        <button onClick={prevTrack} className="p-1.5 text-white/80 hover:text-white"><SkipBack size={20} /></button>
        <button onClick={() => setIsPlaying(!isPlaying)} className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform">
          {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
        </button>
        <button onClick={nextTrack} className="p-1.5 text-white/80 hover:text-white"><SkipForward size={20} /></button>
        <button onClick={() => setRepeat(!repeat)} className={`p-1.5 rounded ${repeat ? 'text-purple-400' : 'text-white/50 hover:text-white'}`}>
          <Repeat size={16} />
        </button>
        <div className="flex items-center gap-2 ml-4">
          <Volume2 size={14} className="text-white/50" />
          <Slider value={volume} onValueChange={setVolume} max={100} className="w-20" />
        </div>
      </div>

      {/* Track list */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3">
          <div className="flex items-center gap-2 mb-2 px-2">
            <ListMusic size={14} className="text-white/50" />
            <span className="text-xs text-white/50 font-medium">PLAYLIST</span>
          </div>
          {tracks.map((t, i) => (
            <button
              key={t.id}
              onClick={() => { setCurrentTrack(i); setIsPlaying(true); }}
              className={`w-full flex items-center gap-3 p-2 rounded-md text-left transition-colors ${
                i === currentTrack ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5'
              }`}
            >
              <span className="w-6 text-center text-xs text-white/40">{i === currentTrack && isPlaying ? '♫' : i + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm truncate">{t.title}</div>
                <div className="text-[11px] text-white/40">{t.artist}</div>
              </div>
              <span className="text-xs text-white/30">{t.duration}</span>
              <button
                onClick={(e) => { e.stopPropagation(); toggleLike(t.id); }}
                className="p-1"
              >
                <Heart size={14} className={t.liked ? 'fill-pink-500 text-pink-500' : 'text-white/20'} />
              </button>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;

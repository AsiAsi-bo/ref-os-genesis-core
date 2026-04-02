import React, { useState } from 'react';
import { Image, Grid3X3, Calendar, Heart, Trash2, ZoomIn, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface Photo {
  id: number;
  color: string;
  gradient: string;
  name: string;
  date: string;
  liked: boolean;
}

const samplePhotos: Photo[] = [
  { id: 1, color: '#e74c3c', gradient: 'from-red-500 to-orange-400', name: 'Sunset Beach', date: '2026-03-15', liked: true },
  { id: 2, color: '#3498db', gradient: 'from-blue-500 to-cyan-400', name: 'Ocean View', date: '2026-03-14', liked: false },
  { id: 3, color: '#2ecc71', gradient: 'from-green-500 to-emerald-400', name: 'Forest Trail', date: '2026-03-12', liked: true },
  { id: 4, color: '#9b59b6', gradient: 'from-purple-500 to-pink-400', name: 'City Lights', date: '2026-03-10', liked: false },
  { id: 5, color: '#f1c40f', gradient: 'from-yellow-400 to-amber-500', name: 'Golden Hour', date: '2026-03-08', liked: false },
  { id: 6, color: '#1abc9c', gradient: 'from-teal-400 to-green-500', name: 'Mountain Peak', date: '2026-03-05', liked: true },
  { id: 7, color: '#e91e63', gradient: 'from-pink-500 to-rose-400', name: 'Cherry Blossoms', date: '2026-02-28', liked: false },
  { id: 8, color: '#ff5722', gradient: 'from-orange-500 to-red-400', name: 'Autumn Leaves', date: '2026-02-25', liked: true },
  { id: 9, color: '#607d8b', gradient: 'from-slate-500 to-gray-400', name: 'Rainy Day', date: '2026-02-20', liked: false },
  { id: 10, color: '#00bcd4', gradient: 'from-cyan-400 to-blue-500', name: 'Starry Night', date: '2026-02-18', liked: false },
  { id: 11, color: '#8bc34a', gradient: 'from-lime-400 to-green-600', name: 'Spring Garden', date: '2026-02-15', liked: true },
  { id: 12, color: '#673ab7', gradient: 'from-violet-500 to-indigo-600', name: 'Northern Lights', date: '2026-02-10', liked: false },
];

const Photos: React.FC = () => {
  const [photos, setPhotos] = useState(samplePhotos);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');

  const displayed = filter === 'favorites' ? photos.filter(p => p.liked) : photos;
  const selectedIndex = selectedPhoto !== null ? displayed.findIndex(p => p.id === selectedPhoto) : -1;

  const toggleLike = (id: number) => {
    setPhotos(photos.map(p => p.id === id ? { ...p, liked: !p.liked } : p));
  };

  const deletePhoto = (id: number) => {
    setPhotos(photos.filter(p => p.id !== id));
    setSelectedPhoto(null);
  };

  const navigate = (dir: number) => {
    if (selectedIndex === -1) return;
    const next = (selectedIndex + dir + displayed.length) % displayed.length;
    setSelectedPhoto(displayed[next].id);
  };

  return (
    <div className="h-full flex flex-col bg-refos-window text-white">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Image className="h-5 w-5 text-refos-primary" />
          <h2 className="font-semibold">Photos</h2>
        </div>
        <div className="flex gap-1">
          <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded text-xs ${filter === 'all' ? 'bg-refos-primary text-white' : 'text-white/60 hover:bg-white/10'}`}>
            <Grid3X3 size={14} className="inline mr-1" /> All
          </button>
          <button onClick={() => setFilter('favorites')} className={`px-3 py-1 rounded text-xs ${filter === 'favorites' ? 'bg-refos-primary text-white' : 'text-white/60 hover:bg-white/10'}`}>
            <Heart size={14} className="inline mr-1" /> Favorites
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="grid grid-cols-4 gap-2">
          {displayed.map(photo => (
            <button
              key={photo.id}
              onClick={() => setSelectedPhoto(photo.id)}
              className="aspect-square rounded-lg overflow-hidden relative group"
            >
              <div className={`w-full h-full bg-gradient-to-br ${photo.gradient} flex items-center justify-center`}>
                <Image size={24} className="text-white/30" />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end">
                <span className="text-[10px] text-white p-1.5 opacity-0 group-hover:opacity-100 transition-opacity truncate w-full">{photo.name}</span>
              </div>
              {photo.liked && <Heart size={12} className="absolute top-1.5 right-1.5 fill-pink-500 text-pink-500" />}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedPhoto !== null && (() => {
        const photo = photos.find(p => p.id === selectedPhoto);
        if (!photo) return null;
        return (
          <div className="absolute inset-0 bg-black/90 z-50 flex flex-col">
            <div className="flex items-center justify-between p-3">
              <span className="text-sm font-medium">{photo.name}</span>
              <div className="flex gap-2">
                <button onClick={() => toggleLike(photo.id)} className="p-1.5 rounded hover:bg-white/10">
                  <Heart size={18} className={photo.liked ? 'fill-pink-500 text-pink-500' : 'text-white/60'} />
                </button>
                <button onClick={() => deletePhoto(photo.id)} className="p-1.5 rounded hover:bg-white/10">
                  <Trash2 size={18} className="text-white/60" />
                </button>
                <button onClick={() => setSelectedPhoto(null)} className="p-1.5 rounded hover:bg-white/10">
                  <X size={18} className="text-white/60" />
                </button>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center relative">
              <button onClick={() => navigate(-1)} className="absolute left-2 p-2 rounded-full bg-black/50 hover:bg-black/70">
                <ChevronLeft size={24} />
              </button>
              <div className={`w-3/4 aspect-video rounded-lg bg-gradient-to-br ${photo.gradient} flex items-center justify-center`}>
                <Image size={64} className="text-white/20" />
              </div>
              <button onClick={() => navigate(1)} className="absolute right-2 p-2 rounded-full bg-black/50 hover:bg-black/70">
                <ChevronRight size={24} />
              </button>
            </div>
            <div className="p-3 text-center text-xs text-white/40">{photo.date}</div>
          </div>
        );
      })()}
    </div>
  );
};

export default Photos;

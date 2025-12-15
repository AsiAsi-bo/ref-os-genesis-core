
import React, { useState } from 'react';
import { Download, Star, Search, Package, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface StoreApp {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  downloads: string;
  icon: string;
  installed: boolean;
}

const Store: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [installedApps, setInstalledApps] = useState<string[]>([]);
  const [installing, setInstalling] = useState<string | null>(null);

  const storeApps: StoreApp[] = [
    { id: 'vscode', name: 'VS Code', description: 'Powerful code editor with extensions', category: 'Development', rating: 4.8, downloads: '50M+', icon: '💻', installed: false },
    { id: 'spotify', name: 'Spotify', description: 'Music streaming service', category: 'Entertainment', rating: 4.5, downloads: '100M+', icon: '🎵', installed: false },
    { id: 'discord', name: 'Discord', description: 'Voice, video, and text chat', category: 'Social', rating: 4.6, downloads: '80M+', icon: '💬', installed: false },
    { id: 'photoshop', name: 'PhotoEditor Pro', description: 'Professional photo editing', category: 'Graphics', rating: 4.4, downloads: '20M+', icon: '🎨', installed: false },
    { id: 'notion', name: 'Notion', description: 'All-in-one workspace', category: 'Productivity', rating: 4.7, downloads: '30M+', icon: '📝', installed: false },
    { id: 'vlc', name: 'VLC Media Player', description: 'Play any media format', category: 'Entertainment', rating: 4.6, downloads: '60M+', icon: '🎬', installed: false },
    { id: 'blender', name: 'Blender', description: '3D creation suite', category: 'Graphics', rating: 4.9, downloads: '15M+', icon: '🎮', installed: false },
    { id: 'obs', name: 'OBS Studio', description: 'Streaming and recording', category: 'Utilities', rating: 4.7, downloads: '25M+', icon: '📹', installed: false },
    { id: 'figma', name: 'Figma', description: 'Collaborative design tool', category: 'Design', rating: 4.8, downloads: '10M+', icon: '✏️', installed: false },
    { id: 'steam', name: 'Steam', description: 'Gaming platform', category: 'Games', rating: 4.5, downloads: '150M+', icon: '🎮', installed: false },
    { id: 'slack', name: 'Slack', description: 'Team communication', category: 'Productivity', rating: 4.4, downloads: '40M+', icon: '💼', installed: false },
    { id: 'zoom', name: 'Zoom', description: 'Video conferencing', category: 'Communication', rating: 4.3, downloads: '90M+', icon: '📞', installed: false },
  ];

  const categories = ['All', 'Development', 'Entertainment', 'Social', 'Graphics', 'Productivity', 'Utilities', 'Design', 'Games', 'Communication'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredApps = storeApps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleInstall = (appId: string, appName: string) => {
    if (installedApps.includes(appId)) {
      toast.info(`${appName} is already installed`);
      return;
    }

    setInstalling(appId);
    
    // Simulate installation
    setTimeout(() => {
      setInstalledApps(prev => [...prev, appId]);
      setInstalling(null);
      toast.success(`${appName} installed successfully!`);
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col bg-refos-window">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <Package className="w-8 h-8 text-refos-primary" />
          <div>
            <h1 className="text-xl font-semibold text-white">Ref Store</h1>
            <p className="text-white/70 text-sm">Download ready-made software</p>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search apps..."
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="p-3 border-b border-white/10 overflow-x-auto">
        <div className="flex gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-refos-primary text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* App Grid */}
      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredApps.map(app => {
            const isInstalled = installedApps.includes(app.id);
            const isInstalling = installing === app.id;
            
            return (
              <div
                key={app.id}
                className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-3xl">{app.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate">{app.name}</h3>
                    <p className="text-white/50 text-xs">{app.category}</p>
                  </div>
                </div>
                
                <p className="text-white/70 text-sm mb-3 line-clamp-2">{app.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-white/70 text-xs">{app.rating}</span>
                  </div>
                  <span className="text-white/50 text-xs">{app.downloads}</span>
                </div>
                
                <Button
                  size="sm"
                  className={`w-full ${isInstalled ? 'bg-green-600 hover:bg-green-600' : ''}`}
                  onClick={() => handleInstall(app.id, app.name)}
                  disabled={isInstalling || isInstalled}
                >
                  {isInstalling ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Installing...
                    </span>
                  ) : isInstalled ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Installed
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Install
                    </span>
                  )}
                </Button>
              </div>
            );
          })}
        </div>
        
        {filteredApps.length === 0 && (
          <div className="text-center text-white/50 py-12">
            No apps found matching your search
          </div>
        )}
      </div>
    </div>
  );
};

export default Store;

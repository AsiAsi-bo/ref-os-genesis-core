import React, { useState, useEffect } from 'react';
import { Download, Star, Search, Package, CheckCircle, Plus, Upload, User, Trash2 } from 'lucide-react';
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
  isUserCreated?: boolean;
  author?: string;
}

const STORAGE_KEY = 'refstore-user-apps';

const Store: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [installedApps, setInstalledApps] = useState<string[]>([]);
  const [installing, setInstalling] = useState<string | null>(null);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [userApps, setUserApps] = useState<StoreApp[]>([]);
  const [newApp, setNewApp] = useState({
    name: '',
    description: '',
    category: 'Utilities',
    icon: '📦',
    author: ''
  });

  const defaultApps: StoreApp[] = [
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

  // Load user-created apps from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setUserApps(JSON.parse(saved));
    }
  }, []);

  // Save user apps to localStorage
  const saveUserApps = (apps: StoreApp[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
    setUserApps(apps);
  };

  const allApps = [...defaultApps, ...userApps];
  const categories = ['All', 'Development', 'Entertainment', 'Social', 'Graphics', 'Productivity', 'Utilities', 'Design', 'Games', 'Communication', 'Community'];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState<'browse' | 'submit' | 'myapps'>('browse');

  const filteredApps = allApps.filter(app => {
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
    
    setTimeout(() => {
      setInstalledApps(prev => [...prev, appId]);
      setInstalling(null);
      toast.success(`${appName} installed successfully!`);
    }, 2000);
  };

  const handleSubmitApp = () => {
    if (!newApp.name.trim() || !newApp.description.trim() || !newApp.author.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const app: StoreApp = {
      id: `user-${Date.now()}`,
      name: newApp.name,
      description: newApp.description,
      category: 'Community',
      rating: 5.0,
      downloads: '0',
      icon: newApp.icon || '📦',
      installed: false,
      isUserCreated: true,
      author: newApp.author
    };

    saveUserApps([...userApps, app]);
    setNewApp({ name: '', description: '', category: 'Utilities', icon: '📦', author: '' });
    setActiveTab('browse');
    toast.success('Your app has been submitted to the store!');
  };

  const handleDeleteApp = (appId: string) => {
    const updated = userApps.filter(a => a.id !== appId);
    saveUserApps(updated);
    toast.success('App removed from store');
  };

  const iconOptions = ['📦', '🎮', '🎵', '📱', '💡', '🔧', '📊', '🎨', '📷', '🎬', '💬', '📝', '🌐', '⚡', '🔒'];

  return (
    <div className="h-full flex flex-col bg-refos-window">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 text-refos-primary" />
            <div>
              <h1 className="text-xl font-semibold text-white">Ref Store</h1>
              <p className="text-white/70 text-sm">Download & share software</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'browse'
                ? 'bg-refos-primary text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Browse Apps
          </button>
          <button
            onClick={() => setActiveTab('submit')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'submit'
                ? 'bg-refos-primary text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <Plus className="w-4 h-4" />
            Submit App
          </button>
          <button
            onClick={() => setActiveTab('myapps')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'myapps'
                ? 'bg-refos-primary text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <User className="w-4 h-4" />
            My Apps
          </button>
        </div>
        
        {activeTab === 'browse' && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search apps..."
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
        )}
      </div>

      {activeTab === 'browse' && (
        <>
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
                        <p className="text-white/50 text-xs">
                          {app.isUserCreated ? `by ${app.author}` : app.category}
                        </p>
                      </div>
                      {app.isUserCreated && (
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                          Community
                        </span>
                      )}
                    </div>
                    
                    <p className="text-white/70 text-sm mb-3 line-clamp-2">{app.description}</p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-white/70 text-xs">{app.rating}</span>
                      </div>
                      <span className="text-white/50 text-xs">{app.downloads} downloads</span>
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
        </>
      )}

      {activeTab === 'submit' && (
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-md mx-auto">
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <Upload className="w-6 h-6 text-refos-primary" />
                <h2 className="text-lg font-semibold text-white">Submit Your App</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-white/70 text-sm mb-1">App Name *</label>
                  <Input
                    value={newApp.name}
                    onChange={(e) => setNewApp({ ...newApp, name: e.target.value })}
                    placeholder="My Awesome App"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-1">Developer Name *</label>
                  <Input
                    value={newApp.author}
                    onChange={(e) => setNewApp({ ...newApp, author: e.target.value })}
                    placeholder="Your name or company"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-1">Description *</label>
                  <textarea
                    value={newApp.description}
                    onChange={(e) => setNewApp({ ...newApp, description: e.target.value })}
                    placeholder="Describe what your app does..."
                    className="w-full h-24 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/50 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Icon</label>
                  <div className="flex flex-wrap gap-2">
                    {iconOptions.map(icon => (
                      <button
                        key={icon}
                        onClick={() => setNewApp({ ...newApp, icon })}
                        className={`w-10 h-10 text-xl rounded-lg border transition-colors ${
                          newApp.icon === icon
                            ? 'border-refos-primary bg-refos-primary/20'
                            : 'border-white/20 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full mt-4"
                  onClick={handleSubmitApp}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Submit to Store
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'myapps' && (
        <div className="flex-1 overflow-auto p-4">
          {userApps.length === 0 ? (
            <div className="text-center text-white/50 py-12">
              <User className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>You haven't submitted any apps yet</p>
              <Button
                className="mt-4"
                variant="outline"
                onClick={() => setActiveTab('submit')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Submit Your First App
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {userApps.map(app => (
                <div
                  key={app.id}
                  className="bg-white/5 rounded-lg p-4 border border-white/10 flex items-center gap-4"
                >
                  <div className="text-3xl">{app.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{app.name}</h3>
                    <p className="text-white/50 text-sm">{app.description}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                    onClick={() => handleDeleteApp(app.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Store;

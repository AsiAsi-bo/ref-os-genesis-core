import React, { useState } from 'react';
import { Globe, Search, ChevronLeft, ChevronRight, RotateCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const WebBrowser: React.FC = () => {
  const [url, setUrl] = useState('https://refsearch.com');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState(['https://refsearch.com']);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  const handleNavigation = () => {
    if (url !== history[historyIndex]) {
      // Add to history if navigating to a new URL
      setHistory([...history.slice(0, historyIndex + 1), url]);
      setHistoryIndex(historyIndex + 1);
    }
    
    // Simulate page loading
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  
  const homePage = (
    <div className="h-full flex flex-col items-center justify-center bg-refos-taskbar p-8">
      <div className="mb-6">
        <div className="text-center">
          <Globe size={48} className="text-refos-primary mx-auto mb-3" />
          <h3 className="text-3xl font-bold text-white">RefSearch</h3>
          <p className="text-white/60 mt-1">Search the Ref OS web</p>
        </div>
      </div>
      
      <div className="w-full max-w-lg mx-auto">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search RefSearch or enter web address"
            className="pr-10 bg-refos-window border-refos-primary/30 focus-visible:ring-refos-primary text-white"
            value={url === 'https://refsearch.com' ? '' : url}
            onChange={(e) => setUrl(e.target.value ? e.target.value : 'https://refsearch.com')}
            onKeyDown={(e) => e.key === 'Enter' && handleNavigation()}
          />
          <Button 
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
            variant="ghost"
            size="icon"
            onClick={handleNavigation}
          >
            <Search size={16} className="text-white/60" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-6 mt-12 w-full max-w-3xl">
        {[
          { name: 'RefDocs', icon: 'file-text', color: 'bg-blue-500/20' },
          { name: 'RefMail', icon: 'mail', color: 'bg-green-500/20' },
          { name: 'RefNews', icon: 'newspaper', color: 'bg-orange-500/20' },
          { name: 'RefMaps', icon: 'map', color: 'bg-purple-500/20' },
          { name: 'RefPhotos', icon: 'image', color: 'bg-pink-500/20' },
          { name: 'RefDrive', icon: 'hard-drive', color: 'bg-yellow-500/20' },
          { name: 'RefShop', icon: 'shopping-bag', color: 'bg-red-500/20' },
          { name: 'RefMeet', icon: 'video', color: 'bg-cyan-500/20' }
        ].map((item, index) => (
          <div key={index} className="text-center">
            <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mx-auto", item.color)}>
              <div className="text-2xl font-semibold text-white">{item.name.charAt(0)}</div>
            </div>
            <div className="mt-2 text-white">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
  
  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setUrl(history[historyIndex - 1]);
      
      // Simulate page loading
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };
  
  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setUrl(history[historyIndex + 1]);
      
      // Simulate page loading
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };
  
  const reload = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };
  
  const goHome = () => {
    setUrl('https://refsearch.com');
    if (history[historyIndex] !== 'https://refsearch.com') {
      setHistory([...history.slice(0, historyIndex + 1), 'https://refsearch.com']);
      setHistoryIndex(historyIndex + 1);
    }
  };
  
  const urlDisplay = () => {
    if (url.startsWith('https://')) {
      return url;
    } else if (url.includes('.')) {
      return 'https://' + url;
    } else {
      return 'https://refsearch.com/search?q=' + encodeURIComponent(url);
    }
  };
  
  return (
    <div className="flex flex-col h-full bg-refos-window">
      {/* Browser toolbar */}
      <div className="flex items-center p-2 bg-refos-taskbar border-b border-refos-window/30">
        <div className="flex space-x-1 mr-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={goBack}
            disabled={historyIndex <= 0}
          >
            <ChevronLeft size={16} className="text-white/60" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={goForward}
            disabled={historyIndex >= history.length - 1}
          >
            <ChevronRight size={16} className="text-white/60" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn("h-8 w-8", isLoading && "animate-spin")}
            onClick={reload}
          >
            <RotateCw size={16} className="text-white/60" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={goHome}
          >
            <Home size={16} className="text-white/60" />
          </Button>
        </div>
        
        <div className="relative flex-1">
          <Input
            type="text"
            className="pr-10 h-8 bg-refos-window border-refos-window/30 focus-visible:ring-refos-primary text-white"
            value={urlDisplay()}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleNavigation()}
          />
          <Button 
            className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
            variant="ghost"
            size="icon"
            onClick={handleNavigation}
          >
            <Search size={14} className="text-white/60" />
          </Button>
        </div>
      </div>
      
      {/* Browser content */}
      <div className="flex-1 overflow-auto">
        {isLoading ? (
          <div className="h-full flex items-center justify-center bg-refos-window">
            <div className="flex flex-col items-center">
              <div className="animate-spin mb-4">
                <Globe size={32} className="text-refos-primary" />
              </div>
              <p className="text-white/60">Loading...</p>
            </div>
          </div>
        ) : (
          url === 'https://refsearch.com' ? homePage : (
            <div className="h-full flex items-center justify-center bg-refos-window">
              <div className="text-center p-8">
                <Globe size={48} className="text-refos-primary mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white">This website is not available in the demo</h3>
                <p className="text-white/60 mt-2">Try using the search engine or go back to the homepage</p>
                <Button 
                  onClick={goHome} 
                  className="mt-4"
                  variant="outline"
                >
                  Return to RefSearch
                </Button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default WebBrowser;

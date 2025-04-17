
import { useState } from 'react';

interface UseNavigationResult {
  url: string;
  setUrl: (url: string) => void;
  history: string[];
  historyIndex: number;
  isLoading: boolean;
  handleNavigation: () => void;
  goBack: () => void;
  goForward: () => void;
  reload: () => void;
  goHome: () => void;
  urlDisplay: () => string;
}

export const useNavigation = (): UseNavigationResult => {
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

  return {
    url,
    setUrl,
    history,
    historyIndex,
    isLoading,
    handleNavigation,
    goBack,
    goForward,
    reload,
    goHome,
    urlDisplay
  };
};

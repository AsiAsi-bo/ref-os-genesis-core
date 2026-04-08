
import React, { useState, useEffect, useRef } from 'react';
import HomePage from './HomePage';
import LoadingPage from './LoadingPage';
import NotFoundPage from './NotFoundPage';
import NewsWebsite from './sites/NewsWebsite';
import SocialWebsite from './sites/SocialWebsite';
import ShoppingWebsite from './sites/ShoppingWebsite';
import WikiWebsite from './sites/WikiWebsite';

interface BrowserContentProps {
  isLoading: boolean;
  url: string;
  onUrlChange: (value: string) => void;
  onNavigate: () => void;
  onReturnHome: () => void;
}

const BrowserContent: React.FC<BrowserContentProps> = ({
  isLoading,
  url,
  onUrlChange,
  onNavigate,
  onReturnHome
}) => {
  const [iframeError, setIframeError] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const prevUrlRef = useRef(url);

  // Reset error state when URL changes
  useEffect(() => {
    if (url !== prevUrlRef.current) {
      setIframeError(false);
      setIframeLoaded(false);
      prevUrlRef.current = url;
    }
  }, [url]);

  if (isLoading) {
    return <LoadingPage />;
  }

  // Handle different URLs
  if (url === 'https://refsearch.com') {
    return <HomePage url={url} onUrlChange={onUrlChange} onNavigate={onNavigate} />;
  }
  
  if (url === 'https://refnews.com' || url === 'refnews.com' || url === 'refnews') {
    return <NewsWebsite />;
  }
  
  if (url === 'https://refsocial.com' || url === 'refsocial.com' || url === 'refsocial') {
    return <SocialWebsite />;
  }
  
  if (url === 'https://refshop.com' || url === 'refshop.com' || url === 'refshop') {
    return <ShoppingWebsite />;
  }
  
  if (url === 'https://refwiki.com' || url === 'refwiki.com' || url === 'refwiki') {
    return <WikiWebsite />;
  }

  // Handle search queries
  if (url.includes('search?q=') || (!url.includes('.') && !url.startsWith('https://'))) {
    return <HomePage url={url} onUrlChange={onUrlChange} onNavigate={onNavigate} />;
  }

  // Normalize URL
  const fullUrl = url.startsWith('http') ? url : `https://${url}`;

  // Check if it's a real external URL
  const isExternalUrl = url.includes('.') && (
    url.startsWith('https://') || 
    url.startsWith('http://') || 
    !url.startsWith('ref')
  );

  if (isExternalUrl) {
    if (iframeError) {
      return (
        <div className="flex flex-col items-center justify-center h-full bg-refos-window text-white p-8">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-xl font-semibold mb-2">Cannot Load This Site</h2>
          <p className="text-white/70 text-center max-w-md mb-4">
            This website doesn't allow embedding. Many sites block iframe access for security reasons.
          </p>
          <p className="text-white/50 text-sm mb-6">
            URL: {fullUrl}
          </p>
          <div className="flex gap-3">
            <button
              onClick={onReturnHome}
              className="px-4 py-2 bg-refos-primary hover:bg-refos-primary/80 rounded text-white"
            >
              Return Home
            </button>
            <a
              href={fullUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-white"
            >
              Open in Real Browser
            </a>
          </div>
        </div>
      );
    }

    return (
      <div className="relative w-full h-full">
        {!iframeLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-refos-window">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-refos-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-white/60 text-sm">Connecting to {new URL(fullUrl).hostname}...</p>
            </div>
          </div>
        )}
        <iframe
          ref={iframeRef}
          key={fullUrl}
          src={fullUrl}
          className="w-full h-full border-0"
          title="External Website"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
          referrerPolicy="no-referrer"
          allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone"
          onError={() => setIframeError(true)}
          onLoad={() => {
            setIframeLoaded(true);
            // Try to detect blocked pages via timing - if content security policy blocks it,
            // the frame may load but be blank
            try {
              const iframe = iframeRef.current;
              if (iframe) {
                // This will throw for cross-origin, which is expected and fine
                const doc = iframe.contentDocument;
                if (doc && doc.body && doc.body.innerHTML === '') {
                  setIframeError(true);
                }
              }
            } catch {
              // Cross-origin - this is expected for real websites, iframe is working
            }
          }}
        />
        {iframeLoaded && (
          <div className="absolute bottom-3 right-3 opacity-0 hover:opacity-100 transition-opacity">
            <a
              href={fullUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-black/70 hover:bg-black/90 rounded text-white text-xs backdrop-blur-sm"
            >
              Open in real browser ↗
            </a>
          </div>
        )}
      </div>
    );
  }

  return <NotFoundPage onReturnHome={onReturnHome} />;
};

export default BrowserContent;

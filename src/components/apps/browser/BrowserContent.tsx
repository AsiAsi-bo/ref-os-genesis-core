
import React, { useState } from 'react';
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

  // Check if it's a real external URL
  const isExternalUrl = url.includes('.') && (
    url.startsWith('https://') || 
    url.startsWith('http://') || 
    !url.startsWith('ref')
  );

  if (isExternalUrl) {
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    
    if (iframeError) {
      return (
        <div className="flex flex-col items-center justify-center h-full bg-refos-window text-white p-8">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-xl font-semibold mb-2">Cannot Load This Site</h2>
          <p className="text-white/70 text-center max-w-md mb-4">
            This website doesn't allow embedding. Many sites like Google, Facebook, and others 
            block iframe access for security reasons.
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
              Open in New Tab
            </a>
          </div>
        </div>
      );
    }

    return (
      <iframe
        src={fullUrl}
        className="w-full h-full border-0"
        title="External Website"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        onError={() => setIframeError(true)}
        onLoad={(e) => {
          // Some sites will load but be blank - we can't easily detect this
          // due to cross-origin restrictions
        }}
      />
    );
  }

  return <NotFoundPage onReturnHome={onReturnHome} />;
};

export default BrowserContent;

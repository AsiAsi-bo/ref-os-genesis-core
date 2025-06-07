
import React from 'react';
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

  return <NotFoundPage onReturnHome={onReturnHome} />;
};

export default BrowserContent;

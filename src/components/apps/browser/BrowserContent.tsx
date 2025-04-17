
import React from 'react';
import HomePage from './HomePage';
import LoadingPage from './LoadingPage';
import NotFoundPage from './NotFoundPage';

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

  if (url === 'https://refsearch.com') {
    return <HomePage url={url} onUrlChange={onUrlChange} onNavigate={onNavigate} />;
  }

  return <NotFoundPage onReturnHome={onReturnHome} />;
};

export default BrowserContent;


import React from 'react';
import NavigationControls from './browser/NavigationControls';
import AddressBar from './browser/AddressBar';
import BrowserContent from './browser/BrowserContent';
import { useNavigation } from './browser/useNavigation';

const WebBrowser: React.FC = () => {
  const {
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
  } = useNavigation();

  return (
    <div className="flex flex-col h-full bg-refos-window">
      {/* Browser toolbar */}
      <div className="flex items-center p-2 bg-refos-taskbar border-b border-refos-window/30">
        <NavigationControls
          onBack={goBack}
          onForward={goForward}
          onReload={reload}
          onHome={goHome}
          canGoBack={historyIndex > 0}
          canGoForward={historyIndex < history.length - 1}
          isLoading={isLoading}
        />
        
        <AddressBar
          url={url}
          onUrlChange={setUrl}
          onNavigate={handleNavigation}
          displayUrl={urlDisplay()}
        />
      </div>
      
      {/* Browser content */}
      <div className="flex-1 overflow-auto">
        <BrowserContent
          isLoading={isLoading}
          url={url}
          onUrlChange={setUrl}
          onNavigate={handleNavigation}
          onReturnHome={goHome}
        />
      </div>
    </div>
  );
};

export default WebBrowser;

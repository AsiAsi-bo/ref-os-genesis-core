
import React, { useState, useRef, useEffect } from 'react';
import { useOS } from '@/context/OSContext';
import { App } from '@/types/app';
import { X, Minus, Maximize, Minimize, Expand } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DraggableWindowProps {
  app: App;
  children: React.ReactNode;
}

const DraggableWindow: React.FC<DraggableWindowProps> = ({ app, children }) => {
  const { closeApp, minimizeApp, focusApp, moveApp, resizeApp, activeAppId } = useOS();
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [previousState, setPreviousState] = useState<{ position: { x: number; y: number }; size: { width: number; height: number } } | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  const isActive = activeAppId === app.id;

  // Handle initial focus
  useEffect(() => {
    if (isActive && windowRef.current) {
      windowRef.current.focus();
    }
  }, [isActive]);

  // Handle mouse down on title bar (for dragging)
  const handleTitleMouseDown = (e: React.MouseEvent) => {
    if (isResizing || isFullscreen) return;
    
    // Only handle left mouse button
    if (e.button !== 0) return;
    
    e.preventDefault();
    focusApp(app.id);
    
    const rect = windowRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Handle resize start
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    if (isFullscreen) return;
    
    // Only handle left mouse button
    if (e.button !== 0) return;
    
    e.preventDefault();
    e.stopPropagation();
    focusApp(app.id);
    
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: app.size.width,
      height: app.size.height
    });
  };

  // Handle fullscreen toggle
  const handleFullscreenToggle = () => {
    if (isFullscreen) {
      // Exit browser fullscreen if active
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      // Restore to previous state
      if (previousState) {
        moveApp(app.id, previousState.position);
        resizeApp(app.id, previousState.size);
      }
      setIsFullscreen(false);
      setPreviousState(null);
    } else {
      // Save current state and go fullscreen
      setPreviousState({
        position: app.position,
        size: app.size
      });
      moveApp(app.id, { x: 0, y: 0 });
      resizeApp(app.id, { width: window.innerWidth, height: window.innerHeight - 48 }); // Account for taskbar
      setIsFullscreen(true);
    }
  };

  // Handle browser fullscreen for games
  const handleBrowserFullscreen = async () => {
    if (!windowRef.current) return;
    
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await windowRef.current.requestFullscreen();
      }
    } catch (error) {
      console.warn('Fullscreen not supported:', error);
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isFullscreen) {
        // Browser exited fullscreen, update our state
        if (previousState) {
          moveApp(app.id, previousState.position);
          resizeApp(app.id, previousState.size);
        }
        setIsFullscreen(false);
        setPreviousState(null);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [isFullscreen, previousState, app.id, moveApp, resizeApp]);

  // Handle mouse move (for both dragging and resizing)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isFullscreen) {
        const newX = Math.max(0, e.clientX - dragOffset.x);
        const newY = Math.max(0, e.clientY - dragOffset.y);
        
        moveApp(app.id, { x: newX, y: newY });
      } else if (isResizing && !isFullscreen) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        
        const newWidth = Math.max(300, resizeStart.width + deltaX);
        const newHeight = Math.max(200, resizeStart.height + deltaY);
        
        resizeApp(app.id, { width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, resizeStart, app.id, moveApp, resizeApp, isFullscreen]);

  // Handle window click (for focus)
  const handleWindowClick = () => {
    if (!isActive) {
      focusApp(app.id);
    }
  };

  if (app.isMinimized) {
    return null;
  }

  return (
    <div
      ref={windowRef}
      className={cn(
        "fixed rounded-lg overflow-hidden shadow-lg animate-window-open",
        "border border-refos-window/20 bg-refos-window text-white",
        isActive ? "ring-1 ring-refos-primary shadow-xl" : "shadow-md",
        isFullscreen && "!rounded-none"
      )}
      style={{
        left: `${app.position.x}px`,
        top: `${app.position.y}px`,
        width: `${app.size.width}px`,
        height: `${app.size.height}px`,
        zIndex: app.zIndex,
      }}
      onClick={handleWindowClick}
      tabIndex={0}
    >
      {/* Window titlebar */}
      <div 
        className={cn(
          "h-9 px-3 flex items-center justify-between",
          "bg-gradient-to-r from-refos-primary to-refos-secondary",
          "cursor-move select-none",
          isFullscreen && "cursor-default"
        )}
        onMouseDown={handleTitleMouseDown}
      >
        <div className="font-medium truncate">{app.title}</div>
        <div className="flex items-center space-x-2">
          <button 
            className="p-1 rounded-sm hover:bg-white/20"
            onClick={() => minimizeApp(app.id)}
          >
            <Minus size={14} />
          </button>
          <button 
            className="p-1 rounded-sm hover:bg-white/20"
            onClick={handleFullscreenToggle}
          >
            {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
          </button>
          {app.name === 'game' && (
            <button 
              className="p-1 rounded-sm hover:bg-white/20"
              onClick={handleBrowserFullscreen}
              title="Browser Fullscreen"
            >
              <Expand size={14} />
            </button>
          )}
          <button 
            className="p-1 rounded-sm hover:bg-white/20"
            onClick={() => closeApp(app.id)}
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Window content */}
      <div className="absolute inset-0 top-9 overflow-auto">
        {children}
      </div>

      {/* Resize handle - hidden in fullscreen */}
      {!isFullscreen && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          onMouseDown={handleResizeMouseDown}
        >
          <svg 
            width="12" 
            height="12" 
            viewBox="0 0 12 12" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-1 right-1"
          >
            <path 
              d="M11 11L1 1M11 1L1 11" 
              stroke="white" 
              strokeOpacity="0.5" 
              strokeWidth="2" 
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default DraggableWindow;

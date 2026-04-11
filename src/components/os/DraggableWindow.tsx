
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

  useEffect(() => {
    if (isActive && windowRef.current) windowRef.current.focus();
  }, [isActive]);

  const handleTitleMouseDown = (e: React.MouseEvent) => {
    if (isResizing || isFullscreen) return;
    if (e.button !== 0) return;
    e.preventDefault();
    focusApp(app.id);
    const rect = windowRef.current?.getBoundingClientRect();
    if (!rect) return;
    setIsDragging(true);
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleTitleTouchStart = (e: React.TouchEvent) => {
    if (isResizing || isFullscreen) return;
    focusApp(app.id);
    const rect = windowRef.current?.getBoundingClientRect();
    if (!rect) return;
    const touch = e.touches[0];
    setIsDragging(true);
    setDragOffset({ x: touch.clientX - rect.left, y: touch.clientY - rect.top });
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    if (isFullscreen) return;
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    focusApp(app.id);
    setIsResizing(true);
    setResizeStart({ x: e.clientX, y: e.clientY, width: app.size.width, height: app.size.height });
  };

  const handleResizeTouchStart = (e: React.TouchEvent) => {
    if (isFullscreen) return;
    e.stopPropagation();
    focusApp(app.id);
    const touch = e.touches[0];
    setIsResizing(true);
    setResizeStart({ x: touch.clientX, y: touch.clientY, width: app.size.width, height: app.size.height });
  };

  const handleFullscreenToggle = () => {
    if (isFullscreen) {
      if (document.fullscreenElement) document.exitFullscreen();
      if (previousState) {
        moveApp(app.id, previousState.position);
        resizeApp(app.id, previousState.size);
      }
      setIsFullscreen(false);
      setPreviousState(null);
    } else {
      setPreviousState({ position: app.position, size: app.size });
      moveApp(app.id, { x: 0, y: 0 });
      resizeApp(app.id, { width: window.innerWidth, height: window.innerHeight - 64 });
      setIsFullscreen(true);
    }
  };

  const handleBrowserFullscreen = async () => {
    if (!windowRef.current) return;
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await windowRef.current.requestFullscreen();
    } catch (error) {
      console.warn('Fullscreen not supported:', error);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isFullscreen) {
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

  useEffect(() => {
    const handleMove = (clientX: number, clientY: number) => {
      if (isDragging && !isFullscreen) {
        moveApp(app.id, { x: Math.max(0, clientX - dragOffset.x), y: Math.max(0, clientY - dragOffset.y) });
      } else if (isResizing && !isFullscreen) {
        resizeApp(app.id, {
          width: Math.max(300, resizeStart.width + clientX - resizeStart.x),
          height: Math.max(200, resizeStart.height + clientY - resizeStart.y),
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => { e.preventDefault(); handleMove(e.touches[0].clientX, e.touches[0].clientY); };
    const handleEnd = () => { setIsDragging(false); setIsResizing(false); };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleEnd);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, isResizing, dragOffset, resizeStart, app.id, moveApp, resizeApp, isFullscreen]);

  if (app.isMinimized) return null;

  return (
    <div
      ref={windowRef}
      className={cn(
        "fixed overflow-hidden animate-window-open",
        isFullscreen ? "rounded-none" : "rounded-xl",
        "glass",
        isActive ? "shadow-2xl ring-1 ring-white/10" : "shadow-lg opacity-95"
      )}
      style={{
        left: `${app.position.x}px`,
        top: `${app.position.y}px`,
        width: `${app.size.width}px`,
        height: `${app.size.height}px`,
        zIndex: app.zIndex,
      }}
      onClick={() => !isActive && focusApp(app.id)}
      tabIndex={0}
    >
      {/* macOS-style titlebar */}
      <div
        className={cn(
          "h-10 px-3 flex items-center gap-3 border-b border-white/[0.06]",
          "bg-white/[0.03] cursor-move select-none",
          isFullscreen && "cursor-default"
        )}
        onMouseDown={handleTitleMouseDown}
        onTouchStart={handleTitleTouchStart}
      >
        {/* Traffic lights */}
        <div className="traffic-lights flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
          <button
            className="traffic-light bg-[#FF5F57] hover:brightness-110"
            onClick={() => closeApp(app.id)}
          >
            <X size={8} strokeWidth={2.5} className="text-[#4a0002]" />
          </button>
          <button
            className="traffic-light bg-[#FEBC2E] hover:brightness-110"
            onClick={() => minimizeApp(app.id)}
          >
            <Minus size={8} strokeWidth={2.5} className="text-[#5a3d00]" />
          </button>
          <button
            className="traffic-light bg-[#28C840] hover:brightness-110"
            onClick={handleFullscreenToggle}
          >
            <Maximize size={7} strokeWidth={2.5} className="text-[#0a4a00]" />
          </button>
          {app.name === 'game' && (
            <button
              className="traffic-light bg-refos-primary/60 hover:bg-refos-primary ml-1"
              onClick={handleBrowserFullscreen}
              title="Browser Fullscreen"
            >
              <Expand size={7} strokeWidth={2.5} className="text-white/80" />
            </button>
          )}
        </div>

        {/* Title - centered */}
        <div className="flex-1 text-center">
          <span className="text-[13px] font-medium text-white/70">{app.title}</span>
        </div>

        {/* Spacer to balance traffic lights */}
        <div className="w-[52px]" />
      </div>

      {/* Window content */}
      <div className="absolute inset-0 top-10 overflow-auto bg-refos-window/90">
        {children}
      </div>

      {/* Resize handle */}
      {!isFullscreen && (
        <div
          className="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize touch-none"
          onMouseDown={handleResizeMouseDown}
          onTouchStart={handleResizeTouchStart}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" className="absolute bottom-1 right-1 text-white/20">
            <line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" strokeWidth="1.5" />
            <line x1="9" y1="5" x2="5" y2="9" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default DraggableWindow;

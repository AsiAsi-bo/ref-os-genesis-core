
import React from 'react';
import { ChevronLeft, ChevronRight, RotateCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavigationControlsProps {
  onBack: () => void;
  onForward: () => void;
  onReload: () => void;
  onHome: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  isLoading: boolean;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({
  onBack,
  onForward,
  onReload,
  onHome,
  canGoBack,
  canGoForward,
  isLoading
}) => {
  return (
    <div className="flex space-x-1 mr-2">
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8"
        onClick={onBack}
        disabled={!canGoBack}
      >
        <ChevronLeft size={16} className="text-white/60" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8"
        onClick={onForward}
        disabled={!canGoForward}
      >
        <ChevronRight size={16} className="text-white/60" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className={cn("h-8 w-8", isLoading && "animate-spin")}
        onClick={onReload}
      >
        <RotateCw size={16} className="text-white/60" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8"
        onClick={onHome}
      >
        <Home size={16} className="text-white/60" />
      </Button>
    </div>
  );
};

export default NavigationControls;

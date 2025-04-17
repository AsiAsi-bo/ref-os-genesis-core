
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AddressBarProps {
  url: string;
  onUrlChange: (url: string) => void;
  onNavigate: () => void;
  displayUrl: string;
}

const AddressBar: React.FC<AddressBarProps> = ({ 
  url, 
  onUrlChange, 
  onNavigate,
  displayUrl 
}) => {
  return (
    <div className="relative flex-1">
      <Input
        type="text"
        className="pr-10 h-8 bg-refos-window border-refos-window/30 focus-visible:ring-refos-primary text-white"
        value={displayUrl}
        onChange={(e) => onUrlChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onNavigate()}
      />
      <Button 
        className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
        variant="ghost"
        size="icon"
        onClick={onNavigate}
      >
        <Search size={14} className="text-white/60" />
      </Button>
    </div>
  );
};

export default AddressBar;

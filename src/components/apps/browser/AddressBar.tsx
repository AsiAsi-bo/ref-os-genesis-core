
import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AddressBarProps {
  url: string;
  onUrlChange: (url: string) => void;
  onNavigate: (customUrl?: string) => void;
  displayUrl: string;
}

const AddressBar: React.FC<AddressBarProps> = ({ 
  url, 
  onUrlChange, 
  onNavigate,
  displayUrl 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [editValue, setEditValue] = useState(url);
  const submitPendingRef = useRef(false);

  useEffect(() => {
    if (!isFocused) {
      setEditValue(url);
    }
  }, [url, isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
    setEditValue(url);
  };

  const handleBlur = () => {
    // Delay blur to allow submit to fire first
    setTimeout(() => {
      if (!submitPendingRef.current) {
        setIsFocused(false);
      }
      submitPendingRef.current = false;
    }, 150);
  };

  const handleSubmit = () => {
    submitPendingRef.current = true;
    const value = editValue.trim();
    if (value) {
      onUrlChange(value);
      onNavigate(value);
    }
    setIsFocused(false);
  };

  return (
    <div className="relative flex-1">
      <Input
        type="text"
        className="pr-10 h-8 bg-refos-window border-refos-window/30 focus-visible:ring-refos-primary text-white"
        value={isFocused ? editValue : displayUrl}
        onChange={(e) => setEditValue(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <Button 
        className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
        variant="ghost"
        size="icon"
        onMouseDown={(e) => e.preventDefault()}
        onClick={handleSubmit}
      >
        <Search size={14} className="text-white/60" />
      </Button>
    </div>
  );
};

export default AddressBar;

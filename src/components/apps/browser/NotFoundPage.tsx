
import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NotFoundPageProps {
  onReturnHome: () => void;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ onReturnHome }) => {
  return (
    <div className="h-full flex items-center justify-center bg-refos-window">
      <div className="text-center p-8">
        <Globe size={48} className="text-refos-primary mx-auto mb-4" />
        <h3 className="text-xl font-medium text-white">This website is not available in the demo</h3>
        <p className="text-white/60 mt-2">Try using the search engine or go back to the homepage</p>
        <Button 
          onClick={onReturnHome} 
          className="mt-4"
          variant="outline"
        >
          Return to RefSearch
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;

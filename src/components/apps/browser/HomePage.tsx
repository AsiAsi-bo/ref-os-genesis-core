
import React from 'react';
import { Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HomePageProps {
  url: string;
  onUrlChange: (value: string) => void;
  onNavigate: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ url, onUrlChange, onNavigate }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-refos-taskbar p-8">
      <div className="mb-6">
        <div className="text-center">
          <Globe size={48} className="text-refos-primary mx-auto mb-3" />
          <h3 className="text-3xl font-bold text-white">RefSearch</h3>
          <p className="text-white/60 mt-1">Search the Ref OS web</p>
        </div>
      </div>
      
      <div className="w-full max-w-lg mx-auto">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search RefSearch or enter web address"
            className="pr-10 bg-refos-window border-refos-primary/30 focus-visible:ring-refos-primary text-white"
            value={url === 'https://refsearch.com' ? '' : url}
            onChange={(e) => onUrlChange(e.target.value ? e.target.value : 'https://refsearch.com')}
            onKeyDown={(e) => e.key === 'Enter' && onNavigate()}
          />
          <Button 
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
            variant="ghost"
            size="icon"
            onClick={onNavigate}
          >
            <Globe size={16} className="text-white/60" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-6 mt-12 w-full max-w-3xl">
        {[
          { name: 'RefDocs', icon: 'file-text', color: 'bg-blue-500/20' },
          { name: 'RefMail', icon: 'mail', color: 'bg-green-500/20' },
          { name: 'RefNews', icon: 'newspaper', color: 'bg-orange-500/20' },
          { name: 'RefMaps', icon: 'map', color: 'bg-purple-500/20' },
          { name: 'RefPhotos', icon: 'image', color: 'bg-pink-500/20' },
          { name: 'RefDrive', icon: 'hard-drive', color: 'bg-yellow-500/20' },
          { name: 'RefShop', icon: 'shopping-bag', color: 'bg-red-500/20' },
          { name: 'RefMeet', icon: 'video', color: 'bg-cyan-500/20' }
        ].map((item, index) => (
          <div key={index} className="text-center">
            <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mx-auto", item.color)}>
              <div className="text-2xl font-semibold text-white">{item.name.charAt(0)}</div>
            </div>
            <div className="mt-2 text-white">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

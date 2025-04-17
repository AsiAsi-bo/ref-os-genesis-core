
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Save, FileText } from 'lucide-react';

const Notepad: React.FC = () => {
  const [text, setText] = useState('Welcome to Ref OS Notepad!\n\nThis is a simple text editor for your virtual operating system.\n\nFeel free to type your notes here!');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="h-10 bg-refos-window/80 border-b border-white/10 flex items-center px-2">
        <Button variant="ghost" size="sm" className="h-8 text-white/80 hover:text-white hover:bg-white/10">
          <Save size={16} className="mr-1" />
          Save
        </Button>
      </div>

      {/* Editor */}
      <textarea
        className="flex-1 bg-refos-window p-4 outline-none resize-none text-white"
        value={text}
        onChange={handleChange}
        spellCheck="false"
      />
    </div>
  );
};

export default Notepad;

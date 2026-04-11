
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Save, FileText, FolderOpen, File, Plus } from 'lucide-react';
import { fileSystem, FileData } from '@/utils/fileSystem';
import { useToast } from '@/hooks/use-toast';

const Notepad: React.FC = () => {
  const [text, setText] = useState('Welcome to Ref OS Notepad!\n\nThis is a simple text editor for your virtual operating system.\n\nFeel free to type your notes here!');
  const [currentFile, setCurrentFile] = useState<FileData | null>(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showOpenDialog, setShowOpenDialog] = useState(false);
  const [fileName, setFileName] = useState('Untitled.txt');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (currentFile) {
      setHasUnsavedChanges(text !== currentFile.content);
    } else {
      setHasUnsavedChanges(text !== 'Welcome to Ref OS Notepad!\n\nThis is a simple text editor for your virtual operating system.\n\nFeel free to type your notes here!');
    }
  }, [text, currentFile]);

  useEffect(() => {
    const openFileData = sessionStorage.getItem('openFile');
    if (openFileData) {
      try {
        const fileToOpen = JSON.parse(openFileData);
        handleOpenFile(fileToOpen);
        sessionStorage.removeItem('openFile');
      } catch (error) {
        console.error('Error opening file from File Explorer:', error);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value);

  const handleNewFile = () => {
    if (hasUnsavedChanges && !window.confirm('You have unsaved changes. Create a new file?')) return;
    setText('');
    setCurrentFile(null);
    setFileName('Untitled.txt');
    setHasUnsavedChanges(false);
  };

  const handleSave = () => {
    if (currentFile) {
      const updatedFile = fileSystem.saveFile(currentFile.name, text, currentFile.id);
      setCurrentFile(updatedFile);
      setHasUnsavedChanges(false);
      toast({ title: "File saved", description: `${updatedFile.name} has been saved.` });
    } else {
      setShowSaveDialog(true);
    }
  };

  const handleSaveConfirm = () => {
    if (!fileName.trim()) {
      toast({ title: "Error", description: "Please enter a valid file name.", variant: "destructive" });
      return;
    }
    const savedFile = fileSystem.saveFile(fileName, text);
    setCurrentFile(savedFile);
    setHasUnsavedChanges(false);
    setShowSaveDialog(false);
    toast({ title: "File saved", description: `${savedFile.name} has been saved.` });
  };

  const handleOpen = () => {
    if (hasUnsavedChanges && !window.confirm('You have unsaved changes. Open another file?')) return;
    setShowOpenDialog(true);
  };

  const handleOpenFile = (file: FileData) => {
    setText(file.content);
    setCurrentFile(file);
    setHasUnsavedChanges(false);
    setShowOpenDialog(false);
    toast({ title: "File opened", description: `${file.name} has been opened.` });
  };

  const allFiles = fileSystem.getAllFiles();

  return (
    <>
      <div className="h-full flex flex-col bg-refos-window">
        {/* Toolbar */}
        <div className="h-10 border-b border-white/[0.06] flex items-center px-3 gap-1 bg-white/[0.02]">
          <button onClick={handleNewFile} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[12px] text-white/60 hover:text-white hover:bg-white/[0.06] transition-all">
            <Plus size={14} /> New
          </button>
          <button onClick={handleOpen} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[12px] text-white/60 hover:text-white hover:bg-white/[0.06] transition-all">
            <FolderOpen size={14} /> Open
          </button>
          <button onClick={handleSave} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[12px] text-white/60 hover:text-white hover:bg-white/[0.06] transition-all">
            <Save size={14} /> Save{hasUnsavedChanges && '*'}
          </button>
          <div className="ml-auto text-[11px] text-white/30">
            {currentFile ? currentFile.name : fileName}{hasUnsavedChanges && ' · Edited'}
          </div>
        </div>

        {/* Editor */}
        <textarea
          className="flex-1 bg-transparent p-5 outline-none resize-none text-white/90 font-mono text-sm leading-relaxed placeholder:text-white/20"
          value={text}
          onChange={handleChange}
          spellCheck="false"
          placeholder="Start typing..."
        />
      </div>

      {/* Save Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="glass border-white/[0.08] text-white">
          <DialogHeader>
            <DialogTitle className="text-white font-medium">Save File</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-white/40 block mb-2">File name</label>
              <Input
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="bg-white/[0.06] border-white/[0.08] text-white rounded-xl"
                placeholder="Enter file name..."
                onKeyDown={(e) => e.key === 'Enter' && handleSaveConfirm()}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" onClick={() => setShowSaveDialog(false)} className="text-white/60 hover:text-white rounded-xl">Cancel</Button>
              <Button onClick={handleSaveConfirm} className="bg-refos-primary hover:bg-refos-primary/80 text-white rounded-xl">Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Open Dialog */}
      <Dialog open={showOpenDialog} onOpenChange={setShowOpenDialog}>
        <DialogContent className="glass border-white/[0.08] text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white font-medium">Open File</DialogTitle>
          </DialogHeader>
          <div className="space-y-1 max-h-64 overflow-y-auto">
            {allFiles.length === 0 ? (
              <div className="text-white/30 text-center py-8 text-sm">No saved files found</div>
            ) : (
              allFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center p-3 rounded-xl hover:bg-white/[0.06] cursor-pointer transition-colors"
                  onClick={() => handleOpenFile(file)}
                >
                  <FileText size={16} className="text-refos-primary/60 mr-3" />
                  <div className="flex-1">
                    <div className="text-white/80 text-sm">{file.name}</div>
                    <div className="text-white/30 text-xs">{file.size} · {file.modified}</div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="flex justify-end">
            <Button variant="ghost" onClick={() => setShowOpenDialog(false)} className="text-white/60 hover:text-white rounded-xl">Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Notepad;

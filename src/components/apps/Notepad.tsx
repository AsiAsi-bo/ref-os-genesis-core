
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
    // Check if content changed from saved version
    if (currentFile) {
      setHasUnsavedChanges(text !== currentFile.content);
    } else {
      setHasUnsavedChanges(text !== 'Welcome to Ref OS Notepad!\n\nThis is a simple text editor for your virtual operating system.\n\nFeel free to type your notes here!');
    }
  }, [text, currentFile]);

  // Check for file to open from File Explorer
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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleNewFile = () => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm('You have unsaved changes. Are you sure you want to create a new file?');
      if (!confirmed) return;
    }
    setText('');
    setCurrentFile(null);
    setFileName('Untitled.txt');
    setHasUnsavedChanges(false);
  };

  const handleSave = () => {
    if (currentFile) {
      // Save existing file
      const updatedFile = fileSystem.saveFile(currentFile.name, text, currentFile.id);
      setCurrentFile(updatedFile);
      setHasUnsavedChanges(false);
      toast({
        title: "File saved",
        description: `${updatedFile.name} has been saved successfully.`,
      });
    } else {
      // Save as new file
      setShowSaveDialog(true);
    }
  };

  const handleSaveAs = () => {
    setFileName(currentFile?.name || 'Untitled.txt');
    setShowSaveDialog(true);
  };

  const handleSaveConfirm = () => {
    if (!fileName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid file name.",
        variant: "destructive",
      });
      return;
    }

    const savedFile = fileSystem.saveFile(fileName, text);
    setCurrentFile(savedFile);
    setHasUnsavedChanges(false);
    setShowSaveDialog(false);
    toast({
      title: "File saved",
      description: `${savedFile.name} has been saved successfully.`,
    });
  };

  const handleOpen = () => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm('You have unsaved changes. Are you sure you want to open another file?');
      if (!confirmed) return;
    }
    setShowOpenDialog(true);
  };

  const handleOpenFile = (file: FileData) => {
    setText(file.content);
    setCurrentFile(file);
    setHasUnsavedChanges(false);
    setShowOpenDialog(false);
    toast({
      title: "File opened",
      description: `${file.name} has been opened.`,
    });
  };

  const allFiles = fileSystem.getAllFiles();

  return (
    <>
      <div className="h-full flex flex-col">
        {/* Toolbar */}
        <div className="h-10 bg-refos-window/80 border-b border-white/10 flex items-center px-2 gap-1">
          <Button variant="ghost" size="sm" className="h-8 text-white/80 hover:text-white hover:bg-white/10" onClick={handleNewFile}>
            <Plus size={16} className="mr-1" />
            New
          </Button>
          <Button variant="ghost" size="sm" className="h-8 text-white/80 hover:text-white hover:bg-white/10" onClick={handleOpen}>
            <FolderOpen size={16} className="mr-1" />
            Open
          </Button>
          <Button variant="ghost" size="sm" className="h-8 text-white/80 hover:text-white hover:bg-white/10" onClick={handleSave}>
            <Save size={16} className="mr-1" />
            Save{hasUnsavedChanges && '*'}
          </Button>
          <div className="ml-auto text-xs text-white/60">
            {currentFile ? currentFile.name : fileName}{hasUnsavedChanges && ' (unsaved)'}
          </div>
        </div>

        {/* Editor */}
        <textarea
          className="flex-1 bg-refos-window p-4 outline-none resize-none text-white font-mono text-sm leading-relaxed"
          value={text}
          onChange={handleChange}
          spellCheck="false"
          placeholder="Start typing your document..."
        />
      </div>

      {/* Save Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="bg-refos-window border border-white/20">
          <DialogHeader>
            <DialogTitle className="text-white">Save File</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-white/80 block mb-2">File name:</label>
              <Input
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
                placeholder="Enter file name..."
                onKeyDown={(e) => e.key === 'Enter' && handleSaveConfirm()}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" onClick={() => setShowSaveDialog(false)} className="text-white/80 hover:text-white">
                Cancel
              </Button>
              <Button onClick={handleSaveConfirm} className="bg-blue-600 hover:bg-blue-700 text-white">
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Open Dialog */}
      <Dialog open={showOpenDialog} onOpenChange={setShowOpenDialog}>
        <DialogContent className="bg-refos-window border border-white/20 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Open File</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {allFiles.length === 0 ? (
              <div className="text-white/60 text-center py-4">
                No saved files found
              </div>
            ) : (
              allFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center p-2 rounded hover:bg-white/10 cursor-pointer"
                  onClick={() => handleOpenFile(file)}
                >
                  <FileText size={16} className="text-blue-400 mr-2" />
                  <div className="flex-1">
                    <div className="text-white text-sm">{file.name}</div>
                    <div className="text-white/60 text-xs">
                      {file.size} • Modified {file.modified}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="flex justify-end">
            <Button variant="ghost" onClick={() => setShowOpenDialog(false)} className="text-white/80 hover:text-white">
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Notepad;

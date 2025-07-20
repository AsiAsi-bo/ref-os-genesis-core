
import React, { useState, useEffect } from 'react';
import { Folder, FileText, Image, File, ChevronRight, ChevronDown, Trash2, Edit2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fileSystem, FileData } from '@/utils/fileSystem';
import { useOS } from '@/context/OSContext';

const FileExplorer: React.FC = () => {
  const { openApp } = useOS();
  const [files, setFiles] = useState<FileData[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [renameId, setRenameId] = useState<string | null>(null);
  const [renameName, setRenameName] = useState('');

  // Load files on mount and set up refresh interval
  useEffect(() => {
    const loadFiles = () => {
      setFiles(fileSystem.getAllFiles());
    };
    
    loadFiles();
    
    // Refresh files every second to catch changes from other apps
    const interval = setInterval(loadFiles, 1000);
    return () => clearInterval(interval);
  }, []);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'text': return <FileText size={18} className="text-blue-400" />;
      case 'image': return <Image size={18} className="text-green-400" />;
      default: return <File size={18} className="text-gray-400" />;
    }
  };

  const handleFileOpen = (file: FileData) => {
    if (file.type === 'text') {
      // Open file in Notepad
      openApp('notepad');
      // Store the file to be opened in sessionStorage for Notepad to pick up
      sessionStorage.setItem('openFile', JSON.stringify(file));
    }
  };

  const handleFileDelete = (fileId: string) => {
    if (confirm('Are you sure you want to delete this file?')) {
      fileSystem.deleteFile(fileId);
      setFiles(fileSystem.getAllFiles());
    }
  };

  const handleRename = (fileId: string, currentName: string) => {
    setRenameId(fileId);
    setRenameName(currentName);
  };

  const confirmRename = (fileId: string) => {
    if (renameName.trim()) {
      fileSystem.renameFile(fileId, renameName.trim());
      setFiles(fileSystem.getAllFiles());
    }
    setRenameId(null);
    setRenameName('');
  };

  const cancelRename = () => {
    setRenameId(null);
    setRenameName('');
  };

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-1/4 min-w-[200px] border-r border-white/10 overflow-y-auto">
        <div className="p-2">
          <div className="font-medium text-white/80 px-2 py-1 text-sm">My Files</div>
          <div className="mt-1">
            <div className="flex items-center px-2 py-1 text-sm text-white/70">
              <Folder size={16} className="mr-2 text-yellow-400" />
              Documents ({files.length} files)
            </div>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white/90">Documents</h2>
          <p className="text-sm text-white/60">{files.length} items</p>
        </div>
        
        {files.length === 0 ? (
          <div className="text-center text-white/50 mt-8">
            <FileText size={48} className="mx-auto mb-4" />
            <p>No files found</p>
            <p className="text-xs mt-2">Create files using Notepad to see them here</p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
            {files.map(file => (
              <div 
                key={file.id}
                className={cn(
                  "flex flex-col p-3 rounded-md border border-white/10 cursor-pointer transition-colors group",
                  selectedFile === file.id ? "bg-white/20" : "hover:bg-white/10"
                )}
                onClick={() => setSelectedFile(file.id)}
                onDoubleClick={() => handleFileOpen(file)}
              >
                <div className="flex justify-between items-start mb-2">
                  {getFileIcon(file.type)}
                  <div className="opacity-0 group-hover:opacity-100 flex gap-1">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRename(file.id, file.name);
                      }}
                      className="p-1 rounded hover:bg-white/20"
                      title="Rename"
                    >
                      <Edit2 size={12} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFileDelete(file.id);
                      }}
                      className="p-1 rounded hover:bg-white/20 text-red-400"
                      title="Delete"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
                
                {renameId === file.id ? (
                  <input
                    type="text"
                    value={renameName}
                    onChange={(e) => setRenameName(e.target.value)}
                    onBlur={() => confirmRename(file.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') confirmRename(file.id);
                      if (e.key === 'Escape') cancelRename();
                    }}
                    className="bg-white/10 text-white text-xs px-1 py-0.5 rounded"
                    autoFocus
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <span className="text-xs text-center truncate w-full mb-1">{file.name}</span>
                )}
                
                <div className="text-xs text-white/50 text-center">
                  <div>{file.size}</div>
                  <div>{file.modified}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {files.length > 0 && (
          <div className="mt-6 text-xs text-white/50">
            Double-click to open files • Right-click or hover for more options
          </div>
        )}
      </div>
    </div>
  );
};

export default FileExplorer;

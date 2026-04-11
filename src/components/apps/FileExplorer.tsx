
import React, { useState, useEffect } from 'react';
import { Folder, FileText, Image, File, Trash2, Edit2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fileSystem, FileData } from '@/utils/fileSystem';
import { useOS } from '@/context/OSContext';

const FileExplorer: React.FC = () => {
  const { openApp } = useOS();
  const [files, setFiles] = useState<FileData[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [renameId, setRenameId] = useState<string | null>(null);
  const [renameName, setRenameName] = useState('');

  useEffect(() => {
    const loadFiles = () => setFiles(fileSystem.getAllFiles());
    loadFiles();
    const interval = setInterval(loadFiles, 1000);
    return () => clearInterval(interval);
  }, []);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'text': return <FileText size={20} className="text-refos-primary/60" />;
      case 'image': return <Image size={20} className="text-emerald-400/60" />;
      default: return <File size={20} className="text-white/30" />;
    }
  };

  const handleFileOpen = (file: FileData) => {
    if (file.type === 'text') {
      openApp('notepad');
      sessionStorage.setItem('openFile', JSON.stringify(file));
    }
  };

  const handleFileDelete = (fileId: string) => {
    if (confirm('Delete this file?')) {
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

  return (
    <div className="h-full flex bg-refos-window">
      {/* Sidebar */}
      <div className="w-48 border-r border-white/[0.06] p-3 bg-white/[0.02]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.06] text-white/80 text-sm">
            <Folder size={16} className="text-refos-primary/60" />
            <span>Documents</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5">
        <div className="mb-5">
          <h2 className="text-base font-medium text-white/80">Documents</h2>
          <p className="text-xs text-white/30">{files.length} items</p>
        </div>

        {files.length === 0 ? (
          <div className="text-center text-white/20 mt-16">
            <FileText size={40} className="mx-auto mb-3" />
            <p className="text-sm">No files yet</p>
            <p className="text-xs mt-1">Create files using Notepad</p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3">
            {files.map(file => (
              <div
                key={file.id}
                className={cn(
                  "flex flex-col p-4 rounded-2xl border cursor-pointer transition-all group",
                  selectedFile === file.id
                    ? "bg-refos-primary/10 border-refos-primary/20"
                    : "border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08]"
                )}
                onClick={() => setSelectedFile(file.id)}
                onDoubleClick={() => handleFileOpen(file)}
              >
                <div className="flex justify-between items-start mb-3">
                  {getFileIcon(file.type)}
                  <div className="opacity-0 group-hover:opacity-100 flex gap-0.5 transition-opacity">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleRename(file.id, file.name); }}
                      className="p-1 rounded-lg hover:bg-white/10"
                    >
                      <Edit2 size={11} className="text-white/40" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleFileDelete(file.id); }}
                      className="p-1 rounded-lg hover:bg-white/10"
                    >
                      <Trash2 size={11} className="text-red-400/60" />
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
                      if (e.key === 'Escape') { setRenameId(null); setRenameName(''); }
                    }}
                    className="bg-white/[0.06] text-white text-xs px-2 py-1 rounded-lg"
                    autoFocus
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <span className="text-xs text-white/70 truncate w-full">{file.name}</span>
                )}

                <div className="text-[10px] text-white/20 mt-1">
                  {file.size} · {file.modified}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileExplorer;

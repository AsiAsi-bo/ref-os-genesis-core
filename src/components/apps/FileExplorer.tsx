
import React, { useState } from 'react';
import { Folder, FileText, Image, File, ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder' | 'image' | 'text';
  children?: FileItem[];
  size?: string;
  modified?: string;
}

const FileExplorer: React.FC = () => {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'documents': true
  });

  const fileSystem: FileItem[] = [
    {
      id: 'documents',
      name: 'Documents',
      type: 'folder',
      children: [
        { id: 'doc1', name: 'Welcome.txt', type: 'text', size: '2 KB', modified: '1 hour ago' },
        { id: 'doc2', name: 'Report.txt', type: 'text', size: '15 KB', modified: '2 days ago' },
        {
          id: 'project',
          name: 'Project',
          type: 'folder',
          children: [
            { id: 'notes', name: 'Notes.txt', type: 'text', size: '4 KB', modified: '3 days ago' },
            { id: 'plan', name: 'Plan.txt', type: 'text', size: '8 KB', modified: '5 days ago' }
          ]
        }
      ]
    },
    {
      id: 'pictures',
      name: 'Pictures',
      type: 'folder',
      children: [
        { id: 'pic1', name: 'Vacation.jpg', type: 'image', size: '2.4 MB', modified: '2 weeks ago' },
        { id: 'pic2', name: 'Profile.jpg', type: 'image', size: '1.2 MB', modified: '1 month ago' }
      ]
    },
    {
      id: 'downloads',
      name: 'Downloads',
      type: 'folder',
      children: [
        { id: 'dl1', name: 'Setup.exe', type: 'file', size: '15.7 MB', modified: '2 days ago' },
        { id: 'dl2', name: 'Manual.pdf', type: 'file', size: '3.2 MB', modified: '3 days ago' }
      ]
    }
  ];

  const toggleFolder = (id: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'folder': return <Folder size={18} className="text-yellow-400" />;
      case 'text': return <FileText size={18} className="text-blue-400" />;
      case 'image': return <Image size={18} className="text-green-400" />;
      default: return <File size={18} className="text-gray-400" />;
    }
  };

  const renderFileItem = (item: FileItem, depth = 0) => {
    const isExpanded = expandedFolders[item.id];
    const hasChildren = item.children && item.children.length > 0;
    
    return (
      <div key={item.id}>
        <div 
          className={cn(
            "flex items-center px-2 py-1 hover:bg-white/10 cursor-pointer",
            depth > 0 && `pl-${depth * 4 + 2}`
          )}
          style={{ paddingLeft: depth * 16 + 8 }}
          onClick={() => item.type === 'folder' && toggleFolder(item.id)}
        >
          {item.type === 'folder' && hasChildren ? (
            isExpanded ? <ChevronDown size={16} className="mr-1" /> : <ChevronRight size={16} className="mr-1" />
          ) : (
            <span className="w-4 mr-1"></span>
          )}
          {getFileIcon(item.type)}
          <span className="ml-2 text-sm truncate">{item.name}</span>
        </div>
        
        {isExpanded && hasChildren && (
          <div>
            {item.children!.map(child => renderFileItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-1/4 min-w-[150px] border-r border-white/10 overflow-y-auto">
        <div className="p-2">
          <div className="font-medium text-white/80 px-2 py-1 text-sm">Quick Access</div>
          <div className="mt-1">
            {fileSystem.map(item => renderFileItem(item))}
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4">
          {expandedFolders['documents'] && fileSystem[0].children?.map(item => (
            <div 
              key={item.id}
              className="flex flex-col items-center p-2 rounded-md hover:bg-white/10 cursor-pointer"
            >
              {getFileIcon(item.type)}
              <span className="mt-1 text-xs text-center truncate w-full">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;

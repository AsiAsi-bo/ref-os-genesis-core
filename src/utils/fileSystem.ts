export interface FileData {
  id: string;
  name: string;
  content: string;
  type: 'text' | 'file';
  size: string;
  modified: string;
  created: string;
}

class FileSystemManager {
  private static instance: FileSystemManager;
  private readonly STORAGE_KEY = 'refos_filesystem';

  static getInstance(): FileSystemManager {
    if (!FileSystemManager.instance) {
      FileSystemManager.instance = new FileSystemManager();
    }
    return FileSystemManager.instance;
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  private getFilesFromStorage(): FileData[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveFilesToStorage(files: FileData[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(files));
  }

  private formatFileSize(content: string): string {
    const bytes = new Blob([content]).size;
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  getAllFiles(): FileData[] {
    return this.getFilesFromStorage();
  }

  getFile(id: string): FileData | null {
    const files = this.getFilesFromStorage();
    return files.find(file => file.id === id) || null;
  }

  saveFile(name: string, content: string, existingId?: string): FileData {
    const files = this.getFilesFromStorage();
    const now = new Date().toLocaleString();
    
    if (existingId) {
      // Update existing file
      const fileIndex = files.findIndex(f => f.id === existingId);
      if (fileIndex !== -1) {
        files[fileIndex] = {
          ...files[fileIndex],
          name,
          content,
          size: this.formatFileSize(content),
          modified: now
        };
        this.saveFilesToStorage(files);
        return files[fileIndex];
      }
    }

    // Create new file
    const newFile: FileData = {
      id: this.generateId(),
      name,
      content,
      type: 'text',
      size: this.formatFileSize(content),
      modified: now,
      created: now
    };

    files.push(newFile);
    this.saveFilesToStorage(files);
    return newFile;
  }

  deleteFile(id: string): boolean {
    const files = this.getFilesFromStorage();
    const filteredFiles = files.filter(file => file.id !== id);
    
    if (filteredFiles.length !== files.length) {
      this.saveFilesToStorage(filteredFiles);
      return true;
    }
    return false;
  }

  renameFile(id: string, newName: string): boolean {
    const files = this.getFilesFromStorage();
    const fileIndex = files.findIndex(f => f.id === id);
    
    if (fileIndex !== -1) {
      files[fileIndex].name = newName;
      files[fileIndex].modified = new Date().toLocaleString();
      this.saveFilesToStorage(files);
      return true;
    }
    return false;
  }
}

export const fileSystem = FileSystemManager.getInstance();
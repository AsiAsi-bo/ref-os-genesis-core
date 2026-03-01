import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Download, CheckCircle, RefreshCw, Shield, Cpu, Package, AlertCircle } from 'lucide-react';

interface Update {
  id: string;
  name: string;
  version: string;
  size: string;
  category: 'system' | 'security' | 'app' | 'driver';
  description: string;
  date: string;
  critical: boolean;
}

const CURRENT_VERSION = '1.2.0';

const availableUpdates: Update[] = [
  {
    id: 'sys-001',
    name: 'Ref OS Core Update',
    version: '1.2.1',
    size: '245 MB',
    category: 'system',
    description: 'Performance improvements, bug fixes, and new desktop features.',
    date: '2026-03-01',
    critical: true
  },
  {
    id: 'sec-001',
    name: 'Security Patch KB20260301',
    version: '3.1.0',
    size: '18 MB',
    category: 'security',
    description: 'Critical security updates for system protection.',
    date: '2026-02-28',
    critical: true
  },
  {
    id: 'app-001',
    name: 'Ref Store Update',
    version: '2.1.0',
    size: '32 MB',
    category: 'app',
    description: 'New app submission features and improved download management.',
    date: '2026-02-27',
    critical: false
  },
  {
    id: 'app-002',
    name: 'RefMovies Update',
    version: '1.5.0',
    size: '15 MB',
    category: 'app',
    description: 'Improved streaming quality and new content library.',
    date: '2026-02-25',
    critical: false
  },
  {
    id: 'drv-001',
    name: 'Display Driver Update',
    version: '4.0.2',
    size: '56 MB',
    category: 'driver',
    description: 'Updated display drivers for better rendering performance.',
    date: '2026-02-24',
    critical: false
  }
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'system': return <Cpu className="h-5 w-5 text-blue-400" />;
    case 'security': return <Shield className="h-5 w-5 text-red-400" />;
    case 'app': return <Package className="h-5 w-5 text-green-400" />;
    case 'driver': return <Cpu className="h-5 w-5 text-yellow-400" />;
    default: return <Package className="h-5 w-5" />;
  }
};

const UpdateCenter: React.FC = () => {
  const [installedUpdates, setInstalledUpdates] = useState<string[]>(() => {
    const saved = localStorage.getItem('refos-installed-updates');
    return saved ? JSON.parse(saved) : [];
  });
  const [installing, setInstalling] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [checking, setChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState<string>(() => {
    return localStorage.getItem('refos-last-update-check') || 'Never';
  });

  const pendingUpdates = availableUpdates.filter(u => !installedUpdates.includes(u.id));
  const completedUpdates = availableUpdates.filter(u => installedUpdates.includes(u.id));

  const checkForUpdates = () => {
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      const now = new Date().toLocaleString();
      setLastChecked(now);
      localStorage.setItem('refos-last-update-check', now);
    }, 2000);
  };

  const installUpdate = (update: Update) => {
    setInstalling(update.id);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          const newInstalled = [...installedUpdates, update.id];
          setInstalledUpdates(newInstalled);
          localStorage.setItem('refos-installed-updates', JSON.stringify(newInstalled));
          setInstalling(null);
          return 0;
        }
        return prev + Math.random() * 15;
      });
    }, 300);
  };

  const installAll = () => {
    if (pendingUpdates.length === 0) return;
    installUpdate(pendingUpdates[0]);
  };

  // Chain installs when one finishes during "install all"
  useEffect(() => {
    // Auto-install next pending after one finishes (if triggered by install all)
  }, [installedUpdates]);

  return (
    <div className="h-full flex flex-col bg-refos-window text-white">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Download className="h-6 w-6 text-refos-primary" />
            <div>
              <h2 className="text-lg font-semibold">Update Center</h2>
              <p className="text-xs text-white/60">Ref OS {CURRENT_VERSION} • Last checked: {lastChecked}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={checkForUpdates}
            disabled={checking}
            className="text-white border-white/20 hover:bg-white/10 hover:text-white"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${checking ? 'animate-spin' : ''}`} />
            {checking ? 'Checking...' : 'Check for updates'}
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Status Banner */}
        {pendingUpdates.length > 0 ? (
          <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
              <span className="text-sm">{pendingUpdates.length} update{pendingUpdates.length !== 1 ? 's' : ''} available</span>
            </div>
            <Button 
              size="sm" 
              onClick={installAll}
              disabled={installing !== null}
              className="bg-refos-primary hover:bg-refos-primary/80"
            >
              Install All
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <span className="text-sm">Your system is up to date!</span>
          </div>
        )}

        {/* Pending Updates */}
        {pendingUpdates.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-white/70 mb-2">Available Updates</h3>
            <div className="space-y-2">
              {pendingUpdates.map(update => (
                <Card key={update.id} className="bg-white/5 border-white/10">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {getCategoryIcon(update.category)}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-white">{update.name}</span>
                            {update.critical && (
                              <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded">Critical</span>
                            )}
                          </div>
                          <p className="text-xs text-white/60 mt-0.5">{update.description}</p>
                          <p className="text-[10px] text-white/40 mt-1">v{update.version} • {update.size} • {update.date}</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => installUpdate(update)}
                        disabled={installing !== null}
                        className="text-white border-white/20 hover:bg-white/10 hover:text-white text-xs"
                      >
                        {installing === update.id ? 'Installing...' : 'Install'}
                      </Button>
                    </div>
                    {installing === update.id && (
                      <div className="mt-3">
                        <Progress value={Math.min(progress, 100)} className="h-1.5" />
                        <p className="text-[10px] text-white/50 mt-1">Installing... {Math.min(Math.round(progress), 100)}%</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Installed Updates */}
        {completedUpdates.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-white/70 mb-2">Installed Updates</h3>
            <div className="space-y-2">
              {completedUpdates.map(update => (
                <Card key={update.id} className="bg-white/5 border-white/10 opacity-70">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <div>
                        <span className="text-sm text-white">{update.name}</span>
                        <p className="text-[10px] text-white/40">v{update.version} • Installed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateCenter;

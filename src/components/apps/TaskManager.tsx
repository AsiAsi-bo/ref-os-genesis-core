import React, { useState, useEffect } from 'react';
import { useOS } from '@/context/OSContext';
import { Cpu, HardDrive, Activity, X, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const TaskManager: React.FC = () => {
  const { apps, closeApp } = useOS();
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [activeTab, setActiveTab] = useState<'processes' | 'performance'>('processes');

  // Simulate CPU and memory usage
  useEffect(() => {
    const interval = setInterval(() => {
      const baseUsage = apps.filter(a => a.isOpen && !a.isMinimized).length * 8;
      setCpuUsage(Math.min(100, baseUsage + Math.random() * 15));
      setMemoryUsage(Math.min(100, 30 + apps.filter(a => a.isOpen).length * 5 + Math.random() * 10));
    }, 1000);
    return () => clearInterval(interval);
  }, [apps]);

  const runningApps = apps.filter(app => app.isOpen);

  const handleEndTask = (appId: string, appName: string) => {
    closeApp(appId);
    toast.success(`${appName} has been terminated`);
  };

  const getAppMemory = (appName: string) => {
    const memoryMap: Record<string, number> = {
      browser: 180,
      movie: 150,
      game: 200,
      refy: 120,
      store: 90,
      terminal: 40,
      notepad: 25,
      calculator: 15,
      calendar: 35,
      weather: 45,
      fileexplorer: 55,
      settings: 30,
      email: 60,
      taskmanager: 20,
    };
    return memoryMap[appName] || 50;
  };

  const getAppCpu = (appName: string, isMinimized: boolean) => {
    if (isMinimized) return Math.random() * 2;
    const cpuMap: Record<string, number> = {
      browser: 8,
      movie: 12,
      game: 25,
      refy: 5,
      store: 3,
      terminal: 2,
      notepad: 1,
      calculator: 1,
      calendar: 2,
      weather: 3,
      fileexplorer: 2,
      settings: 2,
      email: 3,
      taskmanager: 1,
    };
    return (cpuMap[appName] || 3) + Math.random() * 3;
  };

  return (
    <div className="h-full flex flex-col bg-refos-window">
      {/* Header */}
      <div className="p-3 border-b border-white/10">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-5 h-5 text-refos-primary" />
          <h1 className="text-lg font-semibold text-white">Task Manager</h1>
        </div>
        
        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('processes')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              activeTab === 'processes'
                ? 'bg-refos-primary text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Processes
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              activeTab === 'performance'
                ? 'bg-refos-primary text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Performance
          </button>
        </div>
      </div>

      {activeTab === 'processes' ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Process List Header */}
          <div className="grid grid-cols-4 gap-2 p-3 border-b border-white/10 text-white/70 text-sm font-medium">
            <span>Name</span>
            <span>Status</span>
            <span>CPU</span>
            <span>Memory</span>
          </div>

          {/* Process List */}
          <div className="flex-1 overflow-auto">
            {runningApps.length === 0 ? (
              <div className="text-center text-white/50 py-8">
                No running processes
              </div>
            ) : (
              runningApps.map(app => (
                <div
                  key={app.id}
                  className="grid grid-cols-4 gap-2 p-3 border-b border-white/5 hover:bg-white/5 items-center group"
                >
                  <span className="text-white text-sm truncate">{app.title}</span>
                  <span className={`text-xs ${app.isMinimized ? 'text-yellow-400' : 'text-green-400'}`}>
                    {app.isMinimized ? 'Suspended' : 'Running'}
                  </span>
                  <span className="text-white/70 text-sm">
                    {getAppCpu(app.name, app.isMinimized).toFixed(1)}%
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-sm">
                      {getAppMemory(app.name)} MB
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/20"
                      onClick={() => handleEndTask(app.id, app.title)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-white/10 flex justify-between items-center">
            <span className="text-white/50 text-sm">
              {runningApps.length} process(es) running
            </span>
            <Button
              size="sm"
              variant="outline"
              className="text-white border-white/20 hover:bg-white/10"
              onClick={() => toast.info('Refreshed process list')}
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex-1 p-4 overflow-auto">
          {/* CPU Usage */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="w-5 h-5 text-blue-400" />
              <span className="text-white font-medium">CPU</span>
              <span className="text-white/70 ml-auto">{cpuUsage.toFixed(1)}%</span>
            </div>
            <div className="h-24 bg-black/30 rounded-lg p-2 border border-white/10">
              <div className="h-full flex items-end gap-1">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-blue-500/80 rounded-t transition-all"
                    style={{
                      height: `${Math.max(5, cpuUsage + Math.sin(i * 0.5) * 10 + Math.random() * 5)}%`
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between text-white/50 text-xs mt-1">
              <span>Utilization</span>
              <span>60 seconds</span>
            </div>
          </div>

          {/* Memory Usage */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <HardDrive className="w-5 h-5 text-purple-400" />
              <span className="text-white font-medium">Memory</span>
              <span className="text-white/70 ml-auto">{memoryUsage.toFixed(1)}%</span>
            </div>
            <div className="h-24 bg-black/30 rounded-lg p-2 border border-white/10">
              <div className="h-full flex items-end gap-1">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-purple-500/80 rounded-t transition-all"
                    style={{
                      height: `${Math.max(5, memoryUsage + Math.sin(i * 0.3) * 5 + Math.random() * 3)}%`
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between text-white/50 text-xs mt-1">
              <span>In Use: {(memoryUsage * 0.08).toFixed(1)} GB</span>
              <span>Available: {(8 - memoryUsage * 0.08).toFixed(1)} GB</span>
            </div>
          </div>

          {/* System Info */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h3 className="text-white font-medium mb-3">System Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/50">Processes</span>
                <span className="text-white">{runningApps.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Uptime</span>
                <span className="text-white">0:15:32</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">CPU Cores</span>
                <span className="text-white">4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Total Memory</span>
                <span className="text-white">8 GB</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManager;

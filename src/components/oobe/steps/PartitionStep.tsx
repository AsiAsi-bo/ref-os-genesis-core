
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { HardDrive, Usb, AlertTriangle } from 'lucide-react';
import { useUSBDevices } from '@/hooks/useUSBDevices';

interface Partition {
  id: string;
  name: string;
  size: string;
  available: string;
  type: 'primary' | 'extended' | 'logical';
  device: string;
  mounted: boolean;
}

const PartitionStep: React.FC = () => {
  const { devices } = useUSBDevices();
  const [selectedPartition, setSelectedPartition] = useState<string>('');
  const [installationType, setInstallationType] = useState<'alongside' | 'replace' | 'custom'>('alongside');
  
  // Mock partitions for demonstration
  const partitions: Partition[] = [
    {
      id: 'sda1',
      name: 'System Reserved',
      size: '500 MB',
      available: '100 MB',
      type: 'primary',
      device: 'sda',
      mounted: true
    },
    {
      id: 'sda2',
      name: 'Windows (C:)',
      size: '200 GB',
      available: '50 GB',
      type: 'primary',
      device: 'sda',
      mounted: true
    },
    {
      id: 'sda3',
      name: 'Free Space',
      size: '100 GB',
      available: '100 GB',
      type: 'primary',
      device: 'sda',
      mounted: false
    },
    ...devices.filter(d => d.type === 'storage').map(device => ({
      id: device.id,
      name: device.name,
      size: device.size || 'Unknown',
      available: device.size || 'Unknown',
      type: 'primary' as const,
      device: device.id,
      mounted: device.connected
    }))
  ];

  const getInstallationTypeDescription = () => {
    switch (installationType) {
      case 'alongside':
        return 'Install Ref OS alongside existing operating systems. This is the safest option.';
      case 'replace':
        return 'Replace the entire disk with Ref OS. This will erase all existing data.';
      case 'custom':
        return 'Manually configure partitions. Recommended for advanced users only.';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Select Installation Partition</h3>
        <p className="text-white/70">
          Choose where to install Ref OS. We recommend selecting free space or a dedicated partition.
        </p>
      </div>

      {/* Installation Type Selection */}
      <Card className="bg-refos-window/30 border-white/10">
        <CardHeader>
          <CardTitle className="text-white text-sm">Installation Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <label className="flex items-center space-x-3">
              <input 
                type="radio" 
                name="installationType" 
                value="alongside"
                checked={installationType === 'alongside'}
                onChange={(e) => setInstallationType(e.target.value as any)}
                className="text-refos-primary"
              />
              <span className="text-white">Install alongside existing OS</span>
            </label>
            <label className="flex items-center space-x-3">
              <input 
                type="radio" 
                name="installationType" 
                value="replace"
                checked={installationType === 'replace'}
                onChange={(e) => setInstallationType(e.target.value as any)}
                className="text-refos-primary"
              />
              <span className="text-white">Erase disk and install Ref OS</span>
            </label>
            <label className="flex items-center space-x-3">
              <input 
                type="radio" 
                name="installationType" 
                value="custom"
                checked={installationType === 'custom'}
                onChange={(e) => setInstallationType(e.target.value as any)}
                className="text-refos-primary"
              />
              <span className="text-white">Custom partitioning</span>
            </label>
          </div>
          <p className="text-xs text-white/60 mt-2">
            {getInstallationTypeDescription()}
          </p>
        </CardContent>
      </Card>

      {/* Partition Selection */}
      <Card className="bg-refos-window/30 border-white/10">
        <CardHeader>
          <CardTitle className="text-white text-sm">Available Partitions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {partitions.map((partition) => (
              <div 
                key={partition.id}
                className={`p-3 rounded border transition-colors cursor-pointer ${
                  selectedPartition === partition.id 
                    ? 'border-refos-primary bg-refos-primary/10' 
                    : 'border-white/20 hover:border-white/40'
                }`}
                onClick={() => setSelectedPartition(partition.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {partition.device.startsWith('usb') ? (
                      <Usb className="h-4 w-4 text-white/70" />
                    ) : (
                      <HardDrive className="h-4 w-4 text-white/70" />
                    )}
                    <div>
                      <div className="text-white font-medium">{partition.name}</div>
                      <div className="text-xs text-white/60">
                        {partition.device} • {partition.type} • {partition.size}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white">{partition.available} available</div>
                    {partition.mounted && (
                      <div className="text-xs text-yellow-400 flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Mounted
                      </div>
                    )}
                  </div>
                </div>
                {partition.size !== partition.available && (
                  <div className="mt-2">
                    <Progress 
                      value={((parseFloat(partition.size) - parseFloat(partition.available)) / parseFloat(partition.size)) * 100} 
                      className="h-1"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Connected USB Devices */}
      {devices.filter(d => d.type === 'storage').length > 0 && (
        <Card className="bg-refos-window/30 border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-sm flex items-center">
              <Usb className="h-4 w-4 mr-2" />
              USB Storage Devices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {devices.filter(d => d.type === 'storage').map((device) => (
                <div key={device.id} className="flex items-center justify-between p-2 bg-white/5 rounded">
                  <div>
                    <div className="text-white text-sm">{device.name}</div>
                    <div className="text-xs text-white/60">
                      {device.size} • {device.connected ? 'Connected' : 'Disconnected'}
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${device.connected ? 'bg-green-500' : 'bg-red-500'}`} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedPartition && (
        <div className="p-3 bg-refos-primary/10 border border-refos-primary/30 rounded">
          <p className="text-sm text-white">
            <strong>Selected:</strong> {partitions.find(p => p.id === selectedPartition)?.name}
          </p>
          <p className="text-xs text-white/70 mt-1">
            Ref OS will be installed on this partition. Make sure you have backed up any important data.
          </p>
        </div>
      )}
    </div>
  );
};

export default PartitionStep;

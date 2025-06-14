
import { useState, useEffect } from 'react';

export interface USBDevice {
  id: string;
  name: string;
  vendorId: number;
  productId: number;
  size?: string;
  type: 'storage' | 'input' | 'other';
  connected: boolean;
  mountPoint?: string;
}

export const useUSBDevices = () => {
  const [devices, setDevices] = useState<USBDevice[]>([]);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if WebUSB is supported
    setIsSupported('usb' in navigator);
    
    // Simulate some USB devices for demo purposes
    const mockDevices: USBDevice[] = [
      {
        id: 'usb-1',
        name: 'SanDisk Ultra USB 3.0',
        vendorId: 0x0781,
        productId: 0x5581,
        size: '32 GB',
        type: 'storage',
        connected: true,
        mountPoint: '/dev/sdb1'
      },
      {
        id: 'usb-2',
        name: 'Logitech Wireless Mouse',
        vendorId: 0x046d,
        productId: 0xc52f,
        type: 'input',
        connected: true
      }
    ];
    
    setDevices(mockDevices);
  }, []);

  const requestUSBDevice = async () => {
    if (!isSupported) {
      throw new Error('WebUSB is not supported in this browser');
    }
    
    try {
      // In a real implementation, this would request access to USB devices
      // For now, we'll simulate adding a new device
      const newDevice: USBDevice = {
        id: `usb-${Date.now()}`,
        name: 'New USB Device',
        vendorId: 0x0000,
        productId: 0x0000,
        type: 'other',
        connected: true
      };
      
      setDevices(prev => [...prev, newDevice]);
      return newDevice;
    } catch (error) {
      console.error('Failed to request USB device:', error);
      throw error;
    }
  };

  const ejectDevice = (deviceId: string) => {
    setDevices(prev => 
      prev.map(device => 
        device.id === deviceId 
          ? { ...device, connected: false }
          : device
      )
    );
  };

  const formatDevice = (deviceId: string) => {
    // Simulate formatting process
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log(`Formatting device ${deviceId}...`);
        resolve();
      }, 2000);
    });
  };

  return {
    devices,
    isSupported,
    requestUSBDevice,
    ejectDevice,
    formatDevice
  };
};

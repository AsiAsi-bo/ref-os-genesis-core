
import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { RotateCcw, AlertTriangle } from 'lucide-react';
import { useInstaller } from '@/context/InstallerContext';
import { useOOBE } from '@/context/OOBEContext';

const ResetSettings: React.FC = () => {
  const { resetInstallation } = useInstaller();
  const { resetOOBE } = useOOBE();

  const handleReset = () => {
    // Reset all stored data
    resetInstallation();
    resetOOBE();
    
    // Clear all other localStorage data
    localStorage.clear();
    
    // Reload the page to restart the entire process
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Reset Your PC</h3>
        <p className="text-sm text-white/70">
          Reset your PC to its original state. This will clear all settings and restart the setup process.
        </p>
      </div>

      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
          <div className="space-y-2">
            <p className="text-sm font-medium text-red-200">Warning</p>
            <p className="text-sm text-red-300">
              This action will permanently delete all your settings, preferences, and data. 
              You will need to go through the installation and setup process again.
            </p>
          </div>
        </div>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="w-full">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset This PC
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-refos-window border-refos-primary/20 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              This action cannot be undone. This will permanently reset your PC to its initial state,
              clearing all settings and requiring you to complete the setup process again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-white border-white/20 hover:bg-white/10 hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleReset}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Reset PC
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ResetSettings;


import React from 'react';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOOBE } from '@/context/OOBEContext';

const WelcomeStep: React.FC = () => {
  const { goToStep } = useOOBE();

  const handleInstallRefOS = () => {
    goToStep(2); // Go directly to PartitionStep
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium text-refos-primary">Welcome to Ref OS</h3>
      <p>
        Thank you for choosing Ref OS for your virtual operating system needs. 
        This setup wizard will guide you through the initial configuration 
        process to get your system up and running.
      </p>
      <div className="flex justify-center py-6">
        <div className="w-32 h-32 bg-refos-primary/20 rounded-full flex items-center justify-center">
          <div className="w-24 h-24 bg-refos-primary/40 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-refos-primary rounded-full flex items-center justify-center text-3xl font-bold">
              R
            </div>
          </div>
        </div>
      </div>
      <p className="text-white/80">
        During the setup process, you will:
      </p>
      <ul className="list-disc list-inside space-y-1 text-white/80">
        <li>Personalize your desktop experience</li>
        <li>Configure privacy settings</li>
        <li>Complete final setup steps</li>
      </ul>
      <div className="mt-6 p-4 bg-refos-primary/10 rounded-lg border border-refos-primary/20 flex items-start">
        <div className="bg-refos-primary/20 h-10 w-10 rounded-full flex items-center justify-center mr-3 mt-1">
          <Bot size={20} className="text-refos-primary" />
        </div>
        <div>
          <h4 className="font-medium text-refos-primary">Meet Refy, Your Virtual Assistant</h4>
          <p className="text-white/80 mt-1">
            Refy is your personal virtual assistant in Ref OS. You can ask Refy to help you navigate the system,
            open applications, search for information, and much more. Look for the Refy icon on your desktop
            after completing the setup process.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3 pt-4">
        <Button 
          onClick={handleInstallRefOS}
          className="bg-refos-primary hover:bg-refos-primary/80 text-white font-medium py-3"
        >
          Install Ref OS
        </Button>
        <p className="text-white/60 text-sm text-center">
          This will start the installation process and guide you through partition selection.
        </p>
      </div>
    </div>
  );
};

export default WelcomeStep;

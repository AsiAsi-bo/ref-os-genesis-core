
import React from 'react';
import { Button } from '@/components/ui/button';
import { useVR } from '@/context/VRContext';
import { Glasses, GlassesOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const VRControls: React.FC = () => {
  const { isVRSupported, isVRActive, enterVR, exitVR, vrError } = useVR();
  const { toast } = useToast();

  const handleVRToggle = async () => {
    try {
      if (isVRActive) {
        await exitVR();
        toast({
          title: "VR Mode",
          description: "Exited VR mode"
        });
      } else {
        await enterVR();
        toast({
          title: "VR Mode",
          description: "Entered VR mode"
        });
      }
    } catch (error) {
      toast({
        title: "VR Error",
        description: vrError || "Failed to toggle VR mode",
        variant: "destructive"
      });
    }
  };

  if (!isVRSupported) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleVRToggle}
      className="text-white hover:bg-white/20"
      title={isVRActive ? "Exit VR" : "Enter VR"}
    >
      {isVRActive ? <GlassesOff size={16} /> : <Glasses size={16} />}
    </Button>
  );
};

export default VRControls;

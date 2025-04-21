
import { useState, useEffect } from 'react';
import { Eye, EyeOff, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface StealthModeProps {
  onToggle: (active: boolean) => void;
}

export function StealthMode({ onToggle }: StealthModeProps) {
  const [isActive, setIsActive] = useState(false);
  
  // Set up keyboard shortcut (Escape key)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        toggleStealthMode();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);
  
  const toggleStealthMode = () => {
    const newState = !isActive;
    setIsActive(newState);
    onToggle(newState);
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleStealthMode}
              className={isActive ? "bg-destructive text-white hover:bg-destructive/90" : ""}
            >
              {isActive ? <EyeOff size={18} /> : <Eye size={18} />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{isActive ? "Disable" : "Enable"} stealth mode (ESC)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {isActive && (
        <div className="rounded-lg bg-card p-3 shadow-lg">
          <Calculator size={24} />
        </div>
      )}
    </div>
  );
}

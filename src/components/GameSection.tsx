
import { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GameSectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  viewAllLink?: string;
}

export function GameSection({ 
  title, 
  icon, 
  children, 
  viewAllLink 
}: GameSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-game-purple">{icon}</span>
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        
        {viewAllLink && (
          <Button variant="ghost" size="sm" className="gap-1 text-sm">
            View All
            <ChevronRight size={16} />
          </Button>
        )}
      </div>
      
      {children}
    </section>
  );
}

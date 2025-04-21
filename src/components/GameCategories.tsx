
import { Grid2x2, Gamepad, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GameCategoriesProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function GameCategories({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: GameCategoriesProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Gamepad className="h-5 w-5 text-game-purple" />
        <h2 className="text-lg font-semibold">Categories</h2>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectCategory('all')}
          className={cn(
            "category-badge flex items-center gap-1.5",
            selectedCategory === 'all'
              ? "bg-game-purple text-white ring-game-purple"
              : "bg-secondary/50 hover:bg-secondary ring-secondary/50"
          )}
        >
          <Grid2x2 size={14} />
          <span>All Games</span>
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={cn(
              "category-badge",
              selectedCategory === category
                ? "bg-game-purple text-white ring-game-purple"
                : "bg-secondary/50 hover:bg-secondary ring-secondary/50"
            )}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="mt-6 flex items-center gap-2">
        <Tag className="h-5 w-5 text-game-purple" />
        <h2 className="text-lg font-semibold">Popular Tags</h2>
      </div>
      
      <div className="flex flex-wrap gap-1.5">
        {['Arcade', 'Puzzle', 'Action', 'Strategy', 'Multiplayer', 'Retro', 'Sports', 'Adventure'].map((tag) => (
          <span key={tag} className="game-tag bg-secondary/30 hover:bg-secondary/50">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}


import { useState } from 'react';
import { Star, Heart, Play, Eye, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface GameProps {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  tags: string[];
  rating: number;
  views: number;
  comments: number;
  isNew?: boolean;
  isHot?: boolean;
}

interface GameCardProps {
  game: GameProps;
  onFavorite: (id: string) => void;
  isFavorite: boolean;
}

export function GameCard({ game, onFavorite, isFavorite }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="game-card bg-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video overflow-hidden rounded-t-lg">
        <img 
          src={game.image} 
          alt={game.title} 
          className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        
        {/* Play button overlay */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300",
          isHovered ? "opacity-100" : ""
        )}>
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-game-purple text-white shadow-lg transition-transform hover:scale-110">
            <Play size={24} />
          </button>
        </div>
        
        {/* Badges */}
        <div className="absolute left-2 top-2 flex gap-2">
          {game.isNew && (
            <span className="special-badge">New</span>
          )}
          {game.isHot && (
            <span className="special-badge">Hot</span>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-1 flex items-center justify-between">
          <h3 className="text-lg font-bold">{game.title}</h3>
          <button 
            onClick={() => onFavorite(game.id)}
            className="text-muted-foreground transition-colors hover:text-red-500"
          >
            <Heart size={18} fill={isFavorite ? "#ef4444" : "none"} className={isFavorite ? "text-red-500" : ""} />
          </button>
        </div>
        
        <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="category-badge bg-secondary/50 ring-secondary/50">
            {game.category}
          </span>
          <span className="flex items-center gap-1">
            <Star size={14} className="text-yellow-500" />
            {game.rating.toFixed(1)}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={14} />
            {game.views}
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare size={14} />
            {game.comments}
          </span>
        </div>
        
        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
          {game.description}
        </p>
        
        <div className="flex flex-wrap gap-1">
          {game.tags.map((tag) => (
            <span key={tag} className="game-tag bg-secondary/30">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

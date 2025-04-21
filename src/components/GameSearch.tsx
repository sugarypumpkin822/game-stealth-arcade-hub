
import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface GameSearchProps {
  onSearch: (term: string) => void;
  onFilter: (filters: FilterOptions) => void;
  onSort: (sort: SortOption) => void;
  categories: string[];
  tags: string[];
}

export interface FilterOptions {
  category?: string;
  tag?: string;
  rating?: number;
}

export type SortOption = 'popular' | 'newest' | 'rating' | 'views';

export function GameSearch({ 
  onSearch, 
  onFilter, 
  onSort,
  categories,
  tags
}: GameSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({});
  
  const handleSearch = () => {
    onSearch(searchTerm);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const applyFilter = (filter: Partial<FilterOptions>) => {
    const newFilters = { ...activeFilters, ...filter };
    setActiveFilters(newFilters);
    onFilter(newFilters);
  };
  
  const clearFilters = () => {
    setActiveFilters({});
    onFilter({});
  };
  
  const filterCount = Object.keys(activeFilters).filter(key => 
    activeFilters[key as keyof FilterOptions] !== undefined).length;
  
  return (
    <div className="relative w-full space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search for games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10 pr-4"
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm('');
                onSearch('');
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X size={16} />
            </button>
          )}
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter size={16} />
              Filter
              {filterCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {filterCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Filter Games</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                Category
              </DropdownMenuLabel>
              {categories.map((category) => (
                <DropdownMenuItem 
                  key={category}
                  onClick={() => applyFilter({ category })}
                  className="flex items-center justify-between"
                >
                  {category}
                  {activeFilters.category === category && (
                    <span className="text-primary">✓</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                Tags
              </DropdownMenuLabel>
              {tags.slice(0, 6).map((tag) => (
                <DropdownMenuItem 
                  key={tag}
                  onClick={() => applyFilter({ tag })}
                  className="flex items-center justify-between"
                >
                  {tag}
                  {activeFilters.tag === tag && (
                    <span className="text-primary">✓</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                Rating
              </DropdownMenuLabel>
              {[5, 4, 3, 2, 1].map((rating) => (
                <DropdownMenuItem 
                  key={rating}
                  onClick={() => applyFilter({ rating })}
                  className="flex items-center justify-between"
                >
                  {rating}+ Stars
                  {activeFilters.rating === rating && (
                    <span className="text-primary">✓</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="w-full justify-start"
              disabled={filterCount === 0}
            >
              Clear all filters
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Select onValueChange={(value) => onSort(value as SortOption)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="views">Most Viewed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

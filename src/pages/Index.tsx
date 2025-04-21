
import { useState, useEffect } from 'react';
import {
  Search,
  Gamepad,
  Clock,
  Heart,
  Star,
  Zap,
  Shuffle,
  Home,
  Settings
} from 'lucide-react';
import { GameCard, type GameProps } from '@/components/GameCard';
import { GameSearch, type FilterOptions, type SortOption } from '@/components/GameSearch';
import { GameCategories } from '@/components/GameCategories';
import { GameSection } from '@/components/GameSection';
import { StealthMode } from '@/components/StealthMode';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

// Mock data for games
const MOCK_GAMES: GameProps[] = [
  {
    id: '1',
    title: 'Arcade Racer',
    image: 'https://images.unsplash.com/photo-1612404730960-5c71577fca11?q=80&w=600&auto=format',
    description: 'Fast-paced retro racing game with multiple tracks and vehicles.',
    category: 'Racing',
    tags: ['Arcade', 'Retro', 'Action'],
    rating: 4.5,
    views: 1240,
    comments: 28,
    isNew: true
  },
  {
    id: '2',
    title: 'Puzzle Master',
    image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?q=80&w=600&auto=format',
    description: 'Brain-teasing puzzles that will challenge your problem-solving skills.',
    category: 'Puzzle',
    tags: ['Strategy', 'Educational', 'Casual'],
    rating: 4.2,
    views: 890,
    comments: 15,
    isHot: true
  },
  {
    id: '3',
    title: 'Space Shooter',
    image: 'https://images.unsplash.com/photo-1596727147705-61a532a659bd?q=80&w=600&auto=format',
    description: 'Defend the galaxy from alien invaders in this classic arcade shooter.',
    category: 'Action',
    tags: ['Space', 'Shooter', 'Arcade'],
    rating: 4.7,
    views: 1560,
    comments: 42
  },
  {
    id: '4',
    title: 'Stealth Ninja',
    image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=600&auto=format',
    description: 'Master the art of stealth and deception in this ninja adventure.',
    category: 'Stealth',
    tags: ['Adventure', 'Action', 'Ninja'],
    rating: 4.8,
    views: 1320,
    comments: 36,
    isHot: true
  },
  {
    id: '5',
    title: 'Block Builder',
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=600&auto=format',
    description: 'Creative sandbox where you can build anything your imagination desires.',
    category: 'Sandbox',
    tags: ['Building', 'Creative', 'Multiplayer'],
    rating: 4.3,
    views: 980,
    comments: 24
  },
  {
    id: '6',
    title: 'Dungeon Crawler',
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=600&auto=format',
    description: 'Explore dangerous dungeons and defeat monsters in this roguelike adventure.',
    category: 'RPG',
    tags: ['Adventure', 'Fantasy', 'Strategy'],
    rating: 4.6,
    views: 1150,
    comments: 31,
    isNew: true
  },
  {
    id: '7',
    title: 'Hidden School',
    image: 'https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?q=80&w=600&auto=format',
    description: 'Play this stealth game during class without getting caught!',
    category: 'Stealth',
    tags: ['School', 'Casual', 'Stealth'],
    rating: 4.9,
    views: 2100,
    comments: 58,
    isHot: true
  },
  {
    id: '8',
    title: 'Office Escape',
    image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=600&auto=format',
    description: 'Hide your gaming from the boss in this office-themed stealth game.',
    category: 'Stealth',
    tags: ['Office', 'Casual', 'Strategy'],
    rating: 4.4,
    views: 1050,
    comments: 27
  }
];

const categories = ['Action', 'Racing', 'Puzzle', 'RPG', 'Sandbox', 'Stealth'];
const tags = ['Arcade', 'Retro', 'Action', 'Strategy', 'Multiplayer', 'Casual', 'Adventure', 'Stealth', 'School', 'Office'];

const Index = () => {
  const [games, setGames] = useState<GameProps[]>(MOCK_GAMES);
  const [filteredGames, setFilteredGames] = useState<GameProps[]>(MOCK_GAMES);
  const [recentlyPlayed, setRecentlyPlayed] = useState<GameProps[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isStealthMode, setIsStealthMode] = useState(false);
  
  // Initialize from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    const savedRecent = localStorage.getItem('recentlyPlayed');
    if (savedRecent) {
      const recentIds = JSON.parse(savedRecent);
      const recentGames = recentIds.map(
        (id: string) => MOCK_GAMES.find(g => g.id === id)
      ).filter(Boolean);
      setRecentlyPlayed(recentGames);
    }
  }, []);
  
  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);
  
  useEffect(() => {
    localStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed.map(g => g.id)));
  }, [recentlyPlayed]);
  
  const handleSearch = (term: string) => {
    if (!term) {
      applyCategory(selectedCategory);
      return;
    }
    
    const lowerTerm = term.toLowerCase();
    const filtered = games.filter(
      game => 
        game.title.toLowerCase().includes(lowerTerm) || 
        game.description.toLowerCase().includes(lowerTerm) ||
        game.tags.some(tag => tag.toLowerCase().includes(lowerTerm))
    );
    
    setFilteredGames(filtered);
    
    if (filtered.length === 0) {
      toast({
        title: "No games found",
        description: `No games match "${term}"`,
      });
    } else {
      toast({
        title: "Search results",
        description: `Found ${filtered.length} games matching "${term}"`,
      });
    }
  };
  
  const handleFilter = (filters: FilterOptions) => {
    let filtered = games;
    
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(game => game.category === filters.category);
    }
    
    if (filters.tag) {
      filtered = filtered.filter(game => game.tags.includes(filters.tag!));
    }
    
    if (filters.rating) {
      filtered = filtered.filter(game => game.rating >= filters.rating!);
    }
    
    setFilteredGames(filtered);
    
    if (Object.keys(filters).length > 0) {
      toast({
        title: "Filters applied",
        description: `Showing ${filtered.length} filtered games`,
      });
    }
  };
  
  const handleSort = (sort: SortOption) => {
    let sorted = [...filteredGames];
    
    switch (sort) {
      case 'popular':
        sorted.sort((a, b) => (b.views + b.comments * 5) - (a.views + a.comments * 5));
        break;
      case 'newest':
        sorted = sorted.filter(game => game.isNew).concat(sorted.filter(game => !game.isNew));
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'views':
        sorted.sort((a, b) => b.views - a.views);
        break;
    }
    
    setFilteredGames(sorted);
    
    toast({
      title: "Games sorted",
      description: `Sorted by ${sort.replace(/^\w/, c => c.toUpperCase())}`,
    });
  };
  
  const applyCategory = (category: string) => {
    setSelectedCategory(category);
    
    if (category === 'all') {
      setFilteredGames(games);
    } else {
      setFilteredGames(games.filter(game => game.category === category));
    }
  };
  
  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
      toast({
        title: "Removed from favorites",
        description: `Game removed from your favorites list`,
      });
    } else {
      setFavorites([...favorites, id]);
      toast({
        title: "Added to favorites",
        description: `Game added to your favorites list`,
      });
    }
  };
  
  const playGame = (game: GameProps) => {
    // Add to recently played if not already at the top
    const newRecent = recentlyPlayed.filter(g => g.id !== game.id);
    newRecent.unshift(game);
    setRecentlyPlayed(newRecent.slice(0, 4)); // Keep only the 4 most recent
    
    toast({
      title: `Now Playing: ${game.title}`,
      description: "Game launched in fullscreen mode",
    });
  };
  
  const getRandomGame = () => {
    const randomIndex = Math.floor(Math.random() * games.length);
    const randomGame = games[randomIndex];
    
    toast({
      title: "Random Game Selected",
      description: `Try playing ${randomGame.title}!`,
    });
    
    // Scroll to the random game
    // This is just a mock implementation
    playGame(randomGame);
  };
  
  const handleStealthMode = (active: boolean) => {
    setIsStealthMode(active);
    
    if (active) {
      toast({
        title: "Stealth Mode Activated",
        description: "Press ESC to quickly exit the game",
      });
    } else {
      toast({
        title: "Stealth Mode Deactivated",
        description: "Normal mode restored",
      });
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${isStealthMode ? 'stealth-mode active' : ''}`}>
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-bold text-game-purple">
            <Gamepad className="h-6 w-6" />
            <span>Stealth Arcade Hub</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="gap-2">
              <Home size={18} />
              <span className="hidden sm:inline">Home</span>
            </Button>
            <Button variant="ghost" className="gap-2">
              <Heart size={18} />
              <span className="hidden sm:inline">Favorites</span>
            </Button>
            <Button variant="ghost" className="gap-2">
              <Settings size={18} />
              <span className="hidden sm:inline">Settings</span>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      <main className="container py-8">
        <div className="mb-8">
          <GameSearch 
            onSearch={handleSearch}
            onFilter={handleFilter}
            onSort={handleSort}
            categories={categories}
            tags={tags}
          />
        </div>
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="col-span-1 space-y-6">
            <GameCategories 
              categories={categories} 
              selectedCategory={selectedCategory}
              onSelectCategory={applyCategory}
            />
            
            <Separator />
            
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2"
                onClick={getRandomGame}
              >
                <Shuffle size={18} className="text-game-purple" />
                Random Game
              </Button>
              
              <Button variant="outline" className="w-full justify-start gap-2">
                <Zap size={18} className="text-yellow-500" />
                Game of the Day
              </Button>
            </div>
            
            {recentlyPlayed.length > 0 && (
              <>
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-game-purple" />
                    <h2 className="text-lg font-semibold">Recently Played</h2>
                  </div>
                  
                  <div className="space-y-2">
                    {recentlyPlayed.map(game => (
                      <div 
                        key={game.id} 
                        className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-secondary/50"
                        onClick={() => playGame(game)}
                      >
                        <img 
                          src={game.image} 
                          alt={game.title} 
                          className="h-10 w-10 rounded-md object-cover"
                        />
                        <div className="flex-1 truncate">
                          <div className="font-medium truncate">{game.title}</div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Star size={12} className="mr-1 text-yellow-500" />
                            {game.rating.toFixed(1)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Main content */}
          <div className="col-span-1 space-y-10 lg:col-span-3">
            <GameSection 
              title="Featured Games" 
              icon={<Zap size={24} />}
              viewAllLink="/featured"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {games.filter(game => game.isHot).slice(0, 3).map(game => (
                  <GameCard 
                    key={game.id} 
                    game={game} 
                    onFavorite={toggleFavorite}
                    isFavorite={favorites.includes(game.id)}
                  />
                ))}
              </div>
            </GameSection>
            
            <GameSection 
              title="All Games" 
              icon={<Gamepad size={24} />}
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredGames.map(game => (
                  <GameCard 
                    key={game.id} 
                    game={game} 
                    onFavorite={toggleFavorite}
                    isFavorite={favorites.includes(game.id)}
                  />
                ))}
              </div>
              
              {filteredGames.length === 0 && (
                <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed">
                  <Search className="mb-2 h-10 w-10 text-muted-foreground" />
                  <h3 className="text-lg font-medium">No games found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </GameSection>
            
            {favorites.length > 0 && (
              <GameSection 
                title="Your Favorites" 
                icon={<Heart size={24} className="text-red-500" />}
              >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {games
                    .filter(game => favorites.includes(game.id))
                    .map(game => (
                      <GameCard 
                        key={game.id} 
                        game={game} 
                        onFavorite={toggleFavorite}
                        isFavorite={true}
                      />
                    ))}
                </div>
              </GameSection>
            )}
          </div>
        </div>
      </main>
      
      <footer className="border-t bg-background py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 Stealth Arcade Hub - Press ESC to quickly hide games</p>
        </div>
      </footer>
      
      <StealthMode onToggle={handleStealthMode} />
    </div>
  );
};

export default Index;

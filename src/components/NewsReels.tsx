import { useState } from 'react';
import { Play, Heart, MessageCircle, Share, TrendingUp, ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const newsReels = [
  {
    id: 1,
    title: "Fed Signals Rate Cuts",
    content: "Federal Reserve hints at potential rate cuts in Q2 2024, markets rally on the news...",
    thumbnail: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=600&fit=crop",
    duration: "1:24",
    likes: 1247,
    comments: 89
  },
  {
    id: 2,
    title: "Tech Sector Outlook",
    content: "AI revolution continues to drive tech valuations higher, with semiconductor stocks leading...",
    thumbnail: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=600&fit=crop",
    duration: "2:15",
    likes: 856,
    comments: 124
  },
  {
    id: 3,
    title: "Hong Kong Markets",
    content: "HSI reaches new monthly highs as mainland China stimulus measures boost investor sentiment...",
    thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=600&fit=crop",
    duration: "1:45",
    likes: 923,
    comments: 67
  }
];

const stockSuggestions = [
  { symbol: "AAPL", name: "Apple Inc.", price: "$175.84", change: "+2.4%", trend: "up" },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: "$486.21", change: "+5.7%", trend: "up" },
  { symbol: "0700.HK", name: "Tencent", price: "HK$312.40", change: "+1.8%", trend: "up" },
  { symbol: "TSM", name: "Taiwan Semi", price: "$92.15", change: "+3.2%", trend: "up" }
];

export const NewsReels = () => {
  const [currentReel, setCurrentReel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">Reels for News</h2>
      
      {/* Instagram-style Reels Container */}
      <div className="max-w-md mx-auto">
        {/* Reels Player */}
        <div className="relative">
          <div className="aspect-[9/16] max-h-[600px] bg-black rounded-2xl overflow-hidden relative group">
            {/* Tap Areas for Navigation */}
            <div className="absolute inset-0 z-20 flex">
              <button 
                className="w-1/3 h-full flex items-center justify-start pl-4 opacity-0 hover:opacity-100 transition-opacity"
                onClick={() => setCurrentReel(currentReel > 0 ? currentReel - 1 : newsReels.length - 1)}
              >
                <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-0 h-0 border-y-4 border-y-transparent border-r-8 border-r-white/80"></div>
                </div>
              </button>
              <div className="w-1/3 h-full"></div>
              <button 
                className="w-1/3 h-full flex items-center justify-end pr-4 opacity-0 hover:opacity-100 transition-opacity"
                onClick={() => setCurrentReel(currentReel < newsReels.length - 1 ? currentReel + 1 : 0)}
              >
                <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-0 h-0 border-y-4 border-y-transparent border-l-8 border-l-white/80"></div>
                </div>
              </button>
            </div>
            
            {/* Video Thumbnail */}
            <img
              src={newsReels[currentReel].thumbnail}
              alt={newsReels[currentReel].title}
              className="w-full h-full object-cover"
            />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                size="lg"
                className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/40"
              >
                <Play className="w-8 h-8 text-white" fill="white" />
              </Button>
            </div>

            {/* Bottom Overlay with Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
              <h3 className="text-lg font-bold mb-2">{newsReels[currentReel].title}</h3>
              <p className="text-sm opacity-90 mb-3">{newsReels[currentReel].content}</p>
              
              {/* Engagement Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1">
                    <Heart className="w-5 h-5" />
                    <span className="text-sm">{newsReels[currentReel].likes}</span>
                  </button>
                  <button className="flex items-center space-x-1">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">{newsReels[currentReel].comments}</span>
                  </button>
                  <button>
                    <Share className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-xs opacity-75">{newsReels[currentReel].duration}</div>
              </div>
            </div>

            {/* Duration indicator */}
            <div className="absolute top-4 left-4 right-4">
              <div className="flex space-x-1">
                {newsReels.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 flex-1 rounded-full ${
                      index === currentReel ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Navigation Dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {newsReels.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReel(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentReel ? 'bg-primary' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Search Box - Moved below video */}
        <div className="mt-6 glass-panel p-3 sm:p-4 rounded-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search financial news..." 
              className="pl-10 bg-transparent border-muted"
            />
          </div>
        </div>
      </div>

      {/* Stock Suggestions */}
      <div className="glass-panel p-4 sm:p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-semibold">Related Stocks</h3>
          <Button variant="outline" size="sm">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stockSuggestions.map((stock) => (
            <div key={stock.symbol} className="glass-panel p-4 rounded-xl hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <div className="font-bold text-sm">{stock.symbol}</div>
                <TrendingUp className={`w-4 h-4 ${stock.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
              </div>
              <div className="text-xs text-muted-foreground mb-1">{stock.name}</div>
              <div className="flex items-center justify-between">
                <div className="font-semibold">{stock.price}</div>
                <div className={`text-sm font-medium ${stock.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {stock.change}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="font-semibold">AI Market Analysis</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Based on your portfolio and recent news, these stocks show strong correlation with your investment strategy. 
            Technology and semiconductor sectors are showing exceptional momentum this quarter.
          </p>
        </div>
      </div>
    </div>
  );
};
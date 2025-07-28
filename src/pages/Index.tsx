import { useState } from 'react';
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown, PieChart, Clock, ExternalLink, Target } from 'lucide-react';
import { StarField } from '@/components/StarField';
import { ChatInterface } from '@/components/ChatInterface';
import { Dashboard } from '@/components/Dashboard';
import { NewsReels } from '@/components/NewsReels';
import { PortfolioSimulator } from '@/components/visualizer/PortfolioSimulator';
import { Button } from '@/components/ui/button';
import bankAiLogo from '@/assets/bank-ai-logo.png';

const insights = [
  {
    title: 'Portfolio Performance',
    value: '+12.5%',
    trend: 'up',
    description: 'Year-to-date returns'
  },
  {
    title: 'Monthly Savings',
    value: 'HK$15,200',
    trend: 'up',
    description: 'Average monthly deposits'
  },
  {
    title: 'Investment Risk',
    value: 'Moderate',
    trend: 'stable',
    description: 'Current risk profile'
  },
  {
    title: 'Diversification',
    value: '85%',
    trend: 'up',
    description: 'Portfolio diversification score'
  }
];

const newsItems = [
  {
    id: 1,
    title: 'Hong Kong Markets Rally on Positive Economic Data',
    summary: 'Hang Seng Index closes 2.3% higher as latest GDP figures exceed expectations, boosting investor confidence.',
    time: '2 hours ago',
    category: 'Markets',
    priority: 'high'
  },
  {
    id: 2,
    title: 'BOCHK Launches New Green Finance Initiative',
    summary: 'Bank of China (Hong Kong) announces HK$50 billion commitment to sustainable finance projects.',
    time: '4 hours ago',
    category: 'Banking',
    priority: 'medium'
  },
  {
    id: 3,
    title: 'Fed Signals Potential Rate Cuts in Q2',
    summary: 'Federal Reserve hints at monetary policy adjustments, impacting global currency markets.',
    time: '6 hours ago',
    category: 'Global',
    priority: 'high'
  },
  {
    id: 4,
    title: 'ESG Investing Trends Shape Asian Markets',
    summary: 'Sustainable investment strategies gain momentum across Asia-Pacific region with record inflows.',
    time: '8 hours ago',
    category: 'ESG',
    priority: 'medium'
  },
  {
    id: 5,
    title: 'Cryptocurrency Regulations Update',
    summary: 'Hong Kong regulators provide clarity on digital asset trading frameworks for institutional investors.',
    time: '12 hours ago',
    category: 'Crypto',
    priority: 'low'
  }
];

const Index = () => {
  const [showMarketInsights, setShowMarketInsights] = useState(false);
  const [showFinancialNews, setShowFinancialNews] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-primary bg-primary/10';
      case 'medium':
        return 'border-l-secondary bg-secondary/10';
      default:
        return 'border-l-accent bg-accent/10';
    }
  };

  return (
    <div className="min-h-screen relative overflow-visible">
      <StarField />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-20" style={{ overflow: 'visible' }}>
        {/* Header - Mobile First */}
        <div className="text-center mb-4 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-2">
            <span className="text-white animate-float-gentle">Xin</span>
            <span className="text-transparent bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text ml-1 animate-[float-text-ai_3.5s_ease-in-out_infinite] [animation-delay:0.5s]">AI</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-3">
            BOCHK AI Agent - by HKUSTeam
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"></div>
        </div>

        {/* Chat Interface */}
        <div className="animate-fade-in mt-2 mb-8" style={{ animationDelay: '300ms' }}>
          <ChatInterface />
        </div>

        {/* Portfolio Visualizer - Always Visible */}
        <div className="animate-fade-in mb-8" style={{ animationDelay: '400ms' }}>
          <PortfolioSimulator />
        </div>

        {/* Financial News Expandable Section */}
        <div className="animate-fade-in mb-8" style={{ animationDelay: '500ms' }}>
          <Button
            onClick={() => setShowFinancialNews(!showFinancialNews)}
            className="w-full glass-panel p-6 rounded-2xl bg-gradient-to-r from-rm/20 to-rm/10 hover:from-rm/30 hover:to-rm/20 border border-rm/40 hover:border-rm/60 transition-all duration-300"
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-lg font-semibold">Financial News</span>
              {showFinancialNews ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </Button>

          {showFinancialNews && (
            <div className="mt-6 space-y-6 animate-fade-in">
              <div className="max-w-4xl mx-auto space-y-6">
                {newsItems.slice(0, 3).map((item, index) => (
                  <div
                    key={item.id}
                    className={`glass-panel p-6 border-l-4 ${getPriorityColor(item.priority)} 
                               hover:scale-102 transition-all duration-300 animate-fade-in`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                          {item.category}
                        </span>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {item.time}
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="glass-button">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <h2 className="text-xl font-bold mb-3 hover:text-primary transition-colors cursor-pointer">
                      {item.title}
                    </h2>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button className="bg-rm hover:bg-rm/80 shadow-glow">
                  Load More News
                </Button>
              </div>
            </div>
          )}
        </div>


        {/* Market Insights Expandable Section */}
        <div className="animate-fade-in mb-8" style={{ animationDelay: '600ms' }}>
          <Button
            onClick={() => setShowMarketInsights(!showMarketInsights)}
            className="w-full glass-panel p-6 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/10 hover:from-primary/30 hover:to-primary/20 border border-primary/40 hover:border-primary/60 transition-all duration-300"
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-lg font-semibold">Market Insights</span>
              {showMarketInsights ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </Button>

          {showMarketInsights && (
            <div className="mt-6 space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {insights.map((insight, index) => (
                  <div
                    key={insight.title}
                    className="glass-panel p-6 hover:scale-105 transition-transform duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 rounded-lg bg-primary/20">
                        {insight.trend === 'up' ? (
                          <TrendingUp className="w-5 h-5 text-primary" />
                        ) : insight.trend === 'down' ? (
                          <TrendingDown className="w-5 h-5 text-red-400" />
                        ) : (
                          <PieChart className="w-5 h-5 text-secondary" />
                        )}
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          insight.trend === 'up'
                            ? 'bg-green-500/20 text-green-400'
                            : insight.trend === 'down'
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-secondary/20 text-secondary'
                        }`}
                      >
                        {insight.trend}
                      </span>
                    </div>
                    <div className="text-2xl font-bold mb-2">{insight.value}</div>
                    <div className="text-sm text-muted-foreground">{insight.description}</div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="glass-panel p-8">
                  <h2 className="text-2xl font-bold mb-6">Market Analysis</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Hang Seng Index</span>
                      <span className="text-green-400">+1.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>USD/HKD</span>
                      <span className="text-red-400">-0.1%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>NASDAQ</span>
                      <span className="text-green-400">+0.8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Gold (USD/oz)</span>
                      <span className="text-green-400">+0.3%</span>
                    </div>
                  </div>
                </div>

                <div className="glass-panel p-8">
                  <h2 className="text-2xl font-bold mb-6">AI Recommendations</h2>
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-4">
                      <div className="font-medium">Rebalance Portfolio</div>
                      <div className="text-sm text-muted-foreground">
                        Consider increasing technology sector allocation
                      </div>
                    </div>
                    <div className="border-l-4 border-secondary pl-4">
                      <div className="font-medium">ESG Opportunity</div>
                      <div className="text-sm text-muted-foreground">
                        Green bonds showing strong performance potential
                      </div>
                    </div>
                    <div className="border-l-4 border-accent pl-4">
                      <div className="font-medium">Risk Assessment</div>
                      <div className="text-sm text-muted-foreground">
                        Current portfolio aligns with your risk tolerance
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Index;

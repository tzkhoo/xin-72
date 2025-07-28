import { TrendingUp, TrendingDown, DollarSign, Target, Calendar, BarChart3 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export const Dashboard = () => {
  const chartData = [
    { name: 'Stocks', value: 65, color: '#10B981', amount: '$1,849,935' },
    { name: 'Bonds', value: 25, color: '#3B82F6', amount: '$711,898' },
    { name: 'Cash', value: 10, color: '#6B7280', amount: '$284,759' }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">Portfolio Dashboard</h2>
      
      {/* Main Portfolio Visual */}
      <div className="glass-panel p-4 sm:p-6 lg:p-8 rounded-2xl">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Portfolio Overview */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              {/* Combined Total Value Card */}
              <div className="bg-gradient-to-r from-secondary/20 to-secondary/10 p-6 sm:p-8 rounded-xl border border-secondary/20 mb-6 text-center">
                <div className="text-base sm:text-lg text-muted-foreground mb-3">Total Portfolio Value</div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">$2,847,592</div>
                <div className="flex items-center justify-center gap-4 text-base sm:text-lg">
                  <span className="text-green-400 font-medium">+12.5% this month</span>
                </div>
              </div>
            </div>
            
            {/* Interactive Portfolio Allocation Chart */}
            <Dialog>
              <DialogTrigger asChild>
                <div className="h-48 sm:h-64 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-xl border border-glass-border cursor-pointer hover:shadow-lg transition-all group p-4">
                  <div className="flex items-center justify-between h-full">
                    <div className="flex-1">
                      <div className="text-lg font-semibold mb-2">Portfolio Allocation</div>
                      <div className="text-sm text-muted-foreground mb-4">Click to view detailed breakdown</div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Stocks (65%)</span>
                          <span className="text-green-400">$1,849,935</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Bonds (25%)</span>
                          <span className="text-blue-400">$711,898</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cash (10%)</span>
                          <span className="text-gray-400">$284,759</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={20}
                            outerRadius={40}
                            dataKey="value"
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Portfolio Allocation Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="w-full h-80 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={120}
                          innerRadius={60}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value, name, props) => [
                            `${value}% (${props.payload.amount})`, 
                            name
                          ]}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-panel p-4">
                      <div className="text-sm text-muted-foreground">Stocks</div>
                      <div className="text-2xl font-bold">65%</div>
                      <div className="text-sm text-green-400">$1,849,935</div>
                    </div>
                    <div className="glass-panel p-4">
                      <div className="text-sm text-muted-foreground">Bonds</div>
                      <div className="text-2xl font-bold">25%</div>
                      <div className="text-sm text-blue-400">$711,898</div>
                    </div>
                    <div className="glass-panel p-4">
                      <div className="text-sm text-muted-foreground">Cash</div>
                      <div className="text-2xl font-bold">10%</div>
                      <div className="text-sm text-gray-400">$284,759</div>
                    </div>
                    <div className="glass-panel p-4">
                      <div className="text-sm text-muted-foreground">Risk Score</div>
                      <div className="text-2xl font-bold text-accent">7.2/10</div>
                      <div className="text-sm text-muted-foreground">Moderate-High</div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Wealth Management Metrics */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {/* Performance Metrics */}
              <div className="glass-panel p-4 rounded-xl">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Performance Overview
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">YTD Return</span>
                    <span className="text-green-400 font-medium">+12.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">1Y Return</span>
                    <span className="text-green-400 font-medium">+18.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">3Y Avg Return</span>
                    <span className="text-green-400 font-medium">+9.7%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Sharpe Ratio</span>
                    <span className="text-accent font-medium">1.24</span>
                  </div>
                </div>
              </div>

              {/* Asset Allocation Summary */}
              <div className="glass-panel p-4 rounded-xl">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  Top Holdings
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Apple Inc. (AAPL)</span>
                    <span className="font-medium">8.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Microsoft Corp (MSFT)</span>
                    <span className="font-medium">6.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Amazon.com Inc (AMZN)</span>
                    <span className="font-medium">5.4%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">US Treasury 10Y Bond</span>
                    <span className="font-medium">4.1%</span>
                  </div>
                </div>
              </div>

              {/* Monthly Insights */}
              <div className="glass-panel p-4 rounded-xl">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  Monthly Insights
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <DollarSign className="w-4 h-4 text-green-400 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">Dividend Income</div>
                      <div className="text-xs text-muted-foreground">$4,832 this month</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-blue-400 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">Goal Progress</div>
                      <div className="text-xs text-muted-foreground">78% to retirement target</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <TrendingDown className="w-4 h-4 text-orange-400 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">Risk Alert</div>
                      <div className="text-xs text-muted-foreground">Consider rebalancing tech exposure</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
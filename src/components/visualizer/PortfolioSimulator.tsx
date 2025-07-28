import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PortfolioSphere } from './PortfolioSphere';
import { AssetFlowDiagram } from './AssetFlowDiagram';
import { Button } from '@/components/ui/button';
import { Vector3 } from 'three';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Globe, TrendingUp, Leaf, Settings } from 'lucide-react';

const mockPortfolioData = {
  totalValue: 1250000,
  assets: [
    { id: 'stocks', name: 'Global Stocks', value: 500000, percentage: 40, risk: 'medium' as const, esg: 75 },
    { id: 'bonds', name: 'Green Bonds', value: 375000, percentage: 30, risk: 'low' as const, esg: 85 },
    { id: 'reits', name: 'ESG REITs', value: 187500, percentage: 15, risk: 'medium' as const, esg: 80 },
    { id: 'commodities', name: 'Clean Energy', value: 125000, percentage: 10, risk: 'high' as const, esg: 90 },
    { id: 'cash', name: 'Cash & Equivalents', value: 62500, percentage: 5, risk: 'low' as const, esg: 60 }
  ]
};

const sphereAllocations = [
  { name: 'Stocks', percentage: 40, color: '#3B82F6', position: new Vector3(0, 0, 0) },
  { name: 'Bonds', percentage: 30, color: '#10B981', position: new Vector3(0, 0, 0) },
  { name: 'REITs', percentage: 15, color: '#F59E0B', position: new Vector3(0, 0, 0) },
  { name: 'Clean Energy', percentage: 10, color: '#8B5CF6', position: new Vector3(0, 0, 0) },
  { name: 'Cash', percentage: 5, color: '#6B7280', position: new Vector3(0, 0, 0) }
];

export const PortfolioSimulator: React.FC = () => {
  const [activeView, setActiveView] = useState<'sphere' | 'flow'>('sphere');
  const [allocations, setAllocations] = useState(sphereAllocations);
  const [riskTolerance, setRiskTolerance] = useState([5]);
  const [esgFocus, setEsgFocus] = useState([7]);

  const totalESGScore = mockPortfolioData.assets.reduce((acc, asset) => 
    acc + (asset.esg * asset.percentage / 100), 0
  );

  const carbonReduced = Math.round(totalESGScore * 2.5); // tons CO2
  const energyGenerated = Math.round(totalESGScore * 1.8); // MWh
  const communitiesHelped = Math.round(totalESGScore / 10); // number

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-2">Portfolio Visualizer</h2>
        <p className="text-muted-foreground">
          Interactive visualization of your investment portfolio and ESG impact
        </p>
      </motion.div>

      {/* ESG Impact Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="glass-panel border-primary/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carbon Reduced</CardTitle>
            <Leaf className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{carbonReduced} tons</div>
            <p className="text-xs text-muted-foreground">CO₂ equivalent reduced</p>
          </CardContent>
        </Card>

        <Card className="glass-panel border-secondary/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clean Energy</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{energyGenerated} MWh</div>
            <p className="text-xs text-muted-foreground">Generated annually</p>
          </CardContent>
        </Card>

        <Card className="glass-panel border-accent/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Communities</CardTitle>
            <Globe className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{communitiesHelped}</div>
            <p className="text-xs text-muted-foreground">Communities supported</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Controls */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-panel p-6 rounded-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <h3 className="font-semibold">Risk Tolerance</h3>
            </div>
            <Slider
              value={riskTolerance}
              onValueChange={setRiskTolerance}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Conservative</span>
              <span>Current: {riskTolerance[0]}/10</span>
              <span>Aggressive</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4" />
              <h3 className="font-semibold">ESG Focus</h3>
            </div>
            <Slider
              value={esgFocus}
              onValueChange={setEsgFocus}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Standard</span>
              <span>Current: {esgFocus[0]}/10</span>
              <span>Maximum ESG</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Visualization Tabs */}
      <Tabs value={activeView} onValueChange={(value) => setActiveView(value as 'sphere' | 'flow')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sphere" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            3D Portfolio View
          </TabsTrigger>
          <TabsTrigger value="flow" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Asset Flow Diagram
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sphere" className="space-y-4">
          <PortfolioSphere 
            allocations={allocations} 
            totalValue={mockPortfolioData.totalValue} 
          />
        </TabsContent>

        <TabsContent value="flow" className="space-y-4">
          <AssetFlowDiagram portfolioData={mockPortfolioData} />
        </TabsContent>
      </Tabs>

      {/* Portfolio Summary */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-panel p-6 rounded-2xl"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Portfolio Allocation</h3>
          <Badge variant="outline" className="bg-primary/10">
            ESG Score: {totalESGScore.toFixed(1)}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {mockPortfolioData.assets.map((asset) => (
            <div key={asset.id} className="text-center space-y-2">
              <div className="font-medium">{asset.name}</div>
              <div className="text-2xl font-bold text-primary">{asset.percentage}%</div>
              <div className="text-sm text-muted-foreground">
                HK${(asset.value / 1000).toFixed(0)}K
              </div>
              <Badge 
                variant="outline" 
                className={
                  asset.risk === 'low' ? 'border-green-500/50 text-green-400' :
                  asset.risk === 'medium' ? 'border-yellow-500/50 text-yellow-400' :
                  'border-red-500/50 text-red-400'
                }
              >
                {asset.risk} risk
              </Badge>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
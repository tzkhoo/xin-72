import React, { useCallback } from 'react';
import { 
  ReactFlow, 
  Node, 
  Edge, 
  useNodesState, 
  useEdgesState, 
  Controls, 
  Background, 
  ConnectionMode
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion } from 'framer-motion';

interface AssetFlowProps {
  portfolioData: {
    assets: Array<{
      id: string;
      name: string;
      value: number;
      percentage: number;
      risk: 'low' | 'medium' | 'high';
      esg: number;
    }>;
  };
}

const createFlowNodes = (assets: AssetFlowProps['portfolioData']['assets']): Node[] => {
  const nodes: Node[] = [
    {
      id: 'portfolio',
      type: 'input',
      position: { x: 0, y: 200 },
      data: { 
        label: (
          <div className="text-center p-4">
            <div className="font-bold text-lg">Your Portfolio</div>
            <div className="text-sm text-muted-foreground">Total Value</div>
          </div>
        )
      },
      style: {
        background: 'hsl(var(--primary) / 0.1)',
        border: '2px solid hsl(var(--primary))',
        borderRadius: '12px',
        width: 200,
        height: 80
      }
    }
  ];

  assets.forEach((asset, index) => {
    const y = index * 120 + 50;
    const x = 400;
    
    nodes.push({
      id: asset.id,
      position: { x, y },
      data: { 
        label: (
          <div className="text-center p-3">
            <div className="font-semibold">{asset.name}</div>
            <div className="text-sm text-muted-foreground">{asset.percentage}%</div>
            <div className="text-xs mt-1">
              <span className={`px-2 py-1 rounded-full text-xs ${
                asset.risk === 'low' ? 'bg-green-500/20 text-green-400' :
                asset.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {asset.risk} risk
              </span>
            </div>
          </div>
        )
      },
      style: {
        background: asset.risk === 'low' ? 'hsl(var(--secondary) / 0.1)' :
                   asset.risk === 'medium' ? 'hsl(var(--accent) / 0.1)' :
                   'hsl(var(--destructive) / 0.1)',
        border: asset.risk === 'low' ? '2px solid hsl(var(--secondary))' :
                asset.risk === 'medium' ? '2px solid hsl(var(--accent))' :
                '2px solid hsl(var(--destructive))',
        borderRadius: '12px',
        width: 180,
        height: 100
      }
    });

    // ESG Impact nodes
    if (asset.esg > 70) {
      nodes.push({
        id: `esg-${asset.id}`,
        position: { x: x + 300, y: y + 20 },
        data: { 
          label: (
            <div className="text-center p-2">
              <div className="text-sm font-medium">ESG Impact</div>
              <div className="text-xs text-green-400">Score: {asset.esg}</div>
            </div>
          )
        },
        style: {
          background: 'hsl(var(--primary) / 0.1)',
          border: '1px solid hsl(var(--primary))',
          borderRadius: '8px',
          width: 120,
          height: 60
        }
      });
    }
  });

  return nodes;
};

const createFlowEdges = (assets: AssetFlowProps['portfolioData']['assets']): Edge[] => {
  const edges: Edge[] = [];

  assets.forEach((asset) => {
    edges.push({
      id: `portfolio-${asset.id}`,
      source: 'portfolio',
      target: asset.id,
      animated: true,
      style: { 
        strokeWidth: Math.max(2, asset.percentage / 10),
        stroke: asset.risk === 'low' ? 'hsl(var(--secondary))' :
                asset.risk === 'medium' ? 'hsl(var(--accent))' :
                'hsl(var(--destructive))'
      },
      label: `${asset.percentage}%`
    });

    if (asset.esg > 70) {
      edges.push({
        id: `${asset.id}-esg-${asset.id}`,
        source: asset.id,
        target: `esg-${asset.id}`,
        animated: true,
        style: { 
          strokeWidth: 2,
          stroke: 'hsl(var(--primary))',
          strokeDasharray: '5,5'
        }
      });
    }
  });

  return edges;
};

export const AssetFlowDiagram: React.FC<AssetFlowProps> = ({ portfolioData }) => {
  const initialNodes = createFlowNodes(portfolioData.assets);
  const initialEdges = createFlowEdges(portfolioData.assets);
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="w-full h-[500px] glass-panel rounded-2xl overflow-hidden"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        connectionMode={ConnectionMode.Loose}
        fitView
        style={{ background: 'transparent' }}
      >
        <Controls style={{ background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }} />
        <Background color="hsl(var(--muted-foreground))" gap={20} />
      </ReactFlow>
    </motion.div>
  );
};
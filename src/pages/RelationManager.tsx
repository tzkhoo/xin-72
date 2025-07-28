import { StarField } from '@/components/StarField';
import { RMDashboard } from '@/components/RMDashboard';

const RelationManager = () => {
  return (
    <div className="min-h-screen relative overflow-visible">
      <StarField />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-20" style={{ overflow: 'visible' }}>
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-2">
            <span className="text-white animate-[float-text_3s_ease-in-out_infinite]">Relation</span>
            <span className="text-transparent bg-gradient-to-r from-rm via-rm-glow to-rm bg-clip-text ml-1 animate-[float-text_3s_ease-in-out_infinite] [animation-delay:0.5s]">Manager</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-3">
            AI-Powered Customer Insights & Advisory Tools
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rm to-transparent mx-auto"></div>
        </div>

        {/* RM Dashboard */}
        <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
          <RMDashboard />
        </div>
      </div>
    </div>
  );
};

export default RelationManager;
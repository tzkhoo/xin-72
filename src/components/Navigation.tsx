import { Bot, BarChart3, Newspaper } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navigationItems = [
  {
    id: 'bochk-client',
    label: ['BOCHK', 'Client'],
    icon: Bot,
    path: '/',
    activeColor: 'bg-primary/90 border-primary text-primary-foreground shadow-[0_0_20px_hsl(343_75%_43%/0.5)]',
    hoverColor: 'hover:bg-primary/20 hover:border-primary/40 hover:shadow-[0_0_15px_hsl(343_75%_43%/0.3)]'
  },
  {
    id: 'parents',
    label: ['Parents'], 
    icon: BarChart3,
    path: '/parents',
    activeColor: 'bg-parent/90 border-parent text-parent-foreground shadow-[0_0_20px_hsl(45_95%_55%/0.5)]',
    hoverColor: 'hover:bg-parent/20 hover:border-parent/40 hover:shadow-[0_0_15px_hsl(45_95%_55%/0.3)]'
  },
  {
    id: 'relation-manager',
    label: ['Relation', 'Manager'],
    icon: Newspaper,
    path: '/relation-manager', 
    activeColor: 'bg-rm/90 border-rm text-rm-foreground shadow-[0_0_20px_hsl(210_95%_65%/0.5)]',
    hoverColor: 'hover:bg-rm/20 hover:border-rm/40 hover:shadow-[0_0_15px_hsl(210_95%_65%/0.3)]'
  }
];

export const Navigation = () => {
  const location = useLocation();
  
  const activeIndex = navigationItems.findIndex(item => item.path === location.pathname);
  const activeItem = navigationItems[activeIndex];

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
       <div className="relative flex items-center gap-2 px-3 py-2 backdrop-blur-xl bg-glass border border-glass-border rounded-2xl"
            style={{ boxShadow: 'var(--shadow-glass)' }}>
        {/* Sliding background indicator */}
        <div 
          className={`absolute h-16 w-[90px] rounded-xl border transition-all duration-500 ease-out z-0 ${
            activeItem ? activeItem.activeColor : 'opacity-0'
          }`}
          style={{
            transform: `translateX(${activeIndex >= 0 ? activeIndex * 98 : 0}px)`, // 90px width + 8px gap
            left: '12px' // Account for padding
          }}
        />
        
        {navigationItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`
                  relative z-10 flex flex-col items-center justify-center gap-0.5 px-2 py-2 rounded-xl w-[90px] h-16
                  backdrop-blur-md border transition-all duration-300 ease-out
                  ${isActive 
                    ? 'border-transparent bg-transparent text-current font-bold' 
                    : 'bg-glass/50 border-glass-border hover:scale-105 ' + item.hoverColor
                  }
                `}
              >
               <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'animate-gentle-bounce' : 'hover:scale-110'}`} />
               <div className={`text-[10px] font-semibold text-center transition-all duration-300 ${isActive ? 'font-bold' : 'hover:font-semibold'} leading-tight`}>
                 {Array.isArray(item.label) ? (
                   item.label.map((line, index) => (
                     <div key={index}>{line}</div>
                   ))
                 ) : (
                   item.label
                 )}
               </div>
             </Link>
           );
        })}
      </div>
    </nav>
  );
};
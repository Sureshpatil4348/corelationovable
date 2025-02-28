
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChartLineIcon, 
  SettingsIcon,
  NetworkIcon,
  RefreshCwIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { 
      path: '/dashboard', 
      label: 'Dashboard', 
      icon: <NetworkIcon className="h-5 w-5" /> 
    },
    { 
      path: '/strategy', 
      label: 'Strategy', 
      icon: <RefreshCwIcon className="h-5 w-5" /> 
    },
    { 
      path: '/analytics', 
      label: 'Analytics', 
      icon: <ChartLineIcon className="h-5 w-5" /> 
    },
    { 
      path: '/settings', 
      label: 'Settings', 
      icon: <SettingsIcon className="h-5 w-5" /> 
    },
  ];

  return (
    <div className="fixed inset-y-0 left-0 z-10 w-64 transform transition-transform duration-300 ease-in-out bg-background border-r border-border">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <NetworkIcon className="h-5 w-5 text-primary-foreground" />
          </div>
          <h2 className="text-lg font-medium">Trading Framework</h2>
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="absolute bottom-0 w-full p-6">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-muted flex items-center justify-center">
            <span className="text-xs font-medium">AT</span>
          </div>
          <div>
            <p className="font-medium text-foreground">Automated Trading</p>
            <p className="text-xs">Bridge Active</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

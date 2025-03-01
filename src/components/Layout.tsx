
import React from 'react';
import Sidebar from './Sidebar';
import NotificationSystem from './NotificationSystem';
import ConnectionStatus from './ConnectionStatus';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Don't show sidebar on login page
  const isLoginPage = location.pathname === '/';
  
  if (isLoginPage) {
    return <main className="flex min-h-screen w-full">{children}</main>;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-semibold tracking-tight animate-fade-in">
              {location.pathname === '/dashboard' && 'Dashboard'}
              {location.pathname === '/strategy' && 'Strategy Management'}
              {location.pathname === '/indicators' && 'Indicators'}
              {location.pathname === '/analytics' && 'Analytics'}
              {location.pathname === '/settings' && 'Settings'}
            </h1>
            <div className="flex items-center gap-4">
              <ConnectionStatus />
              <NotificationSystem />
            </div>
          </div>
          <div className="animate-fade-in">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;


import React, { useState, useEffect } from 'react';
import { PlugIcon, NetworkIcon, PowerOffIcon } from 'lucide-react';
import { ConnectionStatus as ConnectionStatusType } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const ConnectionStatus: React.FC = () => {
  const [status, setStatus] = useState<ConnectionStatusType>('disconnected');
  
  // Simulate connection status changes
  useEffect(() => {
    // In a real app, this would listen to the actual connection status
    const timer = setTimeout(() => {
      setStatus('connected');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const getStatusIcon = () => {
    switch (status) {
      case 'connected':
        return <NetworkIcon className="h-4 w-4 text-profit" />;
      case 'connecting':
        return <PlugIcon className="h-4 w-4 text-chart-yellow animate-pulse-slow" />;
      case 'disconnected':
        return <PowerOffIcon className="h-4 w-4 text-loss" />;
    }
  };
  
  const getStatusText = () => {
    switch (status) {
      case 'connected':
        return 'Connected to MT5';
      case 'connecting':
        return 'Connecting...';
      case 'disconnected':
        return 'Disconnected';
    }
  };
  
  const getStatusClass = () => {
    switch (status) {
      case 'connected':
        return 'border-profit text-profit';
      case 'connecting':
        return 'border-chart-yellow text-chart-yellow';
      case 'disconnected':
        return 'border-loss text-loss';
    }
  };
  
  const handleReconnect = () => {
    setStatus('connecting');
    
    // Simulate reconnection
    setTimeout(() => {
      setStatus('connected');
    }, 2000);
  };

  return (
    <div className={cn(
      "flex items-center gap-2 px-3 py-1.5 rounded-md border transition-all duration-300",
      getStatusClass()
    )}>
      {getStatusIcon()}
      <span className="text-sm font-medium">
        {getStatusText()}
      </span>
      
      {status === 'disconnected' && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="ml-2 h-7 px-2 text-xs"
          onClick={handleReconnect}
        >
          Reconnect
        </Button>
      )}
    </div>
  );
};

export default ConnectionStatus;

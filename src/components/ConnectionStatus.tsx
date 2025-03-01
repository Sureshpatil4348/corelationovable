
import React from 'react';
import { PlugIcon, NetworkIcon, PowerOffIcon } from 'lucide-react';
import { ConnectionStatus as ConnectionStatusType } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useMT5 } from '@/context/MT5Context';

const ConnectionStatus: React.FC = () => {
  const { connectionStatus, reconnect, disconnect, accountInfo } = useMT5();
  
  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <NetworkIcon className="h-4 w-4 text-profit" />;
      case 'connecting':
        return <PlugIcon className="h-4 w-4 text-chart-yellow animate-pulse-slow" />;
      case 'disconnected':
        return <PowerOffIcon className="h-4 w-4 text-loss" />;
    }
  };
  
  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return `Connected to MT5${accountInfo ? ` (${accountInfo.name})` : ''}`;
      case 'connecting':
        return 'Connecting...';
      case 'disconnected':
        return 'Disconnected';
    }
  };
  
  const getStatusClass = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'border-profit text-profit';
      case 'connecting':
        return 'border-chart-yellow text-chart-yellow';
      case 'disconnected':
        return 'border-loss text-loss';
    }
  };
  
  const handleReconnect = () => {
    reconnect();
  };

  const handleDisconnect = () => {
    disconnect();
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
      
      {connectionStatus === 'disconnected' && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="ml-2 h-7 px-2 text-xs"
          onClick={handleReconnect}
        >
          Reconnect
        </Button>
      )}

      {connectionStatus === 'connected' && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="ml-2 h-7 px-2 text-xs"
          onClick={handleDisconnect}
        >
          Disconnect
        </Button>
      )}
    </div>
  );
};

export default ConnectionStatus;

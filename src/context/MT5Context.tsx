
import React, { createContext, useContext, useState, useEffect } from "react";
import { ConnectionStatus, MT5Credentials, MT5ConnectionResponse } from "@/types";
import { connectToMT5, disconnectFromMT5, getAccountInfo } from "@/services/mt5Service";
import { useToast } from "@/hooks/use-toast";

interface MT5ContextType {
  connectionStatus: ConnectionStatus;
  accountInfo: MT5ConnectionResponse["account_info"] | null;
  connect: (credentials: MT5Credentials) => Promise<boolean>;
  disconnect: () => Promise<boolean>;
  reconnect: () => Promise<boolean>;
  lastCredentials: MT5Credentials | null;
}

const MT5Context = createContext<MT5ContextType>({
  connectionStatus: "disconnected",
  accountInfo: null,
  connect: async () => false,
  disconnect: async () => false,
  reconnect: async () => false,
  lastCredentials: null,
});

export const useMT5 = () => useContext(MT5Context);

export const MT5Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("disconnected");
  const [accountInfo, setAccountInfo] = useState<MT5ConnectionResponse["account_info"] | null>(null);
  const [lastCredentials, setLastCredentials] = useState<MT5Credentials | null>(null);

  // Check for existing connection on component mount
  useEffect(() => {
    const storedConnection = localStorage.getItem("mt5Connection");
    const storedCredentials = localStorage.getItem("mt5Credentials");

    if (storedConnection && storedCredentials) {
      try {
        const connectionData = JSON.parse(storedConnection);
        const credentials = JSON.parse(storedCredentials);
        
        if (connectionData.connected) {
          setConnectionStatus("connected");
          setAccountInfo(connectionData.account_info || null);
          setLastCredentials(credentials);
        }
      } catch (error) {
        console.error("Error parsing stored MT5 connection", error);
        localStorage.removeItem("mt5Connection");
        localStorage.removeItem("mt5Credentials");
      }
    }
  }, []);

  const connect = async (credentials: MT5Credentials): Promise<boolean> => {
    setConnectionStatus("connecting");
    
    try {
      const response = await connectToMT5(credentials);
      
      if (response.connected) {
        setConnectionStatus("connected");
        setAccountInfo(response.account_info || null);
        setLastCredentials(credentials);
        
        // Store connection info in localStorage for persistence
        localStorage.setItem("mt5Connection", JSON.stringify(response));
        localStorage.setItem("mt5Credentials", JSON.stringify(credentials));
        
        toast({
          title: "Connected to MT5",
          description: response.message,
        });
        
        return true;
      } else {
        setConnectionStatus("disconnected");
        
        toast({
          title: "Connection Failed",
          description: response.message,
          variant: "destructive",
        });
        
        return false;
      }
    } catch (error) {
      setConnectionStatus("disconnected");
      
      toast({
        title: "Connection Error",
        description: error instanceof Error ? error.message : "Failed to connect to MT5",
        variant: "destructive",
      });
      
      return false;
    }
  };

  const disconnect = async (): Promise<boolean> => {
    if (connectionStatus !== "disconnected") {
      setConnectionStatus("disconnected");
      
      try {
        const response = await disconnectFromMT5();
        
        if (response.disconnected) {
          setAccountInfo(null);
          
          // Remove stored connection info
          localStorage.removeItem("mt5Connection");
          
          toast({
            title: "Disconnected from MT5",
            description: response.message,
          });
          
          return true;
        }
      } catch (error) {
        toast({
          title: "Disconnection Error",
          description: error instanceof Error ? error.message : "Failed to disconnect from MT5",
          variant: "destructive",
        });
      }
    }
    
    return false;
  };

  const reconnect = async (): Promise<boolean> => {
    if (lastCredentials) {
      return await connect(lastCredentials);
    }
    
    toast({
      title: "Reconnection Failed",
      description: "No previous connection credentials found",
      variant: "destructive",
    });
    
    return false;
  };

  return (
    <MT5Context.Provider value={{ connectionStatus, accountInfo, connect, disconnect, reconnect, lastCredentials }}>
      {children}
    </MT5Context.Provider>
  );
};

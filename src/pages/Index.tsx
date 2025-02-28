
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NetworkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    server: '',
    terminal: '',
  });
  
  const [isConnecting, setIsConnecting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    const { username, password, server, terminal } = credentials;
    if (!username || !password || !server || !terminal) {
      toast({
        title: "Missing Information",
        description: "All fields are required to establish a connection.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate connection process
    setIsConnecting(true);
    
    setTimeout(() => {
      setIsConnecting(false);
      
      toast({
        title: "Connection Established",
        description: "Successfully connected to the MT5 terminal.",
      });
      
      // Navigate to dashboard on success
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background px-4 py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[40%] -right-[30%] w-[70%] h-[70%] bg-gradient-to-br from-muted/30 to-background rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[40%] -left-[30%] w-[70%] h-[70%] bg-gradient-to-tr from-muted/30 to-background rounded-full blur-3xl"></div>
      </div>
      
      <div className="w-full max-w-md space-y-8 relative z-10 animate-fade-in">
        <div className="flex flex-col items-center text-center">
          <div className="h-14 w-14 rounded-xl bg-primary flex items-center justify-center mb-4">
            <NetworkIcon className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Automated Trading Framework
          </h1>
          <p className="text-muted-foreground mt-2 max-w-sm">
            Connect to your MT5 terminal to start automated trading with real-time strategy execution and analytics.
          </p>
        </div>
        
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle>MT5 Bridge Connection</CardTitle>
            <CardDescription>
              Enter your MT5 credentials and terminal address to establish a connection.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">MT5 Username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Enter your MT5 username"
                  value={credentials.username}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">MT5 Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your MT5 password"
                  value={credentials.password}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="server">MT5 Server</Label>
                <Input
                  id="server"
                  name="server"
                  placeholder="e.g. Demo-Server"
                  value={credentials.server}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="terminal">Terminal Address</Label>
                <Input
                  id="terminal"
                  name="terminal"
                  placeholder="e.g. 127.0.0.1:5555"
                  value={credentials.terminal}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              
              <Button
                type="submit"
                className="w-full mt-6"
                disabled={isConnecting}
              >
                {isConnecting ? "Connecting..." : "Connect to MT5"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-muted-foreground">
            This is for internal use only. No data is encrypted.
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;

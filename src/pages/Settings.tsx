
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const Settings: React.FC = () => {
  const { toast } = useToast();
  
  const [mt5Credentials, setMT5Credentials] = useState({
    username: 'trader123',
    password: '••••••••',
    server: 'Demo-Server',
    terminal: '127.0.0.1:5555',
  });
  
  const [notifications, setNotifications] = useState({
    tradeNotifications: true,
    connectionAlerts: true,
    dailySummary: false,
    emailNotifications: false,
  });
  
  const [display, setDisplay] = useState({
    darkMode: false,
    compactView: false,
    refreshInterval: 5,
  });
  
  const handleCredentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMT5Credentials((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleNotificationToggle = (name: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [name]: !prev[name] }));
  };
  
  const handleDisplayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDisplay((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleDisplayToggle = (name: keyof typeof display) => {
    if (typeof display[name] === 'boolean') {
      setDisplay((prev) => ({ ...prev, [name]: !prev[name] }));
    }
  };
  
  const handleSaveConnection = () => {
    toast({
      title: "Settings Saved",
      description: "Your connection settings have been updated successfully.",
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  };
  
  const handleSaveDisplay = () => {
    toast({
      title: "Display Settings Saved",
      description: "Your display preferences have been updated.",
    });
  };

  return (
    <Layout>
      <Tabs defaultValue="connection" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="connection">MT5 Connection</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="display">Display</TabsTrigger>
        </TabsList>
        
        <TabsContent value="connection" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>MT5 Connection Settings</CardTitle>
              <CardDescription>
                Manage your connection to the MT5 broker
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">MT5 Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={mt5Credentials.username}
                  onChange={handleCredentialsChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">MT5 Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={mt5Credentials.password}
                  onChange={handleCredentialsChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="server">MT5 Server</Label>
                <Input
                  id="server"
                  name="server"
                  value={mt5Credentials.server}
                  onChange={handleCredentialsChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="terminal">Terminal Address</Label>
                <Input
                  id="terminal"
                  name="terminal"
                  value={mt5Credentials.terminal}
                  onChange={handleCredentialsChange}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveConnection}>
                Save Connection Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure your notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Trade Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications when trades are opened or closed
                  </p>
                </div>
                <Switch
                  checked={notifications.tradeNotifications}
                  onCheckedChange={() => handleNotificationToggle('tradeNotifications')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Connection Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about connection status changes
                  </p>
                </div>
                <Switch
                  checked={notifications.connectionAlerts}
                  onCheckedChange={() => handleNotificationToggle('connectionAlerts')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Daily Summary</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive a daily summary of trading activity
                  </p>
                </div>
                <Switch
                  checked={notifications.dailySummary}
                  onCheckedChange={() => handleNotificationToggle('dailySummary')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Send important notifications to your email
                  </p>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={() => handleNotificationToggle('emailNotifications')}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveNotifications}>
                Save Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="display" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
              <CardDescription>
                Customize your interface preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark theme
                  </p>
                </div>
                <Switch
                  checked={display.darkMode}
                  onCheckedChange={() => handleDisplayToggle('darkMode')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Compact View</Label>
                  <p className="text-sm text-muted-foreground">
                    Use a more compact layout for tables and charts
                  </p>
                </div>
                <Switch
                  checked={display.compactView}
                  onCheckedChange={() => handleDisplayToggle('compactView')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="refreshInterval">Data Refresh Interval (seconds)</Label>
                <Input
                  id="refreshInterval"
                  name="refreshInterval"
                  type="number"
                  min="1"
                  max="60"
                  value={display.refreshInterval}
                  onChange={handleDisplayChange}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveDisplay}>
                Save Display Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Settings;

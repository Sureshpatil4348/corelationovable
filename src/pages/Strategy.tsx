
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import StrategyForm from '@/components/StrategyForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { mockStrategyParameters } from '@/utils/mockData';
import { StrategyParameters } from '@/types';
import { Button } from '@/components/ui/button';
import { PlusIcon, PlayIcon, PauseIcon, Trash2Icon, Settings2Icon, ListIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

interface Strategy {
  id: string;
  name: string;
  parameters: StrategyParameters;
  isActive: boolean;
}

const Strategy: React.FC = () => {
  const { toast } = useToast();
  const [strategies, setStrategies] = useState<Strategy[]>([
    {
      id: '1',
      name: 'EUR/USD & GBP/USD Correlation',
      parameters: mockStrategyParameters,
      isActive: true
    }
  ]);
  
  const [activeStrategy, setActiveStrategy] = useState<string>('1');
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newStrategyName, setNewStrategyName] = useState<string>('');
  
  const handleSubmit = (updatedParameters: StrategyParameters) => {
    setStrategies(prevStrategies => 
      prevStrategies.map(strategy => 
        strategy.id === activeStrategy 
          ? { ...strategy, parameters: updatedParameters }
          : strategy
      )
    );
    
    toast({
      title: "Strategy Updated",
      description: "Your strategy parameters have been updated successfully",
    });
  };
  
  const addNewStrategy = () => {
    const newStrategyId = `strat-${Date.now()}`;
    const newStrategy: Strategy = {
      id: newStrategyId,
      name: newStrategyName || `Strategy ${strategies.length + 1}`,
      parameters: {
        ...mockStrategyParameters,
        currencyPair1: 'EURUSD',
        currencyPair2: 'GBPUSD',
      },
      isActive: false
    };
    
    setStrategies([...strategies, newStrategy]);
    setActiveStrategy(newStrategyId);
    setNewStrategyName('');
    setEditMode(false);
    
    toast({
      title: "New Strategy Added",
      description: `${newStrategy.name} has been added to your strategies`,
    });
  };
  
  const deleteStrategy = (id: string) => {
    setStrategies(strategies.filter(strategy => strategy.id !== id));
    
    if (activeStrategy === id) {
      setActiveStrategy(strategies[0]?.id || '');
    }
    
    toast({
      title: "Strategy Removed",
      description: "The strategy has been removed from your list",
    });
  };
  
  const toggleStrategy = (id: string) => {
    setStrategies(prevStrategies => 
      prevStrategies.map(strategy => 
        strategy.id === id 
          ? { ...strategy, isActive: !strategy.isActive }
          : strategy
      )
    );
    
    const strategy = strategies.find(s => s.id === id);
    
    toast({
      title: strategy?.isActive ? "Strategy Paused" : "Strategy Activated",
      description: strategy?.isActive 
        ? `${strategy.name} has been paused` 
        : `${strategy.name} is now running`,
    });
  };
  
  const getCurrentStrategy = () => {
    return strategies.find(strategy => strategy.id === activeStrategy) || strategies[0];
  };

  return (
    <Layout>
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="list" className="flex items-center gap-2">
            <ListIcon className="h-4 w-4" />
            Strategies List
          </TabsTrigger>
          <TabsTrigger value="edit" className="flex items-center gap-2">
            <Settings2Icon className="h-4 w-4" />
            Edit Strategy
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="animate-fade-in">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Strategy Management</CardTitle>
              <CardDescription>
                Add, configure, and activate multiple trading strategies
              </CardDescription>
            </CardHeader>
            <CardContent>
              {editMode ? (
                <div className="flex items-end gap-4 mb-4">
                  <div className="flex-1">
                    <label htmlFor="strategyName" className="block text-sm font-medium text-muted-foreground mb-1">
                      Strategy Name
                    </label>
                    <input
                      type="text"
                      id="strategyName"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                      placeholder="Enter strategy name"
                      value={newStrategyName}
                      onChange={(e) => setNewStrategyName(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={addNewStrategy}>
                      Add Strategy
                    </Button>
                    <Button variant="outline" onClick={() => setEditMode(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button onClick={() => setEditMode(true)} className="mb-4">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add New Strategy
                </Button>
              )}
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Strategy Name</TableHead>
                      <TableHead>Currency Pairs</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {strategies.map((strategy) => (
                      <TableRow key={strategy.id}>
                        <TableCell className="font-medium">{strategy.name}</TableCell>
                        <TableCell>
                          {strategy.parameters.currencyPair1} & {strategy.parameters.currencyPair2}
                        </TableCell>
                        <TableCell>
                          <Badge variant={strategy.isActive ? "default" : "outline"}>
                            {strategy.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setActiveStrategy(strategy.id);
                                document.querySelector('[data-value="edit"]')?.click();
                              }}
                              title="Edit"
                            >
                              <Settings2Icon className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleStrategy(strategy.id)}
                              title={strategy.isActive ? "Pause" : "Start"}
                            >
                              {strategy.isActive ? (
                                <PauseIcon className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <PlayIcon className="h-4 w-4 text-profit" />
                              )}
                            </Button>
                            {strategies.length > 1 && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteStrategy(strategy.id)}
                                title="Delete"
                              >
                                <Trash2Icon className="h-4 w-4 text-loss" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="flex items-center justify-between w-full">
                <div className="text-sm text-muted-foreground">
                  Total strategies: {strategies.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Active strategies: {strategies.filter(s => s.isActive).length}
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="edit" className="animate-fade-in">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Strategy Parameters</CardTitle>
                <CardDescription>
                  Configure the strategy: {getCurrentStrategy()?.name}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Active</span>
                <Switch 
                  checked={getCurrentStrategy()?.isActive || false}
                  onCheckedChange={() => toggleStrategy(getCurrentStrategy()?.id || '')}
                  aria-label="Toggle strategy active state"
                />
              </div>
            </CardHeader>
            <CardContent>
              {getCurrentStrategy() ? (
                <StrategyForm 
                  initialParameters={getCurrentStrategy()?.parameters || mockStrategyParameters} 
                  onSubmit={handleSubmit} 
                />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No strategy selected. Please add a strategy first.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Strategy;

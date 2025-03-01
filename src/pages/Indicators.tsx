
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { fetchStrategyIndicators, StrategyIndicatorData } from '@/services/indicatorService';
import { CorrelationCard, RSICard } from '@/components/IndicatorCards';
import { Badge } from '@/components/ui/badge';
import { LoaderCircle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const Indicators: React.FC = () => {
  const { toast } = useToast();
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<string>('all');

  // Fetch indicator data with react-query
  const { 
    data: indicatorsData, 
    isLoading, 
    error, 
    refetch,
    isRefetching
  } = useQuery({
    queryKey: ['indicators'],
    queryFn: fetchStrategyIndicators,
    refetchInterval: autoRefresh ? 30000 : false, // Auto refresh every 30 seconds if enabled
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error fetching indicators",
        description: "Failed to fetch the latest indicator data",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const handleRefresh = () => {
    refetch();
    toast({
      title: "Refreshing indicators",
      description: "Fetching the latest indicator data",
    });
  };

  const handleAutoRefreshToggle = (checked: boolean) => {
    setAutoRefresh(checked);
    toast({
      title: checked ? "Auto-refresh enabled" : "Auto-refresh disabled",
      description: checked ? "Indicators will refresh automatically" : "Indicators will only refresh manually",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Live Indicators</h1>
            <p className="text-muted-foreground">
              Monitor real-time correlation and RSI indicators across your strategies
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="auto-refresh" 
                checked={autoRefresh} 
                onCheckedChange={handleAutoRefreshToggle} 
              />
              <Label htmlFor="auto-refresh">Auto-refresh</Label>
            </div>
            <Button 
              onClick={handleRefresh} 
              variant="outline" 
              size="sm"
              disabled={isRefetching}
            >
              {isRefetching ? (
                <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCcw className="h-4 w-4 mr-2" />
              )}
              Refresh
            </Button>
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <Card>
            <CardContent className="flex items-center justify-center p-8">
              <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading indicator data...</span>
            </CardContent>
          </Card>
        )}

        {/* No strategies state */}
        {!isLoading && (!indicatorsData || indicatorsData.length === 0) && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">No strategies found</h3>
              <p className="text-muted-foreground mb-4">
                You need to create at least one strategy to view indicators.
              </p>
              <Button variant="default" onClick={() => window.location.href = '/strategy'}>
                Create a Strategy
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Strategies tabs */}
        {!isLoading && indicatorsData && indicatorsData.length > 0 && (
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
            <TabsList className="w-full overflow-x-auto">
              <TabsTrigger value="all" className="min-w-[100px]">
                All Strategies
              </TabsTrigger>
              {indicatorsData.map((strategy) => (
                <TabsTrigger 
                  key={strategy.strategyId} 
                  value={strategy.strategyId}
                  className="min-w-[150px]"
                >
                  {strategy.strategyName}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* All strategies tab content */}
            <TabsContent value="all" className="space-y-4">
              {indicatorsData.map((strategy) => (
                <StrategyIndicatorPanel 
                  key={strategy.strategyId} 
                  data={strategy} 
                />
              ))}
            </TabsContent>

            {/* Individual strategy tab contents */}
            {indicatorsData.map((strategy) => (
              <TabsContent key={strategy.strategyId} value={strategy.strategyId} className="space-y-4">
                <StrategyIndicatorPanel data={strategy} />
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </Layout>
  );
};

interface StrategyIndicatorPanelProps {
  data: StrategyIndicatorData;
}

const StrategyIndicatorPanel: React.FC<StrategyIndicatorPanelProps> = ({ data }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/30 pb-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <div>
            <CardTitle className="text-xl">{data.strategyName}</CardTitle>
            <CardDescription>
              {data.parameters.currencyPair1} & {data.parameters.currencyPair2} | {data.parameters.timeframe} timeframe
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-0 md:ml-auto">
            {new Date().toLocaleTimeString()} updated
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-6">
        {/* Correlation Analysis */}
        <div className="mb-6">
          <CorrelationCard 
            correlationData={data.correlationData}
            pair1={data.parameters.currencyPair1}
            pair2={data.parameters.currencyPair2}
            entryThreshold={data.parameters.entryThreshold}
            exitThreshold={data.parameters.exitThreshold}
          />
        </div>

        {/* RSI Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RSICard 
            rsiData={data.rsiData1}
            pair={data.parameters.currencyPair1}
            period={data.parameters.rsiPeriod}
            overbought={data.parameters.rsiOverbought}
            oversold={data.parameters.rsiOversold}
          />
          <RSICard 
            rsiData={data.rsiData2}
            pair={data.parameters.currencyPair2}
            period={data.parameters.rsiPeriod}
            overbought={data.parameters.rsiOverbought}
            oversold={data.parameters.rsiOversold}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Indicators;

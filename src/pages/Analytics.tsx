
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import TradeTable from '@/components/TradeTable';
import PerformanceMetricsCard from '@/components/PerformanceMetricsCard';
import PairDistributionChart from '@/components/PairDistributionChart';
import StrategyProfitChart from '@/components/StrategyProfitChart';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  mockLineChartData,
  mockBarChartData,
  mockPerformanceMetrics,
  mockTrades,
  mockStrategySummaries,
} from '@/utils/mockData';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

const Analytics: React.FC = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<string>("all");
  
  // Get active trades
  const activeTrades = mockTrades.filter(trade => trade.status === 'open');

  // Prepare data for pair distribution charts
  const pairTradeData = Object.entries(mockPerformanceMetrics.tradesPerPair || {}).map(([name, trades]) => ({
    name,
    trades,
  }));

  const pairProfitData = Object.entries(mockPerformanceMetrics.profitPerPair || {}).map(([name, profit]) => ({
    name,
    profit,
  }));

  // Prepare data for strategy profit chart
  const strategyProfitData = Object.entries(mockPerformanceMetrics.profitPerStrategy || {}).map(([name, value]) => ({
    name,
    value,
  }));

  // Get the selected strategy metrics or overall metrics
  const currentMetrics = selectedStrategy === "all" 
    ? mockPerformanceMetrics 
    : mockStrategySummaries.find(s => s.name === selectedStrategy)?.metrics || mockPerformanceMetrics;

  // Prepare data for the selected strategy
  const currentPairTradeData = selectedStrategy === "all" 
    ? pairTradeData 
    : Object.entries(currentMetrics.tradesPerPair || {}).map(([name, trades]) => ({ name, trades }));

  const currentPairProfitData = selectedStrategy === "all" 
    ? pairProfitData 
    : Object.entries(currentMetrics.profitPerPair || {}).map(([name, profit]) => ({ name, profit }));

  return (
    <Layout>
      {/* Current Running Trades Section */}
      <div className="grid grid-cols-1 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-medium">Current Running Trades</CardTitle>
              <CardDescription>Real-time active positions</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Refresh
            </Button>
          </CardHeader>
          <CardContent>
            {activeTrades.length > 0 ? (
              <TradeTable trades={activeTrades} />
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No active trades at the moment
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <ArrowUpIcon className="h-3 w-3 text-profit mr-1" />
                <span className="text-sm">Buy: {activeTrades.filter(t => t.type === 'buy').length}</span>
              </div>
              <div className="flex items-center">
                <ArrowDownIcon className="h-3 w-3 text-loss mr-1" />
                <span className="text-sm">Sell: {activeTrades.filter(t => t.type === 'sell').length}</span>
              </div>
            </div>
            <div className="text-sm">
              Total Lots: {activeTrades.reduce((acc, trade) => acc + trade.lots, 0).toFixed(2)}
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Performance Analytics Tabs */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Performance Analytics</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Filter by strategy:</span>
            <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select strategy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Strategies</SelectItem>
                {mockStrategySummaries.map(strategy => (
                  <SelectItem key={strategy.name} value={strategy.name}>
                    {strategy.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="currency-pairs">Currency Pairs</TabsTrigger>
            <TabsTrigger value="strategies">Strategy Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <PerformanceMetricsCard 
              title={selectedStrategy === "all" ? "Overall Portfolio Performance" : `${selectedStrategy} Performance`}
              description="Key performance metrics and statistics"
              metrics={currentMetrics}
            />
            
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-base font-medium">Balance Evolution</CardTitle>
                    <CardDescription>Account growth over time</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                    <Button variant="outline" size="sm">
                      Export PDF
                    </Button>
                    <Button variant="outline" size="sm">
                      Export CSV
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <LineChart title="" data={mockLineChartData} />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-base font-medium">Daily Performance</CardTitle>
                    <CardDescription>Profit/loss by day of week</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    Update
                  </Button>
                </CardHeader>
                <CardContent>
                  <BarChart title="" data={mockBarChartData} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="currency-pairs" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PairDistributionChart 
                title="Trades by Currency Pair"
                description="Distribution of trades across different currency pairs"
                data={currentPairTradeData}
                type="trades"
              />
              
              <PairDistributionChart 
                title="Profit by Currency Pair"
                description="Profit contribution of each currency pair"
                data={currentPairProfitData}
                type="profit"
              />
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Currency Pair Performance</CardTitle>
                <CardDescription>Detailed metrics for each currency pair</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Currency Pair
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Trades
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Win Rate
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Profit
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Avg. Profit
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-card divide-y divide-border">
                      {currentPairProfitData.map((pair, index) => (
                        <tr key={pair.name}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {pair.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {currentPairTradeData.find(p => p.name === pair.name)?.trades || 0}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {(55 + index * 5).toFixed(1)}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-profit">
                            ${pair.profit?.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            ${(pair.profit / (currentPairTradeData.find(p => p.name === pair.name)?.trades || 1)).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="strategies" className="space-y-6">
            {selectedStrategy === "all" ? (
              <>
                <StrategyProfitChart 
                  title="Profit Distribution by Strategy"
                  description="Performance contribution of each trading strategy"
                  data={strategyProfitData}
                />
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Strategy Comparison</CardTitle>
                    <CardDescription>Performance metrics across different strategies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <table className="min-w-full divide-y divide-border">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Strategy
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Total Trades
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Win Rate
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Profit Factor
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Sharpe Ratio
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Total Profit
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-card divide-y divide-border">
                          {mockStrategySummaries.map((strategy) => (
                            <tr key={strategy.name}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                {strategy.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {strategy.metrics.totalTrades}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {strategy.metrics.winRate.toFixed(1)}%
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {strategy.metrics.profitFactor.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {strategy.metrics.sharpeRatio?.toFixed(2) || "N/A"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-profit">
                                ${strategy.metrics.totalProfit.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Strategy Details</CardTitle>
                    <CardDescription>{selectedStrategy}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-y-2">
                        <div className="text-sm font-medium">Total Trades:</div>
                        <div className="text-sm">{currentMetrics.totalTrades}</div>
                        
                        <div className="text-sm font-medium">Win Rate:</div>
                        <div className="text-sm">{currentMetrics.winRate.toFixed(1)}%</div>
                        
                        <div className="text-sm font-medium">Avg Trade Duration:</div>
                        <div className="text-sm">{currentMetrics.avgTradeDuration}</div>
                        
                        <div className="text-sm font-medium">Profit Factor:</div>
                        <div className="text-sm">{currentMetrics.profitFactor.toFixed(2)}</div>
                        
                        <div className="text-sm font-medium">Sharpe Ratio:</div>
                        <div className="text-sm">{currentMetrics.sharpeRatio?.toFixed(2) || "N/A"}</div>
                        
                        <div className="text-sm font-medium">Max Drawdown:</div>
                        <div className="text-sm">{currentMetrics.maxDrawdown?.toFixed(1) || "N/A"}%</div>
                        
                        <div className="text-sm font-medium">Average Win:</div>
                        <div className="text-sm text-profit">${currentMetrics.averageProfit.toFixed(2)}</div>
                        
                        <div className="text-sm font-medium">Average Loss:</div>
                        <div className="text-sm text-loss">${Math.abs(currentMetrics.averageLoss).toFixed(2)}</div>
                        
                        <div className="text-sm font-medium">Total Profit:</div>
                        <div className="text-sm font-medium text-profit">${currentMetrics.totalProfit.toFixed(2)}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <PairDistributionChart 
                  title="Top Pairs by Profit"
                  description={`Best performing pairs for ${selectedStrategy}`}
                  data={currentPairProfitData}
                  type="profit"
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Analytics;

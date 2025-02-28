
import React from 'react';
import { NetworkIcon, ArrowUpIcon, ArrowDownIcon, CheckIcon, XIcon, PlugIcon } from 'lucide-react';
import Layout from '@/components/Layout';
import TradeTable from '@/components/TradeTable';
import LineChart from '@/components/charts/LineChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockTrades, mockLineChartData, mockPerformanceMetrics } from '@/utils/mockData';

const Dashboard: React.FC = () => {
  const activeTrades = mockTrades.filter(trade => trade.status === 'open');
  const closedTrades = mockTrades.filter(trade => trade.status === 'closed');
  
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Active Trades</CardTitle>
            <CardDescription>Currently open positions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-semibold">{activeTrades.length}</div>
              <div className="flex items-center text-xs">
                <PlugIcon className="h-3 w-3 mr-1 text-chart-blue" />
                <span>Trading Now</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Win Rate</CardTitle>
            <CardDescription>Overall trading performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-semibold">{mockPerformanceMetrics.winRate}%</div>
              <div className="flex items-center text-xs">
                <CheckIcon className="h-3 w-3 mr-1 text-profit" />
                <span>{mockPerformanceMetrics.winningTrades} Winning Trades</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Total Profit</CardTitle>
            <CardDescription>Cumulative trading result</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-semibold">${mockPerformanceMetrics.totalProfit.toFixed(2)}</div>
              <div className={`flex items-center text-xs ${mockPerformanceMetrics.totalProfit >= 0 ? "text-profit" : "text-loss"}`}>
                {mockPerformanceMetrics.totalProfit >= 0 ? (
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownIcon className="h-3 w-3 mr-1" />
                )}
                <span>Total Result</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-medium">Account Balance History</CardTitle>
              <CardDescription>30-day performance trend</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <LineChart 
              title="" 
              data={mockLineChartData} 
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-medium">Recent Trades</CardTitle>
              <CardDescription>Latest trading activity</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <TradeTable trades={mockTrades} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;

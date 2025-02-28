
import React from 'react';
import Layout from '@/components/Layout';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import TradeTable from '@/components/TradeTable';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  mockLineChartData,
  mockBarChartData,
  mockPieChartData,
  mockPerformanceMetrics,
  mockTrades,
} from '@/utils/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

const Analytics: React.FC = () => {
  // Transform pie chart data for Recharts
  const pieData = mockPieChartData.labels.map((label, index) => ({
    name: label,
    value: mockPieChartData.datasets[0].data[index],
  }));

  const COLORS = mockPieChartData.datasets[0].backgroundColor || ['#36A2EB', '#FF6384'];
  
  // Get active trades
  const activeTrades = mockTrades.filter(trade => trade.status === 'open');

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Performance Metrics</CardTitle>
            <CardDescription>Key trading statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-muted-foreground text-sm">Total Trades</div>
                <div className="text-2xl font-semibold">{mockPerformanceMetrics.totalTrades}</div>
              </div>
              <div className="space-y-2">
                <div className="text-muted-foreground text-sm">Win Rate</div>
                <div className="text-2xl font-semibold">{mockPerformanceMetrics.winRate}%</div>
              </div>
              <div className="space-y-2">
                <div className="text-muted-foreground text-sm">Profit Factor</div>
                <div className="text-2xl font-semibold">{mockPerformanceMetrics.profitFactor}</div>
              </div>
              <div className="space-y-2">
                <div className="text-muted-foreground text-sm">Total Profit</div>
                <div className="text-2xl font-semibold">${mockPerformanceMetrics.totalProfit.toFixed(2)}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Trade Distribution</CardTitle>
            <CardDescription>Winning vs losing trades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${value} trades`, 'Count']}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '0.375rem',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                      zIndex: 50,
                    }}
                    wrapperStyle={{ zIndex: 50 }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
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

      <div className="grid grid-cols-1 gap-6 mb-6">
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
    </Layout>
  );
};

export default Analytics;

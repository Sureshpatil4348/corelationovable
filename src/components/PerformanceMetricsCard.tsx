
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PerformanceMetrics } from '@/types';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

interface PerformanceMetricsCardProps {
  title: string;
  description?: string;
  metrics: PerformanceMetrics;
  className?: string;
}

const PerformanceMetricsCard: React.FC<PerformanceMetricsCardProps> = ({
  title,
  description,
  metrics,
  className
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="text-muted-foreground text-sm">Total Trades</div>
            <div className="text-2xl font-semibold">{metrics.totalTrades}</div>
          </div>
          <div className="space-y-2">
            <div className="text-muted-foreground text-sm">Win Rate</div>
            <div className="text-2xl font-semibold">{metrics.winRate.toFixed(1)}%</div>
          </div>
          <div className="space-y-2">
            <div className="text-muted-foreground text-sm">Total Profit</div>
            <div className="text-2xl font-semibold">${metrics.totalProfit.toFixed(2)}</div>
          </div>
          <div className="space-y-2">
            <div className="text-muted-foreground text-sm">Sharpe Ratio</div>
            <div className="text-2xl font-semibold">{metrics.sharpeRatio?.toFixed(2) || "N/A"}</div>
          </div>
          <div className="space-y-2">
            <div className="text-muted-foreground text-sm">Max Drawdown</div>
            <div className="text-2xl font-semibold">{metrics.maxDrawdown?.toFixed(1) || "N/A"}%</div>
          </div>
          <div className="space-y-2">
            <div className="text-muted-foreground text-sm">Avg. Trade Duration</div>
            <div className="text-2xl font-semibold">{metrics.avgTradeDuration || "N/A"}</div>
          </div>
        </div>

        <Separator />
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <div className="font-medium">Win/Loss Ratio</div>
            <div className="text-muted-foreground">
              {metrics.winningTrades} W / {metrics.losingTrades} L
            </div>
          </div>
          <div className="flex h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="bg-profit" 
              style={{ width: `${(metrics.winningTrades / metrics.totalTrades) * 100}%` }} 
            />
            <div 
              className="bg-loss" 
              style={{ width: `${(metrics.losingTrades / metrics.totalTrades) * 100}%` }} 
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <div className="font-medium">Avg. Win/Loss</div>
            <div className="text-muted-foreground">
              <span className="text-profit mr-2">${metrics.averageProfit.toFixed(2)}</span>
              <span className="text-loss">${metrics.averageLoss.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex justify-between gap-4 items-center">
            <div className="flex items-center text-profit">
              <ArrowUpIcon className="w-4 h-4 mr-1" />
              <span className="text-sm">${metrics.averageProfit.toFixed(2)}</span>
            </div>
            <Progress 
              value={(metrics.averageProfit / (metrics.averageProfit - metrics.averageLoss)) * 100} 
              className="flex-1" 
            />
            <div className="flex items-center text-loss">
              <ArrowDownIcon className="w-4 h-4 mr-1" />
              <span className="text-sm">${Math.abs(metrics.averageLoss).toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <div className="font-medium">Profit Factor</div>
            <div className="text-muted-foreground">{metrics.profitFactor.toFixed(2)}</div>
          </div>
          <Progress 
            value={Math.min((metrics.profitFactor / 3) * 100, 100)} 
            className="w-full" 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetricsCard;


import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import LineChart from '@/components/charts/LineChart';
import { CorrelationData, RSIData } from '@/services/indicatorService';
import { Badge } from '@/components/ui/badge';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface CorrelationCardProps {
  correlationData: CorrelationData[];
  pair1: string;
  pair2: string;
  entryThreshold: number;
  exitThreshold: number;
}

export const CorrelationCard: React.FC<CorrelationCardProps> = ({
  correlationData,
  pair1,
  pair2,
  entryThreshold,
  exitThreshold
}) => {
  // Get the latest correlation value
  const latestCorrelation = correlationData.length > 0 
    ? correlationData[correlationData.length - 1].value 
    : 0;

  // Transform data for the chart
  const chartData = {
    labels: correlationData.map(d => {
      const date = new Date(d.timestamp);
      return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    }),
    datasets: [
      {
        label: 'Correlation',
        data: correlationData.map(d => d.value),
        borderColor: 'hsl(var(--primary))',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
      },
      {
        label: 'Entry Threshold',
        data: Array(correlationData.length).fill(entryThreshold),
        borderColor: 'hsl(var(--success))',
        backgroundColor: 'transparent',
      },
      {
        label: 'Exit Threshold',
        data: Array(correlationData.length).fill(exitThreshold),
        borderColor: 'hsl(var(--warning))',
        backgroundColor: 'transparent',
      }
    ]
  };

  // Determine trading signal based on correlation value
  const getSignal = () => {
    if (Math.abs(latestCorrelation) > entryThreshold) {
      return { text: 'Strong Signal', color: 'text-success', icon: <ArrowUpIcon className="h-4 w-4" /> };
    } else if (Math.abs(latestCorrelation) > exitThreshold) {
      return { text: 'Moderate Signal', color: 'text-warning', icon: null };
    } else {
      return { text: 'Weak Signal', color: 'text-muted-foreground', icon: <ArrowDownIcon className="h-4 w-4" /> };
    }
  };

  const signal = getSignal();

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Correlation Analysis</CardTitle>
          <Badge variant={Math.abs(latestCorrelation) > entryThreshold ? "default" : "outline"}>
            {latestCorrelation.toFixed(3)}
          </Badge>
        </div>
        <CardDescription>
          {pair1} & {pair2} | Window: {correlationData.length} periods
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm">
            <div className="flex items-center gap-1">
              <span className={signal.color}>Signal:</span>
              <span className={`font-semibold ${signal.color} flex items-center gap-1`}>
                {signal.text} {signal.icon}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              Thresholds: Entry {entryThreshold.toFixed(2)} | Exit {exitThreshold.toFixed(2)}
            </div>
          </div>
        </div>
        <LineChart title="" data={chartData} />
      </CardContent>
    </Card>
  );
};

interface RSICardProps {
  rsiData: RSIData[];
  pair: string;
  period: number;
  overbought: number;
  oversold: number;
}

export const RSICard: React.FC<RSICardProps> = ({
  rsiData,
  pair,
  period,
  overbought,
  oversold
}) => {
  // Get the latest RSI value
  const latestRSI = rsiData.length > 0 ? rsiData[rsiData.length - 1].value : 50;

  // Transform data for the chart
  const chartData = {
    labels: rsiData.map(d => {
      const date = new Date(d.timestamp);
      return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    }),
    datasets: [
      {
        label: 'RSI',
        data: rsiData.map(d => d.value),
        borderColor: 'hsl(var(--primary))',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
      },
      {
        label: 'Overbought',
        data: Array(rsiData.length).fill(overbought),
        borderColor: 'hsl(var(--destructive))',
        backgroundColor: 'transparent',
      },
      {
        label: 'Oversold',
        data: Array(rsiData.length).fill(oversold),
        borderColor: 'hsl(var(--success))',
        backgroundColor: 'transparent',
      }
    ]
  };

  // Determine trading signal based on RSI value
  const getSignal = () => {
    if (latestRSI > overbought) {
      return { text: 'Overbought', color: 'text-destructive', icon: <ArrowDownIcon className="h-4 w-4" /> };
    } else if (latestRSI < oversold) {
      return { text: 'Oversold', color: 'text-success', icon: <ArrowUpIcon className="h-4 w-4" /> };
    } else {
      return { text: 'Neutral', color: 'text-muted-foreground', icon: null };
    }
  };

  const signal = getSignal();

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">RSI Analysis: {pair}</CardTitle>
          <Badge variant={latestRSI > overbought || latestRSI < oversold ? "default" : "outline"}>
            {latestRSI.toFixed(1)}
          </Badge>
        </div>
        <CardDescription>
          Period: {period} | Updated: {new Date().toLocaleTimeString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm">
            <div className="flex items-center gap-1">
              <span className={signal.color}>Signal:</span>
              <span className={`font-semibold ${signal.color} flex items-center gap-1`}>
                {signal.text} {signal.icon}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              Levels: Overbought {overbought} | Oversold {oversold}
            </div>
          </div>
        </div>
        <LineChart title="" data={chartData} />
      </CardContent>
    </Card>
  );
};

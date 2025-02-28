
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface PairDistributionChartProps {
  title: string;
  description?: string;
  data: {
    name: string;
    trades?: number;
    profit?: number;
  }[];
  type: 'trades' | 'profit';
  className?: string;
}

const PairDistributionChart: React.FC<PairDistributionChartProps> = ({
  title,
  description,
  data,
  type,
  className
}) => {
  const colors = [
    'hsl(var(--chart-blue))',
    'hsl(var(--chart-green))',
    'hsl(var(--chart-purple))',
    'hsl(var(--chart-orange))',
    'hsl(var(--chart-red))'
  ];

  const formatTooltipValue = (value: number) => {
    if (type === 'profit') {
      return [`$${value.toFixed(2)}`, 'Profit'];
    }
    return [value, 'Trades'];
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 5,
                left: 5,
                bottom: 5,
              }}
            >
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
              />
              <Tooltip 
                formatter={formatTooltipValue}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '0.375rem',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
              />
              <Legend />
              <Bar 
                dataKey={type === 'trades' ? 'trades' : 'profit'} 
                name={type === 'trades' ? 'Trades' : 'Profit'} 
                radius={[4, 4, 0, 0]}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PairDistributionChart;

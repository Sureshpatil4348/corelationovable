
import React from 'react';
import { Trade } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TradeTableProps {
  trades: Trade[];
  className?: string;
}

const TradeTable: React.FC<TradeTableProps> = ({ trades, className }) => {
  const formatTime = (timeString?: string) => {
    if (!timeString) return '-';
    const date = new Date(timeString);
    return date.toLocaleString(undefined, {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrice = (price?: number) => {
    if (price === undefined) return '-';
    return price.toFixed(5);
  };

  const formatProfit = (profit?: number) => {
    if (profit === undefined) return '-';
    return profit.toFixed(2);
  };

  return (
    <div className={cn("relative overflow-hidden rounded-lg border", className)}>
      <div className="relative rounded-md overflow-auto max-h-[500px]">
        <Table>
          <TableHeader className="bg-muted/50 sticky top-0 z-10">
            <TableRow>
              <TableHead className="w-[100px]">Symbol</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Open Time</TableHead>
              <TableHead>Close Time</TableHead>
              <TableHead>Open Price</TableHead>
              <TableHead>Close Price</TableHead>
              <TableHead>Lots</TableHead>
              <TableHead>Profit</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trades.map((trade) => (
              <TableRow 
                key={trade.id}
                className="transition-colors hover:bg-muted/30"
              >
                <TableCell className="font-medium">{trade.symbol}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {trade.type === 'buy' ? (
                      <>
                        <ArrowUpIcon className="h-3 w-3 text-profit" />
                        <span>Buy</span>
                      </>
                    ) : (
                      <>
                        <ArrowDownIcon className="h-3 w-3 text-loss" />
                        <span>Sell</span>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell>{formatTime(trade.openTime)}</TableCell>
                <TableCell>{formatTime(trade.closeTime)}</TableCell>
                <TableCell>{formatPrice(trade.openPrice)}</TableCell>
                <TableCell>{formatPrice(trade.closePrice)}</TableCell>
                <TableCell>{trade.lots}</TableCell>
                <TableCell 
                  className={cn(
                    "font-medium",
                    trade.profit && trade.profit > 0 
                      ? "text-profit" 
                      : trade.profit && trade.profit < 0
                      ? "text-loss"
                      : ""
                  )}
                >
                  {formatProfit(trade.profit)}
                </TableCell>
                <TableCell>
                  <div 
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                      trade.status === 'open'
                        ? "bg-chart-blue/10 text-chart-blue"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {trade.status}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TradeTable;

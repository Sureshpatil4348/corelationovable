
import { Trade, StrategyParameters, PerformanceMetrics, Notification } from '@/types';

export const mockTrades: Trade[] = [
  {
    id: "1",
    symbol: "EURUSD",
    type: "buy",
    openTime: "2023-11-01T08:30:00Z",
    closeTime: "2023-11-01T16:45:00Z",
    openPrice: 1.0578,
    closePrice: 1.0612,
    lots: 0.1,
    profit: 34,
    status: "closed",
    strategy: "RSI Correlation"
  },
  {
    id: "2",
    symbol: "GBPUSD",
    type: "sell",
    openTime: "2023-11-02T09:15:00Z",
    closeTime: "2023-11-02T14:30:00Z",
    openPrice: 1.2365,
    closePrice: 1.2305,
    lots: 0.15,
    profit: 90,
    status: "closed",
    strategy: "RSI Correlation"
  },
  {
    id: "3",
    symbol: "EURUSD",
    type: "sell",
    openTime: "2023-11-03T10:45:00Z",
    openPrice: 1.0645,
    lots: 0.1,
    status: "open",
    strategy: "RSI Correlation"
  },
  {
    id: "4",
    symbol: "USDJPY",
    type: "buy",
    openTime: "2023-11-03T13:20:00Z",
    openPrice: 149.75,
    lots: 0.2,
    status: "open",
    strategy: "RSI Correlation"
  },
  {
    id: "5",
    symbol: "EURUSD",
    type: "buy",
    openTime: "2023-10-28T11:30:00Z",
    closeTime: "2023-10-29T09:15:00Z",
    openPrice: 1.0592,
    closePrice: 1.0567,
    lots: 0.1,
    profit: -25,
    status: "closed",
    strategy: "RSI Correlation"
  }
];

export const mockStrategyParameters: StrategyParameters = {
  currencyPair1: "EURUSD",
  currencyPair2: "GBPUSD",
  rsiPeriod: 14,
  correlationWindow: 20,
  rsiOverbought: 70,
  rsiOversold: 30,
  entryThreshold: 0.8,
  exitThreshold: 0.5,
  timeframe: "H1",
  lotSize1: 0.1,
  lotSize2: 0.1,
  magicNumber: 12345,
  comment: "Correlation Strategy"
};

export const mockPerformanceMetrics: PerformanceMetrics = {
  totalTrades: 115,
  winningTrades: 72,
  losingTrades: 43,
  winRate: 62.6,
  averageProfit: 25.4,
  averageLoss: -18.7,
  profitFactor: 1.78,
  totalProfit: 845.3
};

export const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "success",
    message: "Connection to MT5 established successfully",
    timestamp: "2023-11-05T09:30:15Z",
    read: true
  },
  {
    id: "2",
    type: "info",
    message: "New trade opened: Buy EURUSD at 1.0578",
    timestamp: "2023-11-05T10:15:22Z",
    read: false
  },
  {
    id: "3",
    type: "warning",
    message: "Connection to MT5 unstable, attempting to reconnect",
    timestamp: "2023-11-05T11:45:03Z",
    read: false
  },
  {
    id: "4",
    type: "error",
    message: "Failed to execute trade: Insufficient funds",
    timestamp: "2023-11-05T14:12:38Z",
    read: false
  }
];

export const mockLineChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Account Balance',
      data: [10000, 10120, 10350, 10280, 10510, 10690, 10780, 10950, 10870, 11020, 11250, 11430],
      borderColor: 'hsl(var(--chart-blue))',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
    },
  ],
};

export const mockBarChartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  datasets: [
    {
      label: 'Profit',
      data: [65, -20, 45, -30, 80],
      backgroundColor: [
        'hsl(var(--chart-green))',
        'hsl(var(--loss))',
        'hsl(var(--chart-green))',
        'hsl(var(--loss))',
        'hsl(var(--chart-green))',
      ],
    },
  ],
};

export const mockPieChartData = {
  labels: ['Winning Trades', 'Losing Trades'],
  datasets: [
    {
      data: [72, 43],
      backgroundColor: [
        'hsl(var(--chart-green))',
        'hsl(var(--loss))',
      ],
    },
  ],
};

export const currencyPairs = [
  "EURUSD",
  "GBPUSD",
  "USDJPY",
  "AUDUSD",
  "USDCAD",
  "USDCHF",
  "NZDUSD",
  "EURJPY",
  "GBPJPY",
  "EURGBP",
  "AUDCAD",
  "AUDCHF",
  "AUDJPY",
  "AUDNZD",
  "CADJPY",
  "CHFJPY",
  "EURAUD",
  "EURCAD",
  "EURCHF",
  "EURNZD",
  "GBPAUD",
  "GBPCAD",
  "GBPCHF",
  "GBPNZD",
  "NZDCAD",
  "NZDCHF",
  "NZDJPY"
];

export const timeframes = [
  "M1", // 1 minute
  "M5", // 5 minutes
  "M15", // 15 minutes
  "M30", // 30 minutes
  "H1", // 1 hour
  "H4", // 4 hours
  "D1", // 1 day
  "W1", // 1 week
  "MN" // 1 month
];

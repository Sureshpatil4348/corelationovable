
export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting';

export interface MT5Credentials {
  username: string;
  password: string;
  server: string;
  terminal: string;
}

export interface Trade {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  openTime: string;
  closeTime?: string;
  openPrice: number;
  closePrice?: number;
  lots: number;
  profit?: number;
  status: 'open' | 'closed';
  strategy: string;
}

export interface StrategyParameters {
  currencyPair1: string;
  currencyPair2: string;
  rsiPeriod: number;
  correlationWindow: number;
  rsiOverbought: number;
  rsiOversold: number;
  entryThreshold: number;
  exitThreshold: number;
  timeframe: string;
  lotSize1: number;
  lotSize2: number;
  magicNumber: number;
  comment: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    fill?: boolean;
  }[];
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: string;
  read: boolean;
}

export interface PerformanceMetrics {
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  averageProfit: number;
  averageLoss: number;
  profitFactor: number;
  totalProfit: number;
  sharpeRatio?: number;
  maxDrawdown?: number;
  avgTradeDuration?: string;
  tradesPerPair?: Record<string, number>;
  profitPerStrategy?: Record<string, number>;
  profitPerPair?: Record<string, number>;
}

export interface StrategySummary {
  name: string;
  metrics: PerformanceMetrics;
}

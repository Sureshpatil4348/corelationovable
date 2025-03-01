
import { StrategyParameters } from "@/types";

// Time series data point structure for indicators
interface DataPoint {
  timestamp: string;
  value: number;
}

// Structure for correlation data between two pairs
export interface CorrelationData {
  timestamp: string;
  value: number;
  pair1: string;
  pair2: string;
}

// RSI data structure for a specific pair
export interface RSIData {
  timestamp: string;
  value: number;
  pair: string;
}

// Combined indicator data for a strategy
export interface StrategyIndicatorData {
  strategyId: string;
  strategyName: string;
  correlationData: CorrelationData[];
  rsiData1: RSIData[];
  rsiData2: RSIData[];
  parameters: StrategyParameters;
}

// Mock data generation for demo purposes
// In a real implementation, this would fetch data from the MT5 API
const generateMockTimeSeriesData = (
  length: number, 
  min: number, 
  max: number, 
  trend: 'up' | 'down' | 'sideways' = 'sideways'
): DataPoint[] => {
  const data: DataPoint[] = [];
  const now = new Date();
  let value = (min + max) / 2;

  for (let i = 0; i < length; i++) {
    // Generate timestamp for each point, going backwards in time
    const timestamp = new Date(now.getTime() - (length - i) * 60000).toISOString();
    
    // Apply trend bias
    const trendBias = trend === 'up' ? 0.6 : trend === 'down' ? -0.6 : 0;
    
    // Generate random movement with trend bias
    const randomChange = ((Math.random() - 0.5) * 2 + trendBias) * (max - min) * 0.05;
    value = Math.max(min, Math.min(max, value + randomChange));
    
    data.push({ timestamp, value });
  }

  return data;
};

// Generate correlation data between two pairs
const generateCorrelationData = (pair1: string, pair2: string, window: number): CorrelationData[] => {
  // Generate correlation values between -1 and 1, with most values above 0 for demo purposes
  const baseData = generateMockTimeSeriesData(30, -1, 1, 'sideways');
  
  return baseData.map(point => ({
    timestamp: point.timestamp,
    value: point.value,
    pair1,
    pair2
  }));
};

// Generate RSI data for a pair
const generateRSIData = (pair: string, period: number): RSIData[] => {
  // RSI values range from 0 to 100
  const trend = Math.random() > 0.5 ? 'up' : 'down';
  const baseData = generateMockTimeSeriesData(30, 0, 100, trend);
  
  return baseData.map(point => ({
    timestamp: point.timestamp,
    value: point.value,
    pair
  }));
};

// Fetch indicator data for all strategies
export const fetchStrategyIndicators = async (): Promise<StrategyIndicatorData[]> => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Get strategies from localStorage
  const savedStrategies = localStorage.getItem('trading-strategies');
  if (!savedStrategies) {
    return [];
  }
  
  const strategies = JSON.parse(savedStrategies);
  
  // Generate indicator data for each strategy
  return strategies.map((strategy: any) => {
    const { id, name, parameters } = strategy;
    
    return {
      strategyId: id,
      strategyName: name,
      correlationData: generateCorrelationData(
        parameters.currencyPair1, 
        parameters.currencyPair2, 
        parameters.correlationWindow
      ),
      rsiData1: generateRSIData(parameters.currencyPair1, parameters.rsiPeriod),
      rsiData2: generateRSIData(parameters.currencyPair2, parameters.rsiPeriod),
      parameters
    };
  });
};

// Fetch indicator data for a specific strategy
export const fetchStrategyIndicatorById = async (strategyId: string): Promise<StrategyIndicatorData | null> => {
  const allIndicators = await fetchStrategyIndicators();
  return allIndicators.find(indicator => indicator.strategyId === strategyId) || null;
};

// In a real implementation, you would have these functions:
// export const subscribeToLiveIndicators = (callback: (data: StrategyIndicatorData[]) => void) => {...}
// export const unsubscribeFromLiveIndicators = () => {...}

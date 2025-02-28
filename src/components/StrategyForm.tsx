
import React, { useState } from 'react';
import { StrategyParameters } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { currencyPairs, timeframes } from '@/utils/mockData';

interface StrategyFormProps {
  initialParameters: StrategyParameters;
  onSubmit: (parameters: StrategyParameters) => void;
}

const StrategyForm: React.FC<StrategyFormProps> = ({
  initialParameters,
  onSubmit,
}) => {
  const [parameters, setParameters] = useState<StrategyParameters>(initialParameters);
  const { toast } = useToast();

  const handleChange = (name: keyof StrategyParameters, value: string | number) => {
    setParameters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation example
    if (parameters.currencyPair1 === parameters.currencyPair2) {
      toast({
        title: "Invalid Parameters",
        description: "Currency pairs must be different",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit(parameters);
    
    toast({
      title: "Strategy Updated",
      description: "Your strategy parameters have been updated successfully",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-slideInUp">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="currencyPair1">Currency Pair 1</Label>
            <Select
              value={parameters.currencyPair1}
              onValueChange={(value) => handleChange('currencyPair1', value)}
            >
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select currency pair" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {currencyPairs.map((pair) => (
                    <SelectItem key={pair} value={pair}>
                      {pair}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="currencyPair2">Currency Pair 2</Label>
            <Select
              value={parameters.currencyPair2}
              onValueChange={(value) => handleChange('currencyPair2', value)}
            >
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select currency pair" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {currencyPairs.map((pair) => (
                    <SelectItem key={pair} value={pair}>
                      {pair}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="timeframe">Timeframe</Label>
            <Select
              value={parameters.timeframe}
              onValueChange={(value) => handleChange('timeframe', value)}
            >
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {timeframes.map((tf) => (
                    <SelectItem key={tf} value={tf}>
                      {tf}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="lotSize">Lot Size</Label>
            <Input
              id="lotSize"
              type="number"
              step="0.01"
              min="0.01"
              max="10"
              value={parameters.lotSize}
              onChange={(e) => handleChange('lotSize', parseFloat(e.target.value))}
              className="mt-1"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <Label htmlFor="rsiPeriod">RSI Period: {parameters.rsiPeriod}</Label>
            </div>
            <Slider
              id="rsiPeriod"
              min={3}
              max={50}
              step={1}
              value={[parameters.rsiPeriod]}
              onValueChange={(value) => handleChange('rsiPeriod', value[0])}
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <Label htmlFor="correlationWindow">Correlation Window: {parameters.correlationWindow}</Label>
            </div>
            <Slider
              id="correlationWindow"
              min={5}
              max={100}
              step={1}
              value={[parameters.correlationWindow]}
              onValueChange={(value) => handleChange('correlationWindow', value[0])}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="rsiOverbought">RSI Overbought</Label>
              <Input
                id="rsiOverbought"
                type="number"
                min="50"
                max="95"
                value={parameters.rsiOverbought}
                onChange={(e) => handleChange('rsiOverbought', parseInt(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="rsiOversold">RSI Oversold</Label>
              <Input
                id="rsiOversold"
                type="number"
                min="5"
                max="50"
                value={parameters.rsiOversold}
                onChange={(e) => handleChange('rsiOversold', parseInt(e.target.value))}
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="entryThreshold">Entry Threshold</Label>
              <Input
                id="entryThreshold"
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={parameters.entryThreshold}
                onChange={(e) => handleChange('entryThreshold', parseFloat(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="exitThreshold">Exit Threshold</Label>
              <Input
                id="exitThreshold"
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={parameters.exitThreshold}
                onChange={(e) => handleChange('exitThreshold', parseFloat(e.target.value))}
                className="mt-1"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="mt-4">
          Save Strategy Parameters
        </Button>
      </div>
    </form>
  );
};

export default StrategyForm;

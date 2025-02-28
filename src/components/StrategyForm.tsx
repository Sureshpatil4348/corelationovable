
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
import { Separator } from '@/components/ui/separator';

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
            <Label htmlFor="lotSize1">Lot Size for {parameters.currencyPair1}</Label>
            <Input
              id="lotSize1"
              type="number"
              step="0.01"
              min="0.01"
              max="10"
              value={parameters.lotSize1}
              onChange={(e) => handleChange('lotSize1', parseFloat(e.target.value))}
              className="mt-1"
            />
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
            <Label htmlFor="lotSize2">Lot Size for {parameters.currencyPair2}</Label>
            <Input
              id="lotSize2"
              type="number"
              step="0.01"
              min="0.01"
              max="10"
              value={parameters.lotSize2}
              onChange={(e) => handleChange('lotSize2', parseFloat(e.target.value))}
              className="mt-1"
            />
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

          <Separator className="my-4" />

          <div>
            <Label htmlFor="magicNumber">Magic Number</Label>
            <Input
              id="magicNumber"
              type="number"
              min="1"
              max="999999"
              value={parameters.magicNumber}
              onChange={(e) => handleChange('magicNumber', parseInt(e.target.value))}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Unique identifier for trades from this strategy
            </p>
          </div>

          <div>
            <Label htmlFor="comment">Trade Comment</Label>
            <Input
              id="comment"
              type="text"
              maxLength={50}
              value={parameters.comment}
              onChange={(e) => handleChange('comment', e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Comment that will be attached to each trade
            </p>
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

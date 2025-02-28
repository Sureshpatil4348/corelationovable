
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import StrategyForm from '@/components/StrategyForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockStrategyParameters } from '@/utils/mockData';
import { StrategyParameters } from '@/types';

const Strategy: React.FC = () => {
  const [parameters, setParameters] = useState<StrategyParameters>(mockStrategyParameters);
  
  const handleSubmit = (updatedParameters: StrategyParameters) => {
    setParameters(updatedParameters);
    // In a real app, this would send the parameters to the backend
    console.log('Strategy parameters updated:', updatedParameters);
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-6 pb-8">
        <Card>
          <CardHeader>
            <CardTitle>Strategy Parameters</CardTitle>
            <CardDescription>
              Configure the rolling correlation trading strategy parameters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StrategyForm 
              initialParameters={parameters} 
              onSubmit={handleSubmit} 
            />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Strategy;

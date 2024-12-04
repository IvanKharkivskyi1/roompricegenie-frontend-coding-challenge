import { Text } from '@mantine/core';
import React from 'react';

interface PriceDisplayProps {
  date: string;
  roomId: string;
  recommendedPrice: number;
  pmsPrice: number | null;
  currencySymbol: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  date,
  roomId,
  recommendedPrice,
  pmsPrice,
  currencySymbol,
}) => {

  return (
    <div style={{ minWidth: '150px' }}>
      <Text size="sm" color="dimmed">Date: {date}</Text>
      <Text size="sm" color="red">Room: {roomId}</Text>
      <Text>Recommended: {currencySymbol}{recommendedPrice}</Text>
      <Text>PMS: {pmsPrice ? `${currencySymbol}${pmsPrice}` : 'N/A'}</Text>
    </div>
  );
};

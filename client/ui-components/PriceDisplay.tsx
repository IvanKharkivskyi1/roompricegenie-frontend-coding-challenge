import { Box, Divider, Text } from '@mantine/core';
import * as React from 'react';

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
    <Box bg="blue.1" p={4}>
      <Text size="sm" c="dimmed">
        Date: {date}
      </Text>
      <Text size="sm" c="blue">
        Room: {roomId}
      </Text>
      <Box>
        <Text fw={500}>Recom:</Text> {currencySymbol}
        {recommendedPrice}
      </Box>
      <Box>
        <Text fw={500}>PMS:</Text>{' '}
        {pmsPrice ? `${currencySymbol}${pmsPrice}` : 'N/A'}
      </Box>
      <Divider size="md" />
    </Box>
  );
};

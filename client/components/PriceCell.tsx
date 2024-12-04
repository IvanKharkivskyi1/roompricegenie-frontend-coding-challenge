import { Text } from '@mantine/core';
import { format, type Locale } from 'date-fns';
import React from 'react';

interface PriceCellProps {
  date: Date;
  roomPrices: Record<string, any> | undefined;
  currencySymbol: string | undefined;
  timezone: string | undefined;
  locale: Locale | undefined;
}

export const PriceCell: React.FC<PriceCellProps> = ({ date, roomPrices, currencySymbol }) => {
  const formattedDate = format(date, 'dd MMM', { locale: undefined });

  return (
    <div className="p-2 border">
      <Text>{formattedDate}</Text>
      {roomPrices ? (
        Object.entries(roomPrices).map(([roomId, { price, price_in_pms }]) => {
          const diffPercentage = ((price - price_in_pms) / price_in_pms) * 100;
          const highlight = Math.abs(diffPercentage) >= 4 ? 'bg-yellow-100' : '';

          return (
            <div key={roomId} className={`p-1 ${highlight}`}>
              <Text>Price: {currencySymbol}{price}</Text>
              <Text>PMS: {currencySymbol}{price_in_pms}</Text>
            </div>
          );
        })
      ) : (
        <Text>No data</Text>
      )}
    </div>
  );
};

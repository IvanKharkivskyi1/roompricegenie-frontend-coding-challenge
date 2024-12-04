import { Flex, Grid, LoadingOverlay, Paper, Select, Text } from '@mantine/core';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
  type Locale,
} from 'date-fns';
import { formatWithOptions } from 'date-fns/fp';
import { de, enUS, fr } from 'date-fns/locale';
import * as React from 'react';
const { useState } = React;

import { usePrices, useSettings } from '../../api/api';
import {
  CalendarNavigation,
  PriceDisplay,
  RoomSelector,
} from '../ui-components/';

const localeMap: Record<string, Locale> = {
  'en-US': enUS,
  fr: fr,
  de: de,
};

export const Calendar: React.FC = () => {
  const {
    data: pricesData,
    isLoading: loadingPrices,
    error: pricesError,
  } = usePrices();
  const {
    data: settingsData,
    isLoading: loadingSettings,
    error: settingsError,
  } = useSettings();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  if (loadingPrices || loadingSettings) return <LoadingOverlay />;
  if (pricesError || settingsError)
    return <Text c="red">Failed to load data</Text>;

  const timezone = settingsData?.hotel.timezone;
  const localeString = settingsData?.hotel.locale || 'en-US';
  const selectedLocale = localeMap[localeString] || enUS;
  const lastRunTime = pricesData?.prices.last_run_pricing_time;

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const handlePreviousMonth = () =>
    setCurrentMonth(addMonths(currentMonth, -1));

  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: i.toString(),
    label: format(new Date(2023, i), 'MMMM'),
  }));

  const yearOptions = Array.from({ length: 5 }, (_, i) => ({
    value: (currentMonth.getFullYear() - 2 + i).toString(),
    label: (currentMonth.getFullYear() - 2 + i).toString(),
  }));

  const handleMonthChange = (value: string) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(Number(value));
    setCurrentMonth(newDate);
  };

  const handleYearChange = (value: string) => {
    const newDate = new Date(currentMonth);
    newDate.setFullYear(Number(value));
    setCurrentMonth(newDate);
  };

  const handleRoomChange = (value: string | null) => {
    setSelectedRoom(value);
  };

  const formatDateWithLocale = formatWithOptions({ locale: selectedLocale });

  return (
    <Paper shadow="sm" p="25px">
      {lastRunTime && (
        <Text mb="md" size="sm" c="dimmed">
          Last Pricing Run:{' '}
          {formatDateWithLocale('PPpp', new Date(lastRunTime))}
        </Text>
      )}

      <Flex mb="sm" direction="column" gap="sm">
        <Flex gap="sm" align="flex-end">
          <Select
            label="Month"
            data={monthOptions}
            value={currentMonth.getMonth().toString()}
            onChange={handleMonthChange}
            size="sm"
            aria-label="Select Month"
          />
          <Select
            label="Year"
            data={yearOptions}
            value={currentMonth.getFullYear().toString()}
            onChange={handleYearChange}
            size="sm"
            aria-label="Select Year"
          />
          <RoomSelector
            rooms={settingsData.rooms}
            onChange={handleRoomChange}
          />
          <CalendarNavigation
            onPrevious={handlePreviousMonth}
            onNext={handleNextMonth}
          />
        </Flex>
      </Flex>

      <Grid gutter="xs">
        {days.map((day) => {
          const formattedDate = format(day, 'yyyy-MM-dd');
          const roomPrices = pricesData?.prices.data[formattedDate];

          return (
            <Grid.Col key={formattedDate} span={1}>
              {roomPrices ? (
                Object.entries(roomPrices)
                  .filter(
                    ([roomId]) => !selectedRoom || roomId === selectedRoom
                  )
                  .map(([roomId, { price, price_in_pms }]) => (
                    <PriceDisplay
                      key={roomId}
                      date={formatDateWithLocale('dd', day)}
                      roomId={roomId}
                      recommendedPrice={price}
                      pmsPrice={price_in_pms}
                      currencySymbol={pricesData?.currency.symbol || '$'}
                    />
                  ))
              ) : (
                <Text>No data available</Text>
              )}
            </Grid.Col>
          );
        })}
      </Grid>
    </Paper>
  );
};

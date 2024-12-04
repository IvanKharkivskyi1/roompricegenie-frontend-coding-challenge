import { ActionIcon } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import React from 'react';

interface CalendarNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
}

export const CalendarNavigation: React.FC<CalendarNavigationProps> = ({ onPrevious, onNext }) => (
  <div className="flex items-center justify-between">
    <ActionIcon onClick={onPrevious} size="lg" variant="outline">
      <IconChevronLeft />
    </ActionIcon>
    <ActionIcon onClick={onNext} size="lg" variant="outline">
      <IconChevronRight />
    </ActionIcon>
  </div>
);

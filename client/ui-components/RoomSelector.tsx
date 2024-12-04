import { Select } from '@mantine/core';
import * as React from 'react';

interface RoomSelectorProps {
  rooms: {
    reference: { id: number; name: string };
    derived: Record<string, { name: string }>;
  };
  onChange: (value: string | null) => void;
}

export const RoomSelector: React.FC<RoomSelectorProps> = ({
  rooms,
  onChange,
}) => {
  const roomOptions = [
    { value: '', label: 'All Rooms' },
    { value: rooms.reference.id.toString(), label: rooms.reference.name },
    ...Object.entries(rooms.derived).map(([id, { name }]) => ({
      value: id,
      label: name,
    })),
  ];

  return (
    <Select
      label="Room Type"
      data={roomOptions}
      defaultValue=""
      onChange={(value) => onChange(value || null)}
    />
  );
};

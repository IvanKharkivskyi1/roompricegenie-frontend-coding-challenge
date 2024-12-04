import { LoadingOverlay } from '@mantine/core';
import * as React from 'react';

interface LoaderProps {
  visible: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ visible }) => (
  <LoadingOverlay visible={visible} />
);

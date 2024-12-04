/// <reference types="vinxi/types/client" />
import { createRoot } from 'react-dom/client';

import '@mantine/core/styles.css';
import './index.css';

import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Calendar } from './components/Calendar';
import { RoomPriceGenieLogo } from './roompricegenie-logo';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <RoomPriceGenieLogo />
        <Calendar />
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

createRoot(document.getElementById('root')).render(<App />);

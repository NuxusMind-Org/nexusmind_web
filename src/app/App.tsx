import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

import { Providers } from './providers';
import { AppRouter } from './router';
import '@/styles/globals.css';

function App() {
  return (
    <HelmetProvider>
      <Providers>
        <AppRouter />
      </Providers>

      <Analytics />
      <SpeedInsights />
    </HelmetProvider>
  );
}

export default App;

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

import { Providers } from './providers';
import { AppRouter } from './router';
import '@/styles/globals.css';

function App() {
  return (
    <>
      <Providers>
        <AppRouter />
      </Providers>

      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;

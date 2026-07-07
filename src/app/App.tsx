import { Analytics } from '@vercel/analytics/react';

import { Providers } from './providers';
import { AppRouter } from './router';
import '@/styles/globals.css';

function App() {
  return (
    <Providers>
      <AppRouter />
      <Analytics />
    </Providers>
  );
}

export default App;

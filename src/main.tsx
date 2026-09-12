import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/app/App';
import { initTokenManager } from '@/api/tokenManager';
import '@/libs/i18n';

// Initialize token management, proactive refresh timers, and multi-tab sync
initTokenManager();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);


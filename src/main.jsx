import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Ordre important : les tokens (variables) avant les styles globaux qui les utilisent.
import '@/styles/tokens.css';
import '@/styles/global.css';
import App from '@/App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

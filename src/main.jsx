import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { LanguageProvider } from './context/LanguageContext.jsx'

// Auto-reload window if a module chunk fails to load due to a new deployment
window.addEventListener('error', (event) => {
  const isChunkError = 
    event.target?.tagName === 'SCRIPT' ||
    event.target?.tagName === 'LINK' ||
    /failed to fetch|loading chunk|failed to load/i.test(event.message || '');
  if (isChunkError) {
    const key = 'chunk_load_failed_reload';
    const lastReload = sessionStorage.getItem(key);
    if (!lastReload || Date.now() - Number(lastReload) > 10000) {
      sessionStorage.setItem(key, String(Date.now()));
      window.location.reload();
    }
  }
}, true);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      let refreshing = false;
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'activated' && !refreshing) {
              refreshing = true;
              window.dispatchEvent(new CustomEvent('sw-updated'));
            }
          });
        }
      });
    }).catch(() => {});
  });
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n';
import App from '@/App';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { ErrorBoundary } from 'react-error-boundary';
import ServerErrorPage from './features/error/pages/server-error.page';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<ServerErrorPage />}>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);

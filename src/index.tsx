import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';
import { initI18n } from './i18n';
import { StrictMode } from 'react';

import '@/global.css';
import { TanstackProvider } from './context/Tanstack/TanstackProvider';
import { ErrorHandlerProvider } from './context/ErrorHandler/ErrorHandler';
import { CustomThemeProvider } from './context/Theme/CustomThemeProvider';

initI18n();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <CustomThemeProvider>
          <ErrorHandlerProvider>
            <TanstackProvider>
              <App />
            </TanstackProvider>
          </ErrorHandlerProvider>
        </CustomThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);

import { ErrorHandlerProvider } from '@/context/ErrorHandler/ErrorHandler';
import { TanstackProvider } from '@/context/Tanstack/TanstackProvider';
import { CustomThemeProvider } from '@/context/Theme/CustomThemeProvider';
import { initI18n } from '@/i18n';
import { HelmetProvider } from 'react-helmet-async';

import { BrowserRouter } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

initI18n();

export const Providers = ({ children }: Props) => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <CustomThemeProvider>
          <ErrorHandlerProvider>
            <TanstackProvider>{children}</TanstackProvider>
          </ErrorHandlerProvider>
        </CustomThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

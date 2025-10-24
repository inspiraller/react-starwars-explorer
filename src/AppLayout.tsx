import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import { Container } from '@mui/material';

import Header from './components/Header/Header';

export const Loader = () => {
  const { t } = useTranslation();
  return (
    <main>
      <h1>{t('Loading')}</h1>
    </main>
  );
};

const AppLayout = () => {
  const { t } = useTranslation();

  return (
    <Suspense fallback={<Loader />}>
      <Header />

      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>

      <footer style={{ textAlign: 'center', padding: '1rem' }}>

      </footer>
    </Suspense>
  );
};

export default AppLayout;

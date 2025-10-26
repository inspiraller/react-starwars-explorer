import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import { CircularProgress, Typography } from '@mui/material';

import Header from './components/Header/Header';

export const Loader = () => {
  const { t } = useTranslation();
  return (
    <main>
      <Typography variant='h1' textAlign={'center'} fontSize={'2rem'}>
        {t('Loading')}
      </Typography>
      <CircularProgress />
    </main>
  );
};

const AppLayout = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Header />
      <Outlet />
    </Suspense>
  );
};

export default AppLayout;

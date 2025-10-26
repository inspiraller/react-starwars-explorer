import { routePaths } from '@/routes/routePaths';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { Vehicles } from '@/components/Vehicles/Vehicles';

const PAGE_URL = `https://www.domain.com${routePaths.vehicles}`;

const VehiclesPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <meta property='og:url' content={PAGE_URL} />
        <meta property='og:title' content={t('page.vehicles.head.og.title')} />
        <meta
          property='og:description'
          content={t('page.vehicles.head.og.description')}
        />
        <meta
          property='description'
          content={t('page.vehicles.head.description')}
        />
        <title>{t('page.vehicles.head.title')}</title>
      </Helmet>

      <Box component='main' p={2}>
        {/* Main heading */}
        {/* Main heading */}
        <Typography
          component='h1'
          fontWeight='bold'
          fontSize={'3rem'}
          mb={'1rem'}
        >
          {t('page.vehicles.body.h1')}
        </Typography>

        <Vehicles />
      </Box>
    </>
  );
};

export default VehiclesPage;

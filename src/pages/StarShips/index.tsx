import { routePaths } from '@/routes/routePaths';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';

const PAGE_URL = `https://www.domain.com${routePaths['star-ships']}`;

const StarShipsPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <meta property='og:url' content={PAGE_URL} />
        <meta
          property='og:title'
          content={t('page.star-ships.head.og.title')}
        />
        <meta
          property='og:description'
          content={t('page.star-ships.head.og.description')}
        />
        <meta
          property='description'
          content={t('page.star-ships.head.description')}
        />
        <title>{t('page.star-ships.head.title')}</title>
      </Helmet>

      <Box component='main' p={2}>
        {/* Main heading */}
        <Typography variant='h2' component='h1' fontWeight='bold' gutterBottom>
          {t('page.star-ships.body.h1')}
        </Typography>
      </Box>
    </>
  );
};

export default StarShipsPage;

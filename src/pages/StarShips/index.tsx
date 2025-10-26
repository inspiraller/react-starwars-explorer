import { routePaths } from '@/routes/routePaths';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { Starships } from '@/components/Starships/Starships';

const PAGE_URL = `https://www.domain.com${routePaths.starships}`;

const StarshipsPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <meta property='og:url' content={PAGE_URL} />
        <meta property='og:title' content={t('page.starships.head.og.title')} />
        <meta
          property='og:description'
          content={t('page.starships.head.og.description')}
        />
        <meta
          property='description'
          content={t('page.starships.head.description')}
        />
        <title>{t('page.starships.head.title')}</title>
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
          {t('page.starships.body.h1')}
        </Typography>

        <Starships />
      </Box>
    </>
  );
};

export default StarshipsPage;

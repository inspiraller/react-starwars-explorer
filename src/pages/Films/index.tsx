import { routePaths } from '@/routes/routePaths';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { Films } from '@/components/Films/Films';

const PAGE_URL = `https://www.domain.com${routePaths.films}`;

const FilmsPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <meta property='og:url' content={PAGE_URL} />
        <meta property='og:title' content={t('page.films.head.og.title')} />
        <meta
          property='og:description'
          content={t('page.films.head.og.description')}
        />
        <meta
          property='description'
          content={t('page.films.head.description')}
        />
        <title>{t('page.films.head.title')}</title>
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
          {t('page.films.body.h1')}
        </Typography>

        <Films />
      </Box>
    </>
  );
};

export default FilmsPage;

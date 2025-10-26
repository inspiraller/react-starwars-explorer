import { routePaths } from '@/routes/routePaths';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { Species } from '@/components/Species/Species';

const PAGE_URL = `https://www.domain.com${routePaths.species}`;

const SpeciesPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <meta property='og:url' content={PAGE_URL} />
        <meta property='og:title' content={t('page.species.head.og.title')} />
        <meta
          property='og:description'
          content={t('page.species.head.og.description')}
        />
        <meta
          property='description'
          content={t('page.species.head.description')}
        />
        <title>{t('page.species.head.title')}</title>
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
          {t('page.species.body.h1')}
        </Typography>

        <Species />
      </Box>
    </>
  );
};

export default SpeciesPage;

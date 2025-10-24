import { routePaths } from '@/routes/routePaths';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { People } from '@/components/People/People';

const PAGE_URL = `https://www.domain.com${routePaths.people}`;

const PeoplePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <meta property='og:url' content={PAGE_URL} />
        <meta property='og:title' content={t('page.people.head.og.title')} />
        <meta
          property='og:description'
          content={t('page.people.head.og.description')}
        />
        <meta
          property='description'
          content={t('page.people.head.description')}
        />
        <title>{t('page.people.head.title')}</title>
      </Helmet>

      <Box component='main' p={2}>
        {/* Main heading */}
        <Typography variant='h2' component='h1' fontWeight='bold' gutterBottom>
          {t('page.people.body.h1')}
        </Typography>

        {/* Navigation button */}
        <Box mt={2}>
          <Button
            component={RouterLink}
            to={routePaths.homepage || '/'}
            variant='contained'
            color='success'
          >
            {t('Homepage')}
          </Button>
        </Box>
        <People />
      </Box>
    </>
  );
};

export default PeoplePage;

import { routePaths } from '@/routes/routePaths';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Link } from '@mui/material';

const PAGE_URL = `https://www.domain.com${routePaths.homepage}`;

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <meta property='og:url' content={PAGE_URL} />
        <meta property='og:title' content={t('page.homepage.head.og.title')} />
        <meta
          property='og:description'
          content={t('page.homepage.head.og.description')}
        />
        <meta
          property='description'
          content={t('page.homepage.head.description')}
        />
        <title>{t('page.homepage.head.title')}</title>
      </Helmet>

      <Box component='main' p={2}>
        {/* Main heading */}
        <Typography variant='h2' component='h1' fontWeight='bold' gutterBottom>
          {t('page.homepage.body.h1')}
        </Typography>

        {/* Navigation link */}
        <nav>
          <Link
            component={RouterLink}
            to={routePaths.people || '/people'}
            aria-label={t('People')}
            underline='hover'
            color='primary'
          >
            {t('People')}
          </Link>
        </nav>
      </Box>
    </>
  );
};

export default HomePage;

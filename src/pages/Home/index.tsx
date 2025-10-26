import { routePaths } from '@/routes/routePaths';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';

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

      <Box component='main' maxWidth={'50rem'} margin={'0 auto'} p={'2rem'}>
        {/* Main heading */}
        <Typography
          component='h1'
          fontWeight='bold'
          fontSize={'3rem'}
          mb={'1rem'}
          textTransform={'uppercase'}
        >
          {t('page.homepage.body.h1')}
        </Typography>
        <p>
          Welcome to the Star Wars Galaxy explorer. Here you can discover the
          wonders of the inhabitants of the galaxy. Click on the navigation
          above to view the different areas of this website. Within each seach
          you can search for a favourite person, name, species, vehicle to learn
          more about them.
        </p>
      </Box>
    </>
  );
};

export default HomePage;

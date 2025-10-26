import { useTranslation } from 'react-i18next';

import { Toolbar, Typography, Link, Box } from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';
import { routePaths } from '@/routes/routePaths';

export const Loader = () => {
  const { t } = useTranslation();
  return (
    <main>
      <h1>{t('Loading')}</h1>
    </main>
  );
};

const Header = () => {
  const { t } = useTranslation();

  return (
    <Toolbar
      component={'header'}
      sx={{
        justifyContent: 'space-between',
        dislay: 'flex',
        backgroundColor: 'var(--bg-default)',
      }}
    >
      <Link
        component={RouterLink}
        to={routePaths.homepage}
        color='primary'
        underline='hover'
        variant='h6'
      >
        <Typography>{t('Star Wars Galaxy')}</Typography>
      </Link>

      <Box display={'flex'} gap={'1rem'} component={'nav'}>
        <Link
          component={RouterLink}
          to={routePaths.people}
          color='primary'
          underline='hover'
        >
          {t('People')}
        </Link>

        <Link
          component={RouterLink}
          to={routePaths['star-ships']}
          color='primary'
          underline='hover'
        >
          {t('Starships')}
        </Link>
      </Box>
    </Toolbar>
  );
};

export default Header;

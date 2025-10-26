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
        p: '2rem',
        alignItems: 'start',
      }}
    >
      <Link
        component={RouterLink}
        to={routePaths.homepage}
        color='white'
        underline='hover'
        variant='h6'
        minWidth='14rem'
        textTransform={'uppercase'}
      >
        <Typography>{t('Star Wars Galaxy')}</Typography>
      </Link>

      <Box display={'flex'} component={'nav'} flexWrap={'wrap'}>
        <Link
          component={RouterLink}
          to={routePaths.people}
          color='primary'
          underline='hover'
          pr={'1rem'}
        >
          {t('People')}
        </Link>

        <Link
          component={RouterLink}
          to={routePaths['starships']}
          color='primary'
          underline='hover'
          pr={'1rem'}
        >
          {t('Starships')}
        </Link>

        <Link
          component={RouterLink}
          to={routePaths['vehicles']}
          color='primary'
          underline='hover'
          pr={'1rem'}
        >
          {t('Vehicles')}
        </Link>
        <Link
          component={RouterLink}
          to={routePaths['species']}
          color='primary'
          underline='hover'
          pr={'1rem'}
        >
          {t('Species')}
        </Link>
        <Link
          component={RouterLink}
          to={routePaths['planets']}
          color='primary'
          underline='hover'
          pr={'1rem'}
        >
          {t('Planets')}
        </Link>
        <Link
          component={RouterLink}
          to={routePaths['films']}
          color='primary'
          underline='hover'
          pr={'1rem'}
        >
          {t('Films')}
        </Link>
      </Box>
    </Toolbar>
  );
};

export default Header;

import { useTranslation } from 'react-i18next';

import { AppBar, Button, Toolbar, Typography, Link, Box } from '@mui/material';
import { useThemeMode } from '@/context/Theme/CustomThemeProvider';

import { Link as RouterLink } from 'react-router-dom';
import { routePaths } from '@/routes/routePaths';

import { BsMoonFill, BsMoon } from 'react-icons/bs';

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

      <Box display={'flex'} gap={'1rem'}>
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

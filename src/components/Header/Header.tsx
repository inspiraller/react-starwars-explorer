import { useTranslation } from 'react-i18next';

import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { useThemeMode } from '@/context/Theme/CustomThemeProvider';

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
  const { toggleMode, mode } = useThemeMode();

  return (
    <AppBar
      position='static'
      sx={(theme) => ({
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      })}
    >
      <Toolbar>
        <Typography variant='h6' sx={{ flexGrow: 1 }}>
          {t('Star Wars Galaxy')}
        </Typography>
        <Button color='secondary' variant='contained' onClick={toggleMode}>
          {mode === 'light' ? t('Dark Side') : t('Light Side')}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

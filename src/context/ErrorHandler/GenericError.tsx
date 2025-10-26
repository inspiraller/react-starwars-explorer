import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const { NODE_ENV } = process.env;
interface Props {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  handleRetry: () => void;
}

export const GenericError = ({ error, errorInfo, handleRetry }: Props) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        padding: 3,
        textAlign: 'center',
      }}
    >
      <Alert severity='error' sx={{ maxWidth: 600, width: '100%' }}>
        <AlertTitle>{t('Something went wrong')}</AlertTitle>
        <Typography variant='body2' sx={{ mb: 2 }}>
          {error?.message || t('keys.errors.unexpected')}
        </Typography>

        {NODE_ENV === 'development' && errorInfo && (
          <Box sx={{ mt: 2, textAlign: 'left' }}>
            <Typography
              variant='caption'
              component='pre'
              sx={{
                fontSize: '0.75rem',
                overflow: 'auto',
                maxHeight: '200px',
                padding: 1,
                borderRadius: 1,
              }}
            >
              {error?.stack}
            </Typography>
          </Box>
        )}

        <Button
          variant='contained'
          color='primary'
          onClick={handleRetry}
          sx={{ mt: 2 }}
        >
          {t('Try again')}
        </Button>
      </Alert>
    </Box>
  );
};

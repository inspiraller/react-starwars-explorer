import React from 'react';
import ReactDOM from 'react-dom';
import { Snackbar, Alert } from '@mui/material';

interface Props {
  open: boolean;
  handleCloseToast: () => void;
  children: React.ReactNode;
}
export const Toast = ({ open, handleCloseToast, children }: Props) => {
  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return; // Prevent closing on click outside
    }
    handleCloseToast();
  };

  const content = (
    <Snackbar
      open={open}
      autoHideDuration={3000} // 3 seconds
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{ zIndex: 9999 }}
    >
      <Alert
        onClose={handleClose}
        severity='success'
        sx={{
          width: '100%',
          background: 'var(--bg-warning)',
          fontWeight: 'bold',
        }}
      >
        {children}
      </Alert>
    </Snackbar>
  );

  return ReactDOM.createPortal(content, document.body);
};

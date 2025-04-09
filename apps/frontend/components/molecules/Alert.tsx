import React from 'react';
import { Alert as MuiAlert, AlertProps as MuiAlertProps, Snackbar } from '@mui/material';

interface AlertProps extends MuiAlertProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ open, message, onClose, severity, ...props }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <MuiAlert elevation={6} variant="filled" onClose={onClose} severity={severity} {...props}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;

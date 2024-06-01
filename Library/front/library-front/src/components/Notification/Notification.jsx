import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';


const Notification = ({ message, variant, show }) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (show && message) {
      const variantClass = variant === 'success' ? 'snackbar-success' : 'snackbar-error';
      enqueueSnackbar(message, { variant, className: variantClass });
    }
  }, [enqueueSnackbar, message, variant, show]);

  return null;
};

export default Notification;

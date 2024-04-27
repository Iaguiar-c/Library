import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';

const Notification = ({ message, variant, show }) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (show && message) {
      enqueueSnackbar(message, { variant });
    }
  }, [enqueueSnackbar, message, variant, show]);

  return null;
};

export default Notification;

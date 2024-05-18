import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import { useTranslation } from 'react-i18next';

const PasswordField = ({ passwordRef, id = 'password' }) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-primary-950"
      >
        {t('senha')}
      </label>
      <div className="relative">
        <input
          autoFocus
          id={id}
          type={showPassword ? 'text' : 'password'}
          ref={passwordRef}
          minLength={6}
          required
          className="block w-full rounded-md border-0 py-1.5 px-1.5 pr-10 text-primary-900 shadow-sm ring-1 ring-inset ring-primary-300 placeholder-text-primary-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          <IconButton
            onClick={handleClickShowPassword}
            size="small"
            className="p-1"
            style={{ marginLeft: 'auto' }}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default PasswordField;

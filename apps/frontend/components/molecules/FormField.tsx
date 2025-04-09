import React from 'react';
import TextField from '@mui/material/TextField';
import type { TextFieldProps } from '@mui/material/TextField';

type FormFieldProps = TextFieldProps & {
  errorText?: string;
};

const FormField: React.FC<FormFieldProps> = ({ errorText, ...props }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      margin="normal"
      error={!!errorText}
      helperText={errorText}
      {...props}
    />
  );
};

export default FormField;

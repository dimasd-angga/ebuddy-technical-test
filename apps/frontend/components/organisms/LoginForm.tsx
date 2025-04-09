import React, { useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { loginUser, clearError } from '@/store/slices/authSlice';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';
import Alert from '@/components/molecules/Alert';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(loginUser({ email, password }));
  };

  const handleCloseAlert = () => {
    dispatch(clearError());
  };

  return (
    <Card sx={{ maxWidth: { xs: '100%', sm: 400 }, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Login
        </Typography>

        <Alert open={!!error} message={error || ''} severity="error" onClose={handleCloseAlert} />

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <FormField
            id="email"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            autoFocus
          />

          <FormField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            loading={loading}
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LoginForm;

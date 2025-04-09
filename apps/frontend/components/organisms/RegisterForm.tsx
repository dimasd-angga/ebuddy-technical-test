import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { registerUser, clearError } from '@/store/slices/authSlice';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';
import Alert from '@/components/molecules/Alert';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate passwords
    if (name === 'password') {
      if (value.length < 6) {
        setFormErrors((prev) => ({ ...prev, password: 'Password must be at least 6 characters' }));
      } else {
        setFormErrors((prev) => ({ ...prev, password: '' }));
      }

      if (formData.confirmPassword && value !== formData.confirmPassword) {
        setFormErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      } else if (formData.confirmPassword) {
        setFormErrors((prev) => ({ ...prev, confirmPassword: '' }));
      }
    }

    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        setFormErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      } else {
        setFormErrors((prev) => ({ ...prev, confirmPassword: '' }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (formData.password !== formData.confirmPassword) {
      setFormErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      return;
    }

    if (formData.password.length < 6) {
      setFormErrors((prev) => ({ ...prev, password: 'Password must be at least 6 characters' }));
      return;
    }

    const { confirmPassword, ...userData } = formData;
    await dispatch(registerUser(userData));
  };

  const handleCloseAlert = () => {
    dispatch(clearError());
  };

  return (
    <Card sx={{ maxWidth: { xs: '100%', sm: 600 }, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Create Account
        </Typography>

        <Alert open={!!error} message={error || ''} severity="error" onClose={handleCloseAlert} />

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormField
                id="firstName"
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormField
                id="email"
                name="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                errorText={formErrors.password}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                errorText={formErrors.confirmPassword}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            loading={loading}
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;

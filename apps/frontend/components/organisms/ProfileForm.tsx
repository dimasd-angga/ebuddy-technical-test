import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { updateCurrentUser, clearError } from '@/store/slices/authSlice';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';
import Alert from '@/components/molecules/Alert';
import { User } from '@ebuddy-user-management/shared';

const ProfileForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState<Partial<User>>({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(
      updateCurrentUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
      }),
    );

    if (updateCurrentUser.fulfilled.match(result)) {
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleCloseAlert = () => {
    dispatch(clearError());
  };

  const handleCloseSuccess = () => {
    setSuccessMessage('');
  };

  if (!user) {
    return null;
  }

  return (
    <Card sx={{ maxWidth: { xs: '100%', sm: 600 }, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Update Profile
        </Typography>

        <Alert open={!!error} message={error || ''} severity="error" onClose={handleCloseAlert} />

        <Alert
          open={!!successMessage}
          message={successMessage}
          severity="success"
          onClose={handleCloseSuccess}
        />

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
                disabled={true}
                required
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
            Update Profile
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;

'use client';

import React, { useEffect } from 'react';
import { Typography, Box, Grid, Card, CardContent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchCurrentUser } from '@/store/slices/authSlice';
import Layout from '@/components/templates/Layout';
import ProtectedRoute from '@/components/templates/ProtectedRoute';
import Button from '@/components/atoms/Button';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <ProtectedRoute>
      <Layout title="Dashboard">
        <Box sx={{ flexGrow: 1 }}>
          <Typography sx={{ mb: 3 }} variant="h4" component="h1" gutterBottom>
            Welcome, {user?.firstName || 'User'}!
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <PersonIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h5" gutterBottom>
                    Your Profile
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    View and update your personal information
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => router.push('/profile')}
                  >
                    Manage Profile
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <PeopleIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h5" gutterBottom>
                    User Directory
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Browse and search through all registered users
                  </Typography>
                  <Button variant="contained" color="primary" onClick={() => router.push('/users')}>
                    View Users
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Layout>
    </ProtectedRoute>
  );
}

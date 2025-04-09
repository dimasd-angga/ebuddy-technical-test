'use client';

import React, { useEffect } from 'react';
import { Typography, Box, Paper, Link as MuiLink } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import LoginForm from '@/components/organisms/LoginForm';
import Layout from '@/components/templates/Layout';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  return (
    <Layout title="Login">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            maxWidth: 500,
            width: '100%',
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Welcome Back
          </Typography>

          <LoginForm />

          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Don&apos;t have an account?{' '}
              <MuiLink component={Link} href="/register">
                Register
              </MuiLink>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Layout>
  );
}

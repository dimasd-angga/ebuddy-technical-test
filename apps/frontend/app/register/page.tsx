'use client';

import React, { useEffect } from 'react';
import { Typography, Box, Paper, Link as MuiLink } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import RegisterForm from '@/components/organisms/RegisterForm';
import Layout from '@/components/templates/Layout';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  return (
    <Layout title="Register">
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
            maxWidth: 600,
            width: '100%',
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Create Account
          </Typography>

          <RegisterForm />

          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Already have an account?{' '}
              <Link href="/login" passHref>
                <MuiLink>Login</MuiLink>
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Layout>
  );
}

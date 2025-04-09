'use client';

import React from 'react';
import { Typography, Box } from '@mui/material';
import Layout from '@/components/templates/Layout';
import ProtectedRoute from '@/components/templates/ProtectedRoute';
import UsersList from '@/components/organisms/UsersList';

export default function UsersPage() {
  return (
    <ProtectedRoute>
      <Layout title="All Users">
        <Box sx={{ flexGrow: 1 }}>
          <Typography sx={{ mb: 3 }} variant="h4" component="h1" gutterBottom>
            User Directory
          </Typography>

          <UsersList />
        </Box>
      </Layout>
    </ProtectedRoute>
  );
}

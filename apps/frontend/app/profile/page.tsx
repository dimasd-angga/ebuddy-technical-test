'use client';

import React, { useEffect } from 'react';
import {  Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { fetchCurrentUser } from '@/store/slices/authSlice';
import Layout from '@/components/templates/Layout';
import ProtectedRoute from '@/components/templates/ProtectedRoute';
import ProfileForm from '@/components/organisms/ProfileForm';

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <ProtectedRoute>
      <Layout title="Profile">
        <Box sx={{ flexGrow: 1 }}>
          <ProfileForm />
        </Box>
      </Layout>
    </ProtectedRoute>
  );
}

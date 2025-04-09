'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { CircularProgress, Box } from '@mui/material';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading || !isAuthenticated) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;

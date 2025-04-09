import React, { useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchAllUsers } from '@/store/slices/userSlice';
import { format } from 'date-fns';

const UsersList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { usersList, pagination, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchAllUsers({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    dispatch(
      fetchAllUsers({
        page: newPage + 1, // API uses 1-indexed pages
        limit: pagination.pageSize,
      }),
    );
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const limit = parseInt(event.target.value, 10);
    dispatch(fetchAllUsers({ page: 1, limit }));
  };

  const formatDate = (
      timestamp?: Date | { _seconds: number; _nanoseconds: number }
  ): string => {
    if (!timestamp) return 'N/A';

    if (
        typeof timestamp === 'object' &&
        '_seconds' in timestamp &&
        typeof timestamp._seconds === 'number'
    ) {
      const date = new Date(timestamp._seconds * 1000);
      return format(date, 'MMM dd, yyyy');
    }

    if (timestamp instanceof Date) {
      return format(timestamp, 'MMM dd, yyyy');
    }

    return 'N/A';
  };

  if (error) {
    return (
      <Box textAlign="center" p={3}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  console.log(usersList);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" p={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Table stickyHeader aria-label="users table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Updated</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersList.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell>{formatDate(user.updatedAt)}</TableCell>
                </TableRow>
              ))}
              {usersList.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <TablePagination
        component="div"
        count={pagination.totalItems}
        page={pagination.currentPage - 1} // Convert 1-indexed to 0-indexed
        rowsPerPage={pagination.pageSize}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </Paper>
  );
};

export default UsersList;

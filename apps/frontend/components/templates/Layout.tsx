'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { logoutUser } from '@/store/slices/authSlice';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'User Management' }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const pathname = usePathname();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.push('/login');
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <HomeIcon />, path: '/' },
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
    { text: 'All Users', icon: <PeopleIcon />, path: '/users' },
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {menuItems.map((item) => (
          <Link
            href={item.path}
            key={item.text}
            passHref
            style={{ textDecoration: 'none', color: '#fff' }}
          >
            <ListItem
              button
              selected={pathname === item.path}
              sx={{
                color: pathname === item.path ? 'primary.main' : 'inherit',
                backgroundColor: pathname === item.path ? 'white' : 'inherit',
                '&.Mui-selected:hover': {
                  backgroundColor: 'white',
                },
              }}
            >
              <ListItemIcon sx={{ color: pathname === item.path ? 'primary.main' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          {isAuthenticated && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>

          {isAuthenticated && (
            <>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {menuItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link href={item.path} key={item.text} passHref>
                      <Button
                        sx={{
                          ml: 1,
                          color: isActive ? 'primary.main' : 'white',
                          backgroundColor: isActive ? 'white' : 'transparent',
                          '&:hover': {
                            backgroundColor: isActive ? 'white' : 'rgba(255, 255, 255, 0.08)',
                          },
                        }}
                      >
                        {item.text}
                      </Button>
                    </Link>
                  );
                })}
                <Button color="inherit" onClick={handleLogout} sx={{ ml: 1 }}>
                  Logout
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawer}
      </Drawer>

      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;

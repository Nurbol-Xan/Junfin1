import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Avatar, Stack, IconButton, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LangSwitcher from './LangSwitcher';
import logo from '../images/logo12.png';

const Navbar = ({ user, onLogout, onSidebarOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={2}
      sx={{
        bgcolor: '#fff',
        borderBottom: '2px solid #e3f2fd',
      }}
    >
      <Toolbar sx={{ maxWidth: '1200px', mx: 'auto', width: '100%' }}>
        {isMobile && (
          <IconButton edge="start" color="primary" aria-label="menu" onClick={onSidebarOpen} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 160 }}>
          <img src={logo} alt="JUNFIN" style={{ height: 36, marginRight: 8 }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: '#1976d2',
              display: { xs: 'none', sm: 'block' },
              whiteSpace: 'nowrap'
            }}
          >
            JUNFIN
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <LangSwitcher />
        {user && (
          <Stack direction="row" alignItems="center" spacing={2} sx={{ ml: 3 }}>
            <Avatar src={user.avatar} alt={user.name} />
            <Typography fontWeight={700}>{user.name}</Typography>
            <Button color="error" variant="outlined" onClick={onLogout}>Logout</Button>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

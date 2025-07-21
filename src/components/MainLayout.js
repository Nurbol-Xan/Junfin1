import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Box, useTheme, useMediaQuery } from '@mui/material';

const drawerWidth = 280;

const MainLayout = ({ user, role, onLogout, onNavigate, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#fafbfc' }}>
      <Sidebar
        user={user}
        role={role}
        open={isMobile ? sidebarOpen : true}
        onClose={() => setSidebarOpen(false)}
        onNavigate={onNavigate}
      />
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        ml: { md: `${drawerWidth}px` }
      }}>
        {/* NAVBAR */}
        <Box sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          width: '100%',
        }}>
          <Navbar
            user={user}
            role={role}
            onLogout={onLogout}
            onSidebarOpen={() => setSidebarOpen(true)}
          />
        </Box>
        {/* MAIN */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3, md: 4 },
            mt: '72px',
            width: '100%',
            backgroundColor: '#fafbfc',
            minHeight: 'calc(100vh - 72px)'
          }}
        >
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default MainLayout; 
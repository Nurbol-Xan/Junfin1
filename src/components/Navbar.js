import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Button, 
  Avatar, 
  Stack, 
  IconButton, 
  useTheme, 
  useMediaQuery,
  Badge,
  Menu,
  MenuItem,
  Divider,
  Chip
} from '@mui/material';
import { 
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import LangSwitcher from './LangSwitcher';
import logo from '../images/logo12.png';

// Role-based color schemes
const roleThemes = {
  admin: {
    primary: '#d32f2f',
    secondary: '#ffcdd2',
    accent: '#ff5722',
    gradient: 'linear-gradient(135deg, #d32f2f 0%, #f44336 100%)'
  },
  parent: {
    primary: '#1976d2',
    secondary: '#bbdefb',
    accent: '#2196f3',
    gradient: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)'
  },
  child: {
    primary: '#388e3c',
    secondary: '#c8e6c9',
    accent: '#4caf50',
    gradient: 'linear-gradient(135deg, #388e3c 0%, #66bb6a 100%)'
  }
};

const Navbar = ({ user, role, onLogout, onSidebarOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificationAnchor, setNotificationAnchor] = React.useState(null);

  const currentTheme = roleThemes[role] || roleThemes.parent;

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotificationAnchor(null);
  };

  const getRoleLabel = (role) => {
    switch(role) {
      case 'admin': return t('admin_dashboard');
      case 'parent': return t('parent_dashboard');
      case 'child': return t('child_dashboard');
      default: return t('dashboard');
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: currentTheme.gradient,
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${currentTheme.secondary}`,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar sx={{ maxWidth: '1200px', mx: 'auto', width: '100%', py: 1 }}>
        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton 
            edge="start" 
            color="inherit" 
            aria-label="menu" 
            onClick={onSidebarOpen} 
            sx={{ 
              mr: 2,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              }
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Logo Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 160 }}>
          <Avatar 
            src={logo} 
            alt="JUNFIN" 
            sx={{ 
              width: 40, 
              height: 40, 
              mr: 2,
              border: '2px solid rgba(255,255,255,0.2)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }} 
          />
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: '#fff',
                display: { xs: 'none', sm: 'block' },
                lineHeight: 1.2,
                letterSpacing: '0.5px'
              }}
            >
              JUNFIN
            </Typography>
            {user && (
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  display: { xs: 'none', sm: 'block' },
                  fontWeight: 500
                }}
              >
                {getRoleLabel(role)}
              </Typography>
            )}
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Right Side Actions */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <LangSwitcher />
          
          {user && (
            <>
              {/* Notifications */}
              <IconButton
                color="inherit"
                onClick={handleNotificationClick}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }
                }}
              >
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              {/* User Profile */}
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  ml: 2,
                  cursor: 'pointer',
                  p: 1,
                  borderRadius: 2,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }
                }}
                onClick={handleProfileClick}
              >
                <Avatar 
                  src={user.avatar} 
                  alt={user.name}
                  sx={{ 
                    width: 36, 
                    height: 36, 
                    mr: 1,
                    border: '2px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }} 
                />
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Typography 
                    variant="body2" 
                    fontWeight={700} 
                    color="white"
                    sx={{ lineHeight: 1.2 }}
                  >
                    {user.name}
                  </Typography>
                  <Chip 
                    label={role.toUpperCase()} 
                    size="small"
                    sx={{
                      height: 16,
                      fontSize: '10px',
                      fontWeight: 600,
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      '& .MuiChip-label': { px: 1 }
                    }}
                  />
                </Box>
              </Box>
            </>
          )}
        </Stack>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 200,
              borderRadius: 2,
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              border: '1px solid rgba(255,255,255,0.1)',
            }
          }}
        >
          <Box sx={{ p: 2, backgroundColor: currentTheme.secondary }}>
            <Typography variant="subtitle2" fontWeight={700}>
              {t('welcome_back')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.name}
            </Typography>
          </Box>
          <Divider />
          <MenuItem onClick={handleClose}>
            <AccountCircleIcon sx={{ mr: 2, color: 'text.secondary' }} />
            {t('profile')}
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <SettingsIcon sx={{ mr: 2, color: 'text.secondary' }} />
            {t('settings')}
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <HelpIcon sx={{ mr: 2, color: 'text.secondary' }} />
            {t('help')}
          </MenuItem>
          <Divider />
          <MenuItem 
            onClick={() => {
              handleClose();
              onLogout();
            }}
            sx={{ color: 'error.main' }}
          >
            <LogoutIcon sx={{ mr: 2 }} />
            {t('logout')}
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 300,
              maxHeight: 400,
              borderRadius: 2,
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            }
          }}
        >
          <Box sx={{ p: 2, backgroundColor: 'primary.main', color: 'white' }}>
            <Typography variant="subtitle2" fontWeight={700}>
              {t('notifications')}
            </Typography>
          </Box>
          <MenuItem>
            <Box>
              <Typography variant="body2" fontWeight={600}>
                Yangi vazifa qo'shildi
              </Typography>
              <Typography variant="caption" color="text.secondary">
                2 daqiqa oldin
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem>
            <Box>
              <Typography variant="body2" fontWeight={600}>
                Maqsad 80% bajarildi
              </Typography>
              <Typography variant="caption" color="text.secondary">
                1 soat oldin
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem>
            <Box>
              <Typography variant="body2" fontWeight={600}>
                Yangi mukofot olingan
              </Typography>
              <Typography variant="caption" color="text.secondary">
                3 soat oldin
              </Typography>
            </Box>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

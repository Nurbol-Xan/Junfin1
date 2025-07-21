import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  Divider,
  Chip,
  Stack,
  alpha
} from '@mui/material';
import { 
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  Group as GroupIcon,
  Storefront as StorefrontIcon,
  Settings as SettingsIcon,
  Assignment as AssignmentIcon,
  EmojiEvents as EmojiEventsIcon,
  BarChart as BarChartIcon,
  AccountBalance as AccountBalanceIcon,
  TrendingUp as TrendingUpIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  History as HistoryIcon,
  ShoppingCart as ShoppingCartIcon,
  Star as StarIcon,
  HomeWork as HomeWorkIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const drawerWidth = 280;

// Role-based color schemes
const roleThemes = {
  admin: {
    primary: '#d32f2f',
    secondary: '#ffcdd2',
    accent: '#ff5722',
    gradient: 'linear-gradient(135deg, #d32f2f 0%, #f44336 100%)',
    background: 'linear-gradient(180deg, #f5f5f5 0%, #fafafa 100%)',
    text: '#333'
  },
  parent: {
    primary: '#1976d2',
    secondary: '#bbdefb',
    accent: '#2196f3',
    gradient: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
    background: 'linear-gradient(180deg, #f0f7ff 0%, #fafcff 100%)',
    text: '#333'
  },
  child: {
    primary: '#388e3c',
    secondary: '#c8e6c9',
    accent: '#4caf50',
    gradient: 'linear-gradient(135deg, #388e3c 0%, #66bb6a 100%)',
    background: 'linear-gradient(180deg, #f1f8e9 0%, #f9fbe7 100%)',
    text: '#333'
  }
};

const menuByRole = {
  admin: [
    { text: 'dashboard', icon: <DashboardIcon />, path: '/admin/', color: '#1976d2' },
    { text: 'users', icon: <GroupIcon />, path: '/admin/families', color: '#9c27b0' },
    { text: 'shop_catalog', icon: <StorefrontIcon />, path: '/admin/catalog', color: '#ff9800' },
    { text: 'analytics', icon: <BarChartIcon />, path: '/admin/analytics', color: '#4caf50' },
    { text: 'localization', icon: <LanguageIcon />, path: '/admin/localization', color: '#00bcd4' },
    { text: 'settings', icon: <SettingsIcon />, path: '/admin/settings', color: '#607d8b' },
  ],
  parent: [
    { text: 'dashboard', icon: <DashboardIcon />, path: '/parent/', color: '#1976d2' },
    { text: 'children', icon: <GroupIcon />, path: '/parent/children', color: '#e91e63' },
    { text: 'tasks', icon: <AssignmentIcon />, path: '/parent/tasks', color: '#ff9800' },
    { text: 'limits', icon: <SecurityIcon />, path: '/parent/limits', color: '#f44336' },
    { text: 'reports', icon: <TrendingUpIcon />, path: '/parent/reports', color: '#4caf50' },
  ],
  child: [
    { text: 'dashboard', icon: <DashboardIcon />, path: '/child/', color: '#4caf50' },
    { text: 'my_tasks', icon: <HomeWorkIcon />, path: '/child/tasks', color: '#ff9800' },
    { text: 'goals', icon: <EmojiEventsIcon />, path: '/child/goals', color: '#ffc107' },
    { text: 'shop', icon: <ShoppingCartIcon />, path: '/child/shop', color: '#e91e63' },
    { text: 'history', icon: <HistoryIcon />, path: '/child/history', color: '#9c27b0' },
  ]
};

const Sidebar = ({ user, role, open, onClose, onNavigate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation();
  
  const currentTheme = roleThemes[role] || roleThemes.parent;
  const menuItems = menuByRole[role] || menuByRole.parent;

  const getRoleInfo = (role) => {
    switch(role) {
      case 'admin':
        return { 
          title: t('admin_dashboard'),
          description: 'Tizim administratori',
          badge: 'ADMIN',
          badgeColor: '#d32f2f'
        };
      case 'parent':
        return { 
          title: t('parent_dashboard'),
          description: 'Oila menejeri',
          badge: 'PARENT',
          badgeColor: '#1976d2'
        };
      case 'child':
        return { 
          title: t('child_dashboard'),
          description: 'Yoshlingiz',
          badge: 'CHILD',
          badgeColor: '#388e3c'
        };
      default:
        return { 
          title: t('dashboard'),
          description: 'Foydalanuvchi',
          badge: 'USER',
          badgeColor: '#757575'
        };
    }
  };

  const roleInfo = getRoleInfo(role);

  const drawerContent = (
    <Box 
      sx={{ 
        height: '100%', 
        background: currentTheme.background,
        color: currentTheme.text,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header Section */}
      <Box 
        sx={{ 
          p: 3, 
          background: currentTheme.gradient,
          color: '#fff',
          position: 'relative',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
        }}
      >
        {isMobile && (
          <IconButton 
            onClick={onClose} 
            sx={{ 
              position: 'absolute', 
              top: 8, 
              right: 8, 
              color: '#fff',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
        
        <Box sx={{ textAlign: 'center' }}>
          <Avatar 
            src={user.avatar} 
            alt={user.name} 
            sx={{ 
              width: 80, 
              height: 80, 
              mx: 'auto', 
              mb: 2,
              border: '4px solid rgba(255,255,255,0.3)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
            }} 
          />
          <Typography 
            variant="h6" 
            fontWeight={700} 
            sx={{ mb: 0.5, letterSpacing: '0.5px' }}
          >
            {user.name}
          </Typography>
          <Chip 
            label={roleInfo.badge} 
            size="small"
            sx={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              fontWeight: 600,
              fontSize: '11px',
              mb: 1
            }}
          />
          <Typography 
            variant="body2" 
            sx={{ 
              opacity: 0.9,
              fontWeight: 500,
              fontSize: '13px'
            }}
          >
            {roleInfo.description}
          </Typography>
        </Box>
      </Box>

      {/* Navigation Section */}
      <Box sx={{ flex: 1, py: 2 }}>
        <Typography 
          variant="overline" 
          sx={{ 
            px: 3, 
            mb: 1, 
            fontWeight: 700, 
            color: 'text.secondary',
            fontSize: '11px',
            letterSpacing: '1px'
          }}
        >
          {t('main_menu')}
        </Typography>
        
        <List sx={{ px: 2 }}>
          {menuItems.map((item, i) => (
            <ListItem 
              button 
              key={i} 
              onClick={() => { 
                onNavigate(item.path); 
                if (isMobile) onClose(); 
              }} 
              sx={{ 
                borderRadius: 3, 
                mb: 1,
                transition: 'all 0.2s ease',
                '&:hover': { 
                  backgroundColor: alpha(currentTheme.primary, 0.08),
                  transform: 'translateX(4px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                },
                '&:active': {
                  transform: 'translateX(2px)'
                }
              }}
            >
              <ListItemIcon 
                sx={{ 
                  color: item.color,
                  minWidth: 48,
                  '& .MuiSvgIcon-root': {
                    fontSize: 24
                  }
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={t(item.text)}
                primaryTypographyProps={{
                  fontWeight: 600,
                  fontSize: '14px'
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Stats Section */}
      <Box sx={{ p: 3, borderTop: '1px solid rgba(0,0,0,0.08)' }}>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Box textAlign="center">
            <Typography variant="h6" fontWeight={800} color={currentTheme.primary}>
              {role === 'admin' ? '1.2K' : role === 'parent' ? '3' : '850'}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '10px' }}>
              {role === 'admin' ? t('users') : role === 'parent' ? t('children') : t('points')}
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h6" fontWeight={800} color={currentTheme.accent}>
              {role === 'admin' ? '456' : role === 'parent' ? '12' : '5'}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '10px' }}>
              {role === 'admin' ? t('families') : role === 'parent' ? t('tasks') : t('goals')}
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Footer */}
      <Box 
        sx={{ 
          p: 2, 
          textAlign: 'center',
          backgroundColor: alpha(currentTheme.primary, 0.05),
          borderTop: '1px solid rgba(0,0,0,0.05)'
        }}
      >
        <Typography 
          variant="caption" 
          color="text.secondary" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: 0.5,
            fontSize: '11px'
          }}
        >
          <StarIcon sx={{ fontSize: 14, color: '#ffc107' }} />
          JUNFIN v1.0
        </Typography>
      </Box>
    </Box>
  );

  return isMobile ? (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        '& .MuiDrawer-paper': { 
          width: drawerWidth, 
          boxSizing: 'border-box',
          border: 'none',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
        },
      }}
    >
      {drawerContent}
    </Drawer>
  ) : (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          border: 'none',
          borderRight: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '4px 0 20px rgba(0,0,0,0.08)'
        },
        display: { xs: 'none', md: 'block' },
      }}
      open
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;

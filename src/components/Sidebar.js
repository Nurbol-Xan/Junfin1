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
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import BarChartIcon from '@mui/icons-material/BarChart';

const drawerWidth = 240;
const menuByRole = {
  admin: [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/' },
    { text: 'Users/Families', icon: <GroupIcon />, path: '/admin/families' },
    { text: 'Shop Catalog', icon: <StorefrontIcon />, path: '/admin/catalog' },
    { text: 'Analytics', icon: <BarChartIcon />, path: '/admin/analytics' },
    { text: 'Localization', icon: <AssignmentIcon />, path: '/admin/localization' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/admin/settings' },
  ],
  parent: [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/parent/' },
    { text: 'Children', icon: <GroupIcon />, path: '/parent/children' },
    { text: 'Tasks', icon: <AssignmentIcon />, path: '/parent/tasks' },
    { text: 'Limits', icon: <SettingsIcon />, path: '/parent/limits' },
    { text: 'Reports', icon: <BarChartIcon />, path: '/parent/reports' },
  ],
  child: [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/child/' },
    { text: 'My Tasks', icon: <AssignmentIcon />, path: '/child/tasks' },
    { text: 'Goals', icon: <EmojiEventsIcon />, path: '/child/goals' },
    { text: 'Shop', icon: <StorefrontIcon />, path: '/child/shop' },
    { text: 'History', icon: <BarChartIcon />, path: '/child/history' },
  ]
};

const Sidebar = ({ user, role, open, onClose, onNavigate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const drawerContent = (
    <Box sx={{ height: '100%', bgcolor: '#fff', color: '#222' }}>
      <Box sx={{ p: 3, textAlign: 'center', bgcolor: '#1976d2', color: '#fff' }}>
        <Avatar src={user.avatar} alt={user.name} sx={{ width: 64, height: 64, mx: 'auto', mb: 1, border: '3px solid #ffd600' }} />
        <Typography fontWeight={700}>{user.name}</Typography>
        <Typography variant="body2" color="#ffd600">{role.toUpperCase()}</Typography>
        {isMobile && (
          <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8, color: '#fff' }}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      <List sx={{ mt: 2 }}>
        {menuByRole[role].map((item, i) => (
          <ListItem button key={i} onClick={() => { onNavigate(item.path); if (isMobile) onClose(); }} sx={{ borderRadius: 2, mx: 1, mb: 1, '&:hover': { bgcolor: '#e3f2fd' } }}>
            <ListItemIcon sx={{ color: '#1976d2' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return isMobile ? (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', bgcolor: '#fff' },
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
          bgcolor: '#fff',
          borderRight: '2px solid #e3f2fd',
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

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import { useTranslation } from 'react-i18next';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Box,
  Stack,
  Avatar,
  Paper,
  LinearProgress,
  Chip
} from '@mui/material';
import {
  Group as GroupIcon,
  Storefront as StorefrontIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as AttachMoneyIcon,
  Assessment as AssessmentIcon,
  Security as SecurityIcon
} from '@mui/icons-material';

// Import admin pages
import AdminFamilies from './AdminFamilies';

const mockUser = { name: 'Admin', avatar: '/images/user-def.png' };

const AdminHome = () => {
  const { t } = useTranslation();

  const stats = [
    { title: t('total_users'), value: '1,234', icon: <GroupIcon />, color: '#1976d2', change: '+12%' },
    { title: t('total_families'), value: '456', icon: <GroupIcon />, color: '#388e3c', change: '+8%' },
    { title: t('total_purchases'), value: '789', icon: <StorefrontIcon />, color: '#f57c00', change: '+15%' },
    { title: 'Jami balans', value: '2.4M', icon: <AttachMoneyIcon />, color: '#7b1fa2', change: '+22%' }
  ];

  const recentActivities = [
    { action: 'Yangi oila ro\'yxatdan o\'tdi', family: 'Karimov Oilasi', time: '5 daqiqa oldin' },
    { action: 'Mahsulot sotildi', family: 'Aliyev Oilasi', time: '10 daqiqa oldin' },
    { action: 'Vazifa bajarildi', family: 'Usmanov Oilasi', time: '15 daqiqa oldin' },
    { action: 'Yangi maqsad qo\'shildi', family: 'Toshmatov Oilasi', time: '20 daqiqa oldin' }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          {t('admin_dashboard')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Tizim statistikasi va boshqaruv paneli
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
                border: '1px solid rgba(0,0,0,0.06)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: stat.color, width: 56, height: 56 }}>
                    {stat.icon}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" fontWeight={800} color={stat.color}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {stat.title}
                    </Typography>
                    <Chip 
                      label={stat.change} 
                      size="small" 
                      color="success" 
                      variant="outlined"
                    />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        {/* Platform Performance */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Platform Performance
              </Typography>
              
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                      <Typography variant="body2">Faol foydalanuvchilar</Typography>
                      <Typography variant="body2" fontWeight={600}>85%</Typography>
                    </Stack>
                    <LinearProgress variant="determinate" value={85} sx={{ height: 8, borderRadius: 4 }} />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                      <Typography variant="body2">Maqsadlar bajarilishi</Typography>
                      <Typography variant="body2" fontWeight={600}>72%</Typography>
                    </Stack>
                    <LinearProgress variant="determinate" value={72} color="success" sx={{ height: 8, borderRadius: 4 }} />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                      <Typography variant="body2">Vazifalar bajarilishi</Typography>
                      <Typography variant="body2" fontWeight={600}>91%</Typography>
                    </Stack>
                    <LinearProgress variant="determinate" value={91} color="warning" sx={{ height: 8, borderRadius: 4 }} />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                      <Typography variant="body2">Sotuvlar konversiyasi</Typography>
                      <Typography variant="body2" fontWeight={600}>68%</Typography>
                    </Stack>
                    <LinearProgress variant="determinate" value={68} color="info" sx={{ height: 8, borderRadius: 4 }} />
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mt: 4 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Oylik o'sish ko'rsatkichlari
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
                      <Typography variant="h6">+24%</Typography>
                      <Typography variant="caption">Yangi oilalar</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.main', color: 'white' }}>
                      <Typography variant="h6">+18%</Typography>
                      <Typography variant="caption">Sotuvlar</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'warning.main', color: 'white' }}>
                      <Typography variant="h6">+12%</Typography>
                      <Typography variant="caption">Faollik</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'info.main', color: 'white' }}>
                      <Typography variant="h6">+31%</Typography>
                      <Typography variant="caption">Daromad</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                So'nggi faoliyatlar
              </Typography>
              <Stack spacing={2} sx={{ mt: 2 }}>
                {recentActivities.map((activity, index) => (
                  <Box key={index} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                    <Typography variant="body2" fontWeight={600}>
                      {activity.action}
                    </Typography>
                    <Typography variant="caption" color="primary">
                      {activity.family}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      {activity.time}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

const AdminDashboard = () => {
  return (
    <MainLayout
      user={mockUser}
      role="admin"
      onLogout={() => window.location.href = '/uz/login'}
      onNavigate={path => window.location.href = '/uz' + path}
    >
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/families" element={<AdminFamilies />} />
        <Route path="/catalog" element={<div>Catalog page coming soon...</div>} />
        <Route path="/analytics" element={<div>Analytics page coming soon...</div>} />
        <Route path="/localization" element={<div>Localization page coming soon...</div>} />
        <Route path="/settings" element={<div>Settings page coming soon...</div>} />
      </Routes>
    </MainLayout>
  );
};

export default AdminDashboard; 
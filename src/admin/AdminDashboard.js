import React from 'react';
import MainLayout from '../components/MainLayout';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';

const mockUser = { name: 'Admin', avatar: '/images/user-def.png' };

const AdminDashboard = () => (
  <MainLayout
    user={mockUser}
    role="admin"
    onLogout={() => window.location.href = '/uz/login'}
    onNavigate={path => window.location.href = '/uz' + path}
  >
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>Admin Analytics</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card elevation={3}><CardContent>
            <Typography variant="h6" fontWeight={700}>Foydalanuvchilar</Typography>
            <Typography variant="h3" color="primary" fontWeight={900}>1,234</Typography>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={3}><CardContent>
            <Typography variant="h6" fontWeight={700}>Oilalar</Typography>
            <Typography variant="h3" color="primary" fontWeight={900}>456</Typography>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={3}><CardContent>
            <Typography variant="h6" fontWeight={700}>Xaridlar</Typography>
            <Typography variant="h3" color="primary" fontWeight={900}>789</Typography>
          </CardContent></Card>
        </Grid>
      </Grid>
      {/* Boshqa admin bloklar: grafik, katalog, tahrirlash va h.k. */}
    </Container>
  </MainLayout>
);

export default AdminDashboard; 
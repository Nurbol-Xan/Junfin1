import React, { useState } from 'react';
import MainLayout from '../components/MainLayout';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  Button,
  IconButton,
  Box,
  TextField,
  InputAdornment,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Group as GroupIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';

const mockUser = { name: 'Admin', avatar: '/images/user-def.png' };

const mockFamilies = [
  {
    id: 1,
    name: 'Karimov Oilasi',
    email: 'karimov@email.com',
    phone: '+998901234567',
    members: 4,
    children: 2,
    totalBalance: 15000,
    status: 'active',
    joinDate: '2024-01-15'
  },
  {
    id: 2,
    name: 'Aliyev Oilasi',
    email: 'aliyev@email.com',
    phone: '+998907654321',
    members: 3,
    children: 1,
    totalBalance: 8500,
    status: 'active',
    joinDate: '2024-02-20'
  },
  {
    id: 3,
    name: 'Usmanov Oilasi',
    email: 'usmanov@email.com',
    phone: '+998901111111',
    members: 5,
    children: 3,
    totalBalance: 22000,
    status: 'pending',
    joinDate: '2024-03-10'
  }
];

const AdminFamilies = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const filteredFamilies = mockFamilies.filter(family =>
    family.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    family.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'pending': return 'warning';
      case 'suspended': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Faol';
      case 'pending': return 'Kutilmoqda';
      case 'suspended': return 'To\'xtatilgan';
      default: return status;
    }
  };

  return (
    <MainLayout
      user={mockUser}
      role="admin"
      onLogout={() => window.location.href = '/uz/login'}
      onNavigate={path => window.location.href = '/uz' + path}
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            {t('user_management')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Oilalar va foydalanuvchilarni boshqarish paneli
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <GroupIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight={800}>
                      {mockFamilies.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Jami oilalar
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'success.main' }}>
                    <PersonIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight={800}>
                      {mockFamilies.reduce((sum, family) => sum + family.members, 0)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Jami a'zolar
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'warning.main' }}>
                    <PersonIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight={800}>
                      {mockFamilies.reduce((sum, family) => sum + family.children, 0)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Jami bolalar
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'info.main' }}>
                    <PersonIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight={800}>
                      {mockFamilies.filter(f => f.status === 'active').length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Faol oilalar
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Actions Bar */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
              <TextField
                placeholder="Oila yoki email bo'yicha qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ flexGrow: 1 }}
              />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog(true)}
              >
                Yangi oila qo'shish
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* Families Table */}
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Oila</TableCell>
                  <TableCell>A'zolar</TableCell>
                  <TableCell>Balans</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Qo'shilgan sana</TableCell>
                  <TableCell align="right">Amallar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredFamilies.map((family) => (
                  <TableRow key={family.id} hover>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          {family.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {family.name}
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <EmailIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              {family.email}
                            </Typography>
                          </Stack>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <PhoneIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              {family.phone}
                            </Typography>
                          </Stack>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack spacing={1}>
                        <Typography variant="body2">
                          <strong>{family.members}</strong> a'zo
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {family.children} bola
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" color="primary" fontWeight={700}>
                        {family.totalBalance.toLocaleString()} so'm
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusText(family.status)}
                        color={getStatusColor(family.status)}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(family.joinDate).toLocaleDateString('uz-UZ')}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1}>
                        <IconButton size="small" color="primary">
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <DeleteIcon />
                        </IconButton>
                        <IconButton size="small">
                          <MoreVertIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Container>

      {/* Add Family Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Yangi oila qo'shish</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              label="Oila nomi"
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Telefon raqami"
              fullWidth
              variant="outlined"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Bekor qilish</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Qo'shish
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
};

export default AdminFamilies;
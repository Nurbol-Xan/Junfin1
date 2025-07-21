import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Avatar,
  Stack,
  InputAdornment,
  IconButton,
  Alert,
  Link,
  Divider,
  Chip,
  Paper,
  Fade,
  Slide
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  AdminPanelSettings,
  FamilyRestroom,
  ChildFriendly,
  ArrowBack,
  Google,
  Facebook,
  Apple
} from '@mui/icons-material';
import LangSwitcher from '../components/LangSwitcher';
import logo from '../images/logo12.png';

const Login = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'parent'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const roles = [
    {
      id: 'admin',
      title: t('admin_dashboard'),
      description: 'Tizim administratori',
      icon: <AdminPanelSettings />,
      color: '#d32f2f',
      gradient: 'linear-gradient(135deg, #d32f2f 0%, #f44336 100%)'
    },
    {
      id: 'parent',
      title: t('parent_dashboard'),
      description: 'Oila menejeri',
      icon: <FamilyRestroom />,
      color: '#1976d2',
      gradient: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)'
    },
    {
      id: 'child',
      title: t('child_dashboard'),
      description: 'Farzand',
      icon: <ChildFriendly />,
      color: '#388e3c',
      gradient: 'linear-gradient(135deg, #388e3c 0%, #66bb6a 100%)'
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleRoleSelect = (roleId) => {
    setFormData({
      ...formData,
      role: roleId
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Demo validation
      if (!formData.email || !formData.password) {
        throw new Error('Barcha maydonlarni to\'ldiring');
      }

      // Simulate login process
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Save to localStorage
      const userData = {
        email: formData.email,
        role: formData.role,
        name: formData.role === 'admin' ? 'Administrator' : 
              formData.role === 'parent' ? 'Ota-ona' : 'Bola',
        avatar: '/images/user-def.png',
        loginTime: new Date().toISOString(),
        juncoin: formData.role === 'child' ? 850 : 0
      };

      localStorage.setItem('junfin_user', JSON.stringify(userData));
      
      // Navigate to dashboard
      navigate(`/${lang}/${formData.role}/`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const selectedRole = roles.find(role => role.id === formData.role);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}
      />

      {/* Header */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          p: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10
        }}
      >
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(`/${lang}/`)}
          sx={{
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          {t('features')}
        </Button>
        <LangSwitcher />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Left Side - Branding */}
          <Grid item xs={12} md={6}>
            <Fade in timeout={1000}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: { xs: 4, md: 0 } }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Avatar src={logo} sx={{ width: 60, height: 60 }} />
                  <Typography variant="h3" fontWeight={900} color="white">
                    JUNFIN
                  </Typography>
                </Stack>
                
                <Typography variant="h4" fontWeight={700} color="white" gutterBottom>
                  Xush kelibsiz!
                </Typography>
                <Typography variant="h6" color="rgba(255,255,255,0.8)" sx={{ mb: 4 }}>
                  Oilangiz moliyaviy kelajagini boshqaring
                </Typography>

                {/* Features */}
                <Stack spacing={2}>
                  {[
                    'Xavfsiz moliyaviy ta\'lim',
                    'Oila nazorati va boshqaruvi',
                    'AI asosida maslahatlar'
                  ].map((feature, index) => (
                    <Stack key={index} direction="row" alignItems="center" spacing={2}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: '#4ECDC4'
                        }}
                      />
                      <Typography color="rgba(255,255,255,0.9)">
                        {feature}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </Fade>
          </Grid>

          {/* Right Side - Login Form */}
          <Grid item xs={12} md={6}>
            <Slide direction="left" in timeout={1200}>
              <Card
                sx={{
                  maxWidth: 480,
                  mx: 'auto',
                  borderRadius: 4,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                  backdropFilter: 'blur(20px)',
                  background: 'rgba(255,255,255,0.95)'
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" fontWeight={800} textAlign="center" gutterBottom>
                    {t('login')}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 4 }}>
                    Hisobingizga kiring va davom eting
                  </Typography>

                  {/* Role Selection */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                      Sizning rolingiz
                    </Typography>
                    <Grid container spacing={2}>
                      {roles.map((role) => (
                        <Grid item xs={4} key={role.id}>
                          <Paper
                            onClick={() => handleRoleSelect(role.id)}
                            sx={{
                              p: 2,
                              textAlign: 'center',
                              cursor: 'pointer',
                              border: formData.role === role.id ? `2px solid ${role.color}` : '2px solid transparent',
                              background: formData.role === role.id ? role.gradient : 'rgba(0,0,0,0.02)',
                              color: formData.role === role.id ? 'white' : 'text.primary',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                              }
                            }}
                          >
                            <Box sx={{ mb: 1, color: formData.role === role.id ? 'white' : role.color }}>
                              {role.icon}
                            </Box>
                            <Typography variant="caption" fontWeight={600}>
                              {role.title}
                            </Typography>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  {/* Login Form */}
                  <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                      <TextField
                        fullWidth
                        name="email"
                        type="email"
                        label="Email manzil"
                        value={formData.email}
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email color="action" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />

                      <TextField
                        fullWidth
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        label="Parol"
                        value={formData.password}
                        onChange={handleInputChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock color="action" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />

                      {error && (
                        <Alert severity="error" sx={{ borderRadius: 2 }}>
                          {error}
                        </Alert>
                      )}

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        disabled={loading}
                        sx={{
                          py: 1.5,
                          borderRadius: 3,
                          fontSize: '1.1rem',
                          fontWeight: 700,
                          background: selectedRole.gradient,
                          boxShadow: `0 8px 24px ${selectedRole.color}40`,
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: `0 12px 32px ${selectedRole.color}60`
                          }
                        }}
                      >
                        {loading ? 'Kirish...' : t('login')}
                      </Button>
                    </Stack>
                  </form>

                  <Divider sx={{ my: 3 }}>
                    <Chip label="yoki" size="small" />
                  </Divider>

                  {/* Social Login */}
                  <Stack spacing={2}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Google />}
                      sx={{ borderRadius: 2, py: 1.5 }}
                    >
                      Google orqali kirish
                    </Button>
                  </Stack>

                  {/* Register Link */}
                  <Typography textAlign="center" sx={{ mt: 3 }}>
                    Hisobingiz yo'qmi?{' '}
                    <Link
                      component="button"
                      type="button"
                      onClick={() => navigate(`/${lang}/register`)}
                      sx={{
                        color: selectedRole.color,
                        fontWeight: 600,
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      Ro'yxatdan o'ting
                    </Link>
                  </Typography>
                </CardContent>
              </Card>
            </Slide>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login; 
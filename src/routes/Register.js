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
  Slide,
  Stepper,
  Step,
  StepLabel,
  FormControlLabel,
  Checkbox,
  LinearProgress
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
  Phone,
  Home,
  CheckCircle,
  ArrowForward
} from '@mui/icons-material';
import LangSwitcher from '../components/LangSwitcher';
import logo from '../images/logo12.png';

const Register = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const navigate = useNavigate();
  
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Step 2: Account Setup
    password: '',
    confirmPassword: '',
    role: 'parent',
    
    // Step 3: Additional Info
    address: '',
    agreeTerms: false,
    agreeNewsletter: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const steps = ['Shaxsiy ma\'lumotlar', 'Hisob yaratish', 'Yakunlash'];

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

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 0) {
      if (!formData.firstName) newErrors.firstName = 'Ismni kiriting';
      if (!formData.lastName) newErrors.lastName = 'Familiyani kiriting';
      if (!formData.email) newErrors.email = 'Emailni kiriting';
      if (!formData.phone) newErrors.phone = 'Telefon raqamni kiriting';
    }
    
    if (step === 1) {
      if (!formData.password) newErrors.password = 'Parolni kiriting';
      if (formData.password.length < 6) newErrors.password = 'Parol kamida 6 ta belgi bo\'lishi kerak';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Parollar mos kelmaydi';
      }
    }
    
    if (step === 2) {
      if (!formData.agreeTerms) {
        newErrors.agreeTerms = 'Shartlarni qabul qilish majburiy';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleRoleSelect = (roleId) => {
    setFormData({
      ...formData,
      role: roleId
    });
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) return;
    
    setLoading(true);
    
    try {
      // Simulate registration process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Save user data
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        address: formData.address,
        name: `${formData.firstName} ${formData.lastName}`,
        avatar: '/images/user-def.png',
        registerTime: new Date().toISOString(),
        juncoin: formData.role === 'child' ? 100 : 0 // Starting bonus
      };
      
      localStorage.setItem('junfin_user', JSON.stringify(userData));
      
      // Navigate to dashboard
      navigate(`/${lang}/${formData.role}/`);
    } catch (error) {
      setErrors({ submit: 'Ro\'yxatdan o\'tishda xatolik yuz berdi' });
    } finally {
      setLoading(false);
    }
  };

  const selectedRole = roles.find(role => role.id === formData.role);

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Stack spacing={3}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="firstName"
                  label="Ism"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="lastName"
                  label="Familiya"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Grid>
            </Grid>
            
            <TextField
              fullWidth
              name="email"
              type="email"
              label="Email manzil"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              fullWidth
              name="phone"
              label="Telefon raqam"
              value={formData.phone}
              onChange={handleInputChange}
              error={!!errors.phone}
              helperText={errors.phone}
              placeholder="+998 90 123 45 67"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        );
        
      case 1:
        return (
          <Stack spacing={3}>
            {/* Role Selection */}
            <Box>
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
            
            <TextField
              fullWidth
              name="password"
              type={showPassword ? 'text' : 'password'}
              label="Parol"
              value={formData.password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
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
            />
            
            <TextField
              fullWidth
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              label="Parolni tasdiqlang"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        );
        
      case 2:
        return (
          <Stack spacing={3}>
            <TextField
              fullWidth
              name="address"
              label="Manzil (ixtiyoriy)"
              value={formData.address}
              onChange={handleInputChange}
              multiline
              rows={2}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Home color="action" />
                  </InputAdornment>
                ),
              }}
            />
            
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2">
                    Men{' '}
                    <Link href="#" sx={{ color: selectedRole.color }}>
                      foydalanish shartlari
                    </Link>{' '}
                    va{' '}
                    <Link href="#" sx={{ color: selectedRole.color }}>
                      maxfiylik siyosati
                    </Link>
                    ni qabul qilaman
                  </Typography>
                }
              />
              {errors.agreeTerms && (
                <Typography variant="caption" color="error" display="block">
                  {errors.agreeTerms}
                </Typography>
              )}
            </Box>
            
            <FormControlLabel
              control={
                <Checkbox
                  name="agreeNewsletter"
                  checked={formData.agreeNewsletter}
                  onChange={handleInputChange}
                  color="primary"
                />
              }
              label={
                <Typography variant="body2">
                  Yangiliklar va takliflar haqida email olishni istasyman
                </Typography>
              }
            />
            
            {/* Summary */}
            <Paper sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Ma'lumotlar xulosasi:
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">
                  <strong>Ism:</strong> {formData.firstName} {formData.lastName}
                </Typography>
                <Typography variant="body2">
                  <strong>Email:</strong> {formData.email}
                </Typography>
                <Typography variant="body2">
                  <strong>Rol:</strong> {selectedRole.title}
                </Typography>
              </Stack>
            </Paper>
          </Stack>
        );
        
      default:
        return null;
    }
  };

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
          Bosh sahifa
        </Button>
        <LangSwitcher />
      </Box>

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, py: 8 }}>
        <Fade in timeout={1000}>
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(20px)',
              background: 'rgba(255,255,255,0.95)'
            }}
          >
            <CardContent sx={{ p: 4 }}>
              {/* Header */}
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ justifyContent: 'center', mb: 2 }}>
                  <Avatar src={logo} sx={{ width: 48, height: 48 }} />
                  <Typography variant="h4" fontWeight={800}>
                    JUNFIN
                  </Typography>
                </Stack>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  {t('register')}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Moliyaviy kelajagingizni bugun boshlang
                </Typography>
              </Box>

              {/* Progress Stepper */}
              <Box sx={{ mb: 4 }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel sx={{
                        '& .MuiStepLabel-label': {
                          fontSize: '0.875rem',
                          fontWeight: 600
                        }
                      }}>
                        {label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <LinearProgress
                  variant="determinate"
                  value={(activeStep / (steps.length - 1)) * 100}
                  sx={{
                    mt: 2,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      background: selectedRole.gradient
                    }
                  }}
                />
              </Box>

              {/* Step Content */}
              <Box sx={{ mb: 4 }}>
                {renderStepContent(activeStep)}
                
                {errors.submit && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {errors.submit}
                  </Alert>
                )}
              </Box>

              {/* Navigation Buttons */}
              <Stack direction="row" justifyContent="space-between">
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ px: 3 }}
                >
                  Orqaga
                </Button>
                
                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading}
                    endIcon={loading ? null : <CheckCircle />}
                    sx={{
                      px: 4,
                      py: 1.5,
                      background: selectedRole.gradient,
                      boxShadow: `0 8px 24px ${selectedRole.color}40`,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 12px 32px ${selectedRole.color}60`
                      }
                    }}
                  >
                    {loading ? 'Yaratilmoqda...' : 'Hisobni yaratish'}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    endIcon={<ArrowForward />}
                    sx={{
                      px: 4,
                      py: 1.5,
                      background: selectedRole.gradient,
                      boxShadow: `0 8px 24px ${selectedRole.color}40`,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 12px 32px ${selectedRole.color}60`
                      }
                    }}
                  >
                    Keyingisi
                  </Button>
                )}
              </Stack>

              {/* Login Link */}
              <Typography textAlign="center" sx={{ mt: 3 }}>
                Hisobingiz bormi?{' '}
                <Link
                  component="button"
                  type="button"
                  onClick={() => navigate(`/${lang}/login`)}
                  sx={{
                    color: selectedRole.color,
                    fontWeight: 600,
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Kirish
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};

export default Register; 
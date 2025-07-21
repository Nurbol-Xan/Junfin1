import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import {
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Card, 
  Box, 
  Avatar, 
  Stack, 
  Chip, 
  Divider,
  IconButton,
  Fade,
  Zoom,
  Paper,
  useTheme,
  useMediaQuery,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  School as SchoolIcon,
  FamilyRestroom as FamilyRestroomIcon,
  Storefront as StorefrontIcon,
  Insights as InsightsIcon,
  EmojiEvents as EmojiEventsIcon,
  Security as SecurityIcon,
  Star as StarIcon,
  RocketLaunch as RocketLaunchIcon,
  CloudDone as CloudDoneIcon,
  VerifiedUser as VerifiedUserIcon,
  Group as GroupIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as AttachMoneyIcon,
  MenuOpen as MenuOpenIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import LangSwitcher from '../components/LangSwitcher';

// Images
import logo from '../images/logo12.png';
import illustration from '../images/Illustration.png';
import coin from '../images/coin-img.png';

const team = [
  { name: 'Ism1', role: 'CEO', avatar: '/images/user-def.png' },
  { name: 'Ism2', role: 'CTO', avatar: '/images/user-def.png' },
  { name: 'Ism3', role: 'Dizayner', avatar: '/images/user-def.png' },
  { name: 'Ism4', role: 'Marketing', avatar: '/images/user-def.png' },
];

const trusted = [
  'RetailBank', 'MegaShop', 'FamilyPay', 'EduKids', 'FinTechX', 
  'SmartStore', 'BankPro', 'Shoply', 'PayUz', 'KidsMarket'
];

const benefits = [
  'Moliyaviy savodxonlikni oshirish',
  'Oila xarajatlarini nazorat qilish',
  'Bolalar uchun xavfsiz muhit',
  'AI asosida maslahatlar',
  'Gamifikatsiya va motivatsiya',
  'Real vaqt hisobotlari'
];

const Landing = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { 
      icon: <SchoolIcon sx={{ fontSize: 48, color: '#4A90E2' }} />, 
      title: t('feature_1'), 
      desc: t('feature_1_desc'),
      color: '#4A90E2',
      bgColor: 'rgba(74, 144, 226, 0.1)'
    },
    { 
      icon: <FamilyRestroomIcon sx={{ fontSize: 48, color: '#7B61FF' }} />, 
      title: t('feature_2'), 
      desc: t('feature_2_desc'),
      color: '#7B61FF',
      bgColor: 'rgba(123, 97, 255, 0.1)'
    },
    { 
      icon: <StorefrontIcon sx={{ fontSize: 48, color: '#00B894' }} />, 
      title: t('feature_3'), 
      desc: t('feature_3_desc'),
      color: '#00B894',
      bgColor: 'rgba(0, 184, 148, 0.1)'
    },
    { 
      icon: <InsightsIcon sx={{ fontSize: 48, color: '#0984E3' }} />, 
      title: t('feature_4'), 
      desc: t('feature_4_desc'),
      color: '#0984E3',
      bgColor: 'rgba(9, 132, 227, 0.1)'
    },
    { 
      icon: <EmojiEventsIcon sx={{ fontSize: 48, color: '#FDCB6E' }} />, 
      title: t('feature_5'), 
      desc: t('feature_5_desc'),
      color: '#FDCB6E',
      bgColor: 'rgba(253, 203, 110, 0.1)'
    },
    { 
      icon: <SecurityIcon sx={{ fontSize: 48, color: '#D63031' }} />, 
      title: t('feature_6'), 
      desc: t('feature_6_desc'),
      color: '#D63031',
      bgColor: 'rgba(214, 48, 49, 0.1)'
    },
  ];

  const aiFeatures = [
    { 
      icon: <RocketLaunchIcon sx={{ fontSize: 40, color: '#4A90E2' }} />, 
      title: t('ai_1'), 
      desc: t('ai_1_desc'),
      color: '#4A90E2'
    },
    { 
      icon: <CloudDoneIcon sx={{ fontSize: 40, color: '#00B894' }} />, 
      title: t('ai_2'), 
      desc: t('ai_2_desc'),
      color: '#00B894'
    },
    { 
      icon: <VerifiedUserIcon sx={{ fontSize: 40, color: '#0984E3' }} />, 
      title: t('ai_3'), 
      desc: t('ai_3_desc'),
      color: '#0984E3'
    },
  ];

  const handleLoginClick = () => {
    navigate(`/${lang}/login`);
  };

  const handleRegisterClick = () => {
    navigate(`/${lang}/register`);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
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

      {/* Modern Navbar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.2)',
          transition: 'all 0.3s ease'
        }}
      >
        <Toolbar sx={{ maxWidth: '1400px', mx: 'auto', width: '100%', py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <Avatar 
              src={logo} 
              alt="JUNFIN" 
              sx={{ 
                width: 48, 
                height: 48, 
                mr: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }} 
            />
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 900, 
                color: scrolled ? '#333' : '#fff',
                letterSpacing: '-0.5px'
              }}
            >
              JUNFIN
            </Typography>
          </Box>

          {!isMobile && (
            <Stack direction="row" spacing={4} sx={{ mx: 4 }}>
              <Button 
                color="inherit" 
                href="#features"
                sx={{ 
                  color: scrolled ? '#333' : '#fff',
                  fontWeight: 600,
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                }}
              >
                {t('features')}
              </Button>
              <Button 
                color="inherit" 
                href="#ai"
                sx={{ 
                  color: scrolled ? '#333' : '#fff',
                  fontWeight: 600,
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                }}
              >
                {t('ai')}
              </Button>
              <Button 
                color="inherit" 
                href="#team"
                sx={{ 
                  color: scrolled ? '#333' : '#fff',
                  fontWeight: 600,
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                }}
              >
                {t('team')}
              </Button>
            </Stack>
          )}

          <Stack direction="row" alignItems="center" spacing={2}>
            <LangSwitcher />
            <Button 
              variant="outlined" 
              onClick={handleLoginClick}
              sx={{ 
                borderRadius: '25px',
                borderColor: scrolled ? '#333' : '#fff',
                color: scrolled ? '#333' : '#fff',
                fontWeight: 600,
                '&:hover': {
                  borderColor: scrolled ? '#333' : '#fff',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              {t('login')}
            </Button>
            <Button 
              variant="contained" 
              onClick={handleRegisterClick}
              sx={{ 
                borderRadius: '25px', 
                px: 3,
                background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                fontWeight: 600,
                boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 25px rgba(102, 126, 234, 0.6)'
                }
              }}
            >
              {t('register')}
            </Button>
            
            {isMobile && (
              <IconButton 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                sx={{ color: scrolled ? '#333' : '#fff' }}
              >
                {mobileMenuOpen ? <CloseIcon /> : <MenuOpenIcon />}
              </IconButton>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="xl" sx={{ pt: 15, pb: 10, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} lg={6}>
            <Fade in timeout={1000}>
              <Box>
                <Typography 
                  variant="h1" 
                  sx={{ 
                    fontWeight: 900, 
                    mb: 3, 
                    lineHeight: 1.1, 
                    letterSpacing: '-2px',
                    color: '#fff',
                    fontSize: { xs: '2.5rem', sm: '3.5rem', lg: '4rem' }
                  }}
                >
                  {t('hero_title')}
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.9)', 
                    mb: 5, 
                    fontWeight: 400,
                    lineHeight: 1.6
                  }}
                >
                  {t('hero_sub')}
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                  <Button 
                    variant="contained" 
                    size="large" 
                    onClick={handleRegisterClick}
                    startIcon={<RocketLaunchIcon />}
                    sx={{ 
                      borderRadius: '35px', 
                      px: 5, 
                      py: 2,
                      background: 'linear-gradient(45deg, #FF6B6B 0%, #4ECDC4 100%)',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      boxShadow: '0 8px 32px rgba(255, 107, 107, 0.4)',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 12px 40px rgba(255, 107, 107, 0.6)'
                      }
                    }}
                  >
                    {t('start')}
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large" 
                    href="#features"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ 
                      borderRadius: '35px', 
                      px: 5, 
                      py: 2,
                      borderColor: '#fff',
                      color: '#fff',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: '#fff',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        transform: 'translateY(-3px)'
                      }
                    }}
                  >
                    {t('features')}
                  </Button>
                </Stack>
              </Box>
            </Fade>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Zoom in timeout={1200}>
              <Box sx={{ textAlign: 'center', position: 'relative' }}>
                <Box
                  sx={{
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '-20px',
                      left: '-20px',
                      right: '-20px',
                      bottom: '-20px',
                      background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                      borderRadius: '30px',
                      zIndex: -1
                    }
                  }}
                >
                  <img 
                    src={illustration} 
                    alt="JUNFIN illustration" 
                    style={{ 
                      maxWidth: '100%', 
                      height: 'auto',
                      borderRadius: '20px',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
                    }} 
                  />
                </Box>
              </Box>
            </Zoom>
          </Grid>
        </Grid>

        {/* Benefits List */}
        <Fade in timeout={1500}>
          <Box sx={{ mt: 8, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', mb: 3 }}>
              {t('trusted_by')}
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {benefits.map((benefit, i) => (
                <Grid item key={i}>
                  <Chip
                    icon={<CheckCircleIcon sx={{ color: '#4ECDC4' }} />}
                    label={benefit}
                    variant="outlined"
                    sx={{
                      borderColor: 'rgba(255,255,255,0.3)',
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: '14px',
                      borderRadius: '20px',
                      px: 2,
                      py: 0.5,
                      backdropFilter: 'blur(10px)',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: '#fff', py: 12, position: 'relative' }} id="features">
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h2" 
              fontWeight={900} 
              sx={{ 
                mb: 3,
                background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {t('features')}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Oilangiz uchun kuchli va xavfsiz moliyaviy ta'lim platformasi
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {features.map((f, i) => (
              <Grid item xs={12} sm={6} lg={4} key={i}>
                <Fade in timeout={800 + i * 200}>
                  <Card
                    elevation={0}
                    sx={{
                      textAlign: 'center',
                      p: 4,
                      borderRadius: 4,
                      border: '1px solid rgba(0,0,0,0.06)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-12px)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                        '&::before': {
                          transform: 'translateY(-100%)'
                        }
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        height: '100%',
                        background: f.bgColor,
                        transition: 'transform 0.3s ease',
                        zIndex: 0
                      }
                    }}
                  >
                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                      <Box mb={3}>{f.icon}</Box>
                      <Typography variant="h5" fontWeight={700} sx={{ mb: 2, color: f.color }}>
                        {f.title}
                      </Typography>
                      <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {f.desc}
                      </Typography>
                    </Box>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* AI Section */}
      <Box sx={{ py: 12, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }} id="ai">
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h2" 
              fontWeight={900} 
              sx={{ 
                mb: 3,
                color: '#333'
              }}
            >
              {t('ai_title')}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Sun'iy intellekt va ilg'or analitika yordamida
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {aiFeatures.map((f, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Zoom in timeout={1000 + i * 200}>
                  <Paper
                    elevation={8}
                    sx={{
                      textAlign: 'center',
                      p: 5,
                      borderRadius: 4,
                      background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(255,255,255,0.8)',
                      '&:hover': { 
                        transform: 'scale(1.05) rotateY(5deg)',
                        boxShadow: '0 25px 80px rgba(0,0,0,0.15)'
                      }
                    }}
                  >
                    <Box mb={3}>{f.icon}</Box>
                    <Typography variant="h5" fontWeight={700} sx={{ mb: 2, color: f.color }}>
                      {f.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {f.desc}
                    </Typography>
                  </Paper>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Statistics & Case Study */}
      <Box sx={{ py: 12, bgcolor: '#fff' }}>
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} lg={6}>
              <Fade in timeout={1000}>
                <Card 
                  sx={{ 
                    p: 5, 
                    borderRadius: 4, 
                    background: 'linear-gradient(145deg, #667eea 0%, #764ba2 100%)',
                    color: '#fff',
                    boxShadow: '0 20px 60px rgba(102, 126, 234, 0.3)'
                  }}
                >
                  <Typography variant="h4" fontWeight={700} sx={{ mb: 3, color: '#fff' }}>
                    {t('case_title')}
                  </Typography>
                  <Typography sx={{ mb: 4, opacity: 0.9, lineHeight: 1.7 }}>
                    {t('case_desc')}
                  </Typography>
                  <Grid container spacing={4}>
                    <Grid item xs={4}>
                      <Box textAlign="center">
                        <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, bgcolor: 'rgba(255,255,255,0.2)' }}>
                          <TrendingUpIcon sx={{ fontSize: 32, color: '#4ECDC4' }} />
                        </Avatar>
                        <Typography variant="h3" fontWeight={900} sx={{ color: '#4ECDC4', mb: 1 }}>
                          +15%
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                          Sotuv o'sishi
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box textAlign="center">
                        <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, bgcolor: 'rgba(255,255,255,0.2)' }}>
                          <AttachMoneyIcon sx={{ fontSize: 32, color: '#FF6B6B' }} />
                        </Avatar>
                        <Typography variant="h3" fontWeight={900} sx={{ color: '#FF6B6B', mb: 1 }}>
                          -20%
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                          Nelikvid kamayishi
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box textAlign="center">
                        <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, bgcolor: 'rgba(255,255,255,0.2)' }}>
                          <GroupIcon sx={{ fontSize: 32, color: '#FFA726' }} />
                        </Avatar>
                        <Typography variant="h3" fontWeight={900} sx={{ color: '#FFA726', mb: 1 }}>
                          1K+
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                          Faol oilalar
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              </Fade>
            </Grid>

            <Grid item xs={12} lg={6}>
              <Fade in timeout={1200}>
                <Card sx={{ p: 5, borderRadius: 4, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
                  <Stack direction="row" alignItems="center" spacing={2} mb={4}>
                    <GroupIcon sx={{ fontSize: 32, color: '#667eea' }} />
                    <Typography variant="h4" fontWeight={700}>
                      {t('team')}
                    </Typography>
                  </Stack>
                  <Grid container spacing={3}>
                    {team.map((member, i) => (
                      <Grid item xs={6} key={i}>
                        <Box textAlign="center">
                          <Avatar 
                            src={member.avatar}
                            sx={{ 
                              bgcolor: 'primary.main', 
                              width: 80, 
                              height: 80, 
                              mx: 'auto', 
                              mb: 2,
                              boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                            }}
                          >
                            {member.name[0]}
                          </Avatar>
                          <Typography variant="h6" fontWeight={700}>
                            {member.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {member.role}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Card>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box 
        sx={{ 
          py: 12, 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Fade in timeout={1000}>
            <Box>
              <Typography variant="h2" fontWeight={900} gutterBottom>
                {t('cta_title')}
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, lineHeight: 1.7 }}>
                {t('cta_desc')}
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
                <Button 
                  variant="contained" 
                  size="large" 
                  onClick={handleRegisterClick}
                  startIcon={<RocketLaunchIcon />}
                  sx={{ 
                    borderRadius: '35px', 
                    px: 6, 
                    py: 2,
                    background: 'linear-gradient(45deg, #FF6B6B 0%, #4ECDC4 100%)',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    boxShadow: '0 8px 32px rgba(255, 107, 107, 0.4)',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 12px 40px rgba(255, 107, 107, 0.6)'
                    }
                  }}
                >
                  {t('register')}
                </Button>
                <Button 
                  variant="outlined" 
                  size="large" 
                  onClick={handleLoginClick}
                  endIcon={<ArrowForwardIcon />}
                  sx={{ 
                    borderRadius: '35px', 
                    px: 6, 
                    py: 2,
                    borderColor: '#fff',
                    color: '#fff',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: '#fff',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-3px)'
                    }
                  }}
                >
                  {t('login')}
                </Button>
              </Stack>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 6, textAlign: 'center', bgcolor: '#1a1a2e', color: '#fff' }}>
        <Container>
          <Typography variant="body1" sx={{ opacity: 0.8 }}>
            {t('footer')}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;

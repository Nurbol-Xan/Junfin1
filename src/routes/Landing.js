import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AppBar, Toolbar, Typography, Button, Container, Grid, Card, Box, Avatar, Stack, Chip, Divider
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import StorefrontIcon from '@mui/icons-material/Storefront';
import InsightsIcon from '@mui/icons-material/Insights';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SecurityIcon from '@mui/icons-material/Security';
import StarIcon from '@mui/icons-material/Star';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GroupIcon from '@mui/icons-material/Group';
import LangSwitcher from '../components/LangSwitcher';

// Images
import logo from '../images/logo12.png';
import illustration from '../images/Illustration.png';
import coin from '../images/coin-img.png';

const team = [
  { name: 'Ism1', role: 'CEO' },
  { name: 'Ism2', role: 'CTO' },
  { name: 'Ism3', role: 'Dizayner' },
  { name: 'Ism4', role: 'Marketing' },
];

const trusted = [
  'RetailBank', 'MegaShop', 'FamilyPay', 'EduKids', 'FinTechX', 'SmartStore', 'BankPro', 'Shoply', 'PayUz', 'KidsMarket'
];

const Landing = () => {
  const { t } = useTranslation();

  const features = [
    { icon: <SchoolIcon sx={{ fontSize: 40, color: '#4A90E2' }} />, title: t('feature_1'), desc: t('feature_1_desc') },
    { icon: <FamilyRestroomIcon sx={{ fontSize: 40, color: '#7B61FF' }} />, title: t('feature_2'), desc: t('feature_2_desc') },
    { icon: <StorefrontIcon sx={{ fontSize: 40, color: '#00B894' }} />, title: t('feature_3'), desc: t('feature_3_desc') },
    { icon: <InsightsIcon sx={{ fontSize: 40, color: '#0984E3' }} />, title: t('feature_4'), desc: t('feature_4_desc') },
    { icon: <EmojiEventsIcon sx={{ fontSize: 40, color: '#FDCB6E' }} />, title: t('feature_5'), desc: t('feature_5_desc') },
    { icon: <SecurityIcon sx={{ fontSize: 40, color: '#D63031' }} />, title: t('feature_6'), desc: t('feature_6_desc') },
  ];

  const aiFeatures = [
    { icon: <RocketLaunchIcon sx={{ fontSize: 32, color: '#4A90E2' }} />, title: t('ai_1'), desc: t('ai_1_desc') },
    { icon: <CloudDoneIcon sx={{ fontSize: 32, color: '#00B894' }} />, title: t('ai_2'), desc: t('ai_2_desc') },
    { icon: <VerifiedUserIcon sx={{ fontSize: 32, color: '#0984E3' }} />, title: t('ai_3'), desc: t('ai_3_desc') },
  ];

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f4ff 0%, #fdfdfd 100%)',
    }}>
      {/* AppBar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        <Toolbar sx={{ maxWidth: '1200px', mx: 'auto', width: '100%' }}>
          <img src={logo} alt="JUNFIN" style={{ height: 40, marginRight: 12 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 800, color: '#4A90E2' }}>
            JUNFIN
          </Typography>
          <Button color="primary" href="#features">{t('features')}</Button>
          <Button color="primary" href="#ai">{t('ai')}</Button>
          <Button color="primary" href="#team">{t('team')}</Button>
          <Button variant="contained" color="primary" sx={{ borderRadius: '30px', px: 3 }} href="/uz/login">
            {t('login')}
          </Button>
          <LangSwitcher />
        </Toolbar>
      </AppBar>

      {/* Hero */}
      <Container maxWidth="lg" sx={{ py: 12, textAlign: 'center' }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6} sx={{ textAlign: 'left' }}>
            <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, lineHeight: 1.1, letterSpacing: '-1px' }}>
              {t('hero_title')}
            </Typography>
            <Typography variant="h5" sx={{ color: 'text.secondary', mb: 4, fontWeight: 400 }}>
              {t('hero_sub')}
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button variant="contained" size="large" sx={{ borderRadius: '30px', px: 4 }} color="primary" href="/uz/login">
                {t('start')}
              </Button>
              <Button variant="outlined" size="large" sx={{ borderRadius: '30px', px: 4 }} color="primary" href="#features">
                {t('features')}
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
            <img src={illustration} alt="junfin illustration" style={{ maxWidth: '100%', maxHeight: 400 }} />
          </Grid>
        </Grid>

        {/* Trusted */}
        <Divider sx={{ my: 5 }}>{t('trusted_by')}</Divider>
        <Grid container spacing={2} justifyContent="center">
          {trusted.map((name, i) => (
            <Grid item key={i}>
              <Chip
                label={name}
                variant="outlined"
                icon={<StarIcon sx={{ color: '#FDCB6E' }} />}
                sx={{
                  fontWeight: 600,
                  fontSize: 16,
                  borderRadius: '20px',
                  px: 1,
                  borderColor: '#e0e0e0',
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features */}
      <Container maxWidth="lg" id="features" sx={{ py: 10 }}>
        <Typography variant="h4" fontWeight={900} align="center" gutterBottom>
          {t('features')}
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {features.map((f, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card
                elevation={4}
                sx={{
                  textAlign: 'center',
                  p: 4,
                  borderRadius: 4,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                  },
                }}
              >
                <Box mb={2}>{f.icon}</Box>
                <Typography variant="h6" fontWeight={700}>{f.title}</Typography>
                <Typography color="text.secondary">{f.desc}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* AI & Analytics */}
      <Container maxWidth="lg" id="ai" sx={{ py: 10 }}>
        <Typography variant="h4" fontWeight={900} align="center" gutterBottom>{t('ai_title')}</Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {aiFeatures.map((f, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Card
                elevation={3}
                sx={{
                  textAlign: 'center',
                  p: 4,
                  borderRadius: 4,
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                <Box mb={2}>{f.icon}</Box>
                <Typography variant="h6" fontWeight={700}>{f.title}</Typography>
                <Typography color="text.secondary">{f.desc}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Team & Case */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 4, borderRadius: 4, backdropFilter: 'blur(8px)' }} elevation={2}>
              <Typography variant="h6" fontWeight={700} color="warning.main" gutterBottom>
                {t('case_title')}
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>{t('case_desc')}</Typography>
              <Stack direction="row" spacing={4}>
                <Box textAlign="center">
                  <img src={coin} alt="coin" style={{ width: 60, marginBottom: 8 }} />
                  <Typography variant="h4" color="primary" fontWeight={800}>+15%</Typography>
                  <Typography color="text.secondary">O‘yinchoq brendi sotuv o‘sishi</Typography>
                </Box>
                <Box textAlign="center">
                  <Typography variant="h4" color="success.main" fontWeight={800}>-20%</Typography>
                  <Typography color="text.secondary">Nelikvid kamayishi</Typography>
                </Box>
                <Box textAlign="center">
                  <Typography variant="h4" color="info.main" fontWeight={800}>1000+</Typography>
                  <Typography color="text.secondary">Oila va bola foydalanuvchilar</Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ p: 4, borderRadius: 4 }} elevation={2}>
              <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                <GroupIcon color="secondary" />
                <Typography variant="h6" fontWeight={700}>{t('team')}</Typography>
              </Stack>
              <Stack direction="row" spacing={3} justifyContent="center">
                {team.map((t, i) => (
                  <Box key={i} textAlign="center">
                    <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mx: 'auto', mb: 1 }}>{t.name[0]}</Avatar>
                    <Typography fontWeight={700}>{t.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{t.role}</Typography>
                  </Box>
                ))}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* CTA */}
      <Container maxWidth="md" sx={{ py: 12, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight={900} gutterBottom>{t('cta_title')}</Typography>
        <Typography color="text.secondary" sx={{ mb: 3, fontWeight: 500 }}>{t('cta_desc')}</Typography>
        <Button variant="contained" size="large" sx={{ borderRadius: '30px', px: 5 }} color="primary" href="/uz/login">
          {t('login')}
        </Button>
      </Container>

      {/* Footer */}
      <Box sx={{ py: 4, textAlign: 'center', color: 'grey.600', fontSize: 14 }}>
        {t('footer')}
      </Box>
    </Box>
  );
};

export default Landing;

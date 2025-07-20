import React from 'react';
import MainLayout from '../components/MainLayout';
import { useTranslation } from 'react-i18next';
import { Container, Typography, Grid, Card, CardContent, LinearProgress, Avatar, Stack, Box } from '@mui/material';
import userDef from '../images/user-def.png';
import coin from '../images/coin-img.png';

const mockUser = { name: 'Ota-ona', avatar: userDef };

const ParentDashboard = () => {
  const { t } = useTranslation();

  // Demo ma'lumotlar
  const children = [
    { name: 'Ali', balance: 1200, goal: 2000, avatar: userDef },
    { name: 'Laylo', balance: 800, goal: 1500, avatar: userDef }
  ];
  const tasks = [
    { title: t('parent_task1'), reward: 100, done: true },
    { title: t('parent_task2'), reward: 200, done: false }
  ];

  return (
    <MainLayout
      user={mockUser}
      role="parent"
      onLogout={() => window.location.href = '/uz/login'}
      onNavigate={path => window.location.href = '/uz' + path}
    >
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>{t('parent_dashboard')}</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" fontWeight={700}>{t('children_balances')}</Typography>
                <Stack spacing={2} mt={2}>
                  {children.map((c, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar src={c.avatar} />
                      <Box>
                        <Typography fontWeight={700}>{c.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{t('balance')}: <b>{c.balance}</b> / {c.goal}</Typography>
                        <LinearProgress variant="determinate" value={Math.min(100, c.balance / c.goal * 100)} sx={{ width: 120, mt: 1 }} />
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" fontWeight={700}>{t('tasks')}</Typography>
                <Stack spacing={2} mt={2}>
                  {tasks.map((t, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar src={coin} sx={{ width: 32, height: 32 }} />
                      <Box>
                        <Typography fontWeight={700}>{t.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{t('reward')}: {t.reward} {t('points')}</Typography>
                        <Typography variant="caption" color={t.done ? 'success.main' : 'warning.main'}>
                          {t.done ? t('done') : t('pending')}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* Boshqa parent bloklar: limitlar, grafiklar, AI maslahatlar va h.k. */}
      </Container>
    </MainLayout>
  );
};

export default ParentDashboard; 
import React from 'react';
import MainLayout from '../components/MainLayout';
import { useTranslation } from 'react-i18next';
import { Container, Typography, Grid, Card, CardContent, LinearProgress, Avatar, Stack, Box } from '@mui/material';
import userDef from '../images/user-def.png';
import coin from '../images/coin-img.png';

const mockUser = { name: 'Ali', avatar: userDef };

const ChildDashboard = () => {
  const { t } = useTranslation();

  // Demo ma'lumotlar
  const goals = [
    { title: t('child_goal1'), current: 800, target: 1000 },
    { title: t('child_goal2'), current: 300, target: 500 }
  ];
  const tasks = [
    { title: 'child_task1', reward: 100, done: true },
    { title: 'child_task2', reward: 200, done: false }
  ];

  return (
    <MainLayout
      user={mockUser}
      role="child"
      onLogout={() => window.location.href = '/uz/login'}
      onNavigate={path => window.location.href = '/uz' + path}
    >
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>{t('child_dashboard')}</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" fontWeight={700}>{t('my_goals')}</Typography>
                <Stack spacing={2} mt={2}>
                  {goals.map((g, i) => (
                    <Box key={i}>
                      <Typography fontWeight={700}>{g.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{g.current} / {g.target} {t('points')}</Typography>
                      <LinearProgress variant="determinate" value={Math.min(100, g.current / g.target * 100)} sx={{ width: 120, mt: 1 }} />
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" fontWeight={700}>{t('my_tasks')}</Typography>
                <Stack spacing={2} mt={2}>
                  {tasks.map((task, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar src={coin} sx={{ width: 32, height: 32 }} />
                      <Box>
                        <Typography fontWeight={700}>{t(task.title)}</Typography>
                        <Typography variant="body2" color="text.secondary">{t('reward')}: {task.reward} {t('points')}</Typography>
                        <Typography variant="caption" color={task.done ? 'success.main' : 'warning.main'}>
                          {task.done ? t('done') : t('pending')}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default ChildDashboard;
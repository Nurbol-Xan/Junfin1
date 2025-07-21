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
  LinearProgress, 
  Avatar, 
  Stack, 
  Box,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Button,
  Badge
} from '@mui/material';
import {
  EmojiEvents as EmojiEventsIcon,
  Assignment as AssignmentIcon,
  Star as StarIcon,
  AccountBalance as AccountBalanceIcon,
  ShoppingCart as ShoppingCartIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Celebration as CelebrationIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import userDef from '../images/user-def.png';
import coin from '../images/coin-img.png';

const mockUser = { name: 'Ali', avatar: userDef };

const ChildHome = () => {
  const { t } = useTranslation();

  // Demo ma'lumotlar
  const goals = [
    { 
      id: 1,
      title: t('child_goal1'), 
      current: 800, 
      target: 1000,
      icon: '🚲',
      priority: 'high',
      daysLeft: 15
    },
    { 
      id: 2,
      title: t('child_goal2'), 
      current: 300, 
      target: 500,
      icon: '🧱',
      priority: 'medium',
      daysLeft: 30
    },
    {
      id: 3,
      title: 'Yangi video o\'yin',
      current: 150,
      target: 350,
      icon: '🎮',
      priority: 'low',
      daysLeft: 45
    }
  ];

  const tasks = [
    { 
      id: 1,
      title: t('child_task1'), 
      reward: 100, 
      done: true,
      difficulty: 'easy',
      timeLeft: '0 soat',
      category: 'Ta\'lim'
    },
    { 
      id: 2,
      title: t('child_task2'), 
      reward: 200, 
      done: false,
      difficulty: 'medium',
      timeLeft: '2 soat',
      category: 'Yordam'
    },
    {
      id: 3,
      title: 'Sport bilan shug\'ullanish',
      reward: 150,
      done: false,
      difficulty: 'easy',
      timeLeft: '1 kun',
      category: 'Salomatlik'
    },
    {
      id: 4,
      title: 'Kitob o\'qish',
      reward: 120,
      done: true,
      difficulty: 'medium',
      timeLeft: '0 soat',
      category: 'Ta\'lim'
    }
  ];

  const achievements = [
    { title: 'Birinchi maqsad', icon: '🏆', earned: true },
    { title: 'Vazifalar ustasi', icon: '⭐', earned: true },
    { title: 'Tejamkor', icon: '💰', earned: false },
    { title: 'Super bola', icon: '🚀', earned: false }
  ];

  const userStats = {
    totalBalance: 850,
    completedTasks: tasks.filter(task => task.done).length,
    totalTasks: tasks.length,
    level: 'Bronza',
    experience: 1250,
    nextLevelExp: 2000,
    rank: 3
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'error';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header with Level Progress */}
      <Paper 
        sx={{ 
          p: 4, 
          mb: 4, 
          background: 'linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)',
          color: 'white',
          borderRadius: 4
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <Stack direction="row" alignItems="center" spacing={3}>
              <Badge
                badgeContent={userStats.rank}
                color="warning"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <Avatar 
                  src={mockUser.avatar} 
                  sx={{ 
                    width: 80, 
                    height: 80,
                    border: '4px solid rgba(255,255,255,0.3)'
                  }} 
                />
              </Badge>
              <Box>
                <Typography variant="h4" fontWeight={800} gutterBottom>
                  Salom, {mockUser.name}!
                </Typography>
                <Chip 
                  label={`${userStats.level} daraja`} 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    color: 'white',
                    fontWeight: 600
                  }}
                />
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Typography variant="h3" fontWeight={900}>
                {userStats.totalBalance}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Jami ballaringiz
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Typography variant="body2">Keyingi daraja uchun</Typography>
                <Typography variant="body2" fontWeight={600}>
                  {userStats.experience}/{userStats.nextLevelExp} XP
                </Typography>
              </Stack>
              <LinearProgress 
                variant="determinate" 
                value={(userStats.experience / userStats.nextLevelExp) * 100}
                sx={{ 
                  height: 10, 
                  borderRadius: 5,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: '#fff'
                  }
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={4}>
        {/* Goals Section */}
        <Grid item xs={12} lg={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <EmojiEventsIcon sx={{ fontSize: 32, color: 'warning.main' }} />
                <Typography variant="h5" fontWeight={700}>
                  {t('my_goals')}
                </Typography>
              </Stack>
              
              <Grid container spacing={2}>
                {goals.map((goal) => (
                  <Grid item xs={12} key={goal.id}>
                    <Paper 
                      sx={{ 
                        p: 3, 
                        bgcolor: 'grey.50',
                        borderRadius: 3,
                        border: goal.priority === 'high' ? '2px solid #f44336' : '1px solid #e0e0e0'
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                        <Typography variant="h4">{goal.icon}</Typography>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" fontWeight={700}>
                            {goal.title}
                          </Typography>
                          <Stack direction="row" spacing={1}>
                            <Chip 
                              label={`${goal.daysLeft} kun qoldi`}
                              size="small"
                              color={getPriorityColor(goal.priority)}
                              variant="outlined"
                            />
                          </Stack>
                        </Box>
                        <Box textAlign="right">
                          <Typography variant="h6" color="primary" fontWeight={700}>
                            {goal.current}/{goal.target}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {Math.round((goal.current / goal.target) * 100)}%
                          </Typography>
                        </Box>
                      </Stack>
                      <LinearProgress 
                        variant="determinate" 
                        value={(goal.current / goal.target) * 100}
                        color={getPriorityColor(goal.priority)}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Tasks Section */}
        <Grid item xs={12} lg={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <AssignmentIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                <Typography variant="h5" fontWeight={700}>
                  {t('my_tasks')}
                </Typography>
                <Chip 
                  label={`${userStats.completedTasks}/${userStats.totalTasks}`}
                  color="primary"
                  variant="outlined"
                />
              </Stack>
              
              <List>
                {tasks.map((task, index) => (
                  <ListItem 
                    key={task.id}
                    sx={{ 
                      mb: 1, 
                      bgcolor: task.done ? 'success.50' : 'grey.50',
                      borderRadius: 2,
                      border: task.done ? '1px solid #4caf50' : '1px solid #e0e0e0'
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar 
                        sx={{ 
                          bgcolor: task.done ? 'success.main' : 'warning.main',
                          color: 'white'
                        }}
                      >
                        {task.done ? <CheckCircleIcon /> : <ScheduleIcon />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography 
                          variant="body1" 
                          fontWeight={600}
                          sx={{ 
                            textDecoration: task.done ? 'line-through' : 'none',
                            color: task.done ? 'text.secondary' : 'text.primary'
                          }}
                        >
                          {task.title}
                        </Typography>
                      }
                      secondary={
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                          <Chip 
                            label={`${task.reward} ball`}
                            size="small"
                            color="primary"
                            variant="filled"
                          />
                          <Chip 
                            label={task.category}
                            size="small"
                            color={getDifficultyColor(task.difficulty)}
                            variant="outlined"
                          />
                          {!task.done && (
                            <Typography variant="caption" color="text.secondary">
                              {task.timeLeft}
                            </Typography>
                          )}
                        </Stack>
                      }
                    />
                    {!task.done && (
                      <Button 
                        variant="contained" 
                        size="small"
                        sx={{ ml: 2 }}
                      >
                        Bajarish
                      </Button>
                    )}
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Achievements Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <CelebrationIcon sx={{ fontSize: 32, color: 'warning.main' }} />
                <Typography variant="h6" fontWeight={700}>
                  Yutuqlarim
                </Typography>
              </Stack>
              
              <Grid container spacing={2}>
                {achievements.map((achievement, index) => (
                  <Grid item xs={6} key={index}>
                    <Paper 
                      sx={{ 
                        p: 2, 
                        textAlign: 'center',
                        bgcolor: achievement.earned ? 'warning.50' : 'grey.100',
                        border: achievement.earned ? '2px solid #ffc107' : '1px solid #e0e0e0',
                        opacity: achievement.earned ? 1 : 0.6
                      }}
                    >
                      <Typography variant="h4" sx={{ mb: 1 }}>
                        {achievement.icon}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        fontWeight={600}
                        color={achievement.earned ? 'text.primary' : 'text.secondary'}
                      >
                        {achievement.title}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Tezkor statistika
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
                    <Typography variant="h5" fontWeight={800}>
                      {userStats.completedTasks}
                    </Typography>
                    <Typography variant="body2">
                      Bajarilgan vazifalar
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.main', color: 'white' }}>
                    <Typography variant="h5" fontWeight={800}>
                      {goals.filter(g => (g.current / g.target) > 0.8).length}
                    </Typography>
                    <Typography variant="body2">
                      Yaqin maqsadlar
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'warning.main', color: 'white' }}>
                    <Typography variant="h5" fontWeight={800}>
                      {achievements.filter(a => a.earned).length}
                    </Typography>
                    <Typography variant="body2">
                      Yutuqlar
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'info.main', color: 'white' }}>
                    <Typography variant="h5" fontWeight={800}>
                      #{userStats.rank}
                    </Typography>
                    <Typography variant="body2">
                      Reytingdagi o'rin
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

const ChildDashboard = () => {
  return (
    <MainLayout
      user={mockUser}
      role="child"
      onLogout={() => window.location.href = '/uz/login'}
      onNavigate={path => window.location.href = '/uz' + path}
    >
      <Routes>
        <Route path="/" element={<ChildHome />} />
        <Route path="/tasks" element={<div>Tasks page coming soon...</div>} />
        <Route path="/goals" element={<div>Goals page coming soon...</div>} />
        <Route path="/shop" element={<div>Shop page coming soon...</div>} />
        <Route path="/history" element={<div>History page coming soon...</div>} />
      </Routes>
    </MainLayout>
  );
};

export default ChildDashboard;
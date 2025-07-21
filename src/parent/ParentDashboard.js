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
  Divider
} from '@mui/material';
import {
  Group as GroupIcon,
  Assignment as AssignmentIcon,
  EmojiEvents as EmojiEventsIcon,
  AccountBalance as AccountBalanceIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import userDef from '../images/user-def.png';
import coin from '../images/coin-img.png';

const mockUser = { name: 'Ota-ona', avatar: userDef };

const ParentHome = () => {
  const { t } = useTranslation();

  // Demo ma'lumotlar
  const children = [
    { 
      id: 1,
      name: 'Ali', 
      balance: 1200, 
      goal: 2000, 
      avatar: userDef,
      age: 10,
      completedTasks: 8,
      totalTasks: 12,
      level: 'Bronza',
      progress: 60
    },
    { 
      id: 2,
      name: 'Laylo', 
      balance: 800, 
      goal: 1500, 
      avatar: userDef,
      age: 8,
      completedTasks: 5,
      totalTasks: 8,
      level: 'Kumush',
      progress: 53
    }
  ];

  const tasks = [
    { id: 1, title: t('parent_task1'), reward: 100, done: true, child: 'Ali', dueDate: '2024-01-20' },
    { id: 2, title: t('parent_task2'), reward: 200, done: false, child: 'Laylo', dueDate: '2024-01-22' },
    { id: 3, title: 'Uy vazifasini bajarish', reward: 150, done: true, child: 'Ali', dueDate: '2024-01-21' },
    { id: 4, title: 'Sport bilan shug\'ullanish', reward: 120, done: false, child: 'Laylo', dueDate: '2024-01-23' }
  ];

  const familyStats = {
    totalBalance: children.reduce((sum, child) => sum + child.balance, 0),
    totalGoals: children.reduce((sum, child) => sum + child.goal, 0),
    completedTasks: tasks.filter(task => task.done).length,
    totalTasks: tasks.length,
    activeChildren: children.length
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          {t('parent_dashboard')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Oila moliyaviy faoliyati va bolalar rivojlanishi
        </Typography>
      </Box>

      {/* Family Overview Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)', color: 'white' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
                  <AccountBalanceIcon />
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight={800}>
                    {familyStats.totalBalance.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Jami balans
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #388e3c 0%, #66bb6a 100%)', color: 'white' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
                  <GroupIcon />
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight={800}>
                    {familyStats.activeChildren}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Faol bolalar
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #f57c00 0%, #ffb74d 100%)', color: 'white' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
                  <AssignmentIcon />
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight={800}>
                    {familyStats.completedTasks}/{familyStats.totalTasks}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Bajarilgan vazifalar
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #7b1fa2 0%, #ba68c8 100%)', color: 'white' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
                  <EmojiEventsIcon />
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight={800}>
                    {Math.round((familyStats.totalBalance / familyStats.totalGoals) * 100)}%
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Maqsadlar progress
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {/* Children Progress */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                {t('children_balances')}
              </Typography>
              
              <Grid container spacing={3} sx={{ mt: 1 }}>
                {children.map((child) => (
                  <Grid item xs={12} sm={6} key={child.id}>
                    <Paper sx={{ p: 3, bgcolor: 'grey.50', borderRadius: 3 }}>
                      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                        <Avatar src={child.avatar} sx={{ width: 56, height: 56 }} />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" fontWeight={700}>
                            {child.name}
                          </Typography>
                          <Chip 
                            label={`${child.age} yosh • ${child.level}`} 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                          />
                        </Box>
                      </Stack>
                      
                      <Box sx={{ mb: 2 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            {t('balance')}: {child.balance} / {child.goal}
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {Math.round((child.balance / child.goal) * 100)}%
                          </Typography>
                        </Stack>
                        <LinearProgress 
                          variant="determinate" 
                          value={(child.balance / child.goal) * 100} 
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                      </Box>

                      <Stack direction="row" spacing={2}>
                        <Box textAlign="center" sx={{ flex: 1 }}>
                          <Typography variant="h6" color="success.main" fontWeight={700}>
                            {child.completedTasks}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Bajarilgan
                          </Typography>
                        </Box>
                        <Box textAlign="center" sx={{ flex: 1 }}>
                          <Typography variant="h6" color="warning.main" fontWeight={700}>
                            {child.totalTasks - child.completedTasks}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Qolgan
                          </Typography>
                        </Box>
                        <Box textAlign="center" sx={{ flex: 1 }}>
                          <Typography variant="h6" color="info.main" fontWeight={700}>
                            {child.progress}%
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Progress
                          </Typography>
                        </Box>
                      </Stack>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Tasks Overview */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                So'nggi vazifalar
              </Typography>
              
              <List>
                {tasks.slice(0, 6).map((task, index) => (
                  <React.Fragment key={task.id}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar 
                          sx={{ 
                            bgcolor: task.done ? 'success.main' : 'warning.main',
                            width: 40,
                            height: 40
                          }}
                        >
                          {task.done ? <CheckCircleIcon /> : <ScheduleIcon />}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="body2" fontWeight={600}>
                            {task.title}
                          </Typography>
                        }
                        secondary={
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Chip 
                              label={task.child} 
                              size="small" 
                              variant="outlined"
                              color="primary"
                            />
                            <Typography variant="caption">
                              {task.reward} ball
                            </Typography>
                          </Stack>
                        }
                      />
                    </ListItem>
                    {index < tasks.slice(0, 6).length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

const ParentDashboard = () => {
  return (
    <MainLayout
      user={mockUser}
      role="parent"
      onLogout={() => window.location.href = '/uz/login'}
      onNavigate={path => window.location.href = '/uz' + path}
    >
      <Routes>
        <Route path="/" element={<ParentHome />} />
        <Route path="/children" element={<div>Children management page coming soon...</div>} />
        <Route path="/tasks" element={<div>Tasks page coming soon...</div>} />
        <Route path="/limits" element={<div>Limits page coming soon...</div>} />
        <Route path="/reports" element={<div>Reports page coming soon...</div>} />
      </Routes>
    </MainLayout>
  );
};

export default ParentDashboard; 
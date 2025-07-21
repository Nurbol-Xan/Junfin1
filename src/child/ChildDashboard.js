import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import ChildThemeSelector from './ChildThemeSelector';
import ChildTasks from './ChildTasks';
import ChildShop from './ChildShop';
import { useTranslation } from 'react-i18next';
import { getCurrentTheme, initializeThemeSystem } from '../utils/themeSystem';
import { getCurrentUser, getJunCoinBalance, getTasks, getGoals, getJunCoinStats } from '../utils/juncoinSystem';
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
  IconButton,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Assignment as TaskIcon,
  MonetizationOn as CoinIcon,
  TrendingUp as TrendingIcon,
  Star as StarIcon,
  School as SchoolIcon,
  Sports as SportsIcon,
  Palette as PaletteIcon,
  Settings as SettingsIcon,
  Home as HomeIcon,
  ShoppingCart as ShopIcon,
  History as HistoryIcon,
  Target as GoalIcon
} from '@mui/icons-material';

const mockUser = { 
  name: 'Bola', 
  avatar: '/images/user-def.png'
};

const ChildHome = () => {
  const { t } = useTranslation();
  const [currentTheme, setCurrentTheme] = useState(getCurrentTheme());
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [userStats, setUserStats] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    initializeThemeSystem();
    loadUserData();
  }, []);

  const loadUserData = () => {
    const stats = getJunCoinStats();
    const userTasks = getTasks();
    const userGoals = getGoals();
    
    setUserStats(stats);
    setTasks(userTasks);
    setGoals(userGoals);
  };

  const handleThemeChange = (newTheme) => {
    setCurrentTheme(newTheme);
    // Reload page to apply new theme
    window.location.reload();
  };

  const recentTasks = tasks.slice(0, 3);
  const recentGoals = goals.slice(0, 2);
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: currentTheme.background,
        py: 4
      }}
    >
      <Container maxWidth="xl">
        {/* Welcome Section */}
        <Box sx={{ mb: 4 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography 
                variant="h4" 
                fontWeight={800} 
                gutterBottom
                sx={{ color: currentTheme.textPrimary }}
              >
                {currentTheme.icons?.dashboard} Salom, {mockUser.name}!
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ color: currentTheme.textSecondary }}
              >
                Bugun nima qilamiz? 🚀
              </Typography>
            </Box>
            
            <Stack direction="row" spacing={2}>
              <IconButton
                onClick={() => setShowThemeSelector(true)}
                sx={{
                  bgcolor: currentTheme.primary,
                  color: 'white',
                  '&:hover': {
                    bgcolor: currentTheme.secondary,
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <PaletteIcon />
              </IconButton>
              
              <Card sx={{ p: 2, background: currentTheme.cardBackground }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CoinIcon sx={{ color: 'warning.main', fontSize: 32 }} />
                  <Box>
                    <Typography variant="h5" fontWeight={800} color="warning.main">
                      {userStats?.currentBalance || 0}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      JunCoin
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            </Stack>
          </Stack>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.secondary} 100%)`,
                color: 'white',
                height: '100%'
              }}
            >
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
                    <TaskIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight={800}>
                      {completedTasks}/{totalTasks}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Vazifalar
                    </Typography>
                  </Box>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={progressPercentage}
                  sx={{
                    mt: 2,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: 'white'
                    }
                  }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: currentTheme.cardBackground, height: '100%' }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'warning.main' }}>
                    <CoinIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight={800} color="warning.main">
                      {userStats?.totalEarned || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Jami topilgan
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: currentTheme.cardBackground, height: '100%' }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'success.main' }}>
                    <TrophyIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight={800}>
                      {goals.filter(g => g.achieved).length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Maqsadlar
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: currentTheme.cardBackground, height: '100%' }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'info.main' }}>
                    <StarIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight={800}>
                      {Math.round(progressPercentage)}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Muvaffaqiyat
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ background: currentTheme.cardBackground, height: '100%' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Tezkor amallar
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={currentTheme.icons?.tasks}
                      onClick={() => window.location.href = '/uz/child/tasks'}
                      sx={{
                        background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.accent} 100%)`,
                        py: 1.5
                      }}
                    >
                      Vazifalar
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={currentTheme.icons?.shop}
                      onClick={() => window.location.href = '/uz/child/shop'}
                      sx={{
                        background: `linear-gradient(135deg, ${currentTheme.secondary} 0%, ${currentTheme.accent} 100%)`,
                        py: 1.5
                      }}
                    >
                      Do'kon
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={currentTheme.icons?.goals}
                      onClick={() => window.location.href = '/uz/child/goals'}
                      sx={{ py: 1.5 }}
                    >
                      Maqsadlar
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={currentTheme.icons?.history}
                      onClick={() => window.location.href = '/uz/child/history'}
                      sx={{ py: 1.5 }}
                    >
                      Tarix
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ background: currentTheme.cardBackground, height: '100%' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  So'nggi vazifalar
                </Typography>
                {recentTasks.length > 0 ? (
                  <List>
                    {recentTasks.map((task, index) => (
                      <ListItem key={index} divider>
                        <ListItemAvatar>
                          <Avatar sx={{ 
                            bgcolor: task.completed ? 'success.main' : currentTheme.primary,
                            width: 32,
                            height: 32
                          }}>
                            {task.completed ? '✓' : currentTheme.icons?.tasks}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={task.title}
                          secondary={`${task.reward || 100} JunCoin`}
                        />
                        {task.completed && (
                          <Chip label="Bajarildi" color="success" size="small" />
                        )}
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                    Hozircha vazifalar yo'q
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Goals Section */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ background: currentTheme.cardBackground }}>
              <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Mening maqsadlarim
                </Typography>
                {recentGoals.length > 0 ? (
                  <Grid container spacing={2}>
                    {recentGoals.map((goal, index) => (
                      <Grid item xs={12} md={6} key={index}>
                        <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                            {goal.title}
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={(goal.currentAmount / goal.targetAmount) * 100}
                            sx={{
                              mb: 1,
                              height: 8,
                              borderRadius: 4,
                              '& .MuiLinearProgress-bar': {
                                background: `linear-gradient(90deg, ${currentTheme.primary} 0%, ${currentTheme.accent} 100%)`
                              }
                            }}
                          />
                          <Stack direction="row" justifyContent="space-between">
                            <Typography variant="caption" color="text.secondary">
                              {goal.currentAmount} / {goal.targetAmount} JunCoin
                            </Typography>
                            <Typography variant="caption" color={currentTheme.primary} fontWeight={600}>
                              {Math.round((goal.currentAmount / goal.targetAmount) * 100)}%
                            </Typography>
                          </Stack>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                    Hozircha maqsadlar yo'q
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Theme Selector Dialog */}
      <ChildThemeSelector
        open={showThemeSelector}
        onClose={() => setShowThemeSelector(false)}
        onThemeChange={handleThemeChange}
      />

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.accent} 100%)`,
          '&:hover': {
            background: `linear-gradient(135deg, ${currentTheme.secondary} 0%, ${currentTheme.accent} 100%)`,
            transform: 'scale(1.1)'
          }
        }}
        onClick={() => setShowThemeSelector(true)}
      >
        <PaletteIcon />
      </Fab>
    </Box>
  );
};

const ChildDashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser({
        ...user,
        juncoin: getJunCoinBalance()
      });
    }
  }, []);

  const mockUser = currentUser || { 
    name: 'Bola', 
    avatar: '/images/user-def.png',
    juncoin: getJunCoinBalance()
  };

  return (
    <Routes>
      <Route path="/" element={<ChildHome />} />
      <Route path="/tasks" element={<ChildTasks />} />
      <Route path="/goals" element={<div>Goals page coming soon...</div>} />
      <Route path="/shop" element={<ChildShop />} />
      <Route path="/history" element={<div>History page coming soon...</div>} />
    </Routes>
  );
};

export default ChildDashboard;
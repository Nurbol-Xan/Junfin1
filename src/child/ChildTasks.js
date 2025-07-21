import React, { useState, useEffect } from 'react';
import MainLayout from '../components/MainLayout';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
  Box,
  Stack,
  LinearProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Fab,
  Slide,
  Zoom
} from '@mui/material';
import {
  Assignment as TaskIcon,
  MonetizationOn as CoinIcon,
  Check as CheckIcon,
  Star as StarIcon,
  Add as AddIcon,
  Category as CategoryIcon,
  Schedule as ScheduleIcon,
  EmojiEvents as TrophyIcon,
  LocalFireDepartment as FireIcon,
  Timer as TimerIcon
} from '@mui/icons-material';
import { 
  getTasks, 
  completeTask, 
  getJunCoinBalance,
  TASK_REWARDS 
} from '../utils/juncoinSystem';
import { getCurrentTheme } from '../utils/themeSystem';

const mockUser = { 
  name: 'Bola', 
  avatar: '/images/user-def.png',
  juncoin: getJunCoinBalance()
};

const ChildTasks = () => {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showCompleteDialog, setShowCompleteDialog] = useState(false);
  const [completedTaskId, setCompletedTaskId] = useState(null);
  const [rewardEarned, setRewardEarned] = useState(0);
  const [filter, setFilter] = useState('all');
  const [currentTheme, setCurrentTheme] = useState(getCurrentTheme());

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    const userTasks = getTasks();
    setTasks(userTasks);
  };

  const handleCompleteTask = async (task) => {
    try {
      const result = completeTask(task.id, task);
      setRewardEarned(result.reward);
      setCompletedTaskId(task.id);
      setShowCompleteDialog(true);
      loadTasks();
      
      // Update user's balance in the mock user
      mockUser.juncoin = result.newBalance;
    } catch (error) {
      console.error('Task completion error:', error);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'error';
      default: return 'primary';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'easy': return <StarIcon />;
      case 'medium': return <FireIcon />;
      case 'hard': return <TrophyIcon />;
      default: return <TaskIcon />;
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return task.category === filter;
  });

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const categories = ['all', 'Ta\'lim', 'Yordam', 'Sport', 'O\'yinchoqlar'];

  const TaskCard = ({ task }) => (
    <Zoom in timeout={300}>
      <Card
        sx={{
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          border: `2px solid ${task.completed ? currentTheme.accent : 'transparent'}`,
          opacity: task.completed ? 0.8 : 1,
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: `0 8px 32px ${currentTheme.primary}30`
          }
        }}
      >
        {task.completed && (
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              zIndex: 2,
              backgroundColor: currentTheme.accent,
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CheckIcon sx={{ color: 'white', fontSize: 20 }} />
          </Box>
        )}

        <Box
          sx={{
            height: 6,
            background: `linear-gradient(90deg, ${currentTheme.primary} 0%, ${currentTheme.accent} 100%)`
          }}
        />

        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
            <Avatar
              sx={{ 
                bgcolor: getDifficultyColor(task.difficulty) + '.main',
                width: 48,
                height: 48
              }}
            >
              {getDifficultyIcon(task.difficulty)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                {task.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {task.description}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
            <Chip
              label={task.category}
              size="small"
              color="primary"
              variant="outlined"
              icon={<CategoryIcon />}
            />
            <Chip
              label={task.difficulty}
              size="small"
              color={getDifficultyColor(task.difficulty)}
            />
            <Chip
              label={`${task.reward || TASK_REWARDS[task.difficulty] || 100} JunCoin`}
              size="small"
              sx={{
                bgcolor: 'warning.main',
                color: 'white',
                fontWeight: 600
              }}
              icon={<CoinIcon />}
            />
          </Stack>

          {task.dueDate && (
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <ScheduleIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                Muddat: {new Date(task.dueDate).toLocaleDateString('uz-UZ')}
              </Typography>
            </Stack>
          )}

          {!task.completed ? (
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleCompleteTask(task)}
              sx={{
                background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.accent} 100%)`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.secondary} 100%)`,
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Vazifani bajarish
            </Button>
          ) : (
            <Box sx={{ textAlign: 'center', py: 1 }}>
              <Typography 
                variant="body2" 
                color="success.main" 
                fontWeight={600}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}
              >
                <CheckIcon sx={{ fontSize: 18 }} />
                Bajarildi!
              </Typography>
              {task.completedAt && (
                <Typography variant="caption" color="text.secondary">
                  {new Date(task.completedAt).toLocaleDateString('uz-UZ')}
                </Typography>
              )}
            </Box>
          )}
        </CardContent>
      </Card>
    </Zoom>
  );

  return (
    <MainLayout
      user={mockUser}
      role="child"
      onLogout={() => window.location.href = '/uz/login'}
      onNavigate={path => window.location.href = '/uz' + path}
    >
      <Box
        sx={{
          minHeight: '100vh',
          background: currentTheme.background,
          py: 4
        }}
      >
        <Container maxWidth="xl">
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h4" 
              fontWeight={800} 
              gutterBottom
              sx={{ color: currentTheme.textPrimary }}
            >
              {currentTheme.icons?.tasks} Mening vazifalarim
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ color: currentTheme.textSecondary }}
            >
              Vazifalarni bajaring va JunCoin yig'ing!
            </Typography>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ background: currentTheme.cardBackground }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: currentTheme.primary }}>
                      <TaskIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h4" fontWeight={800}>
                        {totalTasks}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Jami vazifalar
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ background: currentTheme.cardBackground }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: 'success.main' }}>
                      <CheckIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h4" fontWeight={800}>
                        {completedTasks}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Bajarilgan
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ background: currentTheme.cardBackground }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: 'warning.main' }}>
                      <CoinIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h4" fontWeight={800} color="warning.main">
                        {mockUser.juncoin}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        JunCoin balans
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ background: currentTheme.cardBackground }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: 'info.main' }}>
                      <TrophyIcon />
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
                  <LinearProgress
                    variant="determinate"
                    value={progressPercentage}
                    sx={{
                      mt: 1,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        background: `linear-gradient(90deg, ${currentTheme.primary} 0%, ${currentTheme.accent} 100%)`
                      }
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Filter Tabs */}
          <Card sx={{ mb: 3, background: currentTheme.cardBackground }}>
            <CardContent>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                {[
                  { value: 'all', label: 'Barchasi', icon: '📋' },
                  { value: 'pending', label: 'Kutilmoqda', icon: '⏳' },
                  { value: 'completed', label: 'Bajarilgan', icon: '✅' },
                  { value: 'Ta\'lim', label: 'Ta\'lim', icon: '📚' },
                  { value: 'Yordam', label: 'Yordam', icon: '🤝' },
                  { value: 'Sport', label: 'Sport', icon: '⚽' }
                ].map((filterOption) => (
                  <Chip
                    key={filterOption.value}
                    label={`${filterOption.icon} ${filterOption.label}`}
                    variant={filter === filterOption.value ? 'filled' : 'outlined'}
                    color={filter === filterOption.value ? 'primary' : 'default'}
                    onClick={() => setFilter(filterOption.value)}
                    sx={{
                      fontWeight: 600,
                      '&:hover': {
                        transform: 'translateY(-2px)'
                      }
                    }}
                  />
                ))}
              </Stack>
            </CardContent>
          </Card>

          {/* Tasks Grid */}
          <Grid container spacing={3}>
            {filteredTasks.map((task, index) => (
              <Grid item xs={12} sm={6} lg={4} key={task.id}>
                <TaskCard task={task} />
              </Grid>
            ))}
          </Grid>

          {filteredTasks.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Hech qanday vazifa topilmadi
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tanlangan filtr bo'yicha vazifalar mavjud emas
              </Typography>
            </Box>
          )}
        </Container>
      </Box>

      {/* Task Completion Dialog */}
      <Dialog 
        open={showCompleteDialog} 
        onClose={() => setShowCompleteDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
          <Avatar 
            sx={{ 
              bgcolor: 'success.main', 
              width: 64, 
              height: 64, 
              mx: 'auto', 
              mb: 2 
            }}
          >
            <TrophyIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Typography variant="h5" fontWeight={700} color="success.main">
            Tabriklaymiz! 🎉
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Vazifa muvaffaqiyatli bajarildi!
          </Typography>
          
          <Box
            sx={{
              bgcolor: 'warning.50',
              borderRadius: 3,
              p: 3,
              my: 3,
              border: '2px solid',
              borderColor: 'warning.main'
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
              <CoinIcon sx={{ fontSize: 32, color: 'warning.main' }} />
              <Typography variant="h4" fontWeight={800} color="warning.main">
                +{rewardEarned}
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                JunCoin
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Sizning hisobingizga qo'shildi
            </Typography>
          </Box>

          <Typography variant="body1" color="text.secondary">
            Yangi balans: <strong>{mockUser.juncoin} JunCoin</strong>
          </Typography>
        </DialogContent>
        
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button 
            variant="contained" 
            onClick={() => setShowCompleteDialog(false)}
            size="large"
            sx={{ px: 4 }}
          >
            Davom etish
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  );
};

export default ChildTasks;
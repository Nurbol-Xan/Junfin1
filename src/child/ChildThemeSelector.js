import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Stack,
  Avatar,
  Chip,
  IconButton,
  Tabs,
  Tab,
  Alert,
  Slider,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Palette as PaletteIcon,
  Check as CheckIcon,
  Add as AddIcon,
  Refresh as RefreshIcon,
  Save as SaveIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { 
  getAllThemes, 
  getCurrentTheme, 
  applyTheme, 
  createThemeFromColors,
  saveCustomTheme,
  isValidHexColor,
  CHILD_THEMES
} from '../utils/themeSystem';

const ChildThemeSelector = ({ open, onClose, onThemeChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState(getCurrentTheme().id);
  const [customTheme, setCustomTheme] = useState({
    name: 'Mening mavzum',
    primary: '#1976d2',
    secondary: '#42a5f5',
    accent: '#64b5f6'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const themes = getAllThemes();
  const currentTheme = getCurrentTheme();

  useEffect(() => {
    if (open) {
      setSelectedTheme(currentTheme.id);
      setError('');
      setSuccess('');
    }
  }, [open, currentTheme.id]);

  const handleThemeSelect = (themeId) => {
    setSelectedTheme(themeId);
    setError('');
  };

  const handleApplyTheme = () => {
    try {
      const appliedTheme = applyTheme(selectedTheme);
      setSuccess('Mavzu muvaffaqiyatli o\'zgartirildi!');
      onThemeChange(appliedTheme);
      setTimeout(() => {
        onClose();
        setSuccess('');
      }, 1500);
    } catch (error) {
      setError('Mavzuni qo\'llashda xatolik yuz berdi');
    }
  };

  const handleCustomThemeChange = (field, value) => {
    setCustomTheme(prev => ({
      ...prev,
      [field]: value
    }));
    setError('');
  };

  const handleSaveCustomTheme = () => {
    try {
      if (!customTheme.name.trim()) {
        setError('Mavzu nomini kiriting');
        return;
      }

      ['primary', 'secondary', 'accent'].forEach(field => {
        if (!isValidHexColor(customTheme[field])) {
          throw new Error(`${field} to'g'ri hex rang formatida bo'lishi kerak`);
        }
      });

      const newTheme = createThemeFromColors(
        customTheme.name,
        customTheme.primary,
        customTheme.secondary,
        customTheme.accent
      );

      saveCustomTheme(newTheme);
      setSelectedTheme('custom');
      setSuccess('Shaxsiy mavzu saqlandi!');
      
      setTimeout(() => {
        setSuccess('');
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  const ThemePreviewCard = ({ theme, isSelected, onSelect }) => (
    <Card
      onClick={() => onSelect(theme.id)}
      sx={{
        cursor: 'pointer',
        border: isSelected ? '3px solid #4caf50' : '2px solid transparent',
        transform: isSelected ? 'scale(1.05)' : 'scale(1)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
        }
      }}
    >
      {isSelected && (
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 2,
            backgroundColor: '#4caf50',
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
          height: 80,
          background: theme.navbarGradient,
          position: 'relative'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 40,
            background: theme.sidebarGradient,
            width: '30%'
          }}
        />
      </Box>
      
      <CardContent sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          {theme.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {theme.description}
        </Typography>
        
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: theme.primary,
              border: '2px solid white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: theme.secondary,
              border: '2px solid white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: theme.accent,
              border: '2px solid white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
        </Stack>

        {theme.icons && (
          <Stack direction="row" spacing={1} justifyContent="center">
            <Typography sx={{ fontSize: '16px' }}>{theme.icons.dashboard}</Typography>
            <Typography sx={{ fontSize: '16px' }}>{theme.icons.tasks}</Typography>
            <Typography sx={{ fontSize: '16px' }}>{theme.icons.goals}</Typography>
            <Typography sx={{ fontSize: '16px' }}>{theme.icons.shop}</Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );

  const ColorPicker = ({ label, value, onChange }) => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" gutterBottom>
        {label}
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#1976d2"
          sx={{ flex: 1 }}
          inputProps={{ 
            pattern: "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$",
            style: { fontFamily: 'monospace' }
          }}
        />
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            backgroundColor: isValidHexColor(value) ? value : '#cccccc',
            border: '2px solid white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            cursor: 'pointer'
          }}
          onClick={() => {
            // In a real app, this would open a color picker
            const newColor = prompt('Rangni kiriting (hex format):', value);
            if (newColor && isValidHexColor(newColor)) {
              onChange(newColor);
            }
          }}
        />
      </Stack>
    </Box>
  );

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, minHeight: '80vh' }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <PaletteIcon />
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight={700}>
              Mavzuni tanlang
            </Typography>
            <Typography variant="body2" color="text.secondary">
              O'zingizga yoqadigan ranglar va stilni tanlang
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Tabs 
          value={selectedTab} 
          onChange={(e, newValue) => setSelectedTab(newValue)}
          sx={{ mb: 3 }}
        >
          <Tab label="Tayyor mavzular" />
          <Tab label="Shaxsiy mavzu" />
        </Tabs>

        {selectedTab === 0 && (
          <Grid container spacing={3}>
            {Object.values(themes).map((theme) => (
              <Grid item xs={12} sm={6} md={4} key={theme.id}>
                <ThemePreviewCard
                  theme={theme}
                  isSelected={selectedTheme === theme.id}
                  onSelect={handleThemeSelect}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {selectedTab === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              O'zingizning mavzungizni yarating
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Ranglarni tanlang va o'zingizning noyob mavzungizni yarating
            </Typography>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Mavzu nomi"
                  value={customTheme.name}
                  onChange={(e) => handleCustomThemeChange('name', e.target.value)}
                  sx={{ mb: 3 }}
                />

                <ColorPicker
                  label="Asosiy rang"
                  value={customTheme.primary}
                  onChange={(value) => handleCustomThemeChange('primary', value)}
                />

                <ColorPicker
                  label="Ikkinchi rang"
                  value={customTheme.secondary}
                  onChange={(value) => handleCustomThemeChange('secondary', value)}
                />

                <ColorPicker
                  label="Urg'u rang"
                  value={customTheme.accent}
                  onChange={(value) => handleCustomThemeChange('accent', value)}
                />

                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveCustomTheme}
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Mavzuni saqlash
                </Button>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Oldindan ko'rish
                </Typography>
                
                <Card sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      height: 100,
                      background: `linear-gradient(135deg, ${customTheme.primary} 0%, ${customTheme.accent} 100%)`,
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                      Navbar
                    </Typography>
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '25%',
                        height: '60%',
                        background: `linear-gradient(180deg, ${customTheme.primary} 0%, ${customTheme.secondary} 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Typography variant="caption" sx={{ color: 'white', fontWeight: 600 }}>
                        Sidebar
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent sx={{ bgcolor: 'rgba(255,255,255,0.9)' }}>
                    <Typography variant="body2">
                      {customTheme.name} mavzusi
                    </Typography>
                  </CardContent>
                </Card>

                <Stack direction="row" spacing={2} justifyContent="center">
                  <Chip 
                    label="Asosiy" 
                    sx={{ 
                      backgroundColor: customTheme.primary, 
                      color: 'white',
                      fontWeight: 600
                    }} 
                  />
                  <Chip 
                    label="Ikkinchi" 
                    sx={{ 
                      backgroundColor: customTheme.secondary, 
                      color: 'white',
                      fontWeight: 600
                    }} 
                  />
                  <Chip 
                    label="Urg'u" 
                    sx={{ 
                      backgroundColor: customTheme.accent, 
                      color: 'white',
                      fontWeight: 600
                    }} 
                  />
                </Stack>
              </Grid>
            </Grid>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {success}
          </Alert>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} size="large">
          Bekor qilish
        </Button>
        <Button 
          variant="contained" 
          onClick={handleApplyTheme}
          size="large"
          disabled={!selectedTheme}
        >
          Mavzuni qo'llash
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChildThemeSelector;
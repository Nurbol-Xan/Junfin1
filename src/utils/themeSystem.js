// Theme System for Child Dashboard

export const CHILD_THEMES = {
  ocean: {
    id: 'ocean',
    name: 'Okean',
    description: 'Dengiz va okean ranglari',
    primary: '#0077be',
    secondary: '#00a8cc',
    accent: '#40e0d0',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    sidebarGradient: 'linear-gradient(180deg, #0077be 0%, #00a8cc 100%)',
    navbarGradient: 'linear-gradient(135deg, #0077be 0%, #40e0d0 100%)',
    cardBackground: 'rgba(255, 255, 255, 0.9)',
    textPrimary: '#1a1a1a',
    textSecondary: '#666666',
    icons: {
      dashboard: '🌊',
      tasks: '🐠',
      goals: '🏆',
      shop: '🛒',
      history: '📚'
    },
    animations: {
      wave: true,
      bubble: true,
      float: true
    }
  },
  forest: {
    id: 'forest',
    name: 'O\'rmon',
    description: 'Tabiat va o\'rmon ranglari',
    primary: '#228b22',
    secondary: '#32cd32',
    accent: '#98fb98',
    background: 'linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)',
    sidebarGradient: 'linear-gradient(180deg, #228b22 0%, #32cd32 100%)',
    navbarGradient: 'linear-gradient(135deg, #228b22 0%, #98fb98 100%)',
    cardBackground: 'rgba(255, 255, 255, 0.95)',
    textPrimary: '#1a1a1a',
    textSecondary: '#555555',
    icons: {
      dashboard: '🌲',
      tasks: '🍃',
      goals: '🎯',
      shop: '🌿',
      history: '📖'
    },
    animations: {
      leaf: true,
      grow: true,
      sway: true
    }
  },
  space: {
    id: 'space',
    name: 'Koinot',
    description: 'Koinot va yulduzlar ranglari',
    primary: '#4b0082',
    secondary: '#8a2be2',
    accent: '#da70d6',
    background: 'linear-gradient(135deg, #000428 0%, #004e92 100%)',
    sidebarGradient: 'linear-gradient(180deg, #4b0082 0%, #8a2be2 100%)',
    navbarGradient: 'linear-gradient(135deg, #4b0082 0%, #da70d6 100%)',
    cardBackground: 'rgba(255, 255, 255, 0.1)',
    textPrimary: '#ffffff',
    textSecondary: '#cccccc',
    icons: {
      dashboard: '🚀',
      tasks: '⭐',
      goals: '🎖️',
      shop: '🛸',
      history: '📡'
    },
    animations: {
      twinkle: true,
      orbit: true,
      glow: true
    }
  }
};

export const DEFAULT_CUSTOM_THEME = {
  id: 'custom',
  name: 'Mening mavzum',
  description: 'Shaxsiy mavzu',
  primary: '#1976d2',
  secondary: '#42a5f5',
  accent: '#64b5f6',
  background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
  sidebarGradient: 'linear-gradient(180deg, #1976d2 0%, #42a5f5 100%)',
  navbarGradient: 'linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)',
  cardBackground: 'rgba(255, 255, 255, 0.9)',
  textPrimary: '#1a1a1a',
  textSecondary: '#666666',
  icons: {
    dashboard: '🏠',
    tasks: '📋',
    goals: '🎯',
    shop: '🛒',
    history: '📚'
  },
  animations: {
    bounce: true,
    fade: true,
    slide: true
  }
};

const STORAGE_KEY = 'junfin_child_theme';

// Get current theme
export const getCurrentTheme = () => {
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  if (savedTheme) {
    try {
      const theme = JSON.parse(savedTheme);
      return theme;
    } catch (error) {
      console.error('Error parsing saved theme:', error);
    }
  }
  return CHILD_THEMES.ocean; // Default theme
};

// Save theme
export const saveTheme = (theme) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
  return theme;
};

// Get all available themes
export const getAllThemes = () => {
  const customTheme = getCustomTheme();
  return {
    ...CHILD_THEMES,
    ...(customTheme ? { custom: customTheme } : {})
  };
};

// Get custom theme
export const getCustomTheme = () => {
  const customThemeData = localStorage.getItem('junfin_custom_theme');
  if (customThemeData) {
    try {
      return JSON.parse(customThemeData);
    } catch (error) {
      console.error('Error parsing custom theme:', error);
    }
  }
  return null;
};

// Save custom theme
export const saveCustomTheme = (customTheme) => {
  const theme = {
    ...DEFAULT_CUSTOM_THEME,
    ...customTheme,
    id: 'custom'
  };
  localStorage.setItem('junfin_custom_theme', JSON.stringify(theme));
  return theme;
};

// Apply theme to child dashboard
export const applyTheme = (themeId) => {
  const themes = getAllThemes();
  const theme = themes[themeId];
  
  if (!theme) {
    console.error('Theme not found:', themeId);
    return getCurrentTheme();
  }
  
  // Save as current theme
  saveTheme(theme);
  
  // Apply CSS custom properties
  const root = document.documentElement;
  root.style.setProperty('--child-primary', theme.primary);
  root.style.setProperty('--child-secondary', theme.secondary);
  root.style.setProperty('--child-accent', theme.accent);
  root.style.setProperty('--child-background', theme.background);
  root.style.setProperty('--child-sidebar-gradient', theme.sidebarGradient);
  root.style.setProperty('--child-navbar-gradient', theme.navbarGradient);
  root.style.setProperty('--child-card-background', theme.cardBackground);
  root.style.setProperty('--child-text-primary', theme.textPrimary);
  root.style.setProperty('--child-text-secondary', theme.textSecondary);
  
  return theme;
};

// Generate gradient from colors
export const generateGradient = (color1, color2, direction = '135deg') => {
  return `linear-gradient(${direction}, ${color1} 0%, ${color2} 100%)`;
};

// Validate color hex format
export const isValidHexColor = (color) => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
};

// Convert hex to RGB
export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

// Generate lighter/darker shades
export const adjustBrightness = (hex, percent) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const adjust = (color) => {
    const adjusted = Math.round(color * (1 + percent / 100));
    return Math.max(0, Math.min(255, adjusted));
  };
  
  const r = adjust(rgb.r).toString(16).padStart(2, '0');
  const g = adjust(rgb.g).toString(16).padStart(2, '0');
  const b = adjust(rgb.b).toString(16).padStart(2, '0');
  
  return `#${r}${g}${b}`;
};

// Theme validation
export const validateTheme = (theme) => {
  const requiredFields = ['name', 'primary', 'secondary', 'accent'];
  const errors = [];
  
  requiredFields.forEach(field => {
    if (!theme[field]) {
      errors.push(`${field} majburiy`);
    }
  });
  
  ['primary', 'secondary', 'accent'].forEach(field => {
    if (theme[field] && !isValidHexColor(theme[field])) {
      errors.push(`${field} to'g'ri hex rang formatida bo'lishi kerak`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Create theme from base colors
export const createThemeFromColors = (name, primary, secondary, accent) => {
  const validation = validateTheme({ name, primary, secondary, accent });
  if (!validation.isValid) {
    throw new Error(validation.errors.join(', '));
  }
  
  return {
    id: 'custom',
    name,
    description: 'Shaxsiy yaratilgan mavzu',
    primary,
    secondary,
    accent,
    background: generateGradient(primary, secondary),
    sidebarGradient: generateGradient(primary, secondary, '180deg'),
    navbarGradient: generateGradient(primary, accent),
    cardBackground: 'rgba(255, 255, 255, 0.9)',
    textPrimary: '#1a1a1a',
    textSecondary: '#666666',
    icons: DEFAULT_CUSTOM_THEME.icons,
    animations: DEFAULT_CUSTOM_THEME.animations
  };
};

// Get theme CSS styles
export const getThemeStyles = (theme) => {
  return {
    '--child-primary': theme.primary,
    '--child-secondary': theme.secondary,
    '--child-accent': theme.accent,
    '--child-background': theme.background,
    '--child-sidebar-gradient': theme.sidebarGradient,
    '--child-navbar-gradient': theme.navbarGradient,
    '--child-card-background': theme.cardBackground,
    '--child-text-primary': theme.textPrimary,
    '--child-text-secondary': theme.textSecondary
  };
};

// Initialize theme system
export const initializeThemeSystem = () => {
  const currentTheme = getCurrentTheme();
  applyTheme(currentTheme.id);
  return currentTheme;
};

export default {
  CHILD_THEMES,
  DEFAULT_CUSTOM_THEME,
  getCurrentTheme,
  saveTheme,
  getAllThemes,
  getCustomTheme,
  saveCustomTheme,
  applyTheme,
  generateGradient,
  isValidHexColor,
  validateTheme,
  createThemeFromColors,
  getThemeStyles,
  initializeThemeSystem
};
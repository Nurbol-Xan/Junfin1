import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MenuItem, 
  Select, 
  FormControl,
  Box,
  Typography,
  alpha
} from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';

const LangSwitcher = () => {
  const { i18n } = useTranslation();
  const { lang } = useParams();
  const navigate = useNavigate();
  
  const languages = [
    { code: 'uz', name: 'O\'zbek', flag: '🇺🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  const currentLang = lang || 'uz';

  const handleChange = (e) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    localStorage.setItem('junfin_lang', newLang);
    
    // Update URL with new language
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/');
    
    if (pathParts[1] && ['uz', 'ru', 'en'].includes(pathParts[1])) {
      pathParts[1] = newLang;
    } else {
      pathParts.splice(1, 0, newLang);
    }
    
    const newPath = pathParts.join('/');
    navigate(newPath);
  };

  return (
    <FormControl size="small">
      <Select
        value={currentLang}
        onChange={handleChange}
        displayEmpty
        sx={{
          minWidth: 100,
          borderRadius: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: 'inherit',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          '& .MuiSelect-select': {
            py: 1,
            px: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none'
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
          },
          '&.Mui-focused': {
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
          }
        }}
        renderValue={(value) => {
          const selectedLang = languages.find(lang => lang.code === value);
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontSize: '16px' }}>
                {selectedLang?.flag}
              </Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>
                {selectedLang?.code.toUpperCase()}
              </Typography>
            </Box>
          );
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              borderRadius: 2,
              mt: 1,
              minWidth: 160,
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              border: '1px solid rgba(255,255,255,0.1)',
            }
          }
        }}
      >
        {languages.map((language) => (
          <MenuItem 
            key={language.code} 
            value={language.code}
            sx={{
              py: 1.5,
              px: 2,
              '&:hover': {
                backgroundColor: alpha('#1976d2', 0.1)
              },
              '&.Mui-selected': {
                backgroundColor: alpha('#1976d2', 0.15),
                '&:hover': {
                  backgroundColor: alpha('#1976d2', 0.2)
                }
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
              <Typography sx={{ fontSize: '18px' }}>
                {language.flag}
              </Typography>
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  {language.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {language.code.toUpperCase()}
                </Typography>
              </Box>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LangSwitcher;

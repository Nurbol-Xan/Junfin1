import React from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, Select } from '@mui/material';

const LangSwitcher = () => {
  const { i18n } = useTranslation();
  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem('junfin_lang', e.target.value);
    window.location.reload();
  };
  return (
    <Select
      value={i18n.language}
      onChange={handleChange}
      size="small"
      sx={{ ml: 2, minWidth: 80 }}
    >
      <MenuItem value="uz">UZ</MenuItem>
      <MenuItem value="ru">RU</MenuItem>
      <MenuItem value="en">EN</MenuItem>
    </Select>
  );
};

export default LangSwitcher;

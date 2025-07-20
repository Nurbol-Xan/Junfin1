import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import uz from './locales/uz/common.json';
import ru from './locales/ru/common.json';
import en from './locales/en/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      uz: { translation: uz },
      ru: { translation: ru },
      en: { translation: en },
    },
    lng: localStorage.getItem('junfin_lang') || 'uz',
    fallbackLng: 'uz',
    interpolation: { escapeValue: false },
  });

export default i18n;

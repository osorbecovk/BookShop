import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import kg from './locales/kg.json';
import ru from './locales/ru.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    kg: { translation: kg },
    ru: { translation: ru },
  },
  lng: 'kg',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;

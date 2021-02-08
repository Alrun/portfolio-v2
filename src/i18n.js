import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en.json';
import translationRU from './locales/ru.json';

i18n.use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en: {
                translation: translationEN
            },
            ru: {
                translation: translationRU
            }
        },
        lng: 'en' || 'ru',
        fallbackLng: 'en', // use en if detected lng is not available
        saveMissing: true, // send not translated keys to endpoint
        keySeparator: false, // we do not use keys in form messages.welcome
        interpolation: {
            escapeValue: false // React already does escaping
        }
    });

export default i18n;

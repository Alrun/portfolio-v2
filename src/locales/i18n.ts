// @ts-ignore
import i18n from 'i18next';
// @ts-ignore
import { initReactI18next } from 'react-i18next';
// @ts-ignore
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './en.json';
import translationRU from './ru.json';

// export type ConvertedToFunctionsType<T> = {
//     [P in keyof T]: T[P] extends string
//         ? () => string
//         : ConvertedToFunctionsType<T[P]>;
// };
// export type TranslationResource = typeof en;
// export type LanguageKeys = keyof TranslationResource;

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

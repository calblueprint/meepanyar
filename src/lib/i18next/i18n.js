import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { detectLanguage } from './device'; 
import resources from './resources'; 

i18n.use(initReactI18next).init({
    resources: resources,
    lng: detectLanguage(),
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
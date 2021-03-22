import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './resources'; 

// TODO Step 4: Interpret language based on user settings
i18n.use(initReactI18next).init({
    resources: resources,
    lng: "bur",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
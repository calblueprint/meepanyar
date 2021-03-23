import { useTranslation } from 'react-i18next';

/* Encoder between Zawgyi and Unicode */ 
import { EncodingConverter } from './encodings'; 
const converter = new EncodingConverter(); 

enum LanguageEncoding { 
    UNICODE,
    ZAWGYI 
}

/* Global variable that determines user encoding */
// TODO Step 4: Interpret encoding based on user settings
let userEncoding: LanguageEncoding = LanguageEncoding.UNICODE; 

/* Custom React hook to handle language internationalization */
export const useInternationalization = () => {
    const { t } = useTranslation();
    const intl = (text: string) => {
        switch (userEncoding) {
            case LanguageEncoding.ZAWGYI: 
                return converter.unicodeToZawgyi(t(text)); 
            default: 
                return t(text); 
        }
    }
    return intl; 
}
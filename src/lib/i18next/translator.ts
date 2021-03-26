import { useTranslation } from 'react-i18next';
import { LanguageEncoding, detectEncoding } from './device'; 
import { EncodingConverter } from './encodings'; 
const converter = new EncodingConverter(); 

/* Custom React hook to handle language internationalization */
export const useInternationalization = () => {
    const { t } = useTranslation();
    const intl = (text: string) => {
        switch (detectEncoding()) {
            case LanguageEncoding.ZAWGYI: 
                return converter.unicodeToZawgyi(t(text)); 
            default: 
                return t(text); 
        }
    }
    return intl; 
}
import { useTranslation } from 'react-i18next';
import { LanguageEncoding, detectEncoding } from './device'; 
import { EncodingConverter } from './encodings'; 
const converter = new EncodingConverter(); 

/* Custom React hook to handle language internationalization */
export const useInternationalization = () => {
    const { t } = useTranslation();
    const intl = (text: string, input?: string) => {
        const pattern: RegExp = /\[\w+\]/g;
        const translated_text: string = input ? t(text).replace(pattern, t(input)) : t(text);
        switch (detectEncoding()) {
            case LanguageEncoding.ZAWGYI: 
                return converter.unicodeToZawgyi(translated_text); 
            default: 
                return t(translated_text); 
        }
    }
    return intl; 
}
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

enum LanguageEncoding { 
    UNICODE,
    ZAWGYI 
}

/* Global variable that determines user language */
let userLanguage = "bur"; 
let userEncoding: LanguageEncoding = LanguageEncoding.ZAWGYI; 

export const useIntl = () => {
    const { t } = useTranslation();
    const intl = (text: string) => {
        switch (userEncoding) {
            case LanguageEncoding.ZAWGYI: 
                return text; 
            default: 
                return t(text); 
        }
    }
    return intl; 
}
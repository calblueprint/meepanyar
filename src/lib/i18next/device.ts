/**
 * Detect and return user device language. 
 * @returns string shorthand for device language (e.g. "en-US" or "my")
 */
 export const detectLanguage = (): string => {
    return navigator.language;
}

/**
 * Supported encodings for Mee Panyar. 
 */
export enum LanguageEncoding { 
    UNICODE,
    ZAWGYI 
}

/**
 * Detect and return user device encoding.
 */
export const detectEncoding = (): LanguageEncoding => {
    const context = document.createElement('canvas').getContext('2d'); 
    const kaWidth = context?.measureText('က').width;
    const patSintWidth = context?.measureText('က္က').width;
    if (kaWidth == patSintWidth) {
        return LanguageEncoding.UNICODE;
    } else {
        return LanguageEncoding.ZAWGYI;
    }
}
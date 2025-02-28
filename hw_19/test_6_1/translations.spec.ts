import { describe, it, expect } from '@jest/globals';
import { appTranslations, languageCode, optionalTranslations } from './translations';

describe('Translations Tests', () => {
    it('should return the correct translation for the selected language', () => {
        expect(appTranslations[languageCode]).toBe("Привіт");
        expect(appTranslations["pl"]).toBeUndefined();
    });

    it('should return the default message and correct translations', () => {
        expect(optionalTranslations.default).toBe("Default message");
        expect(optionalTranslations.en).toBe("Hello");
        expect(optionalTranslations.ua).toBe("Привіт");
    });
});
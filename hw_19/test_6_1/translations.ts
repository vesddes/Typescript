export type Translations = {
    [key: string]: string | undefined;
};

export type OptionalTranslations = {
    default?: string;
} & Translations;

export const appTranslations: Translations = {
    en: "Hello",
    ua: "Привіт",
    es: "Hola",
};

export const languageCode: string = "ua";
// console.log(appTranslations[languageCode]);
// console.log(appTranslations["pl"]);

export const optionalTranslations: OptionalTranslations = {
    default: "Default message",
    en: "Hello",
    ua: "Привіт",
};

// console.log(optionalTranslations.default);

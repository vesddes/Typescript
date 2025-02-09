type Translations = {
    [key: string]: string | undefined;
};

type OptionalTranslations = {
    default?: string;
} & Translations;

const appTranslations: Translations = {
    en: "Hello",
    ua: "Привіт",
    es: "Hola",
};

const languageCode: string = "ua";
console.log(appTranslations[languageCode]);
console.log(appTranslations["pl"]);

const optionalTranslations: OptionalTranslations = {
    default: "Default message",
    en: "Hello",
    ua: "Привіт",
};

console.log(optionalTranslations.default);

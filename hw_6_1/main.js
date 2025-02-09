var appTranslations = {
    en: "Hello",
    ua: "Привіт",
    es: "Hola",
};
var languageCode = "ua";
console.log(appTranslations[languageCode]);
console.log(appTranslations["pl"]);
var optionalTranslations = {
    default: "Default message",
    en: "Hello",
    ua: "Привіт",
};
console.log(optionalTranslations.default);

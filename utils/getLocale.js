import enRelations from "../i18n/en";
import esRelations from "../i18n/es";
import frRelations from "../i18n/fr";
import hiRelations from "../i18n/hi";
import bnRelations from "../i18n/bn";

const localeMappings = {
  en: enRelations,
  es: esRelations,
  fr: frRelations,
  hi: hiRelations,
  bn: bnRelations,
};

const getLocale = (locale) => localeMappings[locale];

export default getLocale;

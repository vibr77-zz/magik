import common_fr from "../_locales/fr/common.json";
import common_en from "../_locales/en/common.json";
import i18next from 'i18next';

i18next.init({
    interpolation: { escapeValue: false }, // React already does escaping
    lng: 'en', // language to use
    resources: {
        en: {
            common: common_en // 'common' is our custom namespace
        },
        fr: {
            common: common_fr
        },
    },
});

export default i18next
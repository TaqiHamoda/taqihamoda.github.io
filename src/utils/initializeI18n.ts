import i18n from "i18next";
import { initReactI18next } from "react-i18next";


export function initializeI18n(language: string, translations: any[]) {
    let translation: any = {};
    translations.forEach(trans => (translation = { ...translation, ...trans.data }));
    
    const resource: any = {};
    resource[language] = {
        translation: translation,
    }

    i18n.use(initReactI18next).init({
        resources: resource,
        lng: language,
        fallbackLng: language,
    });
}

import { getI18n } from "react-i18next";

import getAllLanguages from "../data/getAllLanguages";
import Language from '../types/Language';


export default function getCurrentLanguage(): Language {
    const { language } = getI18n();
    return getAllLanguages()[language];
}
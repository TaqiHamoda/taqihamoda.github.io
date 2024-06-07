import { useTranslation } from "react-i18next";

import getAllLanguages from "../data/getAllLanguages";
import Language from '../types/Language';


export default function getCurrentLanguage(): Language {
    const { i18n } = useTranslation();
    return getAllLanguages()[i18n.language];
}
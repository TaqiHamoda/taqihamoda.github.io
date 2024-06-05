import { useI18next } from 'gatsby-plugin-react-i18next';

import getAllLanguages from "../data/getAllLanguages";
import Language from '../types/Language';


export default function getCurrentLanguage(): Language {
    const { language } = useI18next();
    return getAllLanguages()[language];
}
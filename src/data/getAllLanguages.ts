import { useStaticQuery, graphql } from "gatsby";

import Language from "../types/Language";


export default function getAllLanguages(): { [key: string]: Language } {
    const data = useStaticQuery(graphql`
        query {
            allLanguagesJson {
                nodes {
                    code
                    name
                    hrefLang
                    langDir
                }
            }
        }
    `);

    const languages: { [key: string]: Language } = {};
    data.allLanguagesJson.nodes.forEach((lang: Language) => {
        languages[lang.code] = lang;
    });

    return languages;
}





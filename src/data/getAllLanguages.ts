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
                    fields {
                        isDefault
                    }
                }
            }
        }
    `);

    const languages: { [key: string]: Language } = {};
    data.allLanguagesJson.nodes.forEach((lang: any) => {
        languages[lang.code] = {
            code: lang.code,
            name: lang.name,
            hrefLang: lang.hrefLang,
            langDir: lang.langDir,
            isDefault: lang.fields.isDefault
        };
    });

    return languages;
}

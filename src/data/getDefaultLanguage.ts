import { useStaticQuery, graphql } from "gatsby";

import Language from "../types/Language";


export default function getDefaultLanguage(): Language {
    const data = useStaticQuery(graphql`
        query {
            allLanguagesJson(filter: {fields: {isDefault: {eq: true}}}) {
                nodes {
                    code
                    name
                    hrefLang
                    langDir
                }
            }
        }
    `);

    return data.allLanguagesJson.nodes[0];
}

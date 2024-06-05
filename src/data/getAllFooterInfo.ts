import { useStaticQuery, graphql } from "gatsby";

import FooterInfo from "../types/FooterInfo";

import getAllSchemas from "./getAllSchemas";
import parseSchema from "../utils/parseSchema";


export default function getAllFooterInfo(): FooterInfo[] {
    const data = useStaticQuery(graphql`
        query {
            allFooterJson {
                nodes {
                    name
                    url
                    description
                }
            }
        }
    `);

    const schema = getAllSchemas()["footer"];

    return parseSchema(schema, data.allFooterJson.nodes);
}





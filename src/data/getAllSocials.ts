import { useStaticQuery, graphql } from "gatsby";

import Social from "../types/Social";

import getAllSchemas from "./getAllSchemas";
import parseSchema from "../utils/parseSchema";


export default function getAllSocials(): Social[] {
    const data = useStaticQuery(graphql`
        query {
            allSocialsJson {
                nodes {
                    name
                    url
                    icon {
                        publicURL
                    }
                }
            }
        }
    `);

    const schema = getAllSchemas()["socials"];

    return parseSchema(schema, data.allSocialsJson.nodes);
}

import { useStaticQuery, graphql } from "gatsby";

import Info from "../types/Info";

import getAllSchemas from "./getAllSchemas";
import parseSchema from "../utils/parseSchema";


export default function getAllInfo(): Info[] {
    const data = useStaticQuery(graphql`
        query {
            allInfoJson {
                nodes {
                    name
                    url
                    description
                }
            }
        }
    `);

    const schema = getAllSchemas()["info"];

    return parseSchema(schema, data.allInfoJson.nodes);
}





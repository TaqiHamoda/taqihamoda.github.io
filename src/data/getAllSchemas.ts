import { useStaticQuery, graphql } from "gatsby";

import Schema from "../types/Schema";


export default function getAllSchemas(): { [key: string]: Schema } {
    const data = useStaticQuery(graphql`
        query {
            allSchemasJson {
                nodes {
                    schema
                    locale_properties
                }
            }
        }
    `);

    const schemas: { [key: string]: Schema } = {};

    data.allSchemasJson.nodes.forEach((schema: any) => {
        schemas[schema.schema] = {
            "schema": schema.schema,
            "locale_properties": new Set(schema.locale_properties)
        };
    });

    return schemas;
}





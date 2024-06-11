import { useStaticQuery, graphql } from "gatsby";

import Schema, { SchemaProp } from "../types/Schema";


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
        const properties: { [key: string]: SchemaProp } = {};
        schema.locale_properties.forEach((prop: string) => {
            const children = prop.split("::");

            if(!properties[children[0]]){
                properties[children[0]] = {};
            }

            if(children.length > 1){
                let parent: SchemaProp = properties[children[0]];
                for(const p of children.slice(1)){
                    if(!parent[p]){
                        parent[p] = {};
                    }

                    parent = parent[p];
                }
            }
        });

        schemas[schema.schema] = {
            "schema": schema.schema,
            "locale_properties": properties
        };
    });

    return schemas;
}





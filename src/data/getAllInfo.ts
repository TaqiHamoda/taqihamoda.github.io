import { useStaticQuery, graphql } from "gatsby";

import Info from "../types/Info";


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

    return data.allInfoJson.nodes;
}





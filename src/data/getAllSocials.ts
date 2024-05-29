import { useStaticQuery, graphql } from "gatsby";

import Social from "../types/Social";

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

    return data.allSocialsJson.nodes;
}

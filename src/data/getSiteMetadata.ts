import { useStaticQuery, graphql } from "gatsby";

import SiteMedata from "../types/SiteMetadata";

export default function getSiteMetadata(): SiteMedata {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    description
                    favicon
                    siteUrl
                    title
                }
            }
        }
    `);

    return data.site.siteMetadata;
}
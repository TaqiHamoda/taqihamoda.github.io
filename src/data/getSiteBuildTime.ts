import { useStaticQuery, graphql } from "gatsby";

export default function getSiteBuildTime(): Date {
    const data = useStaticQuery(graphql`
        query {
            siteBuildMetadata {
                buildTime
            }
        }
    `);

    return new Date(data.siteBuildMetadata.buildTime);
}
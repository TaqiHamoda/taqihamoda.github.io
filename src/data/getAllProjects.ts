import { useStaticQuery, graphql } from "gatsby";

import Project from "../types/Project";


export default function getAllProjects(): Project[] {
    const data = useStaticQuery(graphql`
    query {
        allProjectsJson(sort: {year: DESC}) {
            nodes {
                link
                name
                image {
                    publicURL
                    childImageSharp {
                        gatsbyImageData
                    }
                }
                year
                description
            }
        }
    }`);

    return data.allProjectsJson.nodes;
}

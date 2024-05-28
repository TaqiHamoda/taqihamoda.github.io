import { useStaticQuery, graphql } from "gatsby";

import Project from "../types/Project";

export default function getAllProjects() {
    const projects: Project[] = [];

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

    data.allProjectsJson.nodes.forEach((project: Project) => {
        projects.push(project);
    });

    return projects;
}

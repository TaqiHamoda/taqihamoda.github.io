import { useStaticQuery, graphql } from "gatsby";

import Project from "../types/Project";

import getAllSchemas from "./getAllSchemas";
import parseSchema from "../utils/parseSchema";


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

    const schema = getAllSchemas()["projects"];

    return parseSchema(schema, data.allProjectsJson.nodes);
}

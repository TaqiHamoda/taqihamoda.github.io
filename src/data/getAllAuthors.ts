import { useStaticQuery, graphql } from "gatsby";

import Author from "../types/Author";

import getAllSchemas from "./getAllSchemas";
import parseSchema from "../utils/parseSchema";


export default function getAllAuthors() {
    const authors: { [key: string]: Author } = {};

    const data = useStaticQuery(graphql`
    query {
        allAuthorsJson {
            nodes {
                name
                tag
                website
            }
        }
    }`);

    const schema = getAllSchemas()["authors"];
    const parsed_data = parseSchema(schema, data.allAuthorsJson.nodes);

    parsed_data.forEach((author: Author) => {
        authors[author.tag] = author;
    });

    return authors;
}

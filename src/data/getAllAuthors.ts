import { useStaticQuery, graphql } from "gatsby";

import Author from "../types/Author";

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

    data.allAuthorsJson.nodes.forEach((author: Author) => {
        authors[author.tag] = author;
    });

    return authors;
}

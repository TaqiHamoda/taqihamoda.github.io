import { useStaticQuery, graphql } from "gatsby";

import Author from "../types/Author";
import Publication from "../types/Publication";

import getAllAuthors from "./getAllAuthors";
import getAllAbstracts from "./getAllAbstracts";
import getAllSchemas from "./getAllSchemas";
import parseSchema from "../utils/parseSchema";


export default function getAllPublications() {
    const publications: Publication[] = [];

    const data = useStaticQuery(graphql`
        query {
            allBibliographyJson(sort: { published: DESC }) {
                nodes {
                    authors
                    bibtex
                    doi
                    journal
                    pdf {
                        publicURL
                    }
                    links {
                        name
                        link
                    }
                    published
                    publisher
                    title
                    keywords
                    preview {
                        publicURL
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                }
            }
        }
    `);

    const authors = getAllAuthors();
    const abstracts = getAllAbstracts();

    const schema = getAllSchemas()["bibliograaphy"];
    const parsed_data = parseSchema(schema, data.allBibliographyJson.nodes);

    parsed_data.forEach((publication: any) => {
        const pub_authors: Author[] = [];

        publication.authors.forEach((author: string) => {
            if (authors[author] != null) {
                pub_authors.push(authors[author]);
            } else {
                pub_authors.push({
                    name: author,
                    website: "",
                    tag: "",
                });
            }
        });

        publications.push({
            title: publication.title,
            published: publication.published,
            journal: publication.journal,
            doi: publication.doi,
            authors: pub_authors,
            abstract: abstracts[publication.doi].abstract,
            image: publication.preview,
            pdf: publication.pdf.publicURL,
            links: publication.links,
            bibtex: publication.bibtex,
            keywords: publication.keywords,
        });
    });

    return publications;
}

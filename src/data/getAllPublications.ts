import { useStaticQuery, graphql } from "gatsby";

import Author from "../types/Author";
import Publication from "../types/Publication";

import getAllAuthors from "./getAllAuthors";

export default function getAllPublications() {
    const publications: Publication[] = [];

    const data = useStaticQuery(graphql`
        query {
            allBibliographyJson(sort: { published: DESC }) {
                nodes {
                    abstract
                    arxiv
                    authors
                    bibtex
                    doi
                    journal
                    pdf {
                        publicURL
                    }
                    published
                    publisher
                    title
                    url
                    website
                    tags
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

    data.allBibliographyJson.nodes.forEach((publication: any) => {
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

        const pub_date = new Date(publication.published);

        publications.push({
            title: publication.title,
            published: pub_date,
            journal: publication.journal,
            doi: publication.doi,
            authors: pub_authors,
            month: pub_date.toLocaleString("en-US", { month: "long" }),
            year: pub_date.getFullYear(),
            abstract: publication.abstract,
            image: publication.preview,
            arxiv: publication.arxiv,
            pdf: publication.pdf.publicURL,
            url: publication.url,
            website: publication.website,
            bibtex: publication.bibtex,
            tags: publication.tags,
        });
    });

    return publications;
}

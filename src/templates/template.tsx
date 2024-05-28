import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import {
    Link,
    Text,
    Heading,
    Box,
    Flex,
    Spacer,
    VStack,
    HStack,
    useBreakpointValue
} from '@chakra-ui/react'

import Author from "../types/Author"
import Publication from "../types/Publication"

import Img from "../components/Img"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import Carousel from "../components/Carousel"
import ProjectCard from "../components/ProjectCard"
import SectionHeader from "../components/SectionHeader"
import PublicationsList from "../components/PublicationList"


const shortcodes = { Link, Text, Heading, Flex, Spacer, HStack, VStack } // Provide common components here

interface PageTemplateProps {
    data: any,
    children: any,
    pageContext: any
}

export default function PageTemplate({ data, children, pageContext }: PageTemplateProps) {
    const authors: { [key: string]: Author } = {};
    const publications: Publication[] = [];

    const isSmallScreen = useBreakpointValue({ base: true, md: false });

    data.allAuthorsJson.nodes.forEach((author: Author) => {
        authors[author.tag] = author;
    });

    data.allBibliographyJson.nodes.forEach((publication: any) => {
        const pub_authors: Author[] = [];

        publication.authors.forEach((author: string) => {
            if (authors[author] != null) {
                pub_authors.push(authors[author]);
            } else {
                pub_authors.push({
                    name: author,
                    website: "",
                    tag: ""
                })
            }
        });

        const pub_date = new Date(publication.published);

        publications.push({
            title: publication.title,
            published: pub_date,
            journal: publication.journal,
            doi: publication.doi,
            authors: pub_authors,
            month: pub_date.toLocaleString('en-US', { month: 'long' }),
            year: pub_date.getFullYear(),
            abstract: publication.abstract,
            image: publication.preview,
            arxiv: publication.arxiv,
            pdf: publication.pdf.publicURL,
            url: publication.url,
            website: publication.website,
            bibtex: publication.bibtex,
            tags: publication.tags
        })
    });

    return (
        <VStack alignItems={'center'}>
            <NavBar />

            <VStack paddingTop='5rem' paddingX={'15px'} maxWidth='1200px'>
                {/* Profile Section */}
                <Box width='full' marginBottom={2}>
                    <Text as='h1' fontSize='4xl'><Text as='b'>{pageContext.frontmatter.firstname}</Text> {pageContext.frontmatter.surname}</Text>
                    <Text>{pageContext.frontmatter.profession}</Text>
                </Box>

                <Box>
                    <Box float={"right"} marginLeft={isSmallScreen ? 0 : 5}>
                        <Img
                            maxWidth={isSmallScreen ? 'full' : '350px'}
                            image={data.mdx.frontmatter.profile_image}
                            alt={"Profile Picture"}
                        />

                        <VStack marginY={5} width='max-content'>
                            <Text as='kbd'>
                                {pageContext.frontmatter.degree}
                                <br />
                                {pageContext.frontmatter.institution}
                                <br />
                                {pageContext.frontmatter.email}
                            </Text>
                        </VStack>
                    </Box>

                    <MDXProvider components={shortcodes}>
                        {children}
                    </MDXProvider>
                </Box>

                {/* Projects Section */}
                <SectionHeader
                    marginTop={5}
                    subtext="projects am proud to be a part of :)"
                >
                    projects
                </SectionHeader>

                <Carousel marginY={5} itemsPerSlide={[1, 1, 3, 3, 3]} direction={'horizontal'}>
                    {data.allProjectsJson.nodes.map((project: any) => (
                        <ProjectCard
                            key={project.name}
                            title={project.name}
                            description={project.description}
                            thumbnail={project.thumbnail}
                            link={project.link}
                        />
                    ))}
                </Carousel>

                {/* Publications Section */}
                <SectionHeader
                    subtext="feel free to reach out with any questions or concerns"
                >
                    publications
                </SectionHeader>

                <PublicationsList marginBottom={5} publications={publications} />
            </VStack>

            <Footer
                firstname={pageContext.frontmatter.firstname}
                surname={pageContext.frontmatter.surname}
                updateDate={new Date(pageContext.updateDate)}
            />
        </VStack>
    );
}

export const query = graphql`
query($id: String!) {
    mdx(id: {eq: $id}) {
      frontmatter {
        profile_image {
            publicURL
            childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
    allProjectsJson(sort: {year: DESC}) {
        nodes {
            link
            name
            thumbnail {
                publicURL
                childImageSharp {
                    gatsbyImageData
                }
            }
            year
            description
        }
    }
    allBibliographyJson(sort: {published: DESC}) {
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
    allAuthorsJson {
        nodes {
            name
            tag
            website
        }
    }
}`;


export function Head({ location, params, data, pageContext }: any) {
    return (
        <>
            <html lang="en" />
            <title>{pageContext.frontmatter.title}</title>
            <meta name="description" content={pageContext.frontmatter.description} />
        </>
    );
}
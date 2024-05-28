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

import getAllProjects from '../data/getAllProjects';
import getAllPublications from '../data/getAllPublications';

import SEO from "../components/SEO";
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
    const projects = getAllProjects();
    const publications = getAllPublications();

    const isSmallScreen = useBreakpointValue({ base: true, md: false });

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

                <Carousel marginY={5} itemsPerSlide={[1, 1, 2, 3, 3]} direction={'horizontal'}>
                    {projects.map(project => (
                        <ProjectCard
                            key={project.name}
                            project={project}
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
                updateDate={new Date(data.siteBuildMetadata.buildTime)}
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
    siteBuildMetadata {
        buildTime
    }
}`;


export function Head({ location, params, data, pageContext }: any) {
    return (
        <SEO
        title={pageContext.frontmatter.title}
        description={pageContext.frontmatter.description}
        image={data.mdx.frontmatter.profile_image.publicURL}
        pathname={location.pathname}
        />
    );
}
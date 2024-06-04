import React from "react";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import {
    Link,
    Text,
    Heading,
    Box,
    Flex,
    Spacer,
    VStack,
    HStack
} from '@chakra-ui/react';
import { useTranslation } from 'gatsby-plugin-react-i18next';

import useIsScreenSize from "../utils/useIsScreenSize";

import getAllProjects from '../data/getAllProjects';
import getAllPublications from '../data/getAllPublications';

import SEO from "../components/SEO";
import Img from "../components/Img";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import OptimalBox from "../components/OptimalBox";
import ProjectCard from "../components/ProjectCard";
import SectionHeader from "../components/SectionHeader";
import PublicationsList from "../components/PublicationList";


const shortcodes = { Link, Text, Heading, Flex, Spacer, HStack, VStack }  // Provide common components here

interface PageTemplateProps {
    data: any,
    children: any,
    pageContext: any
}

export default function PageTemplate({ data, children, pageContext }: PageTemplateProps) {
    const projects = getAllProjects();
    const publications = getAllPublications();

    const isSmallScreen = useIsScreenSize(768);

    const { t } = useTranslation();

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
                    <Box
                        float="right"
                        width='full'
                        maxWidth={isSmallScreen ? 'full' : '360px'}
                        marginLeft={isSmallScreen ? 0 : 5}
                    >
                        <Img
                            preload
                            maxQuality={720}
                            width='full'
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
                <OptimalBox lazyLoad delay width='full'>
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
                </OptimalBox>

                {/* Publications Section */}
                <OptimalBox lazyLoad delay width='full'>
                    <SectionHeader
                        subtext="please reach out with any questions or concerns"
                    >
                        publications
                    </SectionHeader>

                    <PublicationsList marginBottom={5} publications={publications} />
                </OptimalBox>
            </VStack>

            <Footer
                firstname={pageContext.frontmatter.firstname}
                surname={pageContext.frontmatter.surname}
            />
        </VStack>
    );
}

export const query = graphql`
query($id: String!, $language: String!) {
    mdx(id: {eq: $id}, frontmatter: {locale: {eq: $language}}) {
      frontmatter {
        profile_image {
            publicURL
            childImageSharp {
                gatsbyImageData
          }
        }
      }
    }
    locales: allLocale(filter: {ns: { in: ["index", "components"] }, language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
}`;

export function Head({ location, params, data, pageContext }: any) {
    return (
        <SEO
            isLocalImage
            title={pageContext.frontmatter.title}
            description={pageContext.frontmatter.description}
            image={data.mdx.frontmatter.profile_image.publicURL}
            path={location.pathname}
        />
    );
}
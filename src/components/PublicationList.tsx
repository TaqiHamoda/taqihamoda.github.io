import React from 'react';
import {
    Box,
    BoxProps,
    Flex,
    Heading,
    SimpleGrid,
    useColorModeValue,
} from '@chakra-ui/react';
import { useI18next } from 'gatsby-plugin-react-i18next';

import Publication from '../types/Publication';

import PublicationCard from './PublicationCard';


interface PublicationsListProps extends BoxProps {
    publications: Publication[];
}

const PublicationsList = ({ publications, ...props }: PublicationsListProps) => {
    const yearColor = useColorModeValue('gray.400', 'gray.600');
    const { language } = useI18next();

    const groupedPublications: { [key: number]: Publication[] } = {};
    const groupedYearsLocale: { [key: number]: string } = {};

    publications.forEach(publication => {
        const publicationYear = new Date(publication.published).getFullYear();
        if (!groupedPublications[publicationYear]) {
            groupedPublications[publicationYear] = [];
            groupedYearsLocale[publicationYear] = (new Date(publicationYear, 0, 1)).toLocaleString(language, { year: 'numeric' });
        }

        groupedPublications[publicationYear].push(publication);
    });

    return (
        <Box width="100%" {...props}>
            {Object.keys(groupedPublications).sort((a: any, b: any) => b - a).map((year: any) => (
                <Box key={year}>
                    <Flex justifyContent="flex-end">
                        <Heading as="h2" color={yearColor} size="xl" marginY={4}>
                            {groupedYearsLocale[year]}
                        </Heading>
                    </Flex>

                    <SimpleGrid spacing={4}>
                        {groupedPublications[year].map((publication) => (
                            <PublicationCard key={publication.doi} publication={publication} />
                        ))}
                    </SimpleGrid>
                </Box>
            ))}
        </Box>
    );
};

export default PublicationsList;

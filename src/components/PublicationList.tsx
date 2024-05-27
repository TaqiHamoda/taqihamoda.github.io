import React from 'react';
import {
    Box,
    BoxProps,
    Flex,
    Heading,
    SimpleGrid,
    useColorModeValue,
} from '@chakra-ui/react';

import Publication from '../types/Publication';

import PublicationCard from './PublicationCard';


interface PublicationsListProps extends BoxProps {
    publications: Publication[];
}

const PublicationsList = ({ publications, ...props }: PublicationsListProps) => {
    const yearColor = useColorModeValue('gray.400', 'gray.600');
    const groupedPublications: { [key: number]: Publication[] } = {};

    publications.forEach(publication => {
        if (!groupedPublications[publication.year]) {
            groupedPublications[publication.year] = [];
        }

        groupedPublications[publication.year].push(publication);
    });

    return (
        <Box width="100%" {...props}>
            {Object.keys(groupedPublications).sort((a: any, b: any) => b - a).map((year: any) => (
                <Box key={year}>
                    <Flex justifyContent="flex-end">
                        <Heading as="h2" color={yearColor} size="xl" marginY={4}>
                            {year}
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

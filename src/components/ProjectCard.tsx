import React from 'react';
import {
    Card,
    CardBody,
    LinkBox,
    LinkBoxProps,
    LinkOverlay,
    Text,
    Flex,
    Heading,
    useColorModeValue,
} from '@chakra-ui/react';

import Project from '../types/Project';

import Img from './Img';
import StrongDivider from './StrongDivider';


interface ProjectCardProps extends LinkBoxProps {
    project: Project;
}

const ProjectCard = ({ project, ...props }: ProjectCardProps) => {
    const hoverBg = useColorModeValue('gray.200', 'gray.600');
    const cardBg = useColorModeValue('gray.100', 'gray.700');

    return (
        <LinkBox
            title={project.name}
            as={Card}
            bgColor={cardBg}
            _hover={{ bg: hoverBg, boxShadow: 'lg' }}
            {...props}
        >
            <CardBody>
                <Img preload image={project.image} alt={project.name} maxQuality={480}/>

                <Flex justifyContent='center' marginY={2.5}>
                    <Heading as='h2' fontSize="xl" marginTop={2}>
                        {project.name}
                    </Heading>
                </Flex>

                <StrongDivider />

                <LinkOverlay href={project.link} isExternal>
                    <Text fontSize="md" marginTop={4}>
                        {project.description}
                    </Text>
                </LinkOverlay>
            </CardBody>
        </LinkBox>
    );
};

export default ProjectCard;

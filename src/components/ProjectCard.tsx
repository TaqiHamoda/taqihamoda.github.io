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

import Img from './Img';
import StrongDivider from './StrongDivider';


interface ProjectCardProps extends LinkBoxProps {
    title: string;
    description: string;
    thumbnail: any;
    link: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, thumbnail, link, ...props }) => {
    const hoverBg = useColorModeValue('gray.200', 'gray.600');
    const cardBg = useColorModeValue('gray.100', 'gray.700');

    return (
        <LinkBox
            as={Card}
            bgColor={cardBg}
            _hover={{ bg: hoverBg, boxShadow: 'lg' }}
            {...props}
        >
            <CardBody>
                <Img image={thumbnail} alt={title}/>

                <Flex justifyContent={'center'} marginY={2.5}>
                    <Heading as='h2' fontSize="xl" marginTop={2}>
                        {title}
                    </Heading>
                </Flex>

                <StrongDivider />

                <LinkOverlay href={link} isExternal>
                    <Text fontSize="md" marginTop={4}>
                        {description}
                    </Text>
                </LinkOverlay>
            </CardBody>
        </LinkBox>
    );
};

export default ProjectCard;

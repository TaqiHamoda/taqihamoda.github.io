import React from 'react';
import {
    Heading,
    Text,
    Box,
    BoxProps,
} from '@chakra-ui/react';

import StrongDivider from './StrongDivider';


interface SectionHeaderProps extends BoxProps {
    children: any;
    subtext?: string;
}

const SectionHeader = ({ children, subtext, ...props }: SectionHeaderProps) => {
    return (
        <Box width='100%' {...props}>
            <Heading as='h2' size='xl'>
                <Text as="kbd">{children}</Text>
            </Heading>
            <Text fontSize='sm' as="kbd">{subtext}</Text>

            <StrongDivider marginTop={5}/>
        </Box>
    );
};

export default SectionHeader;

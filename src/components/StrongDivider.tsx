import React from 'react';
import {
    Box,
    BoxProps,
} from '@chakra-ui/react';

const StrongDivider: React.FC<Omit<BoxProps, 'children'>> = (props) => {
    return (
        <Box
            bgColor={'gray.500'}
            height='1px'
            width='100%'
            {...props}
        />
    );
};

export default StrongDivider;

import React from 'react';
import {
    Box,
    BoxProps,
} from '@chakra-ui/react';


const StrongDivider = (props: Omit<BoxProps, 'children'>) => {
    return (
        <Box
            bgColor='gray.500'
            height='1px'
            width='100%'
            {...props}
        />
    );
};

export default StrongDivider;

import React, { useState, useEffect } from 'react';
import {
    Box,
    BoxProps,
    useId
} from '@chakra-ui/react';

const OptimalBox = ({ children, ...props }: BoxProps) => {
    const uniqueId = useId();
    const [isLoaded, setIsLoaded] = useState(false);

    // Lazy loading for the component, only show when in user view
    useEffect(() => {
        const handleScroll = () => {
            const boxElement = document.getElementById(uniqueId);
            if (boxElement && boxElement.getBoundingClientRect().top < window.innerHeight) {
                setIsLoaded(true);
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [uniqueId]);

    return (
        <Box id={uniqueId} {...props}>
            {isLoaded && children}
        </Box>
    );
};

export default OptimalBox;

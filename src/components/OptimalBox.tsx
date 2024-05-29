import React, { useState, useEffect } from 'react';
import {
    Box,
    BoxProps,
    useId
} from '@chakra-ui/react';


interface OptimalBoxProps extends BoxProps {
    delay?: boolean;
}

const OptimalBox = ({ children, delay = false, ...props }: OptimalBoxProps) => {
    const uniqueId = useId();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMainThreadIdle, setIsMainThreadIdle] = useState(false);

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

    // Progressively load the component when the main thread is idle. Enabled by delay
    useEffect(() => {
        if (isLoaded && delay) {
            const handleIdle = () => {
                setIsMainThreadIdle(true);
            };
            window.requestIdleCallback(handleIdle);
        }
    }, [isLoaded, delay]);

    return (
        <Box id={uniqueId} {...props}>
            {(delay ? isMainThreadIdle : isLoaded) && children}
        </Box>
    );
};

export default OptimalBox;

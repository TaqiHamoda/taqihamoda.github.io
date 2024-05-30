import React, { useState } from 'react';
import {
    Box,
    BoxProps
} from '@chakra-ui/react';


interface SwipableBoxProps extends BoxProps {
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
}

const SwipableBox = ({ onSwipeLeft, onSwipeRight, children, ...props }: SwipableBoxProps) => {
    const [touchStart, setTouchStart] = useState(0);
    const [swipeDistance, setSwipeDistance] = useState(0);

    const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
        setTouchStart(event.touches[0].clientX);
    };

    const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
        const currentTouch = event.touches[0].clientX;
        const distance = currentTouch - touchStart;
        setSwipeDistance(distance);
    };

    const handleTouchEnd = () => {
        if (swipeDistance > 100) {
            onSwipeLeft?.();
        } else if (swipeDistance < -100) {
            onSwipeRight?.();
        }
        setSwipeDistance(0);
    };

    return (
        <Box
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            overflow="hidden"
            {...props}
        >
            <Box
                transform={`translateX(${swipeDistance}px)`}
                transition="transform 0.3s ease-out"
            >
                {children}
            </Box>
        </Box>
    );
};

export default SwipableBox;
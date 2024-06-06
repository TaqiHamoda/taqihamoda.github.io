import React, { useState } from 'react';
import {
    Box,
    BoxProps,
    Grid,
    IconButton,
    SlideFade,
    Circle,
    useColorModeValue,
    useBreakpointValue
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useI18next } from 'gatsby-plugin-react-i18next';

import SwipableBox from './SwipableBox';


interface SlideProps {
    children: React.ReactNode[];
    direction: 'horizontal' | 'vertical';
    gap: number;
    isVisible: boolean
}

const Slide = ({ children, direction, gap, isVisible }: SlideProps) => {
    return (
        <Box marginX={20} display={isVisible ? 'block' : 'none'}>
            <Grid
                templateColumns={direction === 'horizontal' ? `repeat(${children.length}, 1fr)` : '1fr'}
                templateRows={direction === 'vertical' ? `repeat(${children.length}, 1fr)` : '1fr'}
                gap={gap}
            >
                {children}
            </Grid>
        </Box>
    );
};

interface CarouselProps extends BoxProps {
    children: React.ReactNode[];
    direction?: 'horizontal' | 'vertical';
    itemsPerSlide?: number[];
    gap?: number;
}

const Carousel = ({ children, direction = 'horizontal', itemsPerSlide = [1, 2, 3, 4, 5], gap = 10, ...props }: CarouselProps) => {
    const items = useBreakpointValue(itemsPerSlide) as number;
    const { t, language } = useI18next();

    const [currentSlide, setCurrentSlide] = useState(0);

    const handlePrevClick = () => {
        setCurrentSlide((currentSlide - 1 + Math.ceil(children.length / items)) % Math.ceil(children.length / items));
    };

    const handleNextClick = () => {
        setCurrentSlide((currentSlide + 1) % Math.ceil(children.length / items));
    };

    const handleDotClick = (index: number) => {
        setCurrentSlide(index);
    };

    const slides = [];
    for (let i = 0; i < children.length; i += items) {
        const slideChildren = children.slice(i, i + items);
        while (children.length > items && slideChildren.length < items) {
            slideChildren.push(<Box key={`slide_box_${i + slideChildren.length}`} />);
        }
        slides.push(<Slide key={`slide_${i}`} direction={direction} gap={gap} isVisible={i / items === currentSlide}>{slideChildren}</Slide>);
    }

    return (
        <Box
            position="relative"
            {...props}
        >
            {slides.map((slide, index) => (
                <SwipableBox
                    key={index}
                    onSwipeLeft={handlePrevClick}
                    onSwipeRight={handleNextClick}
                >
                    <SlideFade
                        in={index === currentSlide}
                        offsetY={direction === 'vertical' ? (index < currentSlide ? -20 : 20) : 0}
                        offsetX={direction === 'horizontal' ? (index < currentSlide ? -20 : 20) : 0}
                        transition={{ enter: { duration: 1 }, exit: { duration: 0 } }}
                    >
                        {slide}
                    </SlideFade>
                </SwipableBox>
            ))}

            <IconButton
                title={t('carousel_left') as string}
                aria-label={t('carousel_left') as string}
                icon={<ChevronLeftIcon />}
                onClick={handlePrevClick}
                position="absolute"
                top="50%"
                transform="translateY(-50%)"
                left={0}
            />

            <IconButton
                title={t('carousel_right') as string}
                aria-label={t('carousel_right') as string}
                icon={<ChevronRightIcon />}
                onClick={handleNextClick}
                position="absolute"
                top="50%"
                transform="translateY(-50%)"
                right={0}
            />

            <Box display="flex" justifyContent="center" marginTop={4}>
                {slides.map((_, index) => (
                    <Circle
                        key={`slide_circle_${index}`}
                        size={4}
                        title={t('carousel_dot', {slide_num: (index + 1).toLocaleString(language)}) as string}
                        bg={index === currentSlide ? useColorModeValue("gray.400", "gray.200") : 'transparent'}
                        borderColor={useColorModeValue("gray.400", "gray.200")}
                        borderWidth={2.5}
                        marginX={2}
                        onClick={() => handleDotClick(index)}
                        cursor="pointer"
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Carousel;
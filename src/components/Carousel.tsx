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
import React, { useState } from 'react';


interface CarouselProps extends BoxProps {
    children: React.ReactNode[];
    direction?: 'horizontal' | 'vertical';
    itemsPerSlide?: number[];
    gap?: number;
}

const Slide = ({ children, direction, gap, isVisible }: { children: React.ReactNode[]; direction: 'horizontal' | 'vertical'; gap: number; isVisible: boolean }) => {
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

const Carousel: React.FC<CarouselProps> = ({ children, direction = 'horizontal', itemsPerSlide = [1, 2, 3, 4, 5], gap = 10, ...props }) => {
    const items = useBreakpointValue(itemsPerSlide) as number;

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
            slideChildren.push(<Box key={`slide_box_${i}`} />);
        }
        slides.push(<Slide key={`slide_${i}`} direction={direction} gap={gap} isVisible={i / items === currentSlide}>{slideChildren}</Slide>);
    }

    return (
        <Box
            position="relative"
            {...props}
        >
            {slides.map((slide, index) => (
                <SlideFade
                    key={index}
                    in={index === currentSlide}
                    offsetY={direction === 'vertical' ? 20 : 0}
                    offsetX={direction === 'horizontal' ? 20 : 0}
                    transition={{ enter: { duration: 0.75 }, exit: { duration: 0 } }}
                >
                    {slide}
                </SlideFade>
            ))}

            <IconButton
                title='Previous slide'
                aria-label="Previous slide"
                icon={<ChevronLeftIcon />}
                onClick={handlePrevClick}
                position="absolute"
                top="50%"
                transform="translateY(-50%)"
                left={0}
            />

            <IconButton
                title='Next slide'
                aria-label="Next slide"
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
                        title={`Slide ${index + 1}`}
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
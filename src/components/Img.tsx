import React, { useState, useEffect } from 'react';
import {
    Image,
    Box,
    BoxProps,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    useDisclosure,
    useId
} from '@chakra-ui/react';

import ImgType from '../types/ImgType';


interface _ImgProps extends Omit<BoxProps, 'children'> {
    image: ImgType;
    alt: string;
    maxQuality?: number;
    preload?: boolean;
}

const _Img: React.FC<_ImgProps> = ({ image, alt, maxWidth, maxHeight, maxQuality, preload = false, ...props }) => {
    const uniqueId = useId();
    const [isLoaded, setIsLoaded] = useState(false);

    const src = image.publicURL;
    let srcSet = image.childImageSharp ? image.childImageSharp.gatsbyImageData.images.fallback.srcSet : src;
    const placeholder = image.childImageSharp ? image.childImageSharp.gatsbyImageData.placeholder.fallback : src;

    // Parse srcSet and filter out sizes that exceed maxWidth
    if (maxQuality && srcSet !== src) {
        const srcSetSizes = srcSet.split(',\n');
        const filteredSrcSetSizes = srcSetSizes.filter(size => {
            const width = parseInt(size.split(' ')[1].replace('w', ''));
            return width <= maxQuality;
        });
        srcSet = filteredSrcSetSizes.length > 0 ? filteredSrcSetSizes.join(', ') : srcSetSizes[0];
    }

    // Lazy loading for the images, only show images when in user view
    useEffect(() => {
        const handleScroll = () => {
            const imgElement = document.getElementById(uniqueId);
            if (imgElement && imgElement.getBoundingClientRect().top < window.innerHeight) {
                setIsLoaded(true);
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [uniqueId]);

    return (
        <Box
            id={uniqueId}
            bgColor='black'
            maxWidth={maxWidth}
            maxHeight={maxHeight}
            display='flex'
            justifyContent='center'
            alignItems='center'
            {...props}>
            {isLoaded && <Image
                rel={preload ? 'preload' : undefined}
                fetchPriority={preload ? 'high' : undefined}
                srcSet={srcSet}
                maxWidth={maxWidth}
                maxHeight={maxHeight}
                src={src}
                fallbackSrc={placeholder}
                alt={alt}
                width='100%'
                height='100%'
                objectFit='contain'
            />}
        </Box>
    );
};

interface ImgProps extends _ImgProps {
    isInteractive?: boolean;
}

const Img = ({ image, alt, isInteractive, ...props }: ImgProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <_Img
                image={image}
                alt={alt}
                onClick={isInteractive ? onOpen : () => { }}
                cursor={isInteractive ? "zoom-in" : ""}
                {...props}
            />

            {isInteractive &&
                <Modal isOpen={isOpen} onClose={onClose} size='full'>
                    <ModalOverlay />
                    <ModalContent bgColor="transparent" onClick={onClose}>
                        <ModalBody display="flex" justifyContent="center" alignItems="center">
                            <_Img image={image} alt={alt} maxHeight="90vh" maxWidth='90vw' />
                        </ModalBody>
                    </ModalContent>
                </Modal>
            }
        </>
    );
}

export default Img;

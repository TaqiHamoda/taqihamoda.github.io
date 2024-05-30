import React, { useState, useEffect } from 'react';
import {
    Image,
    BoxProps,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    useDisclosure,
} from '@chakra-ui/react';

import ImgType from '../types/ImgType';

import OptimalBox from './OptimalBox';

interface _ImgProps extends Omit<BoxProps, 'children'> {
    image: ImgType;
    alt: string;
    maxQuality?: number;
    preload?: boolean;
}

const _Img: React.FC<_ImgProps> = ({ image, alt, maxWidth, maxHeight, maxQuality, preload = false, ...props }) => {
    const [isHighQualityLoaded, setIsHighQualityLoaded] = useState(false);

    const src = image.publicURL;
    const placeholder = image.childImageSharp ? image.childImageSharp.gatsbyImageData.placeholder.fallback : src;
    let srcSet = image.childImageSharp ? image.childImageSharp.gatsbyImageData.images.fallback.srcSet : src;

    // Parse srcSet and filter out sizes that exceed maxWidth
    let lowQualitySrcSet;
    if (maxQuality && srcSet !== src) {
        const srcSetSizes = srcSet.split(',\n');
        const filteredSrcSetSizes = srcSetSizes.filter(size => {
            const width = parseInt(size.split(' ')[1].replace('w', ''));
            return width <= maxQuality;
        });
        srcSet = filteredSrcSetSizes.length > 0 ? filteredSrcSetSizes.join(', ') : srcSetSizes[0];
        lowQualitySrcSet = srcSetSizes[0];
    } else {
        lowQualitySrcSet = srcSet;
    }

    // Progressive loading of images. Load the high-quality image when the main thread isn't busy
    useEffect(() => {
        if (!isHighQualityLoaded) {
            const handleIdle = () => {
                setIsHighQualityLoaded(true);
            };
            window.requestIdleCallback(handleIdle);
        }
    }, [isHighQualityLoaded]);

    return (
        <OptimalBox
            bgColor='black'
            maxWidth={maxWidth}
            maxHeight={maxHeight}
            display='flex'
            justifyContent='center'
            alignItems='center'
            {...props}>
            <Image
                rel={preload ? 'preload' : undefined}
                fetchPriority={preload ? 'high' : undefined}
                srcSet={isHighQualityLoaded ? srcSet : lowQualitySrcSet}
                maxWidth={maxWidth}
                maxHeight={maxHeight}
                src={src}
                fallbackSrc={placeholder}
                alt={alt}
                width='100%'
                height='100%'
                objectFit='contain'
            />
        </OptimalBox>
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

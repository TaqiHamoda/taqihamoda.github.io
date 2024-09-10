import React, { useState, useEffect } from 'react';
import {
    Image,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    useDisclosure,
} from '@chakra-ui/react';

import ImgType from '../types/ImgType';

import OptimalBox, { OptimalBoxProps } from './OptimalBox';


interface _ImgProps extends Omit<OptimalBoxProps, 'children'> {
    image: ImgType;
    alt: string;
    maxQuality?: number;
    preload?: boolean;
}

const _Img = ({ image, alt, maxWidth, maxHeight, maxQuality, preload = false, ...props }: _ImgProps) => {
    const [isHighQualityLoaded, setIsHighQualityLoaded] = useState(false);

    const src = image.publicURL;
    const placeholder = image.childImageSharp ? image.childImageSharp.gatsbyImageData.placeholder.fallback : '';

    // SrcSet parsing function so the code is only executed when the image is within view
    const srcSet = (getHighQuality: boolean): string => {
        if (!image.childImageSharp) {
            return '';
        }

        const srcSetSizes = image.childImageSharp.gatsbyImageData.images.fallback.srcSet.split(',\n');
        if (!getHighQuality) {
            return srcSetSizes[0];  // If the main thread is busy, return lowest quality image.
        } else if (maxQuality) {
            // If the maxQuality is specified, return the filtered srcset when thread is idle
            const filteredSrcSetSizes = srcSetSizes.filter(size => {
                const width = parseInt(size.split(' ')[1].replace('w', ''));
                return width <= maxQuality;
            });

            // If all available qualities are higher than max quality, return the lowest
            return filteredSrcSetSizes.length > 0 ? filteredSrcSetSizes.join(', ') : srcSetSizes[0];
        }

        return srcSetSizes.join(', ');
    };

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
            lazyLoad={preload ? false : true}
            {...props}>
            <Image
                srcSet={srcSet(isHighQualityLoaded)}
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

import React from 'react';
import {
    Image,
    Box,
    BoxProps,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    useDisclosure,
} from '@chakra-ui/react';

import ImgType from '../types/ImgType';

interface _ImgProps extends BoxProps {
    image: ImgType,
    alt: string,
}

const _Img: React.FC<_ImgProps> = ({ image, alt, maxWidth, maxHeight, ...props }) => {
    const src = image.publicURL;
    const srcSet = image.childImageSharp ? image.childImageSharp.gatsbyImageData.images.fallback.srcSet : src;
    const placeholder = image.childImageSharp ? image.childImageSharp.gatsbyImageData.placeholder.fallback : src;

    return (
        <Box
            bgColor='black'
            maxWidth={maxWidth}
            maxHeight={maxHeight}
            display='flex'
            justifyContent='center'
            alignItems='center'
            {...props}>
            <Image
                srcSet={srcSet}
                maxWidth={maxWidth}
                maxHeight={maxHeight}
                src={src}
                fallbackSrc={placeholder}
                alt={alt}
                width='100%'
                height='100%'
                objectFit='contain'
            />
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

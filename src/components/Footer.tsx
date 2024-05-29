import React from 'react';
import {
    Box,
    BoxProps,
    Link,
    Text,
    Flex,
} from '@chakra-ui/react';

import getAllSocials from '../data/getAllSocials';
import getAllInfo from '../data/getAllInfo';
import getSiteBuildTime from '../data/getSiteBuildTime';

import SVGIcon from './SVGIcon';


interface FooterProps extends BoxProps {
    firstname: string;
    surname: string;
}

const Footer = ({ firstname, surname, ...props }: FooterProps) => {
    const infos = getAllInfo();
    const socials = getAllSocials();
    const updateDate = getSiteBuildTime();

    return (
        <Box as="footer" width="100%" padding={5} {...props}>
            <Flex gap={5} justifyContent="center" marginBottom={4}>
                {socials.map((social: any) => (
                    <Link key={social.name} title={social.name} href={social.url} isExternal>
                        <SVGIcon
                            boxSize='65px'
                            _hover={{ color: "teal.500" }}
                            transition="all 0.2s"
                            displayName={social.name}
                            src={social.icon.publicURL}
                        />
                    </Link>
                ))}
            </Flex>

            <Text fontSize='xs' textAlign="center" marginBottom={4}>
                Feel free to contact me at any time.
            </Text>

            <Flex gap={3} width='100%' justifyContent='center'>
                <Text color='gray.500' fontSize='xs'>
                    &copy; {updateDate.getFullYear()} {firstname} {surname}
                </Text>

                <Text color='gray.500' fontSize='xs'>
                    Last updated: {updateDate.toLocaleDateString()}
                </Text>

                {infos.map((info: any) => (
                    <Link
                        key={info.name}
                        isExternal
                        color='gray.500'
                        fontSize='xs'
                        href={info.url}
                    >
                        {info.description}
                    </Link>
                ))}
            </Flex>
        </Box>
    );
};

export default Footer;

import React from 'react';
import {
    Box,
    BoxProps,
    Link,
    Text,
    Flex,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import getAllSocials from '../data/getAllSocials';
import getAllFooterInfo from '../data/getAllFooterInfo';
import getSiteBuildTime from '../data/getSiteBuildTime';

import SVGIcon from './SVGIcon';


interface FooterProps extends BoxProps { };

const Footer = ({ ...props }: FooterProps) => {
    const { t, i18n } = useTranslation();

    const infos = getAllFooterInfo();
    const socials = getAllSocials();
    const updateDate = getSiteBuildTime();

    const updateYear = updateDate.toLocaleString(i18n.language, { year: 'numeric' });
    const buildDate = updateDate.toLocaleDateString(i18n.language, {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    });

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
                {t('footer_social') as string}
            </Text>

            <Flex gap={3} width='100%' justifyContent='center'>
                <Text color='gray.500' fontSize='xs'>
                    &copy; {updateYear} {t('firstname') as string} {t('surname') as string}
                </Text>

                <Text color='gray.500' fontSize='xs'>
                {t('footer_update') as string} {buildDate}
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

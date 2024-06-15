import React from 'react';
import {
    Text,
    Flex,
    FlexProps,
    IconButton,
    Spacer,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';

import LocalizedLink from './LocalizedLink';

import getAllLanguages from '../data/getAllLanguages';
import getCurrentLanguage from '../data/getCurrentLanguage';


interface NavBarProps extends FlexProps {
    showHomepage?: boolean;
}

const NavBar = ({ showHomepage, ...props }: NavBarProps) => {
    const { toggleColorMode } = useColorMode();
    const { t } = useTranslation();

    const langInfo = getCurrentLanguage();
    const langsInfo = getAllLanguages();

    return (
        <Flex
            as="nav"
            width='100%'
            position="fixed"
            paddingX={3}
            gap={2}
            backgroundColor={useColorModeValue('lightgray', 'gray.900')}
            opacity={0.75}
            zIndex={999}
            alignItems='center'
            {...props}
        >
            { showHomepage &&
                <LocalizedLink to='/'>
                    {<Text as='h1' fontSize='xl'><Text as='b'>{t('firstname')}</Text> {t('surname')} </Text>}
                </LocalizedLink>
            }

            <Spacer />

            <Menu>
                <MenuButton as={Button} marginRight={2}>
                    {langInfo.name}
                </MenuButton>
                <MenuList>
                    {Object.keys(langsInfo).filter((lang: string) => lang !== langInfo.code).map((lang: string) => (
                        <MenuItem key={lang} onClick={() => {
                            // This will simulate a click on the LocalizedLink
                            document.getElementById(`navbar-localized-link-${lang}`)?.click();
                        }}>
                            <LocalizedLink id={`navbar-localized-link-${lang}`} language={lang}>
                                {langsInfo[lang].name}
                            </LocalizedLink>
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>

            <IconButton
                onClick={toggleColorMode}
                alignSelf="center"
                aria-label={t('navbar_theme') as string}
                title={t('navbar_theme') as string}
                margin={2}
                icon={useColorModeValue(<SunIcon />, <MoonIcon />)}
            />
        </Flex>
    );
};

export default NavBar;

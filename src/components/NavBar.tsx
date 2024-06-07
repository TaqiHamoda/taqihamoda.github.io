import React from 'react';
import {
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

import getAllLanguages from '../data/getAllLanguages';
import getCurrentLanguage from '../data/getCurrentLanguage';


const NavBar = (props: FlexProps) => {
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

            <Spacer />

            <Menu>
                <MenuButton as={Button} marginRight={2}>
                    {langInfo.name}
                </MenuButton>
                <MenuList>
                    {Object.keys(langsInfo).filter((lang: string) => lang !== langInfo.code).map((lang: string) => (
                        <MenuItem key={lang} onClick={(e) => {
                            e.preventDefault();
                            // changeLanguage(lang);
                          }}>
                            {langsInfo[lang].name}
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

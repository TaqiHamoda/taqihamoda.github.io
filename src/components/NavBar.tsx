import React from 'react';
import {
    Flex,
    FlexProps,
    IconButton,
    Spacer,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';


const NavBar = (props: FlexProps) => {
    const { toggleColorMode } = useColorMode();

    return (
        <Flex
            as="nav"
            width='100%'
            position="fixed"
            paddingLeft={3}
            paddingRight={3}
            bgColor={useColorModeValue('gray.100', 'gray.900')}
            opacity={0.75}
            zIndex={999}
            {...props}
        >

            <Spacer />

            <IconButton
                onClick={toggleColorMode}
                alignSelf="center"
                aria-label='Theme Toggle Button'
                title='Toggle Theme'
                margin={2}
                icon={useColorModeValue(<SunIcon />, <MoonIcon />)}
            />
        </Flex>
    );
};

export default NavBar;
import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { WrapRootElementBrowserArgs } from "gatsby";
import { customTheme } from "./theme";

import getCurrentLanguage from "./data/getCurrentLanguage";


export const WrapRootElement = ({ element }: Pick<WrapRootElementBrowserArgs, 'element'>) => {
    const langInfo = getCurrentLanguage();

    const theme = extendTheme(customTheme, { direction: langInfo.langDir })

    return (
        // Or ChakraBaseProvider if you only want to compile the default Chakra theme tokens
        <ChakraProvider theme={theme}>
            {element}
        </ChakraProvider>
    );
};
import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { WrapRootElementBrowserArgs, WrapPageElementBrowserArgs } from "gatsby";
import { customTheme } from "./theme";

import getAllLanguages from "./data/getAllLanguages";


interface WrapPageElementProps extends Pick<WrapPageElementBrowserArgs, 'element'> {
    lang?: string;
};

export const WrapPageElement = ({ element, lang = 'en' }: WrapPageElementProps) => {
    const langInfo = getAllLanguages()[lang];

    return (
        // Or ChakraBaseProvider if you only want to compile the default Chakra theme tokens
        <ChakraProvider theme={extendTheme(customTheme, { direction: langInfo.langDir })}>
            {element}
        </ChakraProvider>
    );
};

export const WrapRootElement = ({ element }: Pick<WrapRootElementBrowserArgs, 'element'>) => (
    // Or ChakraBaseProvider if you only want to compile the default Chakra theme tokens
    <ChakraProvider theme={customTheme}>
        {element}
    </ChakraProvider>
);

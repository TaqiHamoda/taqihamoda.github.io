import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import { customTheme } from "./theme";
import { initializeI18n } from "./utils/initializeI18n";
import getCurrentLanguage from "./data/getCurrentLanguage";


export const WrapPageElement = ({ element, props }: any) => {
    const language: string = props.pageContext.language;
    const translations = props.data.translations.nodes;

    initializeI18n(language, translations);
 
    const langInfo = getCurrentLanguage();

    return (
        // Or ChakraBaseProvider if you only want to compile the default Chakra theme tokens
        <ChakraProvider theme={extendTheme(customTheme, { direction: langInfo.langDir })}>
            {element}
        </ChakraProvider>
    );
 };

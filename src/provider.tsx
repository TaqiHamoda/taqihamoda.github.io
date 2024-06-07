import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';

import { customTheme } from "./theme";


export const WrapPageElement = ({ element, props }: any) => {
    // No data or translations available
    if (!props.data) {
        return (
            <ChakraProvider theme={customTheme}>
                {element}
            </ChakraProvider>
        );
    }

    const language: string = props.pageContext.language;
    const translations: any[] = props.data.translations.nodes;

    const i18n = i18next.createInstance();

    let translation: any = {};
    translations.forEach(trans => (translation = { ...translation, ...trans.data }));

    i18n.init({
        resources: {
            [language]: {
                translation: translation
            }
        },
        lng: language,
        fallbackLng: language,
        react: {
            useSuspense: false
        }
    });

    return (
        <I18nextProvider i18n={i18n}>
            {/* // Or ChakraBaseProvider if you only want to compile the default Chakra theme tokens */}
            <ChakraProvider theme={extendTheme(customTheme, { direction: props.data.languagesJson.langDir })}>
                {element}
            </ChakraProvider>
        </I18nextProvider>
    );
};

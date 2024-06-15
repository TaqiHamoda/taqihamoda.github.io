import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { navigate } from "gatsby";

import { customTheme } from "./theme";
import { getLocalizedPath } from "./components/LocalizedLink";


export const WrapPageElement = ({ element, props }: any): any => {
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
    const supportedLanguages: string[] = props.pageContext.supportedLanguages;

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

    // Run in the browser only, not during build
    if (typeof window !== 'undefined') {
        const browserLanguage = navigator.language.split('-')[0];
        const isLanguageSupported = supportedLanguages.includes(browserLanguage);

        if (browserLanguage !== language && isLanguageSupported && !props.location.state?.routed) {
            const newUrl = getLocalizedPath('', browserLanguage);  // Empty string indicated get the localized path for the current page
            navigate(newUrl, { replace: true });

            return null; // Render a blank page until the redirect is complete
        }
    }

    return (
        <I18nextProvider i18n={i18n}>
            {/* // Or ChakraBaseProvider if you only want to compile the default Chakra theme tokens */}
            <ChakraProvider theme={extendTheme(customTheme, { direction: props.data.languagesJson.langDir })}>
                {element}
            </ChakraProvider>
        </I18nextProvider>
    );
};

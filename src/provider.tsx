import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { navigate } from "gatsby";

import { customTheme } from "./theme";
import { getLocalizedPath } from "./components/LocalizedLink";
import Language from "./types/Language";


export const WrapPageElement = ({ element, props }: any): any => {
    // No language data or translations available
    if (!props.pageContext.language || !props.pageContext.translation) {
        return (
            <ChakraProvider theme={customTheme}>
                {element}
            </ChakraProvider>
        );
    }

    const language: Language = props.pageContext.language;
    const translation: any = props.pageContext.translation;
    const supportedLanguages: string[] = props.pageContext.supportedLanguages;

    // Run in the browser only, not during build
    if (typeof window !== 'undefined') {
        const browserLanguage = navigator.language.split('-')[0];
        const isLanguageSupported = supportedLanguages.includes(browserLanguage);

        // Reroute the user to the language that matches their browser in case it is available
        // If the user routed to a different page on purpose, do not reroute
        if (browserLanguage !== language.code && isLanguageSupported && !props.location.state?.routed) {
            const newUrl = getLocalizedPath('', browserLanguage);  // Empty string indicated get the localized path for the current page
            navigate(newUrl, { replace: true });

            return null; // Render a blank page until the redirect is complete
        }
    }

    const i18n = i18next.createInstance();

    i18n.init({
        resources: {
            [language.code]: {
                translation
            }
        },
        lng: language.code,
        fallbackLng: language.code,
        react: {
            useSuspense: false
        }
    });

    return (
        <I18nextProvider i18n={i18n}>
            {/* // Or ChakraBaseProvider if you only want to compile the default Chakra theme tokens */}
            <ChakraProvider theme={extendTheme(customTheme, { direction: language.langDir })}>
                {element}
            </ChakraProvider>
        </I18nextProvider>
    );
};

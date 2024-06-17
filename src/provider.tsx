import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { navigate, WrapPageElementBrowserArgs } from "gatsby";

import { customTheme } from "./theme";
import { getLocalizedPath } from "./components/LocalizedLink";
import Language from "./types/Language";


interface WrapPageElementProps extends WrapPageElementBrowserArgs {
    props: WrapPageElementBrowserArgs['props'] &  {
        location: {
            state?: {
                routed?: boolean;
            };
        };
        pageContext: {
            language?: Language;
            translation?: any;
            supportedLanguages: string[];
            pageType: string;
        };
    };
}

export const WrapPageElement = ({ element, props }: WrapPageElementProps): any => {
    const { language, translation, supportedLanguages } = props.pageContext;

    // No language data or translations available
    if (!language || !translation) {
        return (
            <ChakraProvider theme={customTheme}>
                {element}
            </ChakraProvider>
        );
    }

    // Run in the browser only, not during build (Rendered client-side)
    if (typeof window !== 'undefined') {
        const browserLanguage = navigator.language.split('-')[0];
        const isLanguageSupported = supportedLanguages.includes(browserLanguage);

        // Replace URL in browser with 404
        if (props.pageContext.pageType === "404" && !window.location.pathname.endsWith('404/')) {
            const newUrl = getLocalizedPath('/404', browserLanguage);
            navigate(newUrl, { replace: true });
        } else if (browserLanguage !== language.code && isLanguageSupported && !props.location.state?.routed) {
            // Reroute the user to the language that matches their browser in case it is available
            // If the user routed to a different page on purpose, do not reroute
            const newUrl = getLocalizedPath('', browserLanguage);  // Empty string indicated get the localized path for the current page
            navigate(newUrl, { replace: true });
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

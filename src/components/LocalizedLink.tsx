import React from 'react';
import { Link, GatsbyLinkProps } from 'gatsby';

import getAllLanguages from '../data/getAllLanguages';


export function getLocalizedPath(href: string, language: string) {
    const langsInfo = getAllLanguages();

    const defaultLanguage = Object.keys(langsInfo).find(lang => langsInfo[lang].isDefault);
    const currentPagePath = typeof window !== 'undefined' ? window.location.pathname : '';

    if (!href) {
        href = currentPagePath;
    }

    const pathParts = href.split('/');
    const currentLanguage = pathParts[1];

    if (Object.keys(langsInfo).includes(currentLanguage)) {
        pathParts.splice(1, 1);
        href = pathParts.join('/');
    }

    if (language !== defaultLanguage) {
        href = `/${language}${href}`;
    }

    return href;
}

interface LocalizedLinkProps extends Omit<GatsbyLinkProps<any>, 'to' | 'ref'> {
    language: string;
    to?: string;
    ref?: any;
}

const LocalizedLink = ({ language, to, state, ...props }: LocalizedLinkProps) => {
    return (
        <Link
            to={getLocalizedPath(to as string, language)}
            state={{ ...state, routed: true }}
            {...props}
        />
    );
};

export default LocalizedLink;

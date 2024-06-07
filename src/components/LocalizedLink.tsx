import React from 'react';
import { Link, GatsbyLinkProps } from 'gatsby';

import getAllLanguages from '../data/getAllLanguages';


interface LocalizedLinkProps extends Omit<GatsbyLinkProps<any>, 'to' | 'ref'> {
    language: string;
    to?: string;
    ref?: any;
}

const LocalizedLink = ({ language, to, ...props }: LocalizedLinkProps) => {
    const langsInfo = getAllLanguages();

    const defaultLanguage = Object.keys(langsInfo).find(lang => langsInfo[lang].isDefault);
    const currentPagePath = typeof window !== 'undefined' ? window.location.pathname : '';

    if (!to) {
        to = currentPagePath;
    }

    const pathParts = to.split('/');
    const currentLanguage = pathParts[1];

    if (Object.keys(langsInfo).includes(currentLanguage)) {
        pathParts.splice(1, 1);
        to = pathParts.join('/');
    }

    if (language !== defaultLanguage) {
        to = `/${language}${to}`;
    }

    return (
        <Link to={to} {...props} />
    );
};

export default LocalizedLink;

import React from "react"

import getSiteMetadata from '../data/getSiteMetadata';


interface SEOProps {
    title?: string;
    description?: string;
    path?: string;
    image?: string;
    children?: any;
};

const SEO = ({ title, description, path, image='', children }: SEOProps) => {
    const siteMetadata = getSiteMetadata();

    const seo = {
        title: title || siteMetadata.title,
        description: description || siteMetadata.description,
        url: path ? `${siteMetadata.siteUrl}/${path}` : siteMetadata.siteUrl,
        image: image ? `${siteMetadata.siteUrl}/${image}` : '',
        favicon: siteMetadata.favicon,
        twitterUsername: siteMetadata.twitterUsername
    };

    return (
        <>
            <html lang="en" />
            <title>{seo.title}</title>
            <meta name="description" content={seo.description} />
            <meta name="image" content={seo.image} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:url" content={seo.url} />
            <meta name="twitter:description" content={seo.description} />
            <meta name="twitter:image" content={seo.image} />
            <meta name="twitter:creator" content={seo.twitterUsername} />
            {seo.favicon && <link rel="icon" href={`data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>${seo.favicon}</text></svg>`} type="image/svg+xml" />}
            {children}
        </>
    );
}

export default SEO;
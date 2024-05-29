import React from "react"

import getSiteMetadata from '../data/getSiteMetadata';


interface SEOProps {
    title?: string;
    description?: string;
    path?: string;
    image?: string;
    children?: any;
};

const SEO = ({ title, description, path, image = '', children }: SEOProps) => {
    const siteMetadata = getSiteMetadata();

    const seo = {
        title: title || siteMetadata.title,
        description: description || siteMetadata.description,
        url: path ? `${siteMetadata.siteUrl}/${path}` : siteMetadata.siteUrl,
        image: image ? image : '',
        favicon: siteMetadata.favicon,
    };

    return (
        <>
            <html lang="en" />

            <title>{seo.title}</title>
            <meta name="title" content={seo.title} />
            <meta name="description" content={seo.description} />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={seo.url} />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:image" content={image} />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={seo.url} />
            <meta property="twitter:title" content={seo.title} />
            <meta property="twitter:description" content={seo.description} />
            <meta property="twitter:image" content={image} />

            {seo.favicon && <link rel="icon" href={`data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>${seo.favicon}</text></svg>`} type="image/svg+xml" />}
            {children}
        </>
    );
}

export default SEO;
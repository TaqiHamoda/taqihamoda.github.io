import React from "react"

interface SEOProps {
    title: string;
    description: string;
    url: string;
    favicon: string;
    image?: string;
    twitterUsername?: string;
    children?: any;
};

const SEO = ({ title, description, url, favicon, image='', twitterUsername='', children }: SEOProps) => {
    return (
        <>
            <html lang="en" />
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="image" content={image} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:creator" content={twitterUsername} />
            <link rel="icon" href={`data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>${favicon}</text></svg>`} type="image/svg+xml" />
            {children}
        </>
    );
}

export default SEO;
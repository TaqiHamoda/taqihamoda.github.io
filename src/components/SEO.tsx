import React from "react"
import { useStaticQuery, graphql } from "gatsby";


interface SEOProps {
    title?: string;
    description?: string;
    pathname?: string;
    image?: string;
    children?: any;
};

const SEO = ({ title, description, pathname, image, children }: SEOProps) => {
    const data = useStaticQuery(graphql`
    query {
        site {
            siteMetadata {
                description
                siteUrl
                title
                twitterUsername
            }
        }
    }`);

    const seo = {
        title: title || data.site.siteMetadata.title,
        description: description || data.site.siteMetadata.description,
        url: `${data.site.siteMetadata.siteUrl}${pathname || ''}`,
        twitterUsername: data.site.siteMetadata.twitterUsername,
        image,
    };

    return (
        <>
            <title>{seo.title}</title>
            <meta name="description" content={seo.description} />
            <meta name="image" content={seo.image} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:url" content={seo.url} />
            <meta name="twitter:description" content={seo.description} />
            <meta name="twitter:image" content={seo.image} />
            <meta name="twitter:creator" content={seo.twitterUsername} />
            {children}
        </>
    );
}

export default SEO;
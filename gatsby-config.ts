import type { GatsbyConfig } from "gatsby";

const siteUrl = `https://taqihamoda.github.io/`;

const config: GatsbyConfig = {
    pathPrefix: "/",
    siteMetadata: {
        // Default Metadata if data isn't specified on the content page
        title: "My own personal website",
        description: "Welcome to my website!",
        siteUrl: siteUrl,
        favicon: "🌱", // Uncomment the manifest plugin to use a file
    },
    plugins: [
        `gatsby-plugin-mdx`,
        `gatsby-plugin-sitemap`,
        `gatsby-transformer-json`,
        `gatsby-transformer-sharp`, // Needed for dynamic images
        {  // Documentation: https://www.gatsbyjs.com/plugins/gatsby-plugin-react-i18next/?=gatsby%20plugin%20react%20i18n
            resolve: `gatsby-plugin-react-i18next`,
            options: {
                localeJsonSourceName: `locales`, // name given to `gatsby-source-filesystem` plugin.
                languages: [`en`, `es`, `ar`],
                defaultLanguage: `en`,
                fallbackLanguage: 'en',
                siteUrl: siteUrl,
                // if you are using trailingSlash gatsby config include it here, as well (the default is 'always')
                trailingSlash: "always",
                // you can pass any i18next options
                i18nextOptions: {
                    interpolation: {
                        escapeValue: false, // not needed for react as it escapes by default
                    },
                    keySeparator: false,
                    nsSeparator: false,
                },
                pages: [
                    {
                        matchPath: "/content/:lang?/:uid",
                        getLanguageFromPath: true,
                        excludeLanguages: ["ar"],
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-sharp`,
            options: {
                // Documentation: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/
                defaults: {
                    formats: [`webp`],
                    placeholder: `blurred`,
                    quality: 25,
                    breakpoints: [360, 480, 640, 720, 1080],
                    backgroundColor: `transparent`,
                    blurredOptions: {},
                    jpgOptions: {},
                    pngOptions: {},
                    webpOptions: {},
                    avifOptions: {},
                },
            },
        },
        {
            resolve: "gatsby-plugin-robots-txt",
            options: {
                host: siteUrl,
                sitemap: `${siteUrl}/sitemap-index.xml`,
                env: {
                    development: {
                        policy: [{ userAgent: "*", disallow: ["/"] }],
                    },
                    production: {
                        policy: [{ userAgent: "*", allow: "/" }],
                    },
                },
            },
        },
        // {
        //     resolve: `gatsby-plugin-manifest`,
        //     options: {
        //         icon: `${__dirname}/assets/favicon.svg`,  // You can edit the svg file to use an emoji for the icon
        //     },
        // },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `assets`,
                path: `${__dirname}/assets`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `content`,
                path: `${__dirname}/content`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `data`,
                path: `${__dirname}/data`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `locales`,
                path: `${__dirname}/locales`,
            },
        },
        {
            resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
            options: {
                devMode: false,
                analyzerMode: "server",
                analyzerPort: 3001,
            },
        },
    ],
    // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
    // If you use VSCode you can also use the GraphQL plugin
    // Learn more at: https://gatsby.dev/graphql-typegen
    graphqlTypegen: true,
};

export default config;

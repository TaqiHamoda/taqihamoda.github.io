import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  pathPrefix: '/',
  siteMetadata: {
    siteUrl: `https://taqihamoda.github.io/`,
  },
  plugins: [
    `gatsby-plugin-mdx`,
    `gatsby-plugin-sitemap`,
    `gatsby-transformer-json`,
    `gatsby-transformer-sharp`, // Needed for dynamic images
    {
      resolve: `gatsby-plugin-sharp`,
      options: {  // Documentation: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `blurred`,
          quality: 50,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
          blurredOptions: {},
          jpgOptions: {},
          pngOptions: {},
          webpOptions: {},
          avifOptions: {},
        }
      },
    },{
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://taqihamoda.github.io/',
        sitemap: 'https://taqihamoda.github.io/sitemap-index.xml',
        env: {
          development: {
            policy: [{userAgent: '*', disallow: ['/']}]
          },
          production: {
            policy: [{userAgent: '*', allow: '/'}]
          }
        }
      }
    },{
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `${__dirname}/assets/favicon.svg`
      },
    },{
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/assets`,
      },
    },{
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },{
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data`,
      },
    },
  ],
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
};

export default config;
